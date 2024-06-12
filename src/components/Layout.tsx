import { type FC, type ReactNode } from "react"
import { useRouter } from "next/router";
import Link from "next/link";
import { Connect } from "~/components/Connect";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Cart from "~/components/Cart";

interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const fromBlue = "from-[#0052FF]";
  const toTransparent = "to-transparent";
  const viaBlue = "via-[#0052FF]";

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="block">
          <div className={`absolute bg-gradient-to-t ${fromBlue} ${toTransparent} rounded-full blur-3xl -top-[85%] -left-[45%] w-full h-full -z-10 opacity-30`} ></div>
          <div className={`fixed bg-gradient-to-br ${fromBlue} ${viaBlue} ${toTransparent} rounded-full blur-3xl -bottom-0 -right-[100%] w-full h-full -z-10 opacity-30`}></div>
          <div className={`fixed bg-gradient-to-br ${fromBlue} ${viaBlue} ${toTransparent} rounded-full blur-3xl -bottom-0 -left-[55%] w-1/2 h-full -z-10 opacity-30`}></div>
          <div className={`fixed bg-gradient-to-bl ${fromBlue} ${viaBlue} rounded-full -top-[-85%] blur-3xl -left-[35%] w-full h-full -z-10 opacity-30`}></div>
          <div className="overflow-x-hidden max-w-7xl mx-auto min-h-screen mt-10">
            <div className="w-full justify-between items-center flex mr-4">
              <div className="flex items-center gap-2">
                {router.pathname !== '/' && (
                  <Link href="/" className="btn btn-ghost text-neutral ml-4">
                    Base Token Store
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Connect />
                <div className="indicator">
                  <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
                    <ShoppingBagIcon className="h-6 w-6" /> 
                  </label>
                </div>

              </div>
            </div>
            {children}
          </div>
        </div>
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 min-w-96 w-3/5 min-h-full bg-base-200 text-base-content">
          <Cart />
        </ul>
      </div>
    </div>
  )
}