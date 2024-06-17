import { useEffect, useMemo, useState, type FC } from "react";
import useShortenedAddress from "~/hooks/useShortenedAddress";
import { resolveName } from "thirdweb/extensions/ens";
import { client } from "~/providers/Thirdweb";

type Props = {
  address?: string;
  shorten?: boolean;
}

export const WalletName: FC<Props> = ({ address, shorten }) => {
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

    void fetchEnsName();
  }, [address]);

  const name = useMemo(() => {
    if (ensName) {
      return ensName;
    }
    if (shorten) {
      return getShortenedAddress(address);
    }
    return address;
  }, [address, ensName, getShortenedAddress, shorten]);

  return (
    <span>{name}</span>
  )
};

export default WalletName;