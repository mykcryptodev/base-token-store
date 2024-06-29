import { type FC } from "react";
import { type TokenListResponse } from "~/types/coingecko";
import { useState } from 'react'
import Image from "next/image";
import Sparkline from "~/components/Token/Sparkline";
import { useCartContext } from "~/contexts/Cart";
import { api } from "~/utils/api";
import { type CartItem } from "~/hooks/useCart";

type Props = {
  token: TokenListResponse;
}
export const TokenCard: FC<Props> = ({ token }) => {
  const [loading, setLoading] = useState(false)
  const { cart, addItem } = useCartContext();
  const { mutateAsync: getTokenInfo } = api.coingecko.getTokenById.useMutation();
  const price7dAgo = token.sparkline_in_7d.price[0] ?? 0;
  const priceNow = token.sparkline_in_7d.price[token.sparkline_in_7d.price.length - 1] ?? 0;
  const sevenDayPercentDiff = ((priceNow - price7dAgo) / price7dAgo) * 100;

  const onAddToCart = async () => {
    // Add logic check here for prevent race condition
    if (loading) return;
    setLoading(true);
    const alreadyInCart = cart.find((item: CartItem) => item.id === token.id);

    const tokenInfo = await getTokenInfo({
      id: token.id,
    });
    const baseAddress = tokenInfo.platforms?.base ?? cart.find((item: CartItem) => item.id === token.id)?.address;
    const baseDecimals = tokenInfo.detail_platforms?.base?.decimal_place ?? 18;
    if (!baseAddress) return setLoading(false);
    if (!alreadyInCart) {
      addItem({ 
        id: token.id,
        address: baseAddress,
        decimals: baseDecimals,
        symbol: token.symbol,
        name: token.name,
        usdAmountDesired: 1, 
        price: token.current_price,
        img: token.image,
      });
    }
    setLoading(false);
    // pop the side drawer
    document.getElementById('my-drawer')?.click();
  };

  return (
    <div className={`card max-w-[236px] min-h-[300px] h-70 sm:h-96 raise-on-hover overflow-hidden`} key={token.id}>
      <div className="absolute inset-0 bg-cover filter blur-lg " style={{ backgroundImage: `url(${token.image})`, transform: 'scale(2)', opacity: 0.2, pointerEvents: 'none' }}></div>
      <div className="card-body p-4">
        <div className="flex w-full justify-between items-center gap-2">
          <Image src={token.image} alt={token.name} width={100} height={100} className="rounded-full w-12 h-12" />
          {token.current_price ? (
            <div className="flex flex-col">
              <span>${token.current_price?.toPrecision(2)}</span>
              <span 
                className={`text-right ${sevenDayPercentDiff > 0 ? 'text-success' : 'text-[#8a8d91]'}`}
              >
                {sevenDayPercentDiff > 0 && '+'}
                {/* truncate % change to 1 decimal place */}
                {sevenDayPercentDiff.toString().replace(/(\.\d{1})\d+/, "$1")}%
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <span className="bg-base-200 w-20 h-6 rounded" />
              <span className="bg-base-200 w-20 h-6 rounded" />
            </div>
          )}
        </div>
        <h2 className="card-title grid grid-rows-2 gap-0">
          <span className="whitespace-nowrap truncate">{token.name.replace("(Base)", "")}</span>
          <span className="text-sm opacity-75 font-normal -mt-2">${token.symbol.toLowerCase()}</span>
        </h2>
        <div className="w-full h-28 sm:h-44">
          <Sparkline data={token.sparkline_in_7d.price} />
        </div>
        <div className="card-actions">
          <button 
            disabled={loading}
            className="btn btn-secondary shadow-none hover:btn-primary hover:shadow z-10"
            onClick={() => onAddToCart()}
          >Add to cart</button>
        </div>
      </div>
    </div>
  )
};

export default TokenCard;