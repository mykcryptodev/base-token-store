import Head from "next/head";
import Image from "next/image";
import TokenGrid from "~/components/Token/Grid";
import { APP_NAME } from "~/constants";

export default function Home() {
  return (
    <>
      <Head>
        <title>Base Token Store</title>
        <meta name="description" content="A place to buy and sell tokens on Base" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-2 px-4 pb-16 ">
          <Image src="/images/logo-horizontal.svg" alt={APP_NAME} className="h-10 w-auto sm:hidden flex mt-8" width={200} height={200} priority />
          <h1 className="sm:text-7xl text-5xl text-center tracking-tighter font-semibold items-center gap-2 sm:gap-4 flex-wrap sm:pt-8 pt-2 sm:pb-8 pb-4">
            Base Token Store
          </h1>
          <TokenGrid />
        </div>
      </main>
    </>
  );
}
