import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { type GetServerSideProps } from "next";
import { type FC, useState } from "react";
import { toEther } from "thirdweb";
import { MediaRenderer } from "thirdweb/react";
import AdvertisementCalendar from "~/components/Advertisement/Calendar";

// import AdvertisementCalendar from "~/components/Advertisement/Calendar";
// import AdvertisementForm from "~/components/Advertisement/Form";
import { APP_NAME } from "~/constants";
import { withServerSideProps, type WithServerSideProps } from "~/hoc/withServerSideProps";
import useIsDarkTheme from "~/hooks/useIsDarkTheme";
import { sharedGetServerSideProps } from "~/lib/getServerSidePropsUtil";
import { client } from "~/providers/Thirdweb";
import { api } from "~/utils/api";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return sharedGetServerSideProps(context)
}
const CreateAdvertisement: FC<WithServerSideProps> = () => {
  const [price, setPrice] = useState<string>("0");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const isDarkTheme = useIsDarkTheme();

  const { data: pricePerBannerSlot } = api.advertisement.getStandardPrice.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col gap-2 justify-center max-w-2xl mx-auto">
      <h1 className="sm:text-7xl text-5xl text-center tracking-tighter font-semibold items-center gap-2 sm:gap-4 flex-wrap sm:pt-8 pt-2 sm:pb-8 pb-4">
        Create Advertisement
      </h1>
      <div className="w-full h-full flex items-start lg:flex-row flex-col-reverse lg:gap-8 gap-2 mx-2 mb-20 pr-4">
        <div className="w-full flex flex-col gap-2">
          <div className="alert items-start mb-4">
            <InformationCircleIcon className={`h-5 w-5 mt-1 stroke-2 ${isDarkTheme ? 'stroke-info' : 'fill-info'}`} />            
            <div className="flex flex-col gap-2">
              <span>
                Ads are permissionless so that anyone can buy an advertisement on {APP_NAME}. Ad slots are sold on a per-day basis in ETH on Base. Ad slots can be bought from the current owner of the ad slot for the price set by the slot owner. Ad media is subject to Community Guidelines and may be taken down without refund if violated.
              </span>
            </div>
          </div>
          <div className="form-control border rounded-lg p-6">
            <label className="label cursor-pointer">
              <div className="flex flex-col gap-1">
                <span className="label-text text-xl font-bold">
                  Banner Ad
                </span>
                {pricePerBannerSlot ? (
                  <span className="text-sm flex items-center gap-1">
                    <MediaRenderer
                      client={client}
                      src={"/images/eth.svg"}
                      width="14px"
                      height="14px"
                      className="rounded-full"
                    />
                    {toEther(BigInt(pricePerBannerSlot))}
                    &nbsp;
                    ETH
                  </span>
                ) : (
                  <span className="h-5 w-32 bg-base-200 rounded-lg animate-pulse" />
                )}
                <span>Shown at the top of every page on {APP_NAME}. Located above the navigation bar.</span>
              </div>
            </label>
          </div>
          <h2 className="text-3xl font-bold my-4">Select Dates</h2>
          <AdvertisementCalendar 
            callback={(price, dates) => {
              setPrice(price.toString());
              setSelectedDates(dates);
            }}
          />
          {/* 
          <h2 className="text-3xl font-bold my-4">Create Ad Media</h2>
          <AdvertisementForm 
            selectedDates={selectedDates}
            price={price}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default withServerSideProps(CreateAdvertisement);