import fetch from "node-fetch";
import { REFERRAL_CODE_MINTER, REFERRAL_CODE_NFT } from "~/constants/addresses";
import { env } from "~/env";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { getContract } from "thirdweb";
import { base } from "thirdweb/chains";
import { client } from "~/providers/Thirdweb";
import { getOwnedTokenIds } from "thirdweb/extensions/erc721";

export const engineRouter = createTRPCRouter({
  mint: publicProcedure
    .input(z.object({
      metadataUri: z.string(),
      recipient: z.string(),
    }))
    .mutation(async ({ input }) => {
      const referralNftContract = getContract({
        client,
        address: REFERRAL_CODE_NFT,
        chain: base,
      });
      const ownedNfts = await getOwnedTokenIds({
        contract: referralNftContract,
        owner: input.recipient,
      });
      if (ownedNfts.length > 0) {
        throw new Error("User already has a referral code NFT");
      }
      const resp = await fetch(
        `${env.THIRDWEB_ENGINE_URL}/contract/base/${REFERRAL_CODE_NFT}/write`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.THIRDWEB_ENGINE_ACCESS_TOKEN}`,
            "x-backend-wallet-address": REFERRAL_CODE_MINTER,
          },
          body: JSON.stringify({
            functionName: "mintTo",
            args: [
              input.recipient,
              input.metadataUri,
            ],
          }),
        },
      );
      return resp;
    }),
});