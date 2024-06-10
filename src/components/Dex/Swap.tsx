import { useContext, type FC, useState } from "react";
import ActiveChainContext from "~/contexts/ActiveChain";
import DexContext from "~/contexts/Dex";
import { api } from "~/utils/api";
import { sendCalls } from '@wagmi/core/experimental';
import { kyberswap } from "~/constants/abi/kyberswap";
import { useAccount } from "wagmi";
import { decodeFunctionData, erc20Abi } from 'viem'
import { NATIVE_TOKEN_ADDRESS } from "thirdweb";
import { useActiveWallet } from "thirdweb/react";
import { config } from "~/providers/Wagmi";
import { encodeFunctionData } from 'viem';

export const Swap: FC = () => {
  const { swapRoute, swapSimply, simpleSwapRoute, slippageTolerance, tokenOutput } = useContext(DexContext);
  const { activeChain } = useContext(ActiveChainContext);
  const account = useAccount();
  const wallet = useActiveWallet();
  const { mutateAsync: getSwapEncoded } = api.kyberswap.getSwapEncodedRoute.useMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <button 
      className="btn btn-primary btn-lg"
      disabled={isLoading}
      onMouseDown={async () => {
        setIsLoading(true);
        const routeSummary = swapSimply ? simpleSwapRoute?.data.routeSummary : swapRoute?.data.routeSummary;
        console.log({ routeSummary });
        try {
          if (!routeSummary || !wallet || !account) return;
          console.log({
            chain: activeChain.id,
            from: account?.address ?? '',
            to: account?.address ?? '',
            deadline: Math.floor(Date.now() / 1000) + 60 * 20,
            slippage: Number(slippageTolerance.toFixed(2)) * 100,
            routeSummary: routeSummary,
          });
          const encoded = await getSwapEncoded({
            chain: activeChain.id,
            from: account?.address ?? '',
            to: account?.address ?? '',
            deadline: Math.floor(Date.now() / 1000) + 60 * 20,
            slippage: Number(slippageTolerance.toFixed(2)) * 100,
            routeSummary: routeSummary,
          });
          console.log({ activeChain, encoded, wallet, slippage: Number(slippageTolerance.toFixed(2)) * 100 })
          console.log({ encoded });

          const { functionName, args } = decodeFunctionData({
            abi: kyberswap,
            data: encoded.data.data as `0x${string}`,
          });

          const approvalData = encodeFunctionData({
            abi: erc20Abi,
            functionName: "approve",
            args: [
              encoded.data.routerAddress,
              BigInt(routeSummary.amountIn)
            ]
          });

          console.log({ functionName, args, swapRoute })
          const called = await sendCalls(
            config,
            {
              calls: [
                ...(routeSummary.tokenIn === NATIVE_TOKEN_ADDRESS ? [] : [
                  {
                    to: routeSummary.tokenIn as `0x${string}`,
                    data: approvalData,
                  }]
                ),
                {
                  to: encoded.data.routerAddress as `0x${string}`,
                  data: encoded.data.data as `0x${string}`,
                  value: routeSummary.tokenIn === NATIVE_TOKEN_ADDRESS ? BigInt(routeSummary.amountIn) : 0n,
                }
              ]
            }
          );
          console.log({called})
        } catch (e) {
          console.log(e);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      {isLoading && (
        <div className="loading loading-spinner" />
      )}
      Buy {tokenOutput ? tokenOutput.symbol : 'Token'}
    </button>
  )
};