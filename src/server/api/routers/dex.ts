import { Token, TokenAmount } from "@uniswap/sdk";
import { ZERO_ADDRESS, createThirdwebClient, getContract} from "thirdweb";
import { base, baseSepolia, ethereum, sepolia } from "thirdweb/chains";
import { z } from "zod";

import { DEFAULT_CHAIN, SUPPORTED_CHAINS } from "~/constants/chain";
import { env } from "~/env";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { decimals, latestRoundData } from "~/thirdweb/1/0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419";

const client = createThirdwebClient({
  secretKey: env.THIRDWEB_SECRET_KEY,
});

export const dexRouter = createTRPCRouter({
  getEtherPrice: publicProcedure
    .input(z.object({
      chainId: z.number().optional(),
    }))
    .query(async ({ input }) => {
      const chain = SUPPORTED_CHAINS.find(c => c.id === input.chainId) ?? DEFAULT_CHAIN;
      if (!chain) return null;
      const NATIVE_ASSET_PRICE_ORACLES: Record<number, string> = {
        [ethereum.id]: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH / USD
        [sepolia.id]: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH / USD
        [base.id]: "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419", // ETH / USD
        [baseSepolia.id]: "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419", // ETH / USD
      } as const;
      const contract = getContract({
        client,
        chain: ethereum,
        address: NATIVE_ASSET_PRICE_ORACLES[chain.id] ?? NATIVE_ASSET_PRICE_ORACLES[DEFAULT_CHAIN.id]!,
      });
      try {
        const [decimalsInPrice, latestRound] = await Promise.all([
          decimals({ contract }),
          latestRoundData({ contract }),
        ]);
        const usd = new Token(
          chain.id,
          ZERO_ADDRESS,
          decimalsInPrice,
          "USD",
          "US Dollar",
        );
        return new TokenAmount(usd, latestRound[1]).toSignificant(decimalsInPrice);
      } catch (e) {
        const error = e as Error;
        throw new Error(error.message);
      }
    }),
});