import fetch from "node-fetch";
import { z } from "zod";

import { env } from "~/env";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { type HistoricalFloorPriceApiResponse, type CollectionsApiResponse, NftApiResponse } from "~/types/simpleHash";

export const simpleHashRouter = createTRPCRouter({
  getCollections: publicProcedure
    .input(z.object({
      chain: z.string(),
      limit: z.number().max(100).optional(),
      cursor: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const { chain, limit = 50, cursor } = input;
      const url = new URL(`https://api.simplehash.com/api/v0/nfts/collections/trending`);
      url.searchParams.append('chains', chain);
      url.searchParams.append('limit', limit.toString());
      url.searchParams.append('time_period', '7d');
      if (cursor) {
        url.searchParams.append('cursor', cursor);
      }
  
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'X-API-KEY': env.SIMPLEHASH_API_KEY,
        },
      });
      const data = await response.json() as CollectionsApiResponse;
      return {
        ...data,
        // only show collections that are on OpenSea
        collections: data.collections.filter((collection) => 
          collection.collection_details.marketplace_pages.some((page) => page.marketplace_id === 'opensea')
        )
      };
    }),
  getHistoricalFloorPrices: publicProcedure
    .input(z.object({
      collectionId: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const { 
        collectionId, 
        startDate = input.startDate ?? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]!,
        endDate = input.endDate ?? new Date().toISOString().split('T')[0]!
      } = input;
      // if no collection id provided, return empty response
      if (!collectionId) {
        return {
          payment_token: {
            address: null,
            name: '',
            symbol: '',
          },
          floor_prices: [],
        };
      }
      const url = new URL(`https://api.simplehash.com/api/v0/nfts/floor_prices_v2/collection/${collectionId}/daily`);
      url.searchParams.append('marketplace_ids', 'opensea');
      url.searchParams.append('start_date', startDate);
      url.searchParams.append('end_date', endDate);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'X-API-KEY': env.SIMPLEHASH_API_KEY,
        },
      });
      const data = await response.json() as HistoricalFloorPriceApiResponse;
      return data;
    }),
  getNft: publicProcedure
    .input(z.object({
      nftId: z.string(),
    }))
    .query(async ({ input }) => {
      const { nftId } = input;
      const url = new URL(`https://api.simplehash.com/api/v0/nfts/assets`);
      url.searchParams.append('nft_ids', nftId);
      url.searchParams.append('include_attribute_percentages', '1');

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'X-API-KEY': env.SIMPLEHASH_API_KEY,
        },
      });
      const data = await response.json() as NftApiResponse;
      return data.nfts[0];
    }),
});
