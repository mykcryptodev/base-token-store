import fetch from "node-fetch";
import { NATIVE_TOKEN_ADDRESS } from "thirdweb";
import { z } from "zod";

import { env } from "~/env";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { type RouteSummary, type KyberswapApiResponse, type RouteBuildApiResponse } from "~/types/kyberswap";

const KyberswapRouteSummarySchema = z.object({
  tokenIn: z.string(),
  amountIn: z.string(),
  amountInUsd: z.string(),
  tokenInMarketPriceAvailable: z.boolean(),
  tokenOut: z.string(),
  amountOut: z.string(),
  amountOutUsd: z.string(),
  tokenOutMarketPriceAvailable: z.boolean(),
  gas: z.string(),
  gasPrice: z.string(),
  gasUsd: z.string(),
  extraFee: z.object({
    feeAmount: z.string(),
    chargeFeeBy: z.string(),
    isInBps: z.boolean(),
    feeReceiver: z.string(),
  }),
  route: z.array(z.array(z.object({
    pool: z.string(),
    tokenIn: z.string(),
    tokenOut: z.string(),
    limitReturnAmount: z.string(),
    swapAmount: z.string(),
    amountOut: z.string(),
    exchange: z.string(),
    poolLength: z.number(),
    poolType: z.string(),
    poolExtra: z.object({
      stable: z.boolean().optional(),
      blockNumber: z.number().optional(),
    }).nullable().optional(),
    extra: z.object({
      Liquidity: z.union([z.string(), z.number()]).optional(),
      GlobalState: z.object({
        price: z.number().optional(),
        tick: z.number().optional(),
        feeZto: z.number().optional(),
        feeOtz: z.number().optional(),
        timepoint_index: z.number().optional(),
        community_fee_token0: z.number().optional(),
        community_fee_token1: z.number().optional(),
        unlocked: z.boolean().optional(),
      }).optional(),
      chunksInfo: z.array(z.object({
        amountIn: z.string(),
        amountOut: z.string(),
        amountInUsd: z.string(),
        amountOutUsd: z.string(),
      })).optional(),
    }).nullable().optional(),
  }))),
});

const KYBER_BASE_URL = `https://aggregator-api.kyberswap.com`;

const CHAIN_NAME_MAP = {
  [1]: "ethereum",
  [56]: "bsc",
  [42161]: "arbitrum",
  [137]: "polygon",
  [10]: "optimism",
  [43114]: "avalanche",
  [8453]: "base",
  [25]: "cronos",
  [324]: "zksync",
  [250]: "fantom",
  [59144]: "linea",
  [1101]: "polygon-zkevm",
  [1313161554]: "aurora",
  [199]: "bittorrent",
  [534352]: "scroll",
} as Record<number, string>;

