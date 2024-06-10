import Image from "next/image";
import { type FC } from "react";
import { api } from "~/utils/api";
import Sparkline from "~/components/Token/Sparkline";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
// import ColorThief from 'colorthief';

import { useState } from "react";
import { useCartContext } from "~/contexts/Cart";

export const TokenGrid: FC = () => {
  const { cart, addItem } = useCartContext();
  const { mutateAsync: getTokenInfo } = api.coingecko.getTokenById.useMutation();
  const { data: tokens } = api.coingecko.getTokens.useQuery({
    category: 'base-meme-coins',
    sparkline: true,
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  console.log({ tokens });

  const [currentPage, setCurrentPage] = useState(1);
  const tokensPerPage = 8;
  const indexOfLastToken = currentPage * tokensPerPage;
  const indexOfFirstToken = indexOfLastToken - tokensPerPage;
  const currentTokens = tokens?.slice(indexOfFirstToken, indexOfLastToken);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = tokens ? Math.ceil(tokens.length / tokensPerPage) : 0;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {currentTokens?.map((token) => {
        const price7dAgo = token.sparkline_in_7d.price[0] ?? 0;
        const priceNow = token.sparkline_in_7d.price[token.sparkline_in_7d.price.length - 1] ?? 0;
        const sevenDayPercentDiff = ((priceNow - price7dAgo) / price7dAgo) * 100;

        return (
          <div className="card max-w-sm bg-base-100 shadow-xl raise-on-hover cursor-pointer" key={token.id}>
            <figure className="relative">
              <div className="absolute inset-0 bg-cover bg-center filter blur-lg" style={{ backgroundImage: `url(${token.image})`, transform: 'scale(1.5)' }}></div>
              <Image src={token.image} alt={token.name} height={200} width={200} className="relative" />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title">{token.name}</h2>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-sm">${token.current_price.toPrecision(2)}</span>

                <Sparkline data={token.sparkline_in_7d.price} />

                {sevenDayPercentDiff > 0 ? (
                  <div className="text-success flex items-center">
                    <ArrowUpIcon className="h-3 w-3" />
                    {sevenDayPercentDiff.toFixed(2)}%
                  </div>
                ) : (
                  <div className="text-error flex items-center">
                    <ArrowDownIcon className="h-3 w-3" />
                    {sevenDayPercentDiff.toFixed(2)}%
                  </div>
                )}
              </div>
              <div className="card-actions justify-end">
                <button 
                  className="btn btn-secondary"
                  onClick={async () => {
                    console.log({ token, cart });
                    const alreadyInCart = cart.find((item) => item.id === token.id);

                    const tokenInfo = await getTokenInfo({
                      id: token.id,
                    });
                    const baseAddress = tokenInfo.platforms.base;
                    const baseDecimals = tokenInfo.detail_platforms.base?.decimal_place ?? 18;
                    if (!baseAddress) return;
                    if (!alreadyInCart) {
                      addItem({ 
                        id: token.id,
                        address: baseAddress,
                        decimals: baseDecimals,
                        symbol: token.symbol,
                        name: token.name,
                        usdAmountDesired: 0, 
                        price: token.current_price,
                        img: token.image,
                      });
                    }
                    // pop the side drawer
                    document.getElementById('my-drawer')?.click();
                  }}
                >Add to Cart</button>
              </div>
            </div>
          </div>
        )
      })}
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