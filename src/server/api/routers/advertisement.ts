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
import { getAdSpaces, price } from "~/thirdweb/8453/0x4047f984f20f174919bffbf0c5f347270d13a112";
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
          const downloadResponse = await download({
            client,
            uri: ad.contentURI,
          });
          const contentUriResponse = await downloadResponse.json() as ContentUriReponse;
          const advertisement: Advertisement = {
            dayId: ad.dayId.toString(),
            resalePrice: ad.resalePrice.toString(),
            adOwner: ad.adOwner,
            link: contentUriResponse.link,
            media: contentUriResponse.media,
          };
          return advertisement;
        });
        return Promise.all(ownedAdsWithData);
      } catch (e) {
        console.error({e});
        throw new Error(e as string);
      }
    }),
});