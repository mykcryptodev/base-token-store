import { CheckIcon, DocumentDuplicateIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FC } from "react";
import { base } from "thirdweb/chains";
import { type Nft } from "~/types/simpleHash";
import MintReferralCode from "~/components/Referral/Mint";
import { getOwnedTokenIds } from "thirdweb/extensions/erc721";
import { getContract } from "thirdweb";
import { REFERRAL_CODE_NFT } from "~/constants/addresses";
import { client } from "~/providers/Thirdweb";
import { useActiveAccount } from "thirdweb/react";

type Props = {
  referralNft: Nft | null;
}

export const RefferedBanner: FC<Props> = ({ referralNft }) => {
  const { theme } = useTheme();
  const account = useActiveAccount();
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(true);
  const [ownedReferralCode, setOwnedReferralCode] = useState<string>('');
  const [recentlyCopied, setRecentlyCopied] = useState<boolean>(false);

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
    }
    void getReferralCodes();
  }, [account]);

  const OwnedReferralCode: FC = () => (
    <div className="flex sm:flex-row flex-col gap-2 items-center justify-between w-full">
      <div className="flex gap-2 items-start">
        <div className="bg-primary text-primary-content font-bold text-xl rounded-full min-w-12 min-h-12 w-12 h-12 flex items-center justify-center">
          1%
        </div>
        <div className="flex flex-col">
          <div className="font-bold text-xl">Your Referral Code</div>
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

  return (
    <div className={`flex w-full justify-between gap-4 sm:items-center rounded-2xl p-4 ${theme === 'dark' ? 'bg-base-200 bg-opacity-50' : 'bg-gradient-to-b from-[#F9F9F9] via-[#FAFAFA] to-[#FBFBFB]'} relative ${isBannerVisible ? '' : 'hidden'}`}>
      {ownedReferralCode && !referralNft?.owners?.[0]?.owner_address && <OwnedReferralCode />}
      {referralNft?.owners?.[0]?.owner_address && (
        <div className="flex flex-col w-full items-center">
          <div className="font-bold text-xl">Welcome to the store!</div>
          <Link 
            href={`${base.blockExplorers![0]?.url}/address/${referralNft.owners[0].owner_address}`} 
            className="flex items-center gap-1"
            target="_blank"
            rel="noreferrer"
          >
            <div>{`You've been invited by`}</div>
            <Image
              src={referralNft.image_url}
              alt={referralNft.name}
              width={100}
              height={100}
              className="rounded-full w-6 h-6"
            />
            <div>{referralNft.name}</div>
          </Link>
        </div>
      )}
      {ownedReferralCode === "" && !referralNft?.owners?.[0]?.owner_address && (
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
          <MintReferralCode
            onMint={(tokenId) => setOwnedReferralCode(tokenId)}
          />
        </div>
      )}
      <XMarkIcon 
        className="h-6 w-6 cursor-pointer mr-4"
        onClick={() => setIsBannerVisible(false)}
      />
    </div>
  );
};

export default RefferedBanner;