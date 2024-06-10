import { Percent, Token, TokenAmount } from "@uniswap/sdk";
import { type Abi } from "abitype";
import { ADDRESS_ZERO, type ContractOptions, createThirdwebClient, getContract,isAddress,NATIVE_TOKEN_ADDRESS } from "thirdweb";
import { base, baseSepolia, ethereum, sepolia } from "thirdweb/chains";
import { allowance, balanceOf,getCurrencyMetadata,totalSupply } from "thirdweb/extensions/erc20";
import { maxUnits } from "thirdweb/extensions/farcaster/storageRegistry";
import { getWalletBalance } from "thirdweb/wallets";
import { z } from "zod";

import { factoryAbi } from "~/constants/abi/factory";
import { pairAbi } from "~/constants/abi/pair";
import { FACTORY } from "~/constants/addresses";
import { binance, binanceTestnet,DEFAULT_CHAIN, SUPPORTED_CHAINS } from "~/constants/chain";
import { env } from "~/env";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { decimals, latestRoundData } from "~/thirdweb/1/0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419";
import { getReserves, token0, token1 } from "~/thirdweb/97/0x514bb83a97fb2240d8081ff1e8d76b657731d469";
import { getPair } from "~/thirdweb/97/0xc35dadb65012ec5796536bd9864ed8773abc74c4";

const client = createThirdwebClient({
  secretKey: env.THIRDWEB_SECRET_KEY,
});

