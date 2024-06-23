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

export type NftApiResponse = {
  nfts: {
    nft_id: string;
    chain: string;
    contract_address: string;
    token_id: string;
    name: string;
    description: string | null;
    previews: {
      image_small_url: string;
      image_medium_url: string;
      image_large_url: string;
      image_opengraph_url: string;
      blurhash: string;
      predominant_color: string;
    };
    image_url: string;
    image_properties: {
      width: number;
      height: number;
      size: number;
      mime_type: string;
    };
    video_url: string | null;
    video_properties: object | null;
    audio_url: string | null;
    audio_properties: object | null;
    model_url: string | null;
    model_properties: object | null;
    other_url: string | null;
    other_properties: object | null;
    background_color: string | null;
    external_url: string | null;
    created_date: string;
    status: string;
    token_count: number;
    owner_count: number;
    owners: {
      owner_address: string;
      quantity: number;
      quantity_string: string;
      first_acquired_date: string;
      last_acquired_date: string;
    }[];
    contract: {
      type: string;
      name: string;
      symbol: string;
      deployed_by: string;
      deployed_via_contract: string | null;
      owned_by: string;
      has_multiple_collections: boolean;
    };
    collection: {
      collection_id: string;
      name: string;
      description: string;
      image_url: string;
      image_properties: {
        width: number;
        height: number;
        mime_type: string;
      };
      banner_image_url: string;
      category: string;
      is_nsfw: boolean;
      external_url: string;
      twitter_username: string;
      discord_url: string;
      instagram_username: string | null;
      medium_username: string | null;
      telegram_url: string | null;
      marketplace_pages: {
        marketplace_id: string;
        marketplace_name: string;
        marketplace_collection_id: string;
        nft_url: string;
        collection_url: string;
        verified: boolean | null;
      }[];
      metaplex_mint: string | null;
      metaplex_candy_machine: string | null;
      metaplex_first_verified_creator: string | null;
      floor_prices: {
        marketplace_id: string;
        marketplace_name: string;
        value: number;
        payment_token: {
          payment_token_id: string;
          name: string;
          symbol: string;
          address: string | null;
          decimals: number;
        };
        value_usd_cents: number;
      }[];
      top_bids: {
        marketplace_id: string;
        marketplace_name: string;
        value: number;
        payment_token: {
          payment_token_id: string;
          name: string;
          symbol: string;
          address: string | null;
          decimals: number;
        };
        value_usd_cents: number;
      }[];
      distinct_owner_count: number;
      distinct_nft_count: number;
      total_quantity: number;
      chains: string[];
      top_contracts: string[];
      collection_royalties: {
        source: string;
        total_creator_fee_basis_points: number;
        recipients: {
          address: string;
          percentage: number;
          basis_points: number;
        }[];
      }[];
    };
    last_sale: {
      from_address: string;
      to_address: string;
      quantity: number;
      quantity_string: string;
      timestamp: string;
      transaction: string;
      marketplace_id: string;
      marketplace_name: string;
      is_bundle_sale: boolean;
      payment_token: {
        payment_token_id: string;
        name: string;
        symbol: string;
        address: string | null;
        decimals: number;
      };
      unit_price: number;
      total_price: number;
      unit_price_usd_cents: number;
    };
    primary_sale: {
      from_address: string | null;
      to_address: string;
      quantity: number;
      quantity_string: string;
      timestamp: string;
      transaction: string;
      marketplace_id: string;
      marketplace_name: string;
      is_bundle_sale: boolean;
      payment_token: {
        payment_token_id: string;
        name: string;
        symbol: string;
        address: string | null;
        decimals: number;
      };
      unit_price: number;
      total_price: number;
      unit_price_usd_cents: number;
    };
    first_created: {
      minted_to: string;
      quantity: number;
      quantity_string: string;
      timestamp: string;
      block_number: number;
      transaction: string;
      transaction_initiator: string;
    };
    rarity: {
      rank: number;
      score: number;
      unique_attributes: number;
    };
    royalty: {
      source: string;
      total_creator_fee_basis_points: number;
      recipients: {
        address: string;
        percentage: number;
        basis_points: number;
      }[];
    }[];
    extra_metadata: {
      attributes: {
        trait_type: string;
        value: string;
        display_type: string | null;
        percentage?: number;
      }[];
      image_original_url: string;
      animation_original_url: string | null;
      metadata_original_url: string;
    };
  }[];
};
