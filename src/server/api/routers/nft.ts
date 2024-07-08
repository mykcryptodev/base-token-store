import { z } from "zod";
import fetch from "node-fetch";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { env } from "~/env";
import { type NftSearchResponse } from "~/types/definedfi";
import { base } from "thirdweb/chains";
import { type Collection, type CollectionsDetailsApiResponse } from "~/types/simpleHash";

export const nftRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({
      query: z.string().optional(),
      chainId: z.number().optional(),
      include: z.enum(["Collection", "Asset"]).optional(),
    }))
    .query(async ({ input }) => {
      const url = "https://graph.defined.fi/graphql"
      const { query = "", chainId = base.id, include = "Collection" } = input;
      const graphql = `
        query {
          searchNfts(
            search:"${query}" 
            networkFilter:[${chainId}]
            include: ${include}
          ) {
            items {
              address
            }
          }
        }
      `
      const searchResultRes = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${env.DEFINED_API_KEY}`,
        },
        body: JSON.stringify({ query: graphql }),
      });

      const searchResultJson = await searchResultRes.json() as NftSearchResponse;

      const collections = searchResultJson.data.searchNfts.items;

      // for each collection, fetch the simplehash data
      const collectionsWithSimpleHashDataPromises = await Promise.allSettled(
        collections.map(async (collection) => {
          const url = new URL(`https://api.simplehash.com/api/v0/nfts/collections/base/${collection.address}`);
          url.searchParams.append('include_top_contract_details', '1');
          const simpleHashRes = await fetch(url, {
            method: "GET",
            headers: {
              "accept": "application/json",
              "X-API-KEY": env.SIMPLEHASH_API_KEY,
            },
          });
          const simpleHashJson = await simpleHashRes.json() as CollectionsDetailsApiResponse;
          return simpleHashJson;
        })
      );

      // only return the data from the fulfilled promises
      const collectionsWithSimpleHashData = collectionsWithSimpleHashDataPromises
        .filter((promise): promise is PromiseFulfilledResult<CollectionsDetailsApiResponse> => promise.status === "fulfilled")
        .flatMap((promise) => promise.value.collections)
        .map((collection) => ({
          ...collection,
          collection_details: collection,
        } as unknown as Collection));

      return collectionsWithSimpleHashData;
    }),
});