import { useEffect, useState, type FC } from "react";
import { Portal } from "~/components/utils/Portal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCartContext } from "~/contexts/Cart";
import { MediaRenderer, useActiveAccount } from "thirdweb/react";
import { client } from "~/providers/Thirdweb";
import { getContract, type NFT } from "thirdweb";
import { REFERRAL_CODE_NFT } from "~/constants/addresses";
import { base } from "thirdweb/chains";
import { getNFT, ownerOf } from "thirdweb/extensions/erc721";
import RefferedBanner from "~/components/Referral/ReferredBanner";

export const ReferralChip: FC = () => {
  const { referralCode } = useCartContext();
  const account = useActiveAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [referralNft, setReferralNft] = useState<NFT | null>(null);

  useEffect(() => {
    if (!referralCode) return;
    const fetchReferralNft = async () => {
      setIsLoading(true);
      const referralNftContract = getContract({
        client,
        chain: base,
        address: REFERRAL_CODE_NFT,
      });
      try {
        const [nft, owner] = await Promise.all([
          getNFT({
            contract: referralNftContract,
            tokenId: BigInt(referralCode),
          }),
          ownerOf({
            contract: referralNftContract,
            tokenId: BigInt(referralCode),
          }),
        ]);
        setReferralNft({
          ...nft,
          owner,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchReferralNft();
  }, [account, referralCode]);

  if (isLoading) {
    return (
      <div className="w-24 h-7 bg-base-300 animate-pulse rounded-full" />
    )
  }

  return (
    <>
      <label 
        htmlFor={`referral-chip`}
        className="btn btn-ghost btn-sm opacity-50"
      >
        1% Referral Fee
      </label>

      <Portal>
        <input type="checkbox" id={`referral-chip`} className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle" role="dialog">
          <div className="modal-box p-0 bg-base-200 text-base-content relative overflow-hidden">
            <label htmlFor={`referral-chip`} className="btn btn-circle btn-sm btn-ghost absolute top-6 right-6">
              <XMarkIcon className="h-6 w-6" />
            </label>
            <div className="flex flex-col gap-2 p-4 pb-2">
              <div className="p-4 bg-base-100 rounded-lg">
                <div className="text-xl font-bold mb-2">Referral Codes</div>
                <div className="text-sm opacity-75">
                  {`Users can generate and share referral codes to spread the word about Base Token Store and earn 1% of transactions from referrals.`}
                </div>
                <div className="flex justify-end w-full mt-4">
                  <RefferedBanner referralNft={null} hideClose hideTitle />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-base-100 p-4">
              <MediaRenderer
                src={referralNft?.metadata.image}
                alt={referralNft?.metadata.name}
                client={client}
                className="rounded-full !h-10 !w-10"
              />
              <div className="flex flex-col">
                <div className="text-sm opacity-75">{`You've been invited by`}</div>
                <div className="-mt-1 font-bold">{referralNft?.metadata.name}</div>
              </div>
            </div>
          </div>
        </div>
      </Portal>
    </>
  )
};

export default ReferralChip;