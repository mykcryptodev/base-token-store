import { Token, TokenAmount } from "@uniswap/sdk";
import { ADDRESS_ZERO, createThirdwebClient, getContract,isAddress,NATIVE_TOKEN_ADDRESS } from "thirdweb";
import { base, baseSepolia, ethereum, sepolia } from "thirdweb/chains";
import { allowance, balanceOf,getCurrencyMetadata,totalSupply } from "thirdweb/extensions/erc20";
import { maxUnits } from "thirdweb/extensions/farcaster/storageRegistry";
import { getWalletBalance } from "thirdweb/wallets";
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
  getAllowance: publicProcedure
    .input(z.object({
      token: z.object({
        address: z.string(),
        decimals: z.number(),
        name: z.string().optional(),
        symbol: z.string().optional(),
      }),
      address: z.string().optional(),
      spender: z.string(),
      chainId: z.number(),
    }))
    .query(async ({ input }) => {
      const { spender, address } = input;
      const chain = SUPPORTED_CHAINS.find(c => c.id === input.chainId);
      if (!chain) {
        return {
          allowance: new TokenAmount(
            new Token(
              input.chainId,
              input.token.address,
              input.token.decimals,
              input.token.symbol,
              input.token.name,
            ),
            BigInt(0),
          ).raw.toString(),
          totalSupply: new TokenAmount(
            new Token(
              input.chainId,
              input.token.address,
              input.token.decimals,
              input.token.symbol,
              input.token.name,
            ),
            BigInt(0),
          ).raw.toString(),
        };
      }
      const token = new Token(
        input.chainId,
        input.token.address,
        input.token.decimals,
        input.token.symbol,
        input.token.name,
      );
      if (input.token.address.toLowerCase() === NATIVE_TOKEN_ADDRESS) {
        return {
          allowance: new TokenAmount(
            token,
            maxUnits.toString(),
          ).raw.toString(),
          totalSupply: new TokenAmount(
            token,
            maxUnits.toString(),
          ).raw.toString(),
        }
      }
      if (!address) {
        return {
          allowance: new TokenAmount(
            token,
            BigInt(0),
          ).raw.toString(),
          totalSupply: new TokenAmount(
            token,
            BigInt(0),
          ).raw.toString(),
        }
      }

      const contract = getContract({
        client,
        chain: SUPPORTED_CHAINS.find(c => c.id === input.chainId)!,
        address: input.token.address,
      });

      const [allownaceOf, totalTokenSupply] = await Promise.all([
        allowance({ spender, owner: address, contract }),
        totalSupply({ contract }),
      ]);

      return {
        allowance: allownaceOf.toString(),
        totalSupply: totalTokenSupply.toString(),
      }
    }),
  getBalanceForToken: publicProcedure
    .input(z.object({
      token: z.object({
        address: z.string(),
        decimals: z.number(),
        name: z.string().optional(),
        symbol: z.string().optional(),
      }),
      address: z.string().optional(),
      chainId: z.number(),
    }))
    .query(async ({ input }) => {
      const chain = SUPPORTED_CHAINS.find(c => c.id === input.chainId);
      const token = new Token(
        input.chainId,
        input.token.address,
        input.token.decimals,
        input.token.symbol,
        input.token.name,
      );
      if (!input.address || !chain || input.address === ADDRESS_ZERO) {
        return new TokenAmount(
          token,
          BigInt(0).toString(),
        ).raw.toString();
      }

      if (input.token.address.toLowerCase() === NATIVE_TOKEN_ADDRESS) {
        const walletbalance = await getWalletBalance({
          client,
          chain,
          address: input.address,
        });
        return new TokenAmount(token, walletbalance.value).raw.toString();
      }

      const contract = getContract({
        client,
        chain,
        address: input.token.address,
      });

      try {
        const balance = await balanceOf({
          contract,
          address: input.address,
        });
        return new TokenAmount(token, balance.toString()).raw.toString();
      } catch (e) {
        console.log(e);
        return '0';
      }
    }),
  getTokenByAddressAndChain: publicProcedure
    .input(z.object({
      address: z.string().optional(),
      chainId: z.number(),
    }))
    .query(async ({ input }) => {
      if (!input.address) return null;
      if (!isAddress(input.address)) return null;
      const chain = SUPPORTED_CHAINS.find(c => c.id === input.chainId);
      if (!chain) return null;
      const contract = getContract({
        client,
        chain,
        address: input.address,
      });
      const currencyMetadata = await getCurrencyMetadata({ contract });

      return new Token(
        chain.id,
        input.address,
        currencyMetadata.decimals,
        currencyMetadata.symbol,
        currencyMetadata.name,
      );
    }),
  getEtherPrice: publicProcedure
    .input(z.object({
      chainId: z.number(),
    }))
    .query(async ({ input }) => {
      const chain = SUPPORTED_CHAINS.find(c => c.id === input.chainId);
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
        address: NATIVE_ASSET_PRICE_ORACLES[input.chainId] ?? NATIVE_ASSET_PRICE_ORACLES[DEFAULT_CHAIN.id]!,
      });
      try {
        const [decimalsInPrice, latestRound] = await Promise.all([
          decimals({ contract }),
          latestRoundData({ contract }),
        ]);
        const usd = new Token(
          input.chainId,
          ADDRESS_ZERO,
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