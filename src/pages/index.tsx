import Head from "next/head";
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
          <TokenGrid />
        </div>
      </main>
    </DexContext.Provider>
  );
}
