import { useEffect, useState, type FC } from "react";
import { api } from "~/utils/api";

import { type Collection } from "~/types/simpleHash";
import NftCollectionCard from "~/components/Nft/CollectionCard";

export const CollectionsGrid: FC = () => {
  const COLLECTIONS_PER_PAGE = 20;
  const [cursor, setCursor] = useState<string>();
  const [collections, setCollections] = useState<Collection[]>([]);

  const { 
    data: collectionsData, 
    isLoading: collectionsIsLoading 
  } = api.simpleHash.getCollections.useQuery({
    chain: 'base',
    limit: COLLECTIONS_PER_PAGE,
    cursor,
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log({ collectionsData, collections });

  useEffect(() => {
    if (collectionsData) {
      setCollections(prev => {
        const newCollections = collectionsData.collections.filter(
          (collection) => !prev.find((prevCollection) => prevCollection.collection_id === collection.collection_id)
        );
        return [...prev, ...newCollections];
      });
    }
  }, [collectionsData]);

  return (
    <>
      <div className="sm:max-w-5xl mx-auto">
        <div className="flex flex-col gap-8 min-w-full">
          <div 
            className={`flex flex-wrap items-stretch w-full justify-center gap-4`}>
            {collections.map((c, index) => <NftCollectionCard key={index} collection={c} />)}
            {(collectionsIsLoading) && Array.from({ length: COLLECTIONS_PER_PAGE }, (_, index) => (
              <NftCollectionCard key={index} />
            ))}
          </div>
          {!collectionsIsLoading && collectionsData?.next_cursor && (
            <button 
              onClick={() => collectionsData?.next_cursor && setCursor(collectionsData?.next_cursor)}
              disabled={collectionsIsLoading}
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

export default CollectionsGrid;