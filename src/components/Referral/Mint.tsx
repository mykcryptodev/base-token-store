import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, type FC } from "react";
import { useActiveAccount } from "thirdweb/react";
import { Portal } from "~/components/utils/Portal";
import { api } from "~/utils/api";
import { getContract, prepareEvent, watchContractEvents } from "thirdweb";
import { client } from "~/providers/Thirdweb";
import { REFERRAL_CODE_NFT } from "~/constants/addresses";
import { base } from "thirdweb/chains";
import dynamic from 'next/dynamic';
import { upload } from "thirdweb/storage";

const Upload = dynamic(() => import('~/components/Upload'), { ssr: false });

type Props = {
  onMint: (tokenId: string) => void;
}

export const MintReferralCode: FC<Props> = ({ onMint }) => {
  const account = useActiveAccount();
  const { mutateAsync: mint } = api.engine.mint.useMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [imgUri, setImgUri] = useState<string | undefined>("");
  const contract = getContract({
    client,
    address: REFERRAL_CODE_NFT,
    chain: base,
  });
  const unwatch = watchContractEvents({
    contract,
    onEvents: (events) => {
      for (const event of events) {
        if (event.eventName === "TokensMinted") {
          // @ts-expect-error mintedTo is a string
          const mintedTo = event.args.mintedTo as string;
          if (mintedTo !== account?.address) return;
          unwatch();
          // @ts-expect-error tokenIdMinted is a BigInt
          const tokenIdMinted = event.args.tokenIdMinted as bigint;
          onMint(tokenIdMinted.toString());
        }
      }
    },
  });

  const handleMint = async () => {
    if (!account) return;
    setIsLoading(true);
    try {
      const uri = await upload({
        client,
        files: [{
          name,
          image: imgUri,
        }],
      });
      const data = await mint({
        recipient: account.address,
        metadataUri: uri,
      });
      console.log({ data });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      // clear the inputs
      setName("");
      setImgUri("");
      // close the modal
      document.getElementById('mint-referral-nft')?.click()
    }
  }

  return (
    <>
      <label 
        htmlFor={`mint-referral-nft`}
        className="btn "
      >
        Mint NFT to generate your link
      </label>

      <Portal>
        <input type="checkbox" id={`mint-referral-nft`} className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle" role="dialog">
          <div className="modal-box relative overflow-hidden">
            <label htmlFor={`mint-referral-nft`} className="btn btn-circle btn-sm btn-ghost absolute top-4 right-4">
              <XMarkIcon className="h-6 w-6" />
            </label>
            <h3 className="text-xl font-bold flex items-center gap-2 pb-4">
              Mint Referral Code
            </h3>
            <div className="form-control">
              <Upload 
                onUpload={({ uris }) => {
                  if (!uris) return;
                  setImgUri(uris[0]);
                }}
                initialUrls={imgUri ? [imgUri] : undefined}
                label="📷 Upload an avatar that will appear when your link is used"
                additionalClasses="mb-4"
              />
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
              />
              <div className="label">
                <span className="label-text-alt" />
                <span className="label-text-alt">
                  Your name will appear when your link is used
                </span>
              </div>

            </div>
            <div className="flex flex-col gap-2 mt-4">
              <button 
                className="btn btn-secondary shadow-none hover:btn-primary hover:shadow z-10"
                onClick={() => {
                  void handleMint();
                }}
                disabled={isLoading}
              >
                {isLoading && (
                  <div className="loading loading-spinner" />
                )}
                {isLoading ? "Minting..." : "Mint"}
              </button>
            </div>
          </div>
        </div>
      </Portal>
    </>
  )
}

export default MintReferralCode;