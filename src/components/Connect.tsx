import { type FC } from "react";
import { Avatar, Name } from '@coinbase/onchainkit/identity';
import { useAccount, useEnsName } from 'wagmi';
import { ConnectAccount } from '@coinbase/onchainkit/wallet';
import Link from "next/link";

export const Connect: FC = () => {
  const { address } = useAccount();
  const { status: ensStatus } = useEnsName({ address });

  if (!address) {
    return <ConnectAccount />; 
  }

  return (
    <Link href={`/profile/${address}`} className="btn btn-ghost flex h-10 items-center space-x-2">
      <Avatar address={address} showAttestation />
      <div className="flex flex-col text-sm">
        <b className={`${ensStatus === 'pending' || ensStatus === 'error' ? 'hidden': ''}`}>
          <Name address={address} />
        </b>
        <Name address={address} />
      </div>
    </Link>
  )
};