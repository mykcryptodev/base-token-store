import { useTheme } from "next-themes";
import Head from "next/head";
import { useEffect, useState } from "react";
import Logo from "~/components/Logo";
import NftCollectionsGrid from "~/components/Nft/CollectionsGrid";
import RefferedBanner from "~/components/Referral/ReferredBanner";
import TokenGrid from "~/components/Token/Grid";
import useDebounce from "~/hooks/useDebounce";

import { type GetServerSideProps } from 'next';
import { BANNER_ADVERTISEMENT, REFERRAL_CODE_NFT } from "~/constants/addresses";
import { type NFT, getContract } from "thirdweb";
import { base } from "thirdweb/chains";
import { client } from "~/providers/Thirdweb";
import { getNFT } from "thirdweb/extensions/erc721";
import { useCartContext } from "~/contexts/Cart";
import { getAdSpace } from "~/thirdweb/8453/0x4047f984f20f174919bffbf0c5f347270d13a112";
import { type Advertisement } from "~/types/advertisement";
import { useAdvertisementContext } from "~/contexts/Advertisement";
import { download } from "thirdweb/storage";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const r = query.r as string | undefined;
  const referralCodeExists = r && typeof r === 'string' && r.match(/^\d+$/);

  const advertisementDayId = (date: Date) => {
    // count how many days elapsed from Jan 1, 1970 to the date passed in
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return Math.floor((utcDate.getTime() - new Date(1970, 0, 1).getTime()) / 1000 / 60 / 60 / 24) + 1;
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
        dayId: BigInt(advertisementDayId(new Date())),
      }),
      referralCodeExists ? getNFT({
        contract: referralNftContract,
        tokenId: BigInt(r),
        includeOwner: true,
      }) : null,
    ]);

    console.log({ advertisement, nft, advertisementDayId: advertisementDayId(new Date())});
    let adJson: { link?: string, media?: string } = {};
    if (advertisement.dayId.toString() !== '0') {
      const adInfoRes = await download({
        client,
        uri: advertisement.contentURI,
      });
      const adInfoJson = await adInfoRes.json() as { 
        link?: string, media?: string 
      };
      console.log({ adInfoJson })
      if (!adInfoJson.link || !adInfoJson.media) {
        advertisement.dayId = BigInt(0);
      }
      adJson = adInfoJson;
    }
  
    return {
      props: {
        advertisement: advertisement.dayId.toString() === '0' ? null : {
          ...advertisement,
          dayId: advertisement.dayId.toString(),
          resalePrice: advertisement.resalePrice.toString(),
          link: adJson.link,
          media: adJson.media,
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
};

export default function Home({ referralNft, advertisement }: { 
  referralNft: NFT | null,
  advertisement: Advertisement | null,
}) {
  const { theme } = useTheme();
  const categories = [
    'base-meme-coins',
    'NFTs and collectibles',
    'base-ecosystem',
  ];
  const [category, setCategory] = useState<string>('base-meme-coins');
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(query, 500);

  const { updateReferralCode } = useCartContext();
  useEffect(() => {
    if (referralNft) {
      updateReferralCode(referralNft.id.toString());
    }
  }, [referralNft, updateReferralCode]);

  const { updateAdvertisement } = useAdvertisementContext();
  console.log({ advertisementFromHome: advertisement })
  useEffect(() => {
    updateAdvertisement(advertisement);
  }, [advertisement, updateAdvertisement]);

  return (
    <>
      <Head>
        <title>Base Token Store</title>
        <meta name="description" content="A place to buy and sell tokens on Base" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-2 px-4 pb-16 ">
          <div className="lg:hidden flex mt-8">
            <Logo
              shapesFill={`${theme === 'dark' ? '#C9CCD5' : '#FFFFFF'}`}
              backgroundFill={`${theme === 'dark' ? '#000000' : '#1E4FFD'}`}
              width={200}
              height={50}
            />
          </div>
          <h1 className="sm:text-7xl text-5xl text-center tracking-tighter font-semibold items-center gap-2 sm:gap-4 flex-wrap sm:pt-8 pt-2 sm:pb-8 pb-4">
            Base Token Store
          </h1>
          <div className="flex justify-center w-full">
            <input 
              type="text" 
              placeholder={`${category === 'NFTs and collectibles' ? 'Searching NFTs not yet supported...' : 'Search Base tokens...'}`}
              disabled={category === 'NFTs and collectibles'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input input-bordered w-full sm:w-2/3 md:w-4/6 lg:w-1/2 min-w-[300px]"
            />
          </div>
          <div className="sm:max-w-5xl mx-auto">
            <div className="flex flex-col gap-2 min-w-full">
              <div className="flex justify-center gap-4 overflow-x-auto sm:pl-0 pl-12">
                {categories.map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setCategory(cat)}
                    className={`btn btn-secondary ${category === cat ? 'btn-active' : ''}`}
                  >
                    {/* replace base- and then uppercase first letter */}
                    {cat.replace('base-', '').replace('-', ' ').replace(/^\w/, (c) => c.toUpperCase())}
                  </button>
                ))}
              </div>
              <div className="m-4 mx-0 sm:mx-4">
                <RefferedBanner referralNft={referralNft} />
              </div>
              <div className={`${category === 'NFTs and collectibles' ? 'flex' : 'hidden'}`}>
                <NftCollectionsGrid />
              </div>
              <div className={`${category === 'NFTs and collectibles' ? 'hidden' : 'flex flex-col gap-2'}`}>
                {referralNft?.owner && (
                  <div className="flex flex-col gap-2">
                    <div className="font-bold text-lg">
                      {`${referralNft.metadata.name}'s holdings`}
                    </div>
                    <TokenGrid
                      address={referralNft.owner} 
                      category={category}
                      query={debouncedQuery}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-lg">
                    {category.replace('base-', '').replace('-', ' ').replace(/^\w/, (c) => c.toUpperCase())}
                  </div>
                  <TokenGrid category={category} query={debouncedQuery} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
