import { z } from "zod";
import Moralis from "moralis";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { env } from "~/env";
import { toHex } from "thirdweb";

export const moralisRouter = createTRPCRouter({
  getWalletNetworth: publicProcedure
    .input(z.object({
      chainIds: z.array(z.number()),
      address: z.string(),
    }))
    .query(async ({ input }) => {
      if (!Moralis.Core.isStarted) {
        await Moralis.start({
          apiKey: env.MORALIS_API_KEY,
        });
      }
    
      const networthResponse = await Moralis.EvmApi.wallets.getWalletNetWorth({
        "chains": input.chainIds.map(chainId => `0x${chainId.toString(16)}`),
        "excludeSpam": true,
        "excludeUnverifiedContracts": true,
        "address": input.address,
      });
      return networthResponse.toJSON();
    }),
  getPortfolioPositions: publicProcedure
    .input(z.object({
      chainId: z.number(),
      address: z.string(),
    }))
    .query(async ({ input }) => {
      if (!Moralis.Core.isStarted) {
        await Moralis.start({
          apiKey: env.MORALIS_API_KEY,
        });
      }
    
      const portfolioResponse = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
        "chain": `0x${input.chainId.toString(16)}`,
        "excludeSpam": true,
        "address": input.address,
      });
      return portfolioResponse.toJSON();
    }),
  getWalletPerformance: publicProcedure
    .input(z.object({
      days: z.string().default("30"),
      chainId: z.number(),
      address: z.string(),
      tokens: z.array(z.string()).optional(),
    }))
    .query(async ({ input }) => {
      const { chainId, address, days, tokens } = input;
      if (!Moralis.Core.isStarted) {
        await Moralis.start({
          apiKey: env.MORALIS_API_KEY,
        });
      }
   
      const response = await Moralis.EvmApi.wallets.getWalletProfitability({
        days,
        chain: toHex(chainId),
        // address,
        address: "0x653Ff253b0c7C1cc52f484e891b71f9f1F010Bfb",
        tokenAddresses: tokens,
      });

      const data = response.toJSON();
      const filteredData = {
        ...data,
        // filter out WETH
        result: data.result?.filter(item => item.token_address !== "0x4200000000000000000000000000000000000006")
      };
      return filteredData;
    }),
});