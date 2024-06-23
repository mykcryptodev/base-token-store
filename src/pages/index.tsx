import { useTheme } from "next-themes";
import Head from "next/head";
import { useState } from "react";
import Logo from "~/components/Logo";
import NftListingsGrid from "~/components/Nft/ListingsGrid";
import NftCollectionsGrid from "~/components/Nft/CollectionsGrid";
import TokenGrid from "~/components/Token/Grid";
import useDebounce from "~/hooks/useDebounce";

export default function Home() {
  const { theme } = useTheme();
  const categories = [
    'base-meme-coins',
    'NFTs and collectibles',
    'base-ecosystem',
  ];
  const [category, setCategory] = useState<string>('base-meme-coins');
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(query, 500);

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
          <div className="flex justify-center w-full">
            <input 
              type="text" 
              placeholder={`${category === 'NFTs and collectibles' ? 'Searching NFTs not yet supported...' : 'Search Base tokens...'}`}
              disabled={category === 'NFTs and collectibles'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input input-bordered w-full sm:w-2/3 md:w-4/6 lg:w-1/2 min-w-[300px]"
            />
          </div>
          <div className="sm:max-w-5xl mx-auto">
            <div className="flex flex-col gap-8 min-w-full">
              <div className="flex justify-center gap-4 overflow-x-auto sm:pl-0 pl-12">
                {categories.map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setCategory(cat)}
                    className={`btn btn-secondary ${category === cat ? 'btn-active' : ''}`}
                  >
                    {/* replace base- and then uppercase first letter */}
                    {cat.replace('base-', '').replace('-', ' ').replace(/^\w/, (c) => c.toUpperCase())}
                  </button>
                ))}
              </div>
              {category === 'NFTs and collectibles' ? (
                <>
                  <NftCollectionsGrid />
                </>
              ) : (
                <TokenGrid category={category} query={debouncedQuery} />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
