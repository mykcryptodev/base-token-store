import { useMemo, type FC } from "react";
import { api } from "~/utils/api";
import Image from "next/image";

import { useState } from "react";
import TokenCard from "~/components/Token/Card";
import { type TokenListResponse } from "~/types/coingecko";
import useDebounce from "~/hooks/useDebounce";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const TokenGrid: FC = () => {
  const categories = [
    'base-meme-coins',
    'base-ecosystem',
  ];
  const [category, setCategory] = useState<string>('base-meme-coins');
  const { data: tokens, isLoading: tokensIsLoading } = api.coingecko.getTokens.useQuery({
    category,
    sparkline: true,
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const tokensPerPage = 8;
  const indexOfLastToken = currentPage * tokensPerPage;
  const indexOfFirstToken = indexOfLastToken - tokensPerPage;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = tokens ? Math.ceil(tokens.length / tokensPerPage) : 0;
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(query, 500);

  const filteredTokens = useMemo(() => {
    if (!debouncedQuery) return tokens?.slice(indexOfFirstToken, indexOfLastToken);;
    return tokens?.filter((token) => token.name.toLowerCase().includes(debouncedQuery.toLowerCase()));
  }, [indexOfFirstToken, indexOfLastToken, debouncedQuery, tokens]);

  const { data: searchedTokens, isLoading: searchIsLoading } = api.coingecko.searchTokens.useQuery({
    query: debouncedQuery,
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: fallbackToken } = api.coingecko.getTokenCardDataById.useQuery({
    id: 'pawthereum-2',
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const searchedTokensNotInCategory = useMemo(() => {
    if (!searchedTokens) return [];
    return searchedTokens.filter((token) => !tokens?.find((t) => t.id === token.id));
  }, [tokens, searchedTokens]);

  return (
    <>
      <div className="flex justify-center w-full">
        <input 
          type="text" 
          placeholder="Search Base tokens..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full sm:w-2/3 md:w-4/6 lg:w-1/2 min-w-[300px]"
        />
      </div>
      <div className="sm:max-w-5xl mx-auto">
        <div className="flex flex-col gap-8 min-w-full">
          <div className="flex justify-center gap-4">
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
          <div 
            className={`flex flex-wrap items-stretch w-full justify-center gap-4 ${
              !filteredTokens?.length && !searchedTokensNotInCategory.length && !searchIsLoading && !tokensIsLoading && !searchIsLoading ? 'hidden' : ''
            }`}>
            {filteredTokens?.map((token) => <TokenCard key={token.id} token={token as TokenListResponse} />)}
            {searchedTokensNotInCategory?.map((token) => <TokenCard key={token.id} token={token} />)}
            {(tokensIsLoading || searchIsLoading) && Array.from({ length: tokensPerPage }, (_, index) => (
              <div key={index} className="card w-60 bg-base-200 h-96 raise-on-hover cursor-pointer">
                <div className="card-body p-4 animate-pulse">
                  <div className="flex items-center justify-between gap-2">
                    <div className="bg-base-300 w-14 rounded-full h-14" />
                    <div className="flex flex-col gap-2">
                      <div className="bg-base-300 w-20 rounded h-4" />
                      <div className="bg-base-300 w-20 rounded h-4" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="bg-base-300 w-32 rounded h-6" />
                    <div className="bg-base-300 w-20 rounded h-4" />
                  </div>
                  <div className="bg-base-300 w-full h-44 rounded-lg" />
                  <div className="bg-base-300 w-28 rounded-full h-12" />
                </div>
              </div>
            ))}
          </div>
          {!tokensIsLoading && !searchIsLoading && filteredTokens?.length === 0 && searchedTokensNotInCategory?.length === 0 && fallbackToken && (
            <div className="flex flex-col w-full items-center justify-center gap-2">
              <div className="card max-w-xs bg-base-200 text-center justify-center flex raise-on-hover cursor-pointer">
                <div className="card-body p-4">
                  <div className="flex w-full flex-col gap-2 justify-center">
                    <div className="w-full flex items-center justify-center">
                      <div className="bg-warning w-14 rounded-full h-14 flex items-center justify-center">
                        <ExclamationTriangleIcon className="h-8 w-8 stroke-2" />
                      </div>
                    </div>
                    <div className="flex flex-col grow">
                      <span className="text-lg font-bold">No tokens found</span>
                      <span className="text-sm">Try another search</span>
                      <span className="text-sm mt-4 flex">
                        <span>
                          This empty search result feature is brought to you by
                          🐾 <Link href="https://pawthereum.com" className="underline">Pawthereum</Link>
                        </span>
                      </span>
                      <span className="text-xs mt-4 flex">
                        <span>
                          Your token community can <Link href="https://github.com/mykcryptodev/base-token-store" className="underline">contribute features</Link> on Base Token Store to gain exposure!
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <TokenCard key={fallbackToken.id} token={fallbackToken} />
            </div>
          )}
          <div className="flex w-full justify-end">
            <Link href="https://coingecko.com" target="_blank" rel="noopener noreferrer" className="flex gap-1 items-center">
              <span className="text-xs opacity-90">Token data provided by</span><Image src="/images/coingecko.webp" alt="Powered by CoinGecko" width={85} height={85} />
            </Link>
          </div>
          {!debouncedQuery && (
            <div className="flex justify-center mt-4">
              <button 
                className="btn btn-secondary mr-2" 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div className="join sm:flex hidden">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`join-item btn btn-secondary ${currentPage === index + 1 ? 'btn-active' : ''}`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button 
                className="btn btn-secondary ml-2" 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default TokenGrid;