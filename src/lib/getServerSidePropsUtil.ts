import { type GetServerSidePropsContext, type GetServerSidePropsResult } from 'next'
import { getContract, type NFT } from 'thirdweb';
import { base } from 'thirdweb/chains';
import { getNFT } from 'thirdweb/extensions/erc721';
import { download } from 'thirdweb/storage';
import { BANNER_ADVERTISEMENT, REFERRAL_CODE_NFT } from '~/constants/addresses';
import { client } from '~/providers/Thirdweb';
import { getAdSpace } from '~/thirdweb/8453/0x4047f984f20f174919bffbf0c5f347270d13a112';
import { type Advertisement } from '~/types/advertisement';

export async function sharedGetServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ 
  advertisement: Advertisement | null; 
  referralNft: (Omit<NFT, 'id'> & { id: string }) | null 
}>> {
  const { query } = context;
  const r = query.r as string | undefined;
  const referralCodeExists = r && typeof r === 'string' && r.match(/^\d+$/);

  const advertisementDayId = (date: Date) => {
    const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    return Math.floor(utcDate.getTime() / 1000 / 60 / 60 / 24);
  }

  const referralNftContract = getContract({
    client,
    chain: base,
    address: REFERRAL_CODE_NFT,
  });
  const advertisementContract = getContract({
    client,
    chain: base,
    address: BANNER_ADVERTISEMENT
  });
  try {
    const [advertisement, nft] = await Promise.all([
      getAdSpace({
        contract: advertisementContract,
        dayId: BigInt(advertisementDayId(new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate())))),
      }),
      referralCodeExists ? getNFT({
        contract: referralNftContract,
        tokenId: BigInt(r),
        includeOwner: true,
      }) : null,
    ]);

    let adJson: { link?: string, media?: string } = {};
    if (advertisement.dayId.toString() !== '0') {
      const adInfoRes = await download({
        client,
        uri: advertisement.contentURI,
      });
      const adInfoJson = await adInfoRes.json() as { 
        link?: string, media?: string 
      };
      if (!adInfoJson.link || !adInfoJson.media) {
        advertisement.dayId = BigInt(0);
      } else {
        adJson = adInfoJson;
      }
    }

    return {
      props: {
        advertisement: advertisement.dayId.toString() === '0' ? null : {
          ...advertisement,
          dayId: advertisement.dayId.toString(),
          resalePrice: advertisement.resalePrice.toString(),
          link: adJson.link!,
          media: adJson.media!,
        },
        referralNft: referralCodeExists && nft ? {
          ...nft,
          id: nft.id.toString(),
        } : null,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        advertisement: null,
        referralNft: null,
      },
    };
  }
}
