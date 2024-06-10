import { type FC, type ReactNode,useEffect, useState } from "react"
import { useRouter } from "next/router";
import Link from "next/link";
import { Connect } from "~/components/Connect";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { useAccount, useChainId, useChains, useDisconnect, useSwitchChain, useWalletClient } from 'wagmi';
import { base } from "viem/chains";
import { useSetActiveWallet } from "thirdweb/react";
import { viemAdapter } from "thirdweb/adapters/viem";
import { createWalletAdapter } from "thirdweb/wallets";
import { client } from "~/providers/Thirdweb";
import { defineChain } from "thirdweb";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Cart from "~/components/Cart";
import { useCartContext } from "~/contexts/Cart";

interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const chainId = useChainId();
  const chains = useChains();
  const chain = chains.find((c) => c.id === chainId) ?? base;
  const account = useAccount();
  const { data: walletClient } = useWalletClient();
  const { disconnectAsync } = useDisconnect();
  const setActiveWallet = useSetActiveWallet();
  const { switchChainAsync } = useSwitchChain();
  const { cart } = useCartContext();

  useEffect(() => {
    const setActive = async () => {
      if (walletClient) {
        // adapt the walletClient to a thirdweb account
        const adaptedAccount = viemAdapter.walletClient.fromViem({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          walletClient: walletClient as any, // accounts for wagmi/viem version mismatches
        });
        // create the thirdweb wallet with the adapted account
        const thirdwebWallet = createWalletAdapter({
          client,
          adaptedAccount,
          chain: defineChain(await walletClient.getChainId()),
          onDisconnect: async () => {
            await disconnectAsync();
          },
          switchChain: async (chain) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
            await switchChainAsync({ chainId: chain.id as any });
          },
        });
        void setActiveWallet(thirdwebWallet);
      }
    };
    void setActive();
  }, [disconnectAsync, setActiveWallet, switchChainAsync, walletClient]);

  const [userPrefersDarkMode, setUserPrefersDarkMode] = useState<boolean>(false);
  useEffect(() => {
    setUserPrefersDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  const fromYellow = "from-[#0052FF]";
  const toYellow = "to-transparent";
  const fromPink = "from-[#0052FF]";
  const toPink = "to-transaprent";
  const viaPink = "via-[#0052FF]";

  // const fromYellow = userPrefersDarkMode ? "from-yellow-300" : "from-yellow-100";
  // const toYellow = userPrefersDarkMode ? "to-yellow-800" : "to-yellow-00";
  // const fromPink = userPrefersDarkMode ? "from-pink-300" : "from-pink-100";
  // const toPink = userPrefersDarkMode ? "to-pink-800" : "to-pink-500";
  // const viaPink = userPrefersDarkMode ? "via-pink-300" : "via-pink-200";

  return (
    <OnchainKitProvider 
      address={account?.address ?? ''}
      chain={chain}
      schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
      apiKey="organizations/133a278f-8437-40c8-a37b-32566ff9063f/apiKeys/00cfe0ae-4cc6-4c00-b889-e3fd9f2580bc"
      rpcUrl="https://api.developer.coinbase.com/rpc/v1/base/vqgsjSSGsZbQVixgR2cCuIZxXj8ENpEJ"
    >
      <div className="drawer drawer-end">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="block">
            <div className={`absolute bg-gradient-to-t ${fromYellow} ${toYellow} rounded-full blur-3xl -top-[85%] -left-[45%] w-full h-full -z-10 ${userPrefersDarkMode ? 'opacity-30' : ''}`} ></div>
            <div className={`fixed bg-gradient-to-br ${fromYellow} ${viaPink} ${toPink} rounded-full blur-3xl -bottom-0 -right-[100%] w-full h-full -z-10 ${userPrefersDarkMode ? 'opacity-30' : ''}`}></div>
            <div className={`fixed bg-gradient-to-br ${fromYellow} ${viaPink} ${toPink} rounded-full blur-3xl -bottom-0 -left-[55%] w-1/2 h-full -z-10 ${userPrefersDarkMode ? 'opacity-30' : ''}`}></div>
            {/* <div className={`fixed bg-gradient-to-tl ${fromYellow} ${viaPink} ${toYellow} rounded-full blur-3xl -bottom-0 -left-[25%] w-1/2 h-full -z-10 ${userPrefersDarkMode ? 'opacity-30' : ''}`}></div> */}
            <div className={`fixed bg-gradient-to-bl ${fromPink} ${toPink} rounded-full -top-[-85%] blur-3xl -left-[35%] w-full h-full -z-10 ${userPrefersDarkMode ? 'opacity-30' : ''}`}></div>
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
    </OnchainKitProvider>
  )
}