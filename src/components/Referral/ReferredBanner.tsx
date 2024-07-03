import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useState, type FC } from "react";
import { type Nft } from "~/types/simpleHash";

type Props = {
  referralNft: Nft | null;
}

export const RefferedBanner: FC<Props> = ({ referralNft }) => {
  const { theme } = useTheme();
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(true);

  return (
    <div className={`flex w-full justify-between gap-4 sm:items-center rounded-2xl p-4 ${theme === 'dark' ? 'bg-base-200 bg-opacity-50' : 'bg-gradient-to-b from-[#F9F9F9] via-[#FAFAFA] to-[#FBFBFB]'} relative ${isBannerVisible ? '' : 'hidden'}`}>
      {referralNft ? (
        <div className="flex flex-col w-full items-center">
          <div className="font-bold text-xl">Welcome to the store!</div>
          <div>{`You've been invited by ${referralNft.name}`}</div>
        </div>
      ) : (
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
          <button className="btn">
            Mint NFT to generate your link
          </button>
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