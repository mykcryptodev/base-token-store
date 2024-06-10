import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import { useContext } from "react";
import { Swap } from "~/components/Dex/Swap";
import TokenInput from "~/components/Dex/TokenInput";
import TokenPicker from "~/components/Dex/TokenPicker";
import ActiveChainContext from "~/contexts/ActiveChain";
import DexContext from "~/contexts/Dex";
import useDex from "~/hooks/useDex";
import Image from "next/image";
import TokenGrid from "~/components/Token/Grid";

export default function Home() {
  const { 
    tokenInput, 
    tokenOutput, 
    updateTokenInput, 
    updateTokenOutput,
    tokenInputAmount,
    tokenOutputAmount,
    updateTokenInputAmount,
    updateTokenOutputAmount,
    updateUsdIn,
    updateSwapSimply,
    swapSimply,
    nonNativeTokenInSwap,
    trade,
    tradeError,
    slippageTolerance,
    updateSlippageTolerance,
    isExactIn,
    updateIsExactIn,
    requiresSwapApproval,
    pairData,
    pairDataIsLoading,
    tokensSwappedInputAt,
    updateTokensSwappedInputsAt,
    swapRoute,
    simpleSwapRoute,
  } = useDex();

  const { activeChain } = useContext(ActiveChainContext); 

  return (
    <DexContext.Provider value={{
      tokenInput,
      tokenOutput,
      updateTokenInput,
      updateTokenOutput,
      tokenInputAmount,
      tokenOutputAmount,
      updateTokenInputAmount,
      updateTokenOutputAmount,
      updateUsdIn,
      swapSimply,
      updateSwapSimply,
      nonNativeTokenInSwap,
      trade,
      tradeError,
      slippageTolerance,
      updateSlippageTolerance,
      isExactIn,
      updateIsExactIn,
      requiresSwapApproval,
      pairData,
      pairDataIsLoading,
      tokensSwappedInputAt,
      updateTokensSwappedInputsAt,
      swapRoute,
      simpleSwapRoute,
    }}>
      <Head>
        <title>Base Token Store</title>
        <meta name="description" content="A place to buy and sell tokens on Base" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] flex items-center gap-4 flex-wrap">
            <Image src="/images/base.png" alt="Base Token Store" width={65} height={65} priority />
            Base <span className="text-primary">Token</span> Store <span className="badge badge-accent tracking-normal mb-12 -ml-4">Beta</span>
          </h1>
          {/* <div className="flex justify-end w-full max-w-sm items-end -mb-6">
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <input 
                  type="checkbox" 
                  className="toggle"
                  checked={swapSimply}
                  onChange={() => void updateSwapSimply(!swapSimply)}
                />
                <span className="label-text">Simple Swap</span> 
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:gap-8">
            {swapSimply ? (
              <div className="join items-center">
                <span className="join-title rounded-r-none h-full border-r-0 input-bordered input items-center text-xl flex pr-0 text-end pt-0.5">$</span>
                <input
                  type="text"
                  onChange={(e) => void updateUsdIn(e.target.value)}
                  placeholder="Amount to buy"
                  className="input input-lg px-0 input-bordered join-item text-center border-x-0 w-full focus:ring-0 focus:outline-0"
                />
                <div className="join-item input input-lg input-bordered border-l-0 text-center flex items-center gap-2 pl-0">
                  <ChevronDownIcon className="h-4 w-4" />
                  <TokenPicker
                    id="pickedToken"
                    disabled={false}
                    chain={activeChain}
                    callback={(token) => void updateTokenOutput(token)}
                    selectedToken={tokenOutput}
                    noTokenIconLink={true}
                  />
                </div>
              </div>
            ) : (
              <>
                <TokenInput isInput={true} />
                <TokenInput isInput={false} />
              </>
            )}
            <Swap />
          </div> */}
          <TokenGrid />
        </div>
      </main>
    </DexContext.Provider>
  );
}