export const kyberswapRouter = createTRPCRouter({
  getSwapRoute: publicProcedure
    .input(z.object({ 
      chainId: z.number(),
      tokenIn: z.string(),
      tokenOut: z.string(),
      amountIn: z.string(),
    }))
    .query(async ({ input }) => {
      const {
        chainId,
        tokenIn,
        tokenOut,
        amountIn,
      } = input;
      console.log({ input })
      if (!chainId || !tokenIn || !tokenOut || !amountIn) {
        throw new Error('Missing required parameters');
      }

      const chainSrcName = CHAIN_NAME_MAP[chainId];
        
      if (!chainSrcName) {
        throw new Error('Unsupported source chain');
      }
    
      const srcSwapParams = new URLSearchParams({
        tokenIn,
        tokenOut,
        amountIn,
      }).toString();
    
      const swapRes = await fetch(`${KYBER_BASE_URL}/${chainSrcName}/api/v1/routes?${srcSwapParams}`, {
        headers: {
          "Content-Type": "application/json",
          "x-client-id": env.KYBERSWAP_CLIENT_ID,
        },
      });
      return await swapRes.json() as KyberswapApiResponse;
    }),
  getSwapEncodedRoute: publicProcedure
    .input(z.object({ 
      chain: z.number(),
      from: z.string(),
      to: z.string(),
      deadline: z.number(),
      slippage: z.number(),
      routeSummary: KyberswapRouteSummarySchema,
    }))
    .mutation(async ({ input }) => {
      const { routeSummary, chain, slippage, deadline, from, to } = input;
      if (!routeSummary || !chain) {
        throw new Error('Missing required parameters');
      }

      const chainName = CHAIN_NAME_MAP[chain];

      if (!chainName) {
        throw new Error('Unsupported source chain');
      }

      const srcChainSwapEncodedRes = await fetch(`${KYBER_BASE_URL}/${chainName}/api/v1/route/build`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "x-client-id": env.KYBERSWAP_CLIENT_ID,
        },
        body: JSON.stringify({
          "routeSummary": routeSummary,
          "slippage": slippage,
          "deadline": deadline,
          "sender": from,
          "recipient": to,
        }),
      });
      const srcChainSwapEncodedData = await srcChainSwapEncodedRes.json() as RouteBuildApiResponse;
      return srcChainSwapEncodedData;
    }),
  getCheckoutData: publicProcedure
    .input(z.object({
      tokensToBuy: z.array(z.object({
        token: z.string(),
        amount: z.string(),
      })),
      from: z.string(),
      to: z.string(),
      chainId: z.number(),
      deadline: z.number().optional(),
      slippage: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const { tokensToBuy, from, to, chainId } = input;
      console.log({ input: tokensToBuy });
      if (!tokensToBuy || !from || !to || !chainId) {
        throw new Error('Missing required parameters');
      }

      const deadline = input.deadline ?? new Date().getTime() + 20 * 60 * 1000;
      const slippage = input.slippage ?? 600; // 6%

      const tokenIn = NATIVE_TOKEN_ADDRESS;
      const chainName = CHAIN_NAME_MAP[chainId];

      if (!chainName) {
        throw new Error('Unsupported chain');
      }

      // for each token to buy, get the swap route and encoded data
      const swapRoutes = await Promise.all(tokensToBuy.map(async (token) => {
        const amountIn = token.amount;
        const tokenAddress = token.token;
        const swapRoute = await getSwapRoute(chainName, tokenIn, tokenAddress, amountIn);
        return swapRoute;
      }));
      console.log({ swapRoutes })

      const swapEncodedData = await Promise.all(swapRoutes.map(async (swapRoute) => {
        const routeSummary = swapRoute.data.routeSummary;
        const swapEncodedData = await getSwapEncodedData(routeSummary, chainName, slippage, deadline, from, to);
        return swapEncodedData;
      }));

      return swapEncodedData;
    }),
});

async function getSwapRoute (chainName: string, tokenIn: string, tokenOut: string, amountIn: string) {
  const srcSwapParams = new URLSearchParams({
    tokenIn,
    tokenOut,
    amountIn,
  }).toString();

  const swapRes = await fetch(`${KYBER_BASE_URL}/${chainName}/api/v1/routes?${srcSwapParams}`, {
    headers: {
      "Content-Type": "application/json",
      "x-client-id": env.KYBERSWAP_CLIENT_ID,
    },
  });
  return await swapRes.json() as KyberswapApiResponse;
}

async function getSwapEncodedData (routeSummary: RouteSummary, chainName: string, slippage: number, deadline: number, from: string, to: string) {
  console.log({ routeSummary });
  const srcChainSwapEncodedRes = await fetch(`${KYBER_BASE_URL}/${chainName}/api/v1/route/build`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "x-client-id": env.KYBERSWAP_CLIENT_ID,
    },
    body: JSON.stringify({
      "routeSummary": routeSummary,
      "slippage": slippage,
      "deadline": deadline,
      "sender": from,
      "recipient": to,
    }),
  });
  const srcChainSwapEncodedData = await srcChainSwapEncodedRes.json() as RouteBuildApiResponse;
  return srcChainSwapEncodedData;
}