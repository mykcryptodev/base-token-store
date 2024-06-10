import { type Token } from "@uniswap/sdk";
import Image from "next/image";
import Link from "next/link";
import { type FC, useEffect,useState } from "react";
import { getChainMetadata } from "thirdweb/chains";
import { MediaRenderer } from "thirdweb/react";

import { DEFAULT_CHAIN, SUPPORTED_CHAINS } from "~/constants/chain";
import { COINGECKO_UNKNOWN_IMG } from "~/constants/dex";
import { client } from "~/providers/Thirdweb";
import { api } from "~/utils/api";

const TokenIcon: FC<{ 
  token: Token,
  height?: number,
  width?: number,
  noLink?: boolean,
  className?: string,
  style?: React.CSSProperties,
}> = ({ token, width, height, noLink, className, style }) => {
  const chain = SUPPORTED_CHAINS.find(c => c.id == token.chainId as number) ?? DEFAULT_CHAIN;
  const { data: tokenLogo } = api.coingecko.getTokenImage.useQuery({
    chainId: chain.id,
    tokenAddress: token.address,
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const [chainExplorer, setChainExplorer] = useState<string>("");

  const getChainExplorer = async (chainId: number) => {
    const chain = SUPPORTED_CHAINS.find(c => c.id == chainId) ?? DEFAULT_CHAIN;
    const chainMetadata = await getChainMetadata(chain);
    return chainMetadata.explorers?.[0]?.url ?? "https://basescan.org";
  };

  useEffect(() => {
    void getChainExplorer(chain.id).then(setChainExplorer);
  }, [chain.id]);

  if (!tokenLogo || tokenLogo === COINGECKO_UNKNOWN_IMG) {
    return (
      <Image
        alt={token.name ?? token.symbol ?? "Token Icon"}
        width={width ?? 28}
        height={height ?? 28}
        src={COINGECKO_UNKNOWN_IMG}
        className={className}
        style={style}
      />
    )
  }
  
  const Logo: FC = () => {
    return (
      <>
        {tokenLogo.toString().startsWith("ipfs://") ? (
          <MediaRenderer
            src={tokenLogo}
            className={className ? className : `w-7 h-7 rounded-full`}
            style={style ?? { height: height ?? '100%', width: width ?? '100%' }} 
            client={client}
          />
        ) : (
          <Image 
            alt={(token.name ?? token.symbol) ?? "Token Icon"}
            width={width ?? 28}
            height={height ?? 28}
            src={tokenLogo}
            className={className}
            style={style}
          />
        )}
      </>
    )
  }

  if (noLink) {
    return <Logo />
  }

  return (
    <Link href={`${chainExplorer}/address/${token.address}`} target="_blank" rel="noopener noreferrer">
      <Logo />
    </Link>
  )
};

export default TokenIcon;