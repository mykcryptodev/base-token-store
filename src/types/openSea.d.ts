
type Asset = {
  id: number;
  token_id: string;
  num_sales: number;
  background_color: string | null;
  image_url: string;
  image_preview_url: string;
  image_thumbnail_url: string;
  image_original_url: string;
  animation_url: string | null;
  animation_original_url: string | null;
  name: string;
  description: string;
  external_link: string | null;
  asset_contract: {
    address: string;
    asset_contract_type: string;
    chain_identifier: string;
    created_date: string;
    name: string;
    nft_version: string | null;
    opensea_version: string | null;
    owner: number;
    schema_name: string;
    symbol: string;
    total_supply: string;
    description: string;
    external_link: string | null;
    image_url: string | null;
    default_to_fiat: boolean;
    dev_buyer_fee_basis_points: number;
    dev_seller_fee_basis_points: number;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: number;
    opensea_seller_fee_basis_points: number;
    buyer_fee_basis_points: number;
    seller_fee_basis_points: number;
    payout_address: string;
  };
  permalink: string;
  collection: {
    banner_image_url: string | null;
    chat_url: string | null;
    created_date: string;
    default_to_fiat: boolean;
    description: string;
    dev_buyer_fee_basis_points: string;
    dev_seller_fee_basis_points: string;
    discord_url: string | null;
    display_data: {
      card_display_style: string;
      images: string | null;
    };
    external_url: string | null;
    featured: boolean;
    featured_image_url: string;
    hidden: boolean;
    safelist_request_status: string;
    image_url: string | null;
    is_subject_to_whitelist: boolean;
    large_image_url: string;
    medium_username: string | null;
    name: string;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: string;
    opensea_seller_fee_basis_points: number;
    payout_address: string;
    require_email: boolean;
    short_description: string | null;
    slug: string;
    telegram_url: string | null;
    twitter_username: string | null;
    instagram_username: string | null;
    wiki_url: string | null;
    is_nsfw: boolean;
    fees: {
      seller_fees: Record<string, number>;
      opensea_fees: Record<string, number>;
    };
    is_rarity_enabled: boolean;
    is_creator_fees_enforced: boolean;
  };
  decimals: string | null;
  token_metadata: string;
  is_nsfw: boolean;
  owner: string | null;
}

export type Order = {
  created_date: string;
  closing_date: string;
  listing_time: number;
  expiration_time: number;
  order_hash: string;
  protocol_data: {
    parameters: {
      offerer: string;
      offer: Array<{
        itemType: number;
        token: string;
        identifierOrCriteria: string;
        startAmount: string;
        endAmount: string;
      }>;
      consideration: Array<{
        itemType: number;
        token: string;
        identifierOrCriteria: string;
        startAmount: string;
        endAmount: string;
        recipient: string;
      }>;
      startTime: string;
      endTime: string;
      orderType: number;
      zone: string;
      zoneHash: string;
      salt: string;
      conduitKey: string;
      totalOriginalConsiderationItems: number;
      counter: number;
    };
    signature: null | string;
  };
  protocol_address: string;
  current_price: string;
  maker: {
    user: number;
    profile_img_url: string;
    address: string;
    config: string;
  };
  taker: null | string;
  maker_fees: Array<{
    account: {
      user: null | number;
      profile_img_url: string;
      address: string;
      config: string;
    };
    basis_points: string;
  }>;
  taker_fees: Array<unknown>;
  side: string;
  order_type: string;
  cancelled: boolean;
  finalized: boolean;
  marked_invalid: boolean;
  remaining_quantity: number;
  criteria_proof: null | string;
  maker_asset_bundle: {
    assets: Array<Asset>;
    maker: null | string;
    slug: null | string;
    name: null | string;
    description: null | string;
    external_link: null | string;
    asset_contract: null | string;
    permalink: null | string;
    seaport_sell_orders: null | string;
  };
  taker_asset_bundle: {
    assets: Array<Asset>;
    maker: null | string;
    slug: null | string;
    name: null | string;
    description: null | string;
    external_link: null | string;
    asset_contract: null | string;
    permalink: null | string;
    seaport_sell_orders: null | string;
  };
};

export type OpenSeaListingResponse = {
  next: string;
  previous: null | string;
  orders: Order[];
};
