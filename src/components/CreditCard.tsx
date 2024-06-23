import { CreditCardIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { type FC } from "react";
import { PayEmbed } from "thirdweb/react";
import { client } from "~/providers/Thirdweb";

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
        <div className="modal-action">
          <label htmlFor="credit-card-modal" className="btn">Close</label>
        </div>
      </div>
    </div>
    </>
  )
};

export default CreditCard;