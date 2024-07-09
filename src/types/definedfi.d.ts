type NftSearchResponseCollection = {
  address: string;
  average: string;
  ceiling: string;
  floor: string;
  id: string;
  imageUrl?: string;
  name: string;
  networkId: number;
  symbol: string;
  tradeCount: string;
  tradeCountChange: number;
  volume: string;
  volumeChange: number;
  window: string;
};

export type NftSearchResponse = {
  data: {
    searchNfts: {
      hasMore: number;
      items: NftSearchResponseCollection[];
    };
  };
};
