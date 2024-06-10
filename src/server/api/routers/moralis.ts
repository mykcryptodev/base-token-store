import { z } from "zod";
import Moralis from "moralis";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { env } from "~/env";

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
});