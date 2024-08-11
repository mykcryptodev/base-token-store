import { useState, type FC } from "react";
import { Portal } from "~/components/utils/Portal";
import { api } from "~/utils/api";
import Image from "next/image";
import { EllipsisVerticalIcon, GlobeAltIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCartContext } from "~/contexts/Cart";
import { type CartItem } from "~/hooks/useCart";
import { type TokenListResponse } from "~/types/coingecko";
import Performance from "~/components/Token/Performance";
import Link from "next/link";
import { type NFT } from "thirdweb";

type Props = {
  token: TokenListResponse;
  referralNft?: (Omit<NFT, 'id'> & { id: string }) | null;
}

export const TokenInfoModal: FC<Props> = ({ token, referralNft }) => {
  const { cart, addItem } = useCartContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenInfoFetchEnabled, setTokenInfoFetchEnabled] = useState<boolean>(false);
  const { data: tokenInfo } = api.coingecko.getTokenByIdQuery.useQuery({
    id: token.id,
  }, {
    enabled: tokenInfoFetchEnabled,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const performanceTabName = referralNft?.owner ? `${referralNft.metadata.name}'s Performance` : `Your Performance`;
  const tabs = [
    performanceTabName, 
    "Token Performance", 
    "Token Info",
  ] as const;
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  console.log({performanceTabName, activeTab})

  const onAddToCart = async () => {
    // Add logic check here for prevent race condition
    if (loading || !tokenInfo) return;
    setLoading(true);
    const alreadyInCart = cart.find((item: CartItem) => item.id === token.id);

    const baseAddress = tokenInfo.platforms?.base ?? cart.find((item: CartItem) => item.id === tokenInfo.id)?.address;
    const baseDecimals = tokenInfo.detail_platforms?.base?.decimal_place ?? 18;
    if (!baseAddress) return setLoading(false);
    if (!alreadyInCart) {
      addItem({ 
        id: token.id,
        address: baseAddress,
        decimals: baseDecimals,
        symbol: tokenInfo.symbol,
        name: tokenInfo.name,
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
    <>
      <label 
        htmlFor={`${token.id}-${referralNft?.id}-token-info`}
        className="btn btn-ghost btn-sm"
        onClick={() => setTokenInfoFetchEnabled(true)}
      >
        <EllipsisVerticalIcon className="h-6 w-6" />
      </label>

      <Portal>
        <input type="checkbox" id={`${token.id}-${referralNft?.id}-token-info`} className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle" role="dialog">
          <div className="modal-box relative overflow-hidden">
            <label htmlFor={`${token.id}-${referralNft?.id}-token-info`} className="btn btn-circle btn-sm btn-ghost absolute top-4 right-4">
              <XMarkIcon className="h-6 w-6" />
            </label>
            <h3 className="text-xl font-bold flex items-center gap-2 pb-4">
              <Image
                src={token.image}
                alt={token.name}
                width={20}
                height={20}
                className="rounded-full"
              />
              {token.name}
            </h3>
            <div className="flex flex-col gap-2">
              <div role="tablist" className="tabs tabs-bordered sm:tabs-sm tabs-xs mb-4">
                {tabs.map((tab) => (
                  <a 
                    key={tab} 
                    role="tab" 
                    onClick={() => setActiveTab(tab)}
                    className={`tab ${tab === activeTab ? 'tab-active' : ''}`}
                  >
                    {tab}
                  </a>
                ))}
              </div>
              {activeTab === performanceTabName && (
                <Performance tokenInfo={tokenInfo} referralNft={referralNft} />
              )}
              {activeTab === "Token Performance" && (
                <>
                  <div className="flex justify-between">
                    <span>Price</span>
                    <span>${token.current_price.toPrecision(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Cap</span>
                    <span>${token.market_cap.toLocaleString([], {
                      currency: 'usd'
                    })}</span>
                  </div>
                  <div className="divider my-0" />
                  <div className="flex justify-between">
                    <span>24h Price Change</span>
                    <span>
                      {token.price_change_percentage_24h > 0 ? '+' : ''}
                      {token.price_change_percentage_24h.toLocaleString([], {
                        maximumFractionDigits: 2
                      })}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>24h Trading Volume</span>
                    <span>${token.total_volume.toLocaleString([], {
                      currency: 'usd'
                    })}</span>
                  </div>
                  <div className="divider my-0" />
                  <div className="flex justify-between">
                    <span>24h High</span>
                    <span>${token.high_24h?.toPrecision(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>24h Low</span>
                    <span>${token.low_24h.toPrecision(2)}</span>
                  </div>
                </>
              )}
              {activeTab === "Token Info" && (
                <div className="flex flex-col gap-2">
                  <div className="prose mb-4">
                    {tokenInfo?.description.en}
                  </div>
                  <div className="flex items-center gap-4">
                    {tokenInfo?.links.homepage[0] && (
                      <Link href={tokenInfo?.links.homepage[0] ?? ""}>
                        <GlobeAltIcon className="h-6 w-6" />
                      </Link>
                    )}
                    {tokenInfo?.links.twitter_screen_name && (
                      <Link 
                        href={`https://x.com/${tokenInfo.links.twitter_screen_name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24"><path fill="currentColor" d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"></path></svg>
                      </Link>
                    )}
                    {tokenInfo?.links.telegram_channel_identifier && (
                      <Link 
                        href={`https://x.com/${tokenInfo.links.telegram_channel_identifier}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.75em" height="1.75em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19c-.14.75-.42 1-.68 1.03c-.58.05-1.02-.38-1.58-.75c-.88-.58-1.38-.94-2.23-1.5c-.99-.65-.35-1.01.22-1.59c.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02c-.09.02-1.49.95-4.22 2.79c-.4.27-.76.41-1.08.4c-.36-.01-1.04-.2-1.55-.37c-.63-.2-1.12-.31-1.08-.66c.02-.18.27-.36.74-.55c2.92-1.27 4.86-2.11 5.83-2.51c2.78-1.16 3.35-1.36 3.73-1.36c.08 0 .27.02.39.12c.1.08.13.19.14.27c-.01.06.01.24 0 .38"></path></svg>
                      </Link>
                    )}
                  </div>
                </div>
              )}
              <button 
                className="btn btn-secondary shadow-none hover:btn-primary hover:shadow z-10 mt-4"
                onClick={() => {
                  void onAddToCart();
                  // close the modal
                  document.getElementById(`${token.id}-token-info`)?.click();
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Portal>
    </>
  )
};

export default TokenInfoModal;