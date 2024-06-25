import { NATIVE_TOKEN_ADDRESS, createThirdwebClient, getContract } from "thirdweb";
import { z } from "zod";
import { stringToBytes, toHex } from "thirdweb/utils";
import { base } from "thirdweb/chains";

import { env } from "~/env";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { computeOrgAddress } from "~/thirdweb/8453/0x3d7bba3aee1cfadc730f42ca716172f94bbba488";
import { baseToken, isActiveEntity } from "~/thirdweb/8453/0x713023b628cc1a7eb5b9dec2b58127909a7c9760";
import { encodeFunctionData, parseAbiItem } from "viem";

const client = createThirdwebClient({
  secretKey: env.THIRDWEB_SECRET_KEY,
});

const SWAP_WRAPPER = "0x45a36C872B5E2D709A0e7B6C767Ec67f7169bb02";
const ORG_FACTORY = "0x3d7bba3AEE1CFADC730F42Ca716172F94BBBa488";
const WETH = "0x4200000000000000000000000000000000000006";

export const endaomentRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({
      searchTerm: z.string(),
      deployedStatus: z.string(),
      claimedStatus: z.string(),
      count: z.number(),
      offset: z.number(),
    }))
    .query(async ({ input }) => {
      const { searchTerm, deployedStatus, claimedStatus, count, offset } = input;
      if (!searchTerm) {
        throw new Error('Missing required parameters');
      }

      const params = new URLSearchParams({
        searchTerm,
        deployedStatus,
        claimedStatus,
        count: count.toString(),
        offset: offset.toString(),
      });

      const searchRes = await fetch(`https://api.endaoment.org/v1/sdk/orgs/search?${params.toString()}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      type EndaomentOrg = {
        id: string;
        name: string;
        ein: string;
        logoUrl: string;
        nteeCode: string;
        nteeDescription: string;
        endaomentUrl: string;
        description: string;
        contractAddress: string;
      };

      const data = await searchRes.json() as EndaomentOrg[];

      return data;
    }),
  getDonationTransaction: publicProcedure
    .input(z.object({
      ein: z.string(),
      donationAmountInWei: z.string(),
    }))
    .mutation(async ({ input }) => {
      const { ein, donationAmountInWei } = input;
      if (!ein || !donationAmountInWei) {
        throw new Error('Missing required parameters');
      }
      try {
        // strip dashes from ein and format to bytes32
        const einBytes32 = toHex(stringToBytes(ein.replace(/-/g, ''), {
          size: 32
        }));
        // get the org address from the factory
        const endaomentOrgFactory = getContract({
          client,
          chain: base,
          address: ORG_FACTORY,
        });
        const orgAddress = await computeOrgAddress({
          contract: endaomentOrgFactory,
          orgId: einBytes32,
        }) as `0x${string}`;
        // check if the org is an active entity
        const endaomentRegistry = getContract({
          client,
          chain: base,
          address: "0x713023b628cC1a7eB5b9DEC2b58127909A7c9760",
        });
        const [baseTokenAddress, orgIsDeployed] = await Promise.all([
          baseToken({
            contract: endaomentRegistry,
          }),
          isActiveEntity({
            contract: endaomentRegistry,
            arg_0: orgAddress,
          }),
        ]) as [`0x${string}`, boolean];
        const callData = await createSwapCalldata({
          amountIn: donationAmountInWei,
          baseTokenAddress,
          recipient: orgAddress,
        });
        // if the org is deployed, we can build a donate tx
        if (orgIsDeployed) {
          const swapAndDonateAbiItem = parseAbiItem(
            "function swapAndDonate(address _swapWrapper, address _tokenIn, uint256 _amountIn, bytes calldata _data) external payable returns (uint256)"
          );
          const data = encodeFunctionData({
            abi: [swapAndDonateAbiItem],
            functionName: "swapAndDonate",
            args: [
              SWAP_WRAPPER,
              NATIVE_TOKEN_ADDRESS,
              BigInt(donationAmountInWei),
              callData,
            ],
          });
          return {
            to: orgAddress,
            value: donationAmountInWei,
            data,
          };
        }
        // if the org is not deployed, we need to build a deployAndDonate tx
        const deployOrgAndSwapAndDonateAbiItem = parseAbiItem(
          "function deployOrgSwapAndDonate(bytes32 _orgId, address _swapWrapper, address _tokenIn, uint256 _amountIn, bytes calldata _data) external payable returns (Org _org)"
        );
        const data = encodeFunctionData({
          abi: [deployOrgAndSwapAndDonateAbiItem],
          functionName: "deployOrgSwapAndDonate",
          args: [
            einBytes32,
            SWAP_WRAPPER,
            NATIVE_TOKEN_ADDRESS,
            BigInt(donationAmountInWei),
            callData,
          ],
        });
        return {
          to: ORG_FACTORY,
          value: donationAmountInWei,
          data,
        }
      } catch (e) {
        const error = e as Error;
        console.log({ error });
        throw new Error(error.message);
      }
    }),
});

async function createSwapCalldata ({
  amountIn,
  baseTokenAddress,
  recipient,
}: {
  amountIn: string;
  baseTokenAddress: `0x${string}`;
  recipient: `0x${string}`;
}) {
  const routerAbiItem = parseAbiItem(
    "function exactInputSingle((address tokenIn, address tokenOut, uint24 fee, address recipient, uint256 amountIn, uint256 amountOutMinimum, uint160 sqrtPriceLimitX96)) external payable returns (uint256 amountOut)"
  );
  const uniswapParams = {
    tokenIn: WETH,
    tokenOut: baseTokenAddress,
    fee: 3000, // Common pool fee
    recipient,
    amountIn: BigInt(amountIn),
    amountOutMinimum: BigInt(0), // take what we can get for now
    sqrtPriceLimitX96: BigInt(0), // optional
  };
  const uniswapExactInputSingleData = encodeFunctionData({
    abi: [routerAbiItem],
    functionName: "exactInputSingle",
    args: [uniswapParams],
  });

  // create the multicall data to pass to the swap
  const multicallAbiItem = parseAbiItem(
    "function multicall(uint256 deadline, bytes[] calldata data) external payable returns (bytes[] memory)"
  );

  // Multicall parameters
  const calls = [uniswapExactInputSingleData];
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

  const multicallData = encodeFunctionData({
    abi: [multicallAbiItem],
    functionName: "multicall",
    args: [BigInt(deadline), calls],
  });

  return multicallData;
}