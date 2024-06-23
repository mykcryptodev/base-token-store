import { useEffect, type FC, useState } from "react";
import { ConnectButton, useActiveAccount, useActiveWalletChain, useSetActiveWallet } from "thirdweb/react";
import { client } from "~/providers/Thirdweb";
import { createWallet, createWalletAdapter } from "thirdweb/wallets";
import { DEFAULT_CHAIN, SUPPORTED_CHAINS } from "~/constants/chain";
import { APP_DESCRIPTION, APP_NAME } from "~/constants";
import { useConnect, useAccount, useDisconnect, useWalletClient, useSwitchChain } from "wagmi";
import { viemAdapter } from "thirdweb/adapters/viem";
import { defineChain } from "thirdweb";
import { useTheme } from "next-themes";
import WalletName from "~/components/WalletName";
import { BoltSlashIcon } from "@heroicons/react/24/outline";

type Props = {
  fullWidth?: boolean;
};

export const Connect: FC<Props> = ({ fullWidth }) => {
  const account = useActiveAccount();
  const { connectors, connect } = useConnect();
  const wagmiAccount = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { switchChainAsync } = useSwitchChain();
  const { data: walletClient } = useWalletClient();
  const setActiveWallet = useSetActiveWallet();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { theme } = useTheme();
  const chain = useActiveWalletChain();

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
      <div className="flex items-center gap-2">
        <button
          className={`btn btn-secondary lg:btn-lg ${fullWidth ? 'w-1/2' : ''}`}
          disabled
        >
          Connect wallet
        </button>
        <button
          className={`btn btn-neutral lg:btn-lg ${fullWidth ? 'w-1/2' : ''}`}
          disabled
        >
          Create wallet
        </button>
      </div>
    )
  }

  if (!wagmiAccount.isConnected) {
    const connector = connectors[0]!;
    return (
      <div className="flex items-center gap-2">
        <button
          className={`btn btn-secondary lg:btn-lg ${fullWidth ? 'w-1/2' : ''}`}
          onClick={() => void connect({connector})}
        >
          Connect wallet
        </button>
        <button
          className={`btn btn-neutral lg:btn-lg ${fullWidth ? 'w-1/2' : ''}`}
          onClick={() => void connect({connector})}
        >
          Create wallet
        </button>
      </div>
    ); 
  }

  if (chain?.id !== DEFAULT_CHAIN.id) return (
    <div className="flex items-center gap-2">
      <button
        className={`btn btn-secondary lg:btn-lg ${fullWidth ? 'w-1/2' : ''}`}
        onClick={() => void switchChainAsync({ chainId: DEFAULT_CHAIN.id })}
      >
        <div className="rounded-full bg-warning">
          <BoltSlashIcon className="h-5 w-5" />
        </div>
        Switch to {DEFAULT_CHAIN.name}
      </button>
    </div>
  );

  return (
    <ConnectButton
      client={client}
      chain={DEFAULT_CHAIN}
      chains={SUPPORTED_CHAINS}
      theme={theme === 'dark' ? 'dark' : 'light'}
      wallets={[createWallet("com.coinbase.wallet")]}
      detailsButton={{
        render: () => (
          <button className="btn btn-secondary lg:btn-lg">
            <WalletName address={account?.address} shorten />
          </button>
        )
      }}
      appMetadata={{
        name: APP_NAME,
        description: APP_DESCRIPTION,
        logoUrl: "https://avatars.githubusercontent.com/u/108554348?s=200&v=4"
      }}
    />
  )
};