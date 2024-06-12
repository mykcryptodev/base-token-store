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
          <h1 className="text-3xl sm:text-[5rem] tracking-tight font-extrabold flex items-center gap-2 sm:gap-4 flex-wrap sm:pb-8 pb-0">
            <div className="sm:hidden flex">
              <Image src="/images/base.png" alt="Base Token Store" width={30} height={30} priority />
            </div>
            <div className="sm:flex hidden">
              <Image src="/images/base.png" alt="Base Token Store" width={65} height={65} priority />
            </div>
            Base <span className="text-primary">Token</span> Store <span className="badge sm:badge-md badge-sm badge-accent tracking-normal mb-10 sm:mb-12 -ml-2 sm:-ml-4">Beta</span>
          </h1>
          <TokenGrid />
        </div>
      </main>
    </>
  );
}
