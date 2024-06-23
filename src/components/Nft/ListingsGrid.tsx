import { useEffect, useState, type FC } from "react";
import { api } from "~/utils/api";

import ListingsCard from "~/components/Nft/ListingCard";
import { type Order } from "~/types/openSea";

type Props = {
  collectionSlug: string | undefined;
};

export const ListingsGrid: FC<Props> = ({ collectionSlug }) => {
  const COLLECTIONS_PER_PAGE = 20;
  const [cursor, setCursor] = useState<string>();
  const [listings, setListings] = useState<Order[]>([])

  const { data: listingsData, isLoading: listingsIsLoading } = api.openSea.getBestlistingsByCollection.useQuery({
    collection: collectionSlug ?? '',
    limit: COLLECTIONS_PER_PAGE,
    cursor,
  }, {
    enabled: !!collectionSlug,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log({ listingsData, listings });

  useEffect(() => {
    if (listingsData) {
      setListings(prevListings => {
        // Combine previous and new listings
        const combinedListings = [...prevListings, ...listingsData.listings];
        // Filter out duplicates
        const uniqueListings = combinedListings.filter((listing, index, self) =>
          index === self.findIndex((t) => (
            t.order_hash === listing.order_hash
          ))
        );
        return uniqueListings;
      });
    }
  }, [listingsData]);

  return (
    <>
      <div className="sm:max-w-5xl mx-auto">
        <div className="flex flex-col gap-8 min-w-full">
          <div 
            id="listings-grid"
            className={`flex flex-wrap items-stretch w-full justify-center gap-4`}>
            {listings.map((listing, index) => 
              <ListingsCard key={index} listing={listing} />
            )}
            {(listingsIsLoading) && Array.from({ length: COLLECTIONS_PER_PAGE }, (_, index) => (
              <ListingsCard key={index} />
            ))}
          </div>
          {/* Add Load More button here */}
          {!listingsIsLoading && listingsData?.next && (
            <button 
              disabled={listingsIsLoading || !listingsData?.next}
              onClick={() => setCursor(listingsData?.next)}
              className="btn btn-lg btn-neutral w-fit mx-auto mt-8"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default ListingsGrid;