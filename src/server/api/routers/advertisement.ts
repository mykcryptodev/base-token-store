import { ZERO_ADDRESS, getContract } from "thirdweb";
import { base } from "thirdweb/chains";
import { download } from "thirdweb/storage";
import { z } from "zod";

import { BANNER_ADVERTISEMENT } from "~/constants/addresses";
import { client } from "~/providers/Thirdweb";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { getAdSpaces, price, royaltyBps } from "~/thirdweb/8453/0x4047f984f20f174919bffbf0c5f347270d13a112";
import { type Advertisement } from "~/types/advertisement";

export const advertisementRouter = createTRPCRouter({
  getStandardPrice: publicProcedure
    .query(async () => {
      try {
        const contract = getContract({
          client,
          chain: base,
          address: BANNER_ADVERTISEMENT,
        });
        const adPrice = await price({ contract });
        return adPrice.toString();
      } catch (e) {
        console.error({e});
        throw new Error(e as string);
      }
    }),
  // get by range
  getByDayIds: publicProcedure
    .input(z.object({
      dayIds: z.array(z.number()),
    }))
    .query(async ({ input }) => {
      if (!input?.dayIds) {
        throw new Error("Invalid input");
      }
      try {
        const contract = getContract({
          client,
          chain: base,
          address: BANNER_ADVERTISEMENT,
        });
        const adSpaces = await getAdSpaces({
          contract,
          dayIds: input.dayIds.map(BigInt),
        });
        const ownedAds = adSpaces.filter(adSpace => adSpace.adOwner !== ZERO_ADDRESS);
        const ownedAdsWithData = ownedAds.map(async (ad) => {
          type ContentUriReponse = {
            link: string,
            media: string,
          }
          let contentUri: ContentUriReponse = {
            media: "ipfs://Qmb6pVyZ46EF7MN6nmNNofqCUNpBJq388jvbXTqk8jM2E8",
            link: "https://basetokenstore.com",
          };
          try {
            const downloadResponse = await download({
              client,
              uri: ad.contentURI,
            });
            contentUri = await downloadResponse.json() as ContentUriReponse;
          } catch (e) {
            console.error({e});
          }
          const advertisement: Advertisement = {
            dayId: ad.dayId.toString(),
            resalePrice: ad.resalePrice.toString(),
            adOwner: ad.adOwner,
            link: contentUri.link,
            media: contentUri.media,
          };
          return advertisement;
        });
        const adPromises = await Promise.allSettled(ownedAdsWithData);
        const resolvedAds = adPromises
          .filter(promise => promise.status === "fulfilled")
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          .map(promise => (promise as PromiseFulfilledResult<Advertisement>).value);
        return resolvedAds;
      } catch (e) {
        console.error({e});
        throw new Error(e as string);
      }
    }),
  getRoyalty: publicProcedure
    .query(async () => {
      try {
        const contract = getContract({
          client,
          chain: base,
          address: BANNER_ADVERTISEMENT,
        });
        const royalty = await royaltyBps({ contract });
        return Number(royalty.toString()) / 100;
      } catch (e) {
        console.error({e});
        throw new Error(e as string);
      }
    }),
});