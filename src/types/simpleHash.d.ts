type PaymentToken = {
  payment_token_id: string;
  name: string;
  symbol: string;
  address: string | null;
  decimals: number;
};

type FloorPrice = {
  marketplace_id: string;
  marketplace_name: string;
  value: number;
  payment_token: PaymentToken;
  value_usd_cents: number;
};

type MarketplacePage = {
  marketplace_id: string;
  marketplace_name: string;
  marketplace_collection_id: string;
  collection_url: string;
  verified: boolean | null;
};

type ImageProperties = {
  width: number;
  height: number;
  mime_type: string;
};

type CollectionDetails = {
  collection_id: string;
  name: string;
  description: string | null;
  image_url: string;
  image_properties: ImageProperties | null;
  banner_image_url: string | null;
  category: string | null;
  is_nsfw: boolean;
  external_url: string | null;
  twitter_username: string | null;
  discord_url: string | null;
  instagram_username: string | null;
  medium_username: string | null;
  telegram_url: string | null;
  marketplace_pages: MarketplacePage[];
  metaplex_mint: string | null;
  metaplex_candy_machine: string | null;
  metaplex_first_verified_creator: string | null;
  floor_prices: FloorPrice[];
  top_bids: unknown[];
  distinct_owner_count: number;
  distinct_nft_count: number;
  total_quantity: number;
  chains: string[];
  top_contracts: string[];
  collection_royalties: unknown[];
};

export type Collection = {
  collection_id: string;
  volume: number;
  volume_string: string;
  volume_usd_cents: number;
  volume_percent_change: number;
  transaction_count: number;
  transaction_count_percent_change: number;
  payment_token: PaymentToken;
  collection_details: CollectionDetails;
};

export type CollectionsApiResponse = {
  next_cursor: string | null;
  next: string | null;
  previous: string | null;
  collections: Collection[];
};

type FloorPriceInPaymentToken = {
  marketplace_id: string;
  floor_price: number;
  timestamp: string;
};

export type HistoricalFloorPriceApiResponse = {
  payment_token: PaymentToken;
  floor_prices: FloorPriceInPaymentToken[];
};
