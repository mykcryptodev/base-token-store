import Head from "next/head";
import Image from "next/image";
import TokenGrid from "~/components/Token/Grid";

export default function Home() {
  return (
    <>
      <Head>
        <title>Base Token Store</title>
        <meta name="description" content="A place to buy and sell tokens on Base" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-2 px-4 py-16 ">
          <h1 className="text-7xl tracking-tight flex items-center gap-2 sm:gap-4 flex-wrap sm:pb-8 pb-4 text-black">
            <Image src="/images/logo-vertical.png" alt="Base Token Store" width={85} height={85} priority />
            <div className="flex flex-col gap-4">
              <span className="-mt-3">Base</span>
              <span className="-mt-4">Token</span>
              <span className="-mt-5">
                Store
              </span>
            </div>
          </h1>
          <TokenGrid />
        </div>
      </main>
    </>
  );
}
