import { type FC, type ReactNode } from "react"
import Link from "next/link";
import { Connect } from "~/components/Connect";
import { ShoppingBagIcon, WalletIcon } from "@heroicons/react/24/outline";
import Cart from "~/components/Cart";
import { Footer } from "~/components/Footer";
import { useActiveAccount } from "thirdweb/react";
import ThemeSwitch from "~/components/ThemeSwitch";
import Advertisement from "~/components/Advertisement/Banner";
import { useTheme } from "next-themes";
import Logo from "~/components/Logo";
import CreditCard from "~/components/CreditCard";
import { useCartContext } from "~/contexts/Cart";
import { useAdvertisementContext } from "~/contexts/Advertisement";
import { CENSORED_DAY_IDS } from "~/constants/ads";

interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const account = useActiveAccount();
  const { theme } = useTheme();
  const { cart } = useCartContext();
  const { advertisement } = useAdvertisementContext();
  const todaysAdIsNotCensored = advertisement && !CENSORED_DAY_IDS[advertisement.dayId];

  return (
    <div className="drawer drawer-end tracking-tight">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="block">
          <div style={{ backgroundImage: `url('/images/full-width-text.svg')` }} className={`w-full bg-center bg-no-repeat h-96 absolute -top-48 -z-10 ${theme === 'dark' ? 'opacity-80' : ''}`} ></div>
          <div className="overflow-x-hidden max-w-7xl mx-auto min-h-screen mt-9">
            {todaysAdIsNotCensored && (
              <div className="w-full mx-auto mt-9">
                <Advertisement />
              </div>
            )}
            <div className={`w-full justify-between items-center flex mr-4 ${todaysAdIsNotCensored ? 'mt-9' : 'mt-20'}`}>
              <div className="sm:w-full sm:px-0 w-fit px-2">
                <ThemeSwitch />
              </div>
              <div className="lg:w-full w-fit flex items-center justify-start sm:justify-center gap-2">
                <Link href="/" className="lg:flex hidden" rel="noreferrer">
                  <Logo
                    shapesFill={`${theme === 'dark' ? '#C9CCD5' : '#FFFFFF'}`}
                    backgroundFill={`${theme === 'dark' ? '#000000' : '#1E4FFD'}`}
                    width={200}
                    height={50}
                  />
                </Link>
              </div>
              <div className="w-full flex items-center gap-2 justify-center sm:justify-end">
                {account && (<div className="lg:hidden w-0 flex" />)}
                <div className="w-full flex justify-end">
                  <Connect />
                </div>
                <div className="flex items-center justfiy-end">
                  {account && (
                    <div className="flex items-center">
                      <Link href={`https://wallet.coinbase.com/assets`} className="btn sm:btn-md btn-sm btn-ghost flex items-center space-x-2" target="_blank" rel="noopener">
                        <WalletIcon className="sm:h-6 sm:w-6 w-4 h-4" />
                      </Link>
                      <CreditCard />
                    </div>
                  )}
                  <div className="indicator">
                    <label htmlFor="my-drawer" className="btn sm:btn-md btn-sm btn-ghost drawer-button">
                      <ShoppingBagIcon className="sm:h-6 sm:w-6 w-4 h-4" />
                      <span className={`indicator-item badge badge-sm rounded-full badge-primary translate-x-0 translate-y-0 ${cart.length === 0 ? 'hidden' : ''}`}>
                        {cart.length}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {children}
          </div>
          <Footer />
        </div>
      </div> 
      <div className="drawer-side z-20">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="p-4 min-w-96 w-2/5 min-h-full bg-base-200 text-base-content">
          <Cart />
        </ul>
      </div>
    </div>
  )
}