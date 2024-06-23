import { useEffect, useState, type FC } from "react";
import { api } from "~/utils/api";
import Image from "next/image";

import { type Collection } from "~/types/simpleHash";
import NftCollectionCard from "~/components/Nft/CollectionCard";
import ListingsGrid from "~/components/Nft/ListingsGrid";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Markdown from "react-markdown";

export const CollectionsGrid: FC = () => {
  const COLLECTIONS_PER_PAGE = 20;
  const [cursor, setCursor] = useState<string>();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

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
        {selectedCollection && (
          <div className="flex flex-col gap-2 mb-12">
            <button 
              onClick={() => setSelectedCollection(null)}
              className="btn btn-ghost w-fit"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back
            </button>
            <div className="relative">
              <Image
                src={selectedCollection.collection_details.banner_image_url ?? '/images/placeholder.jpg'}
                alt={selectedCollection.collection_details.name}
                width={1200}
                height={400}
                layout="responsive"
                className="rounded-lg object-cover max-h-96"
              />
              <div className="absolute inset-0 flex flex-col justify-end items-start sm:-mb-8 ml-8 gap-4">
                <Image
                  src={selectedCollection.collection_details.image_url}
                  alt={selectedCollection.collection_details.name}
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="mt-4 p-8 pb-0">
              <h1 className="text-3xl font-bold">{selectedCollection.collection_details.name}</h1>
              <p className="prose">
                <Markdown>
                  {selectedCollection.collection_details.description}
                </Markdown>
              </p>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-8 min-w-full">
          {!selectedCollection && (
            <>
              <div 
                className={`flex flex-wrap items-stretch w-full justify-center gap-4`}>
                {collections.map((c, index) => 
                  <NftCollectionCard 
                    key={index} 
                    collection={c} 
                    onCollectionSelected={(collection) => setSelectedCollection(collection)}
                  />
                )}
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
            </>
          )}
          {selectedCollection && (
            <ListingsGrid
              collectionSlug={
                selectedCollection.collection_details.marketplace_pages.find(
                  (page) => page.marketplace_id === 'opensea'
                )?.collection_url.split('/collection/')[1]
              }
            />
          )}
        </div>
      </div>
    </>
  )
}

export default CollectionsGrid;