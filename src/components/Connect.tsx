import { useEffect, type FC, useState } from "react";
import { ConnectButton, useActiveAccount, useSetActiveWallet } from "thirdweb/react";
import { client } from "~/providers/Thirdweb";
import { createWallet, createWalletAdapter } from "thirdweb/wallets";
import { DEFAULT_CHAIN } from "~/constants/chain";
import { APP_DESCRIPTION, APP_NAME } from "~/constants";
import { useConnect, useAccount, useDisconnect, useWalletClient, useSwitchChain } from "wagmi";
import { viemAdapter } from "thirdweb/adapters/viem";
import { defineChain } from "thirdweb";
import useShortenedAddress from "~/hooks/useShortenedAddress";
import { useTheme } from "next-themes";

export const Connect: FC = () => {
  const account = useActiveAccount();
  const { connectors, connect } = useConnect();
  const wagmiAccount = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { switchChainAsync } = useSwitchChain();
  const { data: walletClient } = useWalletClient();
  const setActiveWallet = useSetActiveWallet();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { getShortenedAddress } = useShortenedAddress();
  const { theme } = useTheme();

  useEffect(() => setIsMounted(true), []);
  
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
            await switchChainAsync({ chainId: chain.id });
          },
        });
        void setActiveWallet(thirdwebWallet);
      }
    };
    void setActive();
  }, [disconnectAsync, setActiveWallet, switchChainAsync, walletClient]);

  if (!isMounted) {
    return (
      <button
        className="btn btn-secondary"
        disabled
      >
        Connect wallet
      </button>
    )
  }

  if (!wagmiAccount.isConnected) {
    const connector = connectors[0]!;
    return (
      <div className="flex items-center gap-2">
        <button
          className="btn btn-secondary lg:btn-lg"
          onClick={() => void connect({connector})}
        >
          Connect wallet
        </button>
        <button
          className="btn btn-neutral lg:btn-lg"
          onClick={() => void connect({connector})}
        >
          Create wallet
        </button>
      </div>
    ); 
  }

  return (
    <div className="flex items-center gap-2">
      <ConnectButton
        client={client}
        chain={DEFAULT_CHAIN}
        theme={theme === 'dark' ? 'dark' : 'light'}
        wallets={[createWallet("com.coinbase.wallet")]}
        detailsButton={{
          render: () => (
            <button className="btn btn-secondary lg:btn-lg">
              {getShortenedAddress(account?.address)}
            </button>
          )
        }}
        appMetadata={{
          name: APP_NAME,
          description: APP_DESCRIPTION,
          logoUrl: "https://avatars.githubusercontent.com/u/108554348?s=200&v=4"
        }}
      />
    </div>
  )
};