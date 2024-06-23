import fetch from "node-fetch";
import { z } from "zod";

import { env } from "~/env";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { type OpenSeaFulfillmentDataResponse, type OpenSeaListingResponse } from "~/types/openSea";

export const openSeaRouter = createTRPCRouter({
  getCollections: publicProcedure
    .input(z.object({
      chain: z.string(),
      order_by: z.enum([
        "market_cap", "created_date", "num_owners", "one_day_change",
        "seven_day_change", "seven_day_volume",
      ]).optional(),
      limit: z.number().max(100).optional(),
      next: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const { chain, order_by = "market_cap", limit = 100, next } = input;
      const url = new URL('https://api.opensea.io/api/v2/collections');
      url.searchParams.append('chain', chain);
      url.searchParams.append('order_by', order_by);
      url.searchParams.append('limit', limit.toString());
      if (next) {
        url.searchParams.append('next', next);
      }
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'x-api-key': env.OPENSEA_API_KEY,
        },
      });
      const data = await response.json();
      return data;
    }),
  getListings: publicProcedure
    .input(z.object({
      chain: z.string().optional(),
      limit: z.number().max(50).optional(),
      cursor: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const { chain = "base", limit = 50, cursor } = input;
      const url = new URL(`https://api.opensea.io/api/v2/orders/${chain}/seaport/listings`);
      // url params for limit and cursor
      url.searchParams.append('limit', limit.toString());
      if (cursor) {
        url.searchParams.append('cursor', cursor);
      }
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'x-api-key': env.OPENSEA_API_KEY,
        },
      });
      const data = await response.json() as OpenSeaListingResponse;
      return { ...data, nextCursor: data.next };
    }),
  getBestlistingsByCollection: publicProcedure
    .input(z.object({
      collection: z.string(),
      limit: z.number().max(100).optional(),
      cursor: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const { collection, limit = 100, cursor } = input;
      const url = new URL(`https://api.opensea.io/api/v2/listings/collection/${collection}/best`);
      // url params for limit and next
      url.searchParams.append('limit', limit.toString());
      if (cursor) {
        url.searchParams.append('next', cursor);
      }
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'x-api-key': env.OPENSEA_API_KEY,
        },
      });
      const data = await response.json() as OpenSeaListingResponse;
      return {
        ...data,
        listings: data.listings.filter(listing => 
          // only return basic listings that can be bought right away
          listing.type === 'basic' &&
          // only return listings that are selling one item at a time
          listing.protocol_data.parameters.offer.length === 1 &&
          // only return listings that are charging in eth
          listing.protocol_data.parameters.consideration.every(
            consideration => consideration.itemType === 0
          )
        ),
      };
    }),
  getPurchaseEncodedData: publicProcedure
    .input(z.object({
      orders: z.array(z.object({
        listing: z.object({
          hash: z.string(),
          chain: z.string(),
          protocol_address: z.string(),
        }),
        fulfiller: z.object({
          address: z.string(),
        }),
      })),
    }))
    .mutation(async ({ input }) => {
      const { orders } = input;
      const url = new URL('https://api.opensea.io/api/v2/listings/fulfillment_data');
      const promises = orders.map(order => 
        fetch(url.toString(), {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'x-api-key': env.OPENSEA_API_KEY,
          },
          body: JSON.stringify(order),
        }).then(response => response.json() as Promise<OpenSeaFulfillmentDataResponse>)
      );
      const data = await Promise.all(promises);
      return data;
    }),
});
