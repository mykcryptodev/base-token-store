import { type FC } from "react";
import { type TokenListResponse } from "~/types/coingecko";
import { useState } from 'react'
import Image from "next/image";
import Sparkline from "~/components/Token/Sparkline";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { useCartContext } from "~/contexts/Cart";
import { api } from "~/utils/api";
import { CartItem } from "~/hooks/useCart";

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
    setLoading(true)
    console.log({ token, cart });
    const alreadyInCart = cart.find((item: CartItem) => item.id === token.id);

    const tokenInfo = await getTokenInfo({
      id: token.id,
    });
    const baseAddress = tokenInfo.platforms.base;
    const baseDecimals = tokenInfo.detail_platforms.base?.decimal_place ?? 18;
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
    setLoading(false)
    // pop the side drawer
    document.getElementById('my-drawer')?.click();
  }

  return (
    <div className="card max-w-sm bg-base-100 shadow-xl raise-on-hover cursor-pointer" key={token.id}>
      <figure className="relative">
        <div className="absolute inset-0 bg-cover bg-center filter blur-lg" style={{ backgroundImage: `url(${token.image})`, transform: 'scale(1.5)' }}></div>
        <Image src={token.image} alt={token.name} height={200} width={200} className="relative" />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title">{token.name}</h2>
        <div className="flex items-center gap-2 text-xs h-6">
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
          <span className="opacity-50 text-xs">7d</span>
        </div>
        <div className="card-actions justify-end">
          <button 
            disabled={loading}
            className="btn btn-secondary"
            onClick={() => onAddToCart()}
          >Add to Cart</button>
        </div>
      </div>
    </div>
  )
};

export default TokenCard;