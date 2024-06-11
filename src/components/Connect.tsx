import { type FC } from "react";
import Link from "next/link";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "~/providers/Thirdweb";
import { createWallet } from "thirdweb/wallets";
import { DEFAULT_CHAIN } from "~/constants/chain";
import { APP_NAME } from "~/constants";

export const Connect: FC = () => {
  const account = useActiveAccount();

  if (!account) {
    return (
      <ConnectButton 
        client={client}
        wallets={[createWallet("com.coinbase.wallet")]}
      />
    ); 
  }

  return (
    <div className="flex items-center gap-2">
      <ConnectButton
        client={client}
        chain={DEFAULT_CHAIN}
        wallets={[createWallet("com.coinbase.wallet")]}
        appMetadata={{
          name: APP_NAME,
          description: "A marketplace for tokens and memes",
          logoUrl: "https://avatars.githubusercontent.com/u/108554348?s=200&v=4"
        }}
      />
      <Link href={`/profile/${account.address}`} className="btn btn-ghost flex h-10 items-center space-x-2">
        Portfolio
      </Link>
    </div>
  )
};