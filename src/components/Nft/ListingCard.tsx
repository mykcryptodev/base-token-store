import Image from "next/image";
import { useMemo, useState, type FC } from "react";
import { ZERO_ADDRESS, toTokens } from "thirdweb";
import { COINGECKO_UNKNOWN_IMG } from "~/constants/dex";
import { useCartContext } from "~/contexts/Cart";
import { type CartItem } from "~/hooks/useCart";
import { type Order } from "~/types/openSea";
import { api } from "~/utils/api";

const TokenLoadingCard: FC = () => (
  <div className="card w-60 bg-base-200 h-96 raise-on-hover cursor-pointer">
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
);

type Props = {
  listing?: Order;
};

export const NftListingCard: FC<Props> = ({ listing }) => {
  const [addToCartIsLoading, setAddToCartIsLoading] = useState<boolean>(false);
  const { cart, addItem } = useCartContext();
  const { data: etherPrice } = api.dex.getEtherPrice.useQuery({}, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const priceInCurrency = useMemo(() => {
    if (!listing || !etherPrice) return {
      priceInEther: 0,
      name: '',
      symbol: '',
      icon: '',
      address: '',
    };
    const purchaseAsset = listing.taker_asset_bundle.assets[0];
    if (!purchaseAsset?.decimals || purchaseAsset.asset_contract.asset_contract_type !== 'fungible') return {
      priceInEther: 0,
      name: '',
      symbol: '',
      icon: '',
      address: '',
    };
    const priceInEther = Number(toTokens(BigInt(listing.current_price ?? '0'), Number(purchaseAsset.decimals)));
    return {
      priceInEther,
      name: purchaseAsset.name,
      symbol: purchaseAsset.asset_contract.symbol,
      icon: purchaseAsset.image_thumbnail_url,
      address: purchaseAsset.asset_contract.address,
    }
  }, [listing, etherPrice]);
  const priceInUsd = useMemo(() => {
    if (!etherPrice) return 0;
    if (priceInCurrency?.address !== ZERO_ADDRESS) return '--.--';
    return priceInCurrency.priceInEther * Number(etherPrice ?? 0);
  }, [priceInCurrency, etherPrice]);
  if (!listing) {
    return <TokenLoadingCard />
  }
  const listingAsset = listing.maker_asset_bundle.assets[0];
  
  if (
    !listingAsset || 
    // only show listings that are purchasable with ether
    listing.taker_asset_bundle.assets[0]?.asset_contract.address !== ZERO_ADDRESS ||
    // only show listings that are selling 1 asset 
    listing.maker_asset_bundle.assets.length !== 1 ||
    // hide assets that are nsfw
    listingAsset.is_nsfw
  ) return <></>;

  const onAddToCart = async () => {
    // Add logic check here for prevent race condition
    if (addToCartIsLoading) return;
    setAddToCartIsLoading(true);
    const id = listingAsset.asset_contract.address + listingAsset.id;
    const alreadyInCart = cart.find((item: CartItem) => item.id === id);

    if (!alreadyInCart) {
      addItem({ 
        id,
        address: listingAsset.asset_contract.address,
        decimals: 18,
        symbol: "ETH",
        name: listingAsset.name,
        nftCollectionName: listingAsset.collection.name,
        usdAmountDesired: typeof priceInUsd === 'number' ? priceInUsd : 0, 
        price: typeof priceInUsd === 'number' ? priceInUsd : 0,
        img: listingAsset.image_url ?? listingAsset.image_thumbnail_url,
        isNft: true,
      });
    }
    setAddToCartIsLoading(false);
    // pop the side drawer
    document.getElementById('my-drawer')?.click();
  };

  if (!listingAsset.image_url ?? !listingAsset.image_thumbnail_url) return <></>

  return (
    <div className={`card max-w-[236px] min-h-[300px] raise-on-hover overflow-hidden`} key={listingAsset.asset_contract.address + listingAsset.id}>
      <div className="absolute inset-0 bg-cover filter blur-lg" style={{ backgroundImage: `url(${listingAsset.image_preview_url})`, transform: 'scale(2)', opacity: 0.2, pointerEvents: 'none' }}></div>
      <div className="card-body p-4">
        <div className="flex w-full justify-between items-center gap-2">
          <Image
            src={listingAsset.collection.image_url ?? listingAsset.image_thumbnail_url}
            alt={listingAsset.name}
            width={100}
            height={100}
            className="rounded-full w-12 h-12"
          />
          {listing.current_price ? (
            <div className="flex flex-col">
              <span className="text-right">${priceInUsd?.toLocaleString([], {
                currency: 'usd',
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}</span>
              <span className="flex items-center">
                <Image src={priceInCurrency.icon ?? COINGECKO_UNKNOWN_IMG} alt={priceInCurrency.name} width={16} height={16} />
                <span 
                  className={`text-right text-xs`}
                >
                  {/* truncate % change to 4 decimal place */}
                  {priceInCurrency.priceInEther.toString().replace(/(\.\d{4})\d+/, "$1")}
                </span>
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
          <span className="whitespace-nowrap truncate">{listingAsset.collection.name}</span>
          <span className="text-sm opacity-75 font-normal -mt-2 whitespace-nowrap truncate">{listingAsset.name}</span>
        </h2>
        <div className="w-full h-42">
          <Image
            src={listingAsset.image_url}
            alt={listingAsset.name}
            width={250}
            height={250}
            className="rounded-lg"
          />
        </div>
        <div className="card-actions h-full items-end">
          <button 
            disabled={addToCartIsLoading}
            className="btn btn-secondary shadow-none hover:btn-primary hover:shadow z-10"
            onClick={() => onAddToCart()}
          >Add to cart</button>
        </div>
      </div>
    </div>
  )
};

export default NftListingCard;