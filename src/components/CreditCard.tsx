import { CreditCardIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { type FC } from "react";
import { PayEmbed } from "thirdweb/react";
import { client } from "~/providers/Thirdweb";
import Image from 'next/image';
import Link from "next/link";

export const CreditCard: FC = () => {
  const { theme } = useTheme();
  
  return (
    <>
    <label htmlFor="credit-card-modal" className="btn sm:btn-md btn-sm btn-ghost flex items-center space-x-2">
      <CreditCardIcon className="sm:h-6 sm:w-6 w-4 h-4" />
    </label>

    <input type="checkbox" id="credit-card-modal" className="modal-toggle" />
    <div className="modal modal-bottom sm:modal-middle" role="dialog">
      <div className="modal-box p-0 sm:p-4">
        <div className="absolute right-4 top-4">
          <label htmlFor="credit-card-modal" className="btn btn-sm btn-circle btn-ghost ">
            <XMarkIcon className="h-6 w-6" />
          </label>
        </div>
        <h3 className="text-2xl font-bold mb-4 p-4 sm:p-0">Buy crypto with credit card</h3>
        <div className="flex items-start gap-1">
          <div className="min-w-[200px]">
            <Image
              src="/images/boomer-logo.svg"
              alt="boomer"
              width={250}
              height={250}
              className="mx-auto"
            />
            <p className="prose pl-2 text-xs pt-2">
              {`Sup, Boomer! If you don't already have crypto, you can buy some with your credit card right here!`}
            </p>
            <p className="prose pl-2 text-xs py-2">
              {`It only takes a few minutes to move funds onchain. So get going and welcome to Base!`}
            </p>
            <Image
              src="/images/boomer-icon.webp"
              alt="boomer"
              width={100}
              height={100}
              className="rounded-full mx-2 float-left w-12 h-12"
            />
            <p className="prose pl-2 text-xs py-2">
              Brought to you by{" "}
              <Link href="https://www.baseboomer.com/" className="underline" target="_blank" rel="noreferrer">
                Boomer
              </Link>
            </p>

          </div>
          <Image
            src="/images/boomer.webp"
            alt="boomer"
            width={250}
            height={250}
            className="mx-auto"
          />
        </div>
        <PayEmbed
          client={client}
          theme={theme === "dark" ? "dark" : "light"}
          connectOptions={{
            connectModal: {
              size: "compact",
            },
          }}
          payOptions={{
            buyWithCrypto: false,
          }}
        />
        <div className="absolute bottom-4 left-4 -z-10">
          <Image
            src="/images/boomer-lawn.webp"
            alt="boomer"
            width={50}
            height={50}
            className="mx-auto"
          />
        </div>
        <div className="modal-action">
          <label htmlFor="credit-card-modal" className="btn">Close</label>
        </div>
      </div>
    </div>
    </>
  )
};

export default CreditCard;