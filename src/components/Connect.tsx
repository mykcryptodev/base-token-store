import { useEffect, type FC, useState } from "react";
import Link from "next/link";
import { ConnectButton, useActiveAccount, useSetActiveWallet } from "thirdweb/react";
import { client } from "~/providers/Thirdweb";
import { createWallet, createWalletAdapter } from "thirdweb/wallets";
import { DEFAULT_CHAIN } from "~/constants/chain";
import { APP_NAME } from "~/constants";
import { useConnect, useAccount, useDisconnect, useWalletClient, useSwitchChain } from "wagmi";
import { viemAdapter } from "thirdweb/adapters/viem";
import { defineChain } from "thirdweb";

export const Connect: FC = () => {
  const account = useActiveAccount();
  const { connectors, connect } = useConnect();
  const wagmiAccount = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { switchChainAsync } = useSwitchChain();
  const { data: walletClient } = useWalletClient();
  const setActiveWallet = useSetActiveWallet();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => setIsMounted(true), []);
  
  useEffect(() => {
    const setActive = async () => {
      if (walletClient) {
        // adapt the walletClient to a thirdweb account
        const adaptedAccount = viemAdapter.walletClient.fromViem({
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
            await switchChainAsync({ chainId: chain.id as any });
          },
        });
        setActiveWallet(thirdwebWallet);
      }
    };
    setActive();
  }, [walletClient]);

  if (!isMounted) {
    return (
      <button
        className="btn btn-primary"
        disabled
      >
        Connect Wallet
      </button>
    )
  }

  if (!wagmiAccount.isConnected) {
    const connector = connectors[0]!;
    return (
      <button
        className="btn btn-primary"
        onClick={() => void connect({connector})}
      >
        Connect Wallet
      </button>
    ); 
  }

  return (
    <div className="flex items-center gap-2">
      <ConnectButton
        client={client}
        chain={DEFAULT_CHAIN}
        theme="light"
        wallets={[createWallet("com.coinbase.wallet")]}
        appMetadata={{
          name: APP_NAME,
          description: "A marketplace for tokens and memes",
          logoUrl: "https://avatars.githubusercontent.com/u/108554348?s=200&v=4"
        }}
      />
      <Link href={`/profile/${account?.address}`} className="btn btn-ghost flex h-10 items-center space-x-2">
        Portfolio
      </Link>
    </div>
  )
};