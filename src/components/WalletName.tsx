import { useEffect, useMemo, useState, type FC } from "react";
import useShortenedAddress from "~/hooks/useShortenedAddress";
import { resolveName } from "thirdweb/extensions/ens";
import { client } from "~/providers/Thirdweb";
import { getName } from '@coinbase/onchainkit/identity';
import { base, type Chain } from 'viem/chains';

type Props = {
  address?: string;
  shorten?: boolean;
}

export const WalletName: FC<Props> = ({ address, shorten }) => {
  const [baseName, setBaseName] = useState<string | null>(null);
  const [ensName, setEnsName] = useState<string | null>(null);
  const { getShortenedAddress } = useShortenedAddress();

  useEffect(() => {
    const fetchEnsName = async () => {
      if (!address) {
        return setEnsName(null);
      }
      const name = await resolveName({
        client,
        address,
      });
      setEnsName(name);
    };
    const fetchBaseName = async () => {
      if (!address) {
        return setBaseName(null);
      }

      const name = await getName({
        // TODO: this should not have to exist to satisfy typesafety
        chain: {...base, fees: { baseFeeMultiplier: 0 }},
        address,
      });
      setBaseName(name);
    }
    void fetchEnsName();
    void fetchBaseName();
  }, [address]);

  const name = useMemo(() => {
    if (baseName) {
      return baseName;
    }
    if (ensName) {
      return ensName;
    }
    if (shorten) {
      return getShortenedAddress(address);
    }
    return address;
  }, [address, ensName, baseName, getShortenedAddress, shorten]);

  return (
    <span>{name}</span>
  )
};

export default WalletName;