export const dexRouter = createTRPCRouter({
  getPairData: publicProcedure
    .input(z.object({
      token0: z.string(),
      token1: z.string(),
      chainId: z.number(),
    }))
    .query(async ({ input }) => {
      const chain = SUPPORTED_CHAINS.find(c => c.id === input.chainId);
      // get the pair from the factory
      const factoryAddress = FACTORY[input.chainId as unknown as keyof typeof FACTORY]!;
      if (!factoryAddress || !chain) {
        return {
          error: "Invalid chainId",
          reserves: [BigInt(0), BigInt(0), 0] as [bigint, bigint, number],
          pairAddress: ADDRESS_ZERO,
        };
      }
  
      try {
        const factoryContract = getContract({
          client,
          chain,
          address: factoryAddress,
          abi: factoryAbi,
        });

        const pairAddress = await getPair({
          arg_0: input.token0,
          arg_1: input.token1,
          contract: factoryContract,
        });

        const pairContract = getContract({
          client,
          chain,
          address: pairAddress,
          abi: pairAbi,
        });

        const reserves = await getReserves({
          contract: pairContract,
        });
  
        return {
          pairAddress,
          reserves,
          error: null,
        };
      } catch (e) {
        const error = e as Error;
        return {
          error: error.message,
          reserves: [BigInt(0), BigInt(0), 0] as readonly [bigint, bigint, number],
          pairAddress: ADDRESS_ZERO,
        };
      }
    }),
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
  getAllOwnedLiquidity: publicProcedure
    .input(z.object({
      address: z.string().optional(),
      chainId: z.number(),
    }))
    .query(async ({ input }) => {
      const { address, chainId } = input;
      if (!address) {
        return [];
      }
      const chain = SUPPORTED_CHAINS.find(c => c.id === chainId);
      if (!chain) return [];

      // these are the pairs we will check liquidity for
      const PAIRS_TO_CHECK = {
        [base.id]: [
          "0xbe09692245268B607c3029469d14bE06191A0566" // MOCHI / WETH
        ],
        [baseSepolia.id]: [
          "0x7173f375Cf9648Bb1e3983e2bA9D808c3653B94E" // MOCHI / WETH
        ],
        [binanceTestnet.id]: [],
        [ethereum.id]: [],
      };
      const pairAddresses = PAIRS_TO_CHECK[chainId as unknown as keyof typeof PAIRS_TO_CHECK]!;

      // we only care about the pairs where this user has a balance of lp tokens
      const pairContractsPromise = await Promise.allSettled(
        pairAddresses.map(async (pairAddress) => {
          const pairContract = getContract({
            client,
            chain,
            address: pairAddress,
            abi: pairAbi,
          });
          const userBalance = await balanceOf({
            contract: pairContract,
            address,
          });

          if (userBalance === BigInt(0)) {
            return null;
          }
          return {
            contract: pairContract,
            userBalance,
          };
        }),
      );

      // if any promises failed, ignore them and move on
      const pairs = pairContractsPromise.filter((pairContract) => 
        pairContract.status === "fulfilled" && pairContract.value !== null
      ).map((pairContract) =>
        ((pairContract as PromiseFulfilledResult<{contract: Readonly<ContractOptions<Abi>>; userBalance: bigint}>).value)
      );
      
      // get the individual tokens that make up each pair that the user has balance for
      const pairData = await Promise.allSettled(
        pairs.map(async (pair) => {
          const [
            token0Address, 
            token1Address,
            totalSupplyNum,
            reserves,
          ] = await Promise.all([
            token0({ contract: pair.contract }),
            token1({ contract: pair.contract }),
            totalSupply({ contract: pair.contract }),
            getReserves({ contract: pair.contract }),
          ]);
          const token0Contract = getContract({
            client,
            chain,
            address: token0Address,
          });
          const token1Contract = getContract({
            client,
            chain,
            address: token1Address,
          });
          const [token0Metadata, token1Metadata] = await Promise.all([
            getCurrencyMetadata({ contract: token0Contract }),
            getCurrencyMetadata({ contract: token1Contract }),
          ]);
          // turn token0 into a new Token class
          const token0Token = new Token(
            input.chainId,
            token0Address,
            token0Metadata.decimals,
            token0Metadata.symbol,
            token0Metadata.name,
          );
          // turn token1 into a new Token class
          const token1Token = new Token(
            input.chainId,
            token1Address,
            token1Metadata.decimals,
            token1Metadata.symbol,
            token1Metadata.name,
          );
          const userShare = new Percent(pair.userBalance.toString(), totalSupplyNum.toString());
          const userShareQuotient = BigInt(userShare.numerator.toString()) * BigInt(10n ** 18n) / BigInt(userShare.denominator.toString());
          // get the user balance of each token in the pair
          const userToken0Balance = BigInt(reserves[0]) * userShareQuotient / BigInt(10n ** 18n);
          const userToken1Balance = BigInt(reserves[1]) * userShareQuotient / BigInt(10n ** 18n);
          return {
            pairAddress: pair.contract.address,
            userBalance: pair.userBalance.toString(),
            userToken0Balance: userToken0Balance.toString(),
            userToken1Balance: userToken1Balance.toString(),
            token0: token0Token,
            token1: token1Token,
            userShare: userShare.toSignificant(),
          };
        }),
      );

      return pairData.filter((pair) => pair.status === "fulfilled").map((pair) => 
        (pair as PromiseFulfilledResult<{
          pairAddress: string; 
          userBalance: string; 
          token0: Token; 
          token1: Token
          userToken0Balance: string;
          userToken1Balance: string;
          userShare: string;
        }>).value);
    }),
  getOwnedLiquidity: publicProcedure
    .input(z.object({
      address: z.string().optional(),
      chainId: z.number(),
      pairAddress: z.string(),
    }))
    .query(async ({ input }) => {
      const chain = SUPPORTED_CHAINS.find(c => c.id === input.chainId);
      if (!input.address || !chain) {
        return {
          userBalance: new TokenAmount(
            new Token(
              input.chainId,
              input.pairAddress,
              18,
              "LP",
              "Liquidity Provider Token",
            ),
            BigInt(0).toString(),
          ).raw.toString(),
          userToken0Balance: new TokenAmount(
            new Token(
              input.chainId,
              input.pairAddress,
              18,
              "LP",
              "Liquidity Provider Token",
            ),
            BigInt(0).toString(),
          ).raw.toString(),
          userToken1Balance: new TokenAmount(
            new Token(
              input.chainId,
              input.pairAddress,
              18,
              "LP",
              "Liquidity Provider Token",
            ),
            BigInt(0).toString(),
          ).raw.toString(),
          token0: new Token(
            input.chainId,
            input.pairAddress,
            18,
            "LP",
            "Liquidity Provider Token",
          ),
          token1: new Token(
            input.chainId,
            input.pairAddress,
            18,
            "LP",
            "Liquidity Provider Token",
          ),
          userShare: "0",
        };
      }
      const pairContract = getContract({
        client,
        chain,
        address: input.pairAddress,
        abi: pairAbi,
      });
      const [
        userBalance,
        totalSupplyNum,
        reserves,
        token0Address,
        token1Address,
      ] = await Promise.all([
        balanceOf({
          contract: pairContract,
          address: input.address,
        }),
        totalSupply({
          contract: pairContract,
        }),
        getReserves({
          contract: pairContract,
        }),
        token0({
          contract: pairContract,
        }),
        token1({
          contract: pairContract,
        }),
      ]);
      const token0Contract = getContract({ 
        address: token0Address,
        client,
        chain,
      });
      const token1Contract = getContract({ 
        address: token1Address,
        client,
        chain,
      });
      const [token0Metadata, token1Metadata] = await Promise.all([
        getCurrencyMetadata({ contract: token0Contract }),
        getCurrencyMetadata({ contract: token1Contract }),
      ]);
      const token0Token = new Token(
        input.chainId,
        token0Address,
        token0Metadata.decimals,
        token0Metadata.symbol,
        token0Metadata.name,
      );
      const token1Token = new Token(
        input.chainId,
        token1Address,
        token1Metadata.decimals,
        token1Metadata.symbol,
        token1Metadata.name,
      );
      const userShare = new Percent(userBalance.toString(), totalSupplyNum.toString());
      const userShareQuotient = BigInt(userShare.numerator.toString()) * BigInt(10n ** 18n) / BigInt(userShare.denominator.toString());
      const userToken0Balance = BigInt(reserves[0]) * userShareQuotient / BigInt(10n ** 18n);
      const userToken1Balance = BigInt(reserves[1]) * userShareQuotient / BigInt(10n ** 18n);
      return {
        userBalance: userBalance.toString(),
        userToken0Balance: userToken0Balance.toString(),
        userToken1Balance: userToken1Balance.toString(),
        token0: token0Token,
        token1: token1Token,
        userShare: userShare.toSignificant(),
      };
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
        [binance.id]: "0x14e613ac84a31f709eadbdf89c6cc390fdc9540a", // BNB / USD
        [binanceTestnet.id]: "0x14e613ac84a31f709eadbdf89c6cc390fdc9540a", // BNB / USD
        [base.id]: "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419", // ETH / USD
        [baseSepolia.id]: "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419", // ETH / USD
      } as const;
      const contract = getContract({
        client,
        chain: ethereum,
        address: NATIVE_ASSET_PRICE_ORACLES[input.chainId] ?? NATIVE_ASSET_PRICE_ORACLES[DEFAULT_CHAIN.id]!,
      });
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
    }),
});