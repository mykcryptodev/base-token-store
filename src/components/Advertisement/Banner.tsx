import { ArrowTopRightOnSquareIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { type FC } from "react";
import { MediaRenderer } from "thirdweb/react";


import { APP_NAME } from "~/constants";
import { useAdvertisementContext } from "~/contexts/Advertisement";
import { client } from "~/providers/Thirdweb";

export const Advertisement: FC = () => {
  const { advertisement } = useAdvertisementContext();
  const handleAdClicked = () => {
    if (advertisement) {
      // window change to ad link
      const url = new URL(advertisement.link);
      url.searchParams.append('utm_source', 'base-token-store');
      window.open(url.toString(), "_blank");
    }
  };

  const DisclaimerModal: FC = () => {
    return (
      <>
        <button className="btn btn-xs btn-ghost opacity-50 w-fit mb-1" onClick={()=>(document.getElementById('ad-disclaimer-modal') as HTMLDialogElement).showModal()}>
          <div className="flex items-center gap-1">
            <span>Onchain Ad</span>
            <QuestionMarkCircleIcon className="w-3 h-3 stroke-2" />
          </div>
        </button>
        <dialog id="ad-disclaimer-modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">What are onchain ads?</h3>
            <p className="py-4">Onchain ads allows anyone to advertise on {APP_NAME}. Ads are bought in day-long increments and are paid in ETH on Base. Advertisers can also set the price for their ad slot to be overwritten.</p>
            <p className="py-4">{APP_NAME} may hide ads that violate community guidelines without refund.</p>
            <div className="modal-action">
              <Link className="btn btn-primary" href="/advertisement/create">
                Buy an Ad
              </Link>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </>
    )
  };

  if (advertisement) {
    return (
      <div>
        <DisclaimerModal/>
        <div onClick={handleAdClicked} className="md:h-[90px] md:w-[768px] h-[50px] w-[350px] m-auto cursor-pointer bg-base-200 rounded-lg">
          <MediaRenderer
            client={client}
            src={advertisement.media}
            className="!rounded-lg thirdweb-media"
            style={{ height: "100%", width: "100%", objectFit: "cover", borderRadius: "8px" }}
            controls={false}
          />
        </div>
        <Link 
          href="/advertisement/create" 
          className="flex w-full justify-end items-center text-xs p-2 gap-1 bg-base-100 opacity-50"
          rel="noreferrer"
        >
          <span>Advertise with {APP_NAME}</span>
          <ArrowTopRightOnSquareIcon className="w-3 h-3 stroke-2" />
        </Link>
      </div>
    )
  }

  return null;
}

export default Advertisement;