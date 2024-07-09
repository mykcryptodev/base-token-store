import Head from "next/head";
import { CubeIcon, GlobeAmericasIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { type GetServerSideProps } from "next";
import { type FC, useState, useMemo } from "react";
import { toEther } from "thirdweb";
import { MediaRenderer } from "thirdweb/react";
import AdvertisementCalendar from "~/components/Advertisement/Calendar";
import AdvertisementForm from "~/components/Advertisement/Form";
import { APP_NAME } from "~/constants";
import { withServerSideProps, type WithServerSideProps } from "~/hoc/withServerSideProps";
import useIsDarkTheme from "~/hooks/useIsDarkTheme";
import { sharedGetServerSideProps } from "~/lib/getServerSidePropsUtil";
import { client } from "~/providers/Thirdweb";
import { api } from "~/utils/api";
import Logo from "~/components/Logo";
import { useTheme } from "next-themes";
import React from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return sharedGetServerSideProps(context)
}
const CreateAdvertisement: FC<WithServerSideProps> = () => {
  const { theme } = useTheme();
  const [price, setPrice] = useState<string>("0");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [lastBoughtAt, setLastBoughtAt] = useState<Date | null>(new Date());
  const isDarkTheme = useIsDarkTheme();

  const { data: pricePerBannerSlot } = api.advertisement.getStandardPrice.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  
  const faqs = useMemo(() => [
    {
      title: "Permissionless",
      description: "Ads are permissionless so that anyone can buy an advertisement.",
      icon: <GlobeAmericasIcon />,
    },
    {
      title: "Ad Slots",
      description: `Ad slots are sold on a per-day basis for ${toEther(BigInt(pricePerBannerSlot ?? '0'))} ETH on Base. You can resell your slot.`,
      icon: <CubeIcon />,
    },
    {
      title: "Guidelines",
      description: "Ad media is subject to Community Guidelines and may be taken down without refund if violated.",
      icon: <ShieldCheckIcon />,
    }
  ], [pricePerBannerSlot]);

  return (
    <>
      <Head>
        <title>Base Token Store - Create Advertisement</title>
        <meta name="description" content="The easiest way to buy tokens on Base" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="lg:hidden flex mt-8 justify-center w-full">
          <Logo
            shapesFill={`${theme === 'dark' ? '#C9CCD5' : '#FFFFFF'}`}
            backgroundFill={`${theme === 'dark' ? '#000000' : '#1E4FFD'}`}
            width={200}
            height={50}
          />
        </div>
        <div className="flex flex-col gap-2 justify-center max-w-3xl mx-auto">
          <h1 className="sm:text-7xl text-5xl text-center tracking-tighter font-semibold items-center gap-2 sm:gap-4 flex-wrap sm:pt-8 pt-2 sm:pb-8 pb-4">
            Create Advertisement
          </h1>
          <div className="w-full h-full flex items-start lg:flex-row flex-col-reverse lg:gap-8 gap-2 mx-2 mb-20 pr-4">
            <div className="w-full flex flex-col gap-2">
              <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-2">
                {faqs.map((faq, index) => (
                  <div key={index} className="flex flex-col gap-2 rounded-lg border p-6">
                    <div className="flex items-center gap-1">
                      {React.cloneElement(faq.icon, { className: 'w-5 h-5 stroke-2' })}
                      <span className="text-xl font-bold">{faq.title}</span>
                    </div>
                    <span>{faq.description}</span>
                  </div>
                ))}
              </div>
              <div className="form-control border rounded-lg p-6">
                <label className="label">
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
                          className="rounded-full thirdweb-media"
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
              <h2 className="text-3xl font-bold my-4">Select Dates {lastBoughtAt?.getTime()}</h2>
              <AdvertisementCalendar 
                callback={(price, dates) => {
                  setPrice(price.toString());
                  setSelectedDates(dates);
                }}
                key={lastBoughtAt?.getTime()}
              />
              <h2 className="text-3xl font-bold my-4">Create Ad Media</h2>
              <AdvertisementForm 
                selectedDates={selectedDates}
                price={price}
                onAdsBought={() => {
                  setLastBoughtAt(null);
                  setTimeout(() => {
                    setLastBoughtAt(new Date());
                  }, 4000);
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default withServerSideProps(CreateAdvertisement);