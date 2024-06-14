import { type FC, type ReactNode } from "react"
import Link from "next/link";
import { Connect } from "~/components/Connect";
import { ChartPieIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Cart from "~/components/Cart";
import Image from "next/image";
import { APP_NAME } from "~/constants";
import { Footer } from "~/components/Footer";
import { useActiveAccount } from "thirdweb/react";

interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const account = useActiveAccount();

  return (
    <div className="drawer drawer-end tracking-tight">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="block">
          <div style={{ backgroundImage: `url('/images/full-width-text.svg')` }} className="w-full bg-center bg-no-repeat h-96 absolute -top-48 -z-10" ></div>
          <div className="overflow-x-hidden max-w-7xl mx-auto min-h-screen mt-28">
            <div className="w-full justify-between items-center flex mr-4">
              <div className="w-full sm:flex hidden" />
              <div className="sm:w-full w-fit flex items-center justify-start sm:justify-center gap-2">
                <Link href="/">
                  <Image src="/images/logo-horizontal.svg" alt={APP_NAME} className="lg:h-16 h-12 w-auto sm:flex hidden" width={200} height={200} priority />
                </Link>
              </div>
              <div className="w-full flex items-center gap-2 justify-center sm:justify-end">
                {account && (<div className="w-full sm:hidden flex" />)}
                <div className="w-full flex justify-end">
                  <Connect />
                </div>
                <div className="flex justfiy-end">
                  {account && (
                    <Link href={`/profile/${account?.address}`} className="btn btn-ghost flex h-10 items-center space-x-2">
                      <ChartPieIcon className="h-6 w-6" />
                    </Link>
                  )}
                  <div className="indicator">
                    <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
                      <ShoppingBagIcon className="h-6 w-6" /> 
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
        <ul className="menu p-4 min-w-96 w-3/5 min-h-full bg-base-200 text-base-content">
          <Cart />
        </ul>
      </div>
    </div>
  )
}