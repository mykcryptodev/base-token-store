import { useTheme } from "next-themes";
import Head from "next/head";
import Logo from "~/components/Logo";
import NftListingsGrid from "~/components/Nft/ListingsGrid";

export default function Nfts() {
  const { theme } = useTheme();
  return (
    <>
      <Head>
        <title>Base Token Store</title>
        <meta name="description" content="A place to buy and sell tokens on Base" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-2 px-4 pb-16 ">
          <div className="sm:hidden flex mt-8">
            <Logo
              shapesFill={`${theme === 'dark' ? '#C9CCD5' : '#FFFFFF'}`}
              backgroundFill={`${theme === 'dark' ? '#000000' : '#1E4FFD'}`}
              width={200}
              height={50}
            />
          </div>
          <h1 className="sm:text-7xl text-5xl text-center tracking-tighter font-semibold items-center gap-2 sm:gap-4 flex-wrap sm:pt-8 pt-2 sm:pb-8 pb-4">
            Base Token Store
          </h1>
          <span>NFTs</span>
          <NftListingsGrid />
        </div>
      </main>
    </>
  );
}
