import { SparklesIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useMemo, useState, type FC } from "react";
import { ZERO_ADDRESS, toEther } from "thirdweb";
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

  const { data: nft, isLoading: nftIsLoading } = api.simpleHash.getNft.useQuery({
    nftId: `base.${listing?.protocol_data.parameters.offer[0]!.token}.${listing?.protocol_data.parameters.offer[0]!.identifierOrCriteria}`,
  }, {
    enabled: !!listing,
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
    const priceInEther = Number(toEther(BigInt(listing.price.current.value)));
    return {
      priceInEther,
      name: "Ether",
      symbol: listing.price.current.currency,
      icon: "/images/eth.svg",
      address: ZERO_ADDRESS,
    }
  }, [listing, etherPrice]);
  const priceInUsd = useMemo(() => {
    if (!etherPrice) return 0;
    if (priceInCurrency?.address !== ZERO_ADDRESS) return '--.--';
    return priceInCurrency.priceInEther * Number(etherPrice ?? 0);
  }, [priceInCurrency, etherPrice]);

  const itemIsInCart = useMemo(() => {
    return cart.find((item: CartItem) => item.id === nft?.nft_id);
  }, [cart, nft]);
  
  if (!listing || nftIsLoading) {
    return <TokenLoadingCard />
  }
  
  if (!nft) return <></>;

  const onAddToCart = async () => {
    // Add logic check here for prevent race condition
    if (addToCartIsLoading) return;
    setAddToCartIsLoading(true);
    const id = nft.nft_id;
    const alreadyInCart = cart.find((item: CartItem) => item.id === id);

    if (!alreadyInCart) {
      addItem({ 
        id,
        address: nft.contract_address,
        decimals: 18,
        symbol: "ETH",
        name: nft.name,
        nftCollectionName: nft.collection.name,
        usdAmountDesired: typeof priceInUsd === 'number' ? priceInUsd : 0, 
        price: typeof priceInUsd === 'number' ? priceInUsd : 0,
        img: nft.image_url ?? nft.previews.image_small_url,
        isNft: true,
        nftOrderHash: listing.order_hash,
        nftExchangeAddress: listing.protocol_address,
      });
    }
    setAddToCartIsLoading(false);
    // pop the side drawer
    document.getElementById('my-drawer')?.click();
  };

  if (!nft.image_url ?? !nft.previews.image_small_url) return <></>

  return (
    <div className={`card max-w-[236px] min-h-[300px] raise-on-hover overflow-hidden`} key={nft.nft_id}>
      <div className="absolute inset-0 bg-cover filter blur-lg -z-10" style={{ backgroundImage: `url(${nft.image_url ?? nft.collection.image_url})`, transform: 'scale(2)', opacity: 0.2, pointerEvents: 'none' }}></div>
      <div className="card-body p-4">
        <div className="flex w-full justify-between items-center gap-2">
          <Image
            src={nft.collection.image_url ?? nft.collection.banner_image_url}
            alt={nft.name}
            width={100}
            height={100}
            className="rounded-full w-12 h-12"
          />
          {listing.price ? (
            <div className="flex flex-col">
              <span className="text-right">${priceInUsd?.toLocaleString([], {
                currency: 'usd',
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}</span>
              {nft.rarity.rank && (
                <span 
                  className="tooltip tooltip-left flex items-center text-sm gap-1 cursor-pointer" 
                  data-tip={`Rarity out of ${nft.collection.total_quantity.toLocaleString()}`}
                >
                  <SparklesIcon className="h-4 w-4" />
                  {nft.rarity.rank.toLocaleString()}
                </span>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <span className="bg-base-200 w-20 h-6 rounded" />
              <span className="bg-base-200 w-20 h-6 rounded" />
            </div>
          )}
        </div>
        <h2 className="card-title flex flex-col items-start gap-0">
          <span className="">{nft.name}</span>
          <span className="text-sm opacity-75 font-normal whitespace-nowrap truncate">
            
          </span>
        </h2>
        <div className="w-full h-42">
          <Image
            src={nft.previews.image_medium_url ?? nft.previews.image_small_url}
            alt={nft.name}
            width={250}
            height={250}
            className="rounded-lg"
          />
        </div>
        <div className="card-actions h-full items-end">
          {itemIsInCart ? (
            <button 
              disabled={addToCartIsLoading}
              className="btn btn-neutral shadow-none hover:btn-primary hover:shadow z-10"
              onClick={() => void document.getElementById('my-drawer')?.click()}
            >View in cart</button>
          ) : (
            <button 
              disabled={addToCartIsLoading}
              className="btn btn-secondary shadow-none hover:btn-primary hover:shadow z-10"
              onClick={() => onAddToCart()}
            >Add to cart</button>
          )}
        </div>
      </div>
    </div>
  )
};

export default NftListingCard;