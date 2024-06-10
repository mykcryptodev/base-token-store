import Moralis from "moralis";
import { z } from "zod";

import { env } from "~/env";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getTokenBalancesInWallet: publicProcedure
    .input(z.object({ 
      address: z.string(),
      chainId: z.number(),
    }))
    .query(async ({ input }) => {
      if (!input.address) {
        throw new Error("No address provided");
      }
      try {
        if (!Moralis.Core.isStarted) {
          await Moralis.start({
            apiKey: env.MORALIS_API_KEY,
          });
        }
      
        const response = await Moralis.EvmApi.token.getWalletTokenBalances({
          "chain": `0x${input.chainId.toString(16)}`,
          "address": input.address,
        });
        return response.raw.filter((token) => !token.possible_spam).map((token) => ({
          ...token,
          chainId: input.chainId,
          logoURI: token.logo,
          address: token.token_address,
        }));
      } catch (e) {
        console.error(e);
        throw e;
      }
    }),
});