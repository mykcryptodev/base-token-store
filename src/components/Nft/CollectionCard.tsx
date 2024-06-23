import Image from "next/image";
import { useMemo, type FC } from "react";
import { ZERO_ADDRESS, toEther } from "thirdweb";
import { COINGECKO_UNKNOWN_IMG } from "~/constants/dex";
import { type Collection } from "~/types/simpleHash";
import { api } from "~/utils/api";
import Sparkline from "../Token/Sparkline";

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
  collection?: Collection;
};

export const NftCollectionCard: FC<Props> = ({ collection }) => {
  const openSeaFloorPrice = useMemo(() => 
    collection?.collection_details.floor_prices.find(price => 
      price.marketplace_id === 'opensea'
    ),
  [collection]);
  const priceInCurrency = useMemo(() => {
    if (!collection || !openSeaFloorPrice) return {
      priceInEther: '0',
      name: 'Ether',
      symbol: 'ETH',
      icon: '/images/eth.svg',
      address: ZERO_ADDRESS,
    };
    return {
      priceInEther: toEther(BigInt(openSeaFloorPrice.value)),
      name: openSeaFloorPrice.payment_token.name,
      symbol: openSeaFloorPrice.payment_token.symbol,
      icon: openSeaFloorPrice.payment_token.address === null ? '/images/eth.svg' : COINGECKO_UNKNOWN_IMG,
      address: openSeaFloorPrice.payment_token.address ?? ZERO_ADDRESS,
    };
  }, [collection, openSeaFloorPrice]);
  const priceInUsd = useMemo(() => {
    if (!collection || !openSeaFloorPrice) return 0;
    return openSeaFloorPrice.value_usd_cents / 100;
  }, [collection, openSeaFloorPrice]);

  const { data: historicalFloorPrices } = api.simpleHash.getHistoricalFloorPrices.useQuery({
    collectionId: collection?.collection_id,
  }, {
    enabled: !!collection,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log({ historicalFloorPrices });

  if (!collection) {
    return <TokenLoadingCard />
  }

  if (!collection.collection_details.image_url) return <></>

  return (
    <div className={`card max-w-[236px] min-h-[300px] raise-on-hover overflow-hidden`} key={collection.collection_id}>
      <div className="absolute inset-0 bg-cover filter blur-lg" style={{ backgroundImage: `url(${collection.collection_details.banner_image_url ?? collection.collection_details.image_url})`, transform: 'scale(2)', opacity: 0.2, pointerEvents: 'none' }}></div>
      <div className="card-body p-4">
        <div className="flex w-full justify-between items-center gap-2">
          <Image
            src={collection.collection_details.image_url}
            alt={collection.collection_details.name}
            width={100}
            height={100}
            className="rounded-full w-12 h-12 object-cover"
          />
          {openSeaFloorPrice ? (
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
          <span className="whitespace-nowrap truncate">{collection.collection_details.name}</span>
          <span className="text-sm opacity-75 font-normal -mt-2 whitespace-nowrap truncate">{collection.collection_details.description}</span>
        </h2>
        <div className="w-full h-42">
          <Sparkline data={(historicalFloorPrices?.floor_prices ?? []).filter(price => price.floor_price !== null).map(price => price.floor_price)} />
        </div>
        <div className="card-actions h-full items-end">
          <button 
            className="btn btn-secondary shadow-none hover:btn-primary hover:shadow z-10"
          >View</button>
        </div>
      </div>
    </div>
  )
};

export default NftCollectionCard;