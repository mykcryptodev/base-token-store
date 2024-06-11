import { useMemo, type FC } from "react";
import { api } from "~/utils/api";
import Image from "next/image";

import { useState } from "react";
import TokenCard from "~/components/Token/Card";
import { type TokenListResponse } from "~/types/coingecko";
import useDebounce from "~/hooks/useDebounce";
import Link from "next/link";

export const TokenGrid: FC = () => {
  const { data: tokens } = api.coingecko.getTokens.useQuery({
    category: 'base-meme-coins',
    sparkline: true,
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  console.log({ tokens });

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

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center">
        <input 
          type="text" 
          placeholder="Search" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full sm:w-2/3 md:w-4/6 lg:w-1/2"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 place-content-center">
        {filteredTokens?.map((token) => <TokenCard key={token.id} token={token as TokenListResponse} />)}
      </div>
      <div className="flex w-full justify-end">
        <Link href="https://coingecko.com" target="_blank" rel="noopener noreferrer" className="flex gap-1 items-center">
          <span className="text-xs opacity-90">Token data provided by</span><Image src="/images/coingecko.webp" alt="Powered by CoinGecko" width={85} height={85} />
        </Link>
      </div>
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
              className={`join-item btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
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
    </div>
  )
}

export default TokenGrid;