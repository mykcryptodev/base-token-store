import { CheckIcon, DocumentDuplicateIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState, type FC } from "react";
import { base } from "thirdweb/chains";
import MintReferralCode from "~/components/Referral/Mint";
import { getOwnedTokenIds } from "thirdweb/extensions/erc721";
import { type NFT, getContract } from "thirdweb";
import { REFERRAL_CODE_NFT } from "~/constants/addresses";
import { client } from "~/providers/Thirdweb";
import { MediaRenderer, useActiveAccount } from "thirdweb/react";

type Props = {
  referralNft: NFT | null;
  hideTitle?: boolean;
  hideClose?: boolean;
}

export const RefferedBanner: FC<Props> = ({ referralNft, hideClose, hideTitle }) => {
  const { theme } = useTheme();
  // force theme refresh
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  useEffect(() => {
    if (theme === 'dark') {
      return setIsDarkTheme(true);
    }
    if (theme === 'system') {
      // find out if the user prefers dark or light
      const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
      if (darkQuery.matches) {
        return setIsDarkTheme(true)
      } else {
        return setIsDarkTheme(false)
      }
    }
    setIsDarkTheme(false);
  }, [theme]);
  const account = useActiveAccount();
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(true);
  const [ownedReferralCode, setOwnedReferralCode] = useState<string>('');
  const [recentlyCopied, setRecentlyCopied] = useState<boolean>(false);
  const [isLoadingReferralCode, setIsLoadingReferralCode] = useState<boolean>(false);

  useEffect(() => {
    if (ownedReferralCode) {
      setIsBannerVisible(true);
    }
  }, [ownedReferralCode]);

  useEffect(() => {
    const getReferralCodes = async () => {
      if (!account?.address) {
        setOwnedReferralCode('');
        return;
      }
      setIsLoadingReferralCode(true);
      try {
        const contract = getContract({
          client,
          address: REFERRAL_CODE_NFT,
          chain: base,
        });
        const ownedTokenIds = await getOwnedTokenIds({
          contract,
          owner: account.address,
        });
        if (ownedTokenIds.length > 0) {
          const firstTokenId = ownedTokenIds[0]!;
          const tokenId = firstTokenId.toString();
          setOwnedReferralCode(tokenId);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoadingReferralCode(false);
      }
    }
    if (!referralNft) {
      void getReferralCodes();
    }
  }, [account, referralNft]);

  const OwnedReferralCode: FC = () => (
    <div className="flex sm:flex-row flex-col gap-2 items-center justify-between w-full">
      <div className="flex gap-2 items-start">
        <div className="bg-primary text-primary-content font-bold text-xl rounded-full min-w-12 min-h-12 w-12 h-12 flex items-center justify-center">
          1%
        </div>
        <div className="flex flex-col">
          {!hideTitle && (
            <div className="font-bold text-xl">Your Referral Code</div>
          )}
          <div className="opacity-75 text-sm">
            Share your referral code and earn 1% of each purchase made by your friends
          </div>
          <div 
            className="opacity-75 flex items-center gap-1"
            onClick={async () => {
              await navigator.clipboard.writeText(`https://basetokenstore.com?r=${ownedReferralCode}`);
              setRecentlyCopied(true);
              setTimeout(() => {
                setRecentlyCopied(false);
              }, 3000);
            }}
          >
            {recentlyCopied ? (
              <CheckIcon className="h-3 w-3 cursor-pointer" />
            ) : (
              <DocumentDuplicateIcon className="h-3 w-3 cursor-pointer" />
            )}
            <span className="text-xs cursor-pointer">
              {`https://basetokenstore.com?r=${ownedReferralCode}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoadingReferralCode) return (
    <div className={`flex w-full justify-between gap-4 sm:items-center rounded-2xl p-4 ${isDarkTheme ? 'bg-base-200 bg-opacity-50' : 'bg-gradient-to-b from-[#F9F9F9] via-[#FAFAFA] to-[#FBFBFB]'} relative ${isBannerVisible ? '' : 'hidden'}`}>
      <div className="flex sm:flex-row flex-col gap-2 items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          <div className="bg-base-300 animate-pulse rounded-full w-12 h-12" />
          <div className="flex flex-col gap-1">
            <div className="h-7 w-36 bg-base-300 animate-pulse rounded-lg" />
            <div className="h-4 w-56 bg-base-300 animate-pulse rounded-lg" />
          </div>
        </div>
        <div className="h-10 w-44 bg-base-300 animate-pulse rounded-full" />
      </div>
    </div>
  )

  return (
    <div className={`flex w-full justify-between gap-4 sm:items-center rounded-2xl p-4 ${isDarkTheme ? 'bg-base-200 bg-opacity-50' : 'bg-gradient-to-b from-[#F9F9F9] via-[#FAFAFA] to-[#FBFBFB]'} relative ${isBannerVisible ? '' : 'hidden'}`}>
      {ownedReferralCode && !referralNft?.owner && <OwnedReferralCode />}
      {referralNft?.owner && (
        <div className="flex flex-col w-full items-center">
          <div className="font-bold text-xl">Welcome to the store!</div>
          <Link 
            href={`${base.blockExplorers![0]?.url}/address/${referralNft.owner}`} 
            className="flex items-center gap-0.5"
            target="_blank"
            rel="noreferrer"
          >
            <div>{`You've been invited by`}</div>
            <MediaRenderer
              client={client}
              src={referralNft.metadata.image}
              alt={referralNft.metadata.name}
              className={`rounded-full !w-6 !h-6 mx-1`}
            />
            <div>{referralNft.metadata.name}</div>
          </Link>
        </div>
      )}
      {ownedReferralCode === "" && !referralNft?.owner && (
        <div className="flex sm:flex-row flex-col gap-2 items-center justify-between w-full">
          <div className="flex gap-2 items-center">
            <div className="bg-primary text-primary-content font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center">
              1%
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-xl">Refer a friend</div>
              <div className="opacity-75 text-sm">Collect a 1% fee from their purchases</div>
            </div>
          </div>
          <div className="sm:mr-4">
            <MintReferralCode
              onMint={(tokenId) => setOwnedReferralCode(tokenId)}
            />
          </div>
        </div>
      )}
      {!hideClose && (
        <div className="absolute top-4 right-4">
          <XMarkIcon 
            className="h-4 w-4 cursor-pointer"
            onClick={() => setIsBannerVisible(false)}
          />
        </div>
      )}
    </div>
  );
};

export default RefferedBanner;