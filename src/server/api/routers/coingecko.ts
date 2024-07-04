import { NATIVE_TOKEN_ADDRESS } from "thirdweb";
import { base, getChainMetadata } from "thirdweb/chains";
import { z } from "zod";

import { SUPPORTED_CHAINS } from "~/constants/chain";
import { COINGECKO_UNKNOWN_IMG } from "~/constants/dex";
import coingeckoList from "~/constants/tokenLists/coingecko.json";
import { customTokenList } from "~/constants/tokenLists/custom";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type TokenListResponse, type PoolResponse, type TokenDetailResponse, type CoinsListResponse } from "~/types/coingecko";

export const coingeckoRouter = createTRPCRouter({
  getTokenPrice: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      type TokenPriceResponse = Record<string, { usd: number }>;
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${input.id}&vs_currencies=usd`);
      const json = (await res.json()) as TokenPriceResponse;
      return json[input.id]?.usd ?? null;
    }),
  getMarketChart: publicProcedure
    .input(z.object({ id: z.string(), days: z.number().optional() }))
    .query(async ({ input }) => {
      type MarketChartResponse = { prices: [number, number][] };
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${input.id}/market_chart?vs_currency=usd&days=${input.days ?? "max"}`);
      const json = (await res.json()) as MarketChartResponse;
      return json.prices;
    }),
  getOHLC: publicProcedure
    .input(z.object({ chainId: z.number(), tokenAddress: z.string() }))
    .query(async ({ input }) => {
      type ChainNames = Record<number, string>;
      const coingeckoChainNames = { [base.id]: "base" } as ChainNames;
      const chainName = coingeckoChainNames[input.chainId];
      if (!chainName) throw new Error(`Chain ${input.chainId} not supported by coingecko`);

      const poolsRes = await fetch(`https://api.geckoterminal.com/api/v2/networks/${chainName}/tokens/${input.tokenAddress}/pools?page=1`);
      const pools = (await poolsRes.json()) as PoolResponse;

      const highestLiquidtyPool = pools.data.sort((a, b) => {
        const aLiquidity = Number(a.attributes.reserve_in_usd);
        const bLiquidity = Number(b.attributes.reserve_in_usd);
        return bLiquidity - aLiquidity;
      })[0];

      if (!highestLiquidtyPool) throw new Error(`No pools found for ${input.tokenAddress}`);

      type OHLCResponse = {
        data: {
          id: string;
          type: string;
          attributes: {
            ohlcv_list: [number, number, number, number, number, number][];
          };
        };
      };
      const ohlcRes = await fetch(`https://api.geckoterminal.com/api/v2/networks/${chainName}/pools/${highestLiquidtyPool.attributes.address}/ohlcv/day`);
      const ohlc = (await ohlcRes.json()) as OHLCResponse;
      const ohlcList = ohlc.data.attributes.ohlcv_list ?? [];

      // Check for missing days in the data set
      for (let i = 1; i < ohlcList.length; i++) {
        const currentTimestamp = ohlcList?.[i]?.[0] ?? 0;
        const previousTimestamp = ohlcList?.[i - 1]?.[0] ?? 0;
        const oneDayInSeconds = 24 * 60 * 60;

        if (previousTimestamp - currentTimestamp > oneDayInSeconds) {
          const missingDays = Math.floor((previousTimestamp - currentTimestamp) / oneDayInSeconds) - 1;

          // Insert missing days with previous day's close
          for (let j = 1; j <= missingDays; j++) {
            const missingTimestamp = previousTimestamp - j * oneDayInSeconds;
            const previousClose = ohlcList?.[i]?.[4] ?? 0;
            ohlcList.splice(i, 0, [missingTimestamp, previousClose, previousClose, previousClose, previousClose, 0]);
            i++;
          }
        }
      }

      return {
        pool: highestLiquidtyPool,
        ohlc: ohlcList,
        pools,
      };
    }),
  getTokenImage: publicProcedure
    .input(z.object({ chainId: z.number(), tokenAddress: z.string() }))
    .query(async ({ input }) => {
      // check if the address passed in was native, rely on the chain for that
      const chain = SUPPORTED_CHAINS.find((c) => c.id === input.chainId);
      if (!chain) {
        throw new Error(`Chain ${input.chainId} not supported`);
      }
      const tokenIsNative = input.tokenAddress.toLowerCase() === NATIVE_TOKEN_ADDRESS;
      const chainMetadata = await getChainMetadata(chain);
      if (tokenIsNative && chainMetadata?.icon?.url) {
        return chainMetadata.icon.url;
      }
      // before making any external calls, lets check the hardcoded json for a fast lookup
      const tokenInCustomList = customTokenList.tokens.find((t) => t.address.toLowerCase() === input.tokenAddress.toLowerCase());
      if (tokenInCustomList?.logoURI) {
        return tokenInCustomList.logoURI;
      }
      const tokenInList = coingeckoList.tokens.find((t) => t.address.toLowerCase() === input.tokenAddress.toLowerCase());
      if (tokenInList?.logoURI) {
        return tokenInList.logoURI;
      }

      type ChainNames = Record<string, string>;
      const coingeckoChainNames = { [base.id]: "base" } as ChainNames;
      const chainName = coingeckoChainNames[input.chainId];
      if (!chainName) throw new Error(`Chain ${input.chainId} not supported by coingecko`);
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${chainName}/contract/${input.tokenAddress}`);
      const json = (await res.json()) as { image: { large: string } };
      return json.image.large ?? COINGECKO_UNKNOWN_IMG;
    }),
  searchTokens: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const searchParams = new URLSearchParams({
        query: input.query,
        x_cg_demo_api_key: env.COINGECKO_API_KEY,
      });
      const res = await fetch(`https://api.coingecko.com/api/v3/search?${searchParams.toString()}`);
      const idsJson = (await res.json()) as { coins: { id: string; name: string }[] };
      const ids = idsJson.coins.filter((token) => !token.name.includes("(OLD)") && !token.name.includes("[OLD]")).map((token) => token.id);

      const platformAndStatusParams = new URLSearchParams({
        include_platform: "true",
        status: "active",
        x_cg_demo_api_key: env.COINGECKO_API_KEY,
      });
      const platformAndStatusRes = await fetch(`https://api.coingecko.com/api/v3/coins/list?${platformAndStatusParams.toString()}`);
      const platformAndStatusJson = (await platformAndStatusRes.json()) as { id: string; platforms: { base?: string } }[];
      const baseTokens = platformAndStatusJson.filter((token) => ids.includes(token.id) && token.platforms?.base);

      const basetTokenIds = ids.filter((id) => baseTokens.find((token) => token.id === id));
      if (!basetTokenIds.length) return [];

      const tokenDataParms = new URLSearchParams({
        ids: basetTokenIds.map((id) => id).join(",") ?? "",
        vs_currency: "usd",
        sparkline: "true",
        x_cg_demo_api_key: env.COINGECKO_API_KEY,
      });
      const tokenData = await fetch(`https://api.coingecko.com/api/v3/coins/markets?${tokenDataParms.toString()}`);
      const tokenDataJson = (await tokenData.json()) as TokenListResponse[];
      return tokenDataJson;
    }),
  getTokenCardDataById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const tokenDataParms = new URLSearchParams({
        ids: input.id,
        vs_currency: "usd",
        sparkline: "true",
        x_cg_demo_api_key: env.COINGECKO_API_KEY,
      });
      const tokenData = await fetch(`https://api.coingecko.com/api/v3/coins/markets?${tokenDataParms.toString()}`);
      const tokenDataJson = (await tokenData.json()) as TokenListResponse[];
      return tokenDataJson[0];
    }),
  getTokenById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${input.id}`);
      const json = (await res.json()) as TokenDetailResponse;
      return json;
    }),
  getTokenByIdQuery: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${input.id}`);
      const json = (await res.json()) as TokenDetailResponse;
      return json;
    }),
  getTokenAddresses: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query(async ({ input }) => {
      if (!input.ids.length) return [];
      const res = await fetch("https://api.coingecko.com/api/v3/coins/list?include_platform=true&status=active");
      const json = (await res.json()) as CoinsListResponse;
      // only return the tokens with ids in the array
      return json.filter((token) => input.ids.includes(token.id));
    }),
  getTokens: publicProcedure
    .input(z.object({ category: z.string().optional(), sparkline: z.boolean().optional() }))
    .query(async ({ input }) => {
      try {
        const params = new URLSearchParams({
          vs_currency: "usd",
          category: input.category ?? "base-meme-coins",
          sparkline: (input.sparkline ?? true).toString(),
          x_cg_demo_api_key: env.COINGECKO_API_KEY,
        });
        const url = `https://api.coingecko.com/api/v3/coins/markets?${params.toString()}`;

        const res = await fetch(url, {
          headers: {
            accept: "application/json",
          },
        });
        const json = (await res.json()) as TokenListResponse[];
        return json;
      } catch (e) {
        console.error(e);
        return [];
      }
    }),
});