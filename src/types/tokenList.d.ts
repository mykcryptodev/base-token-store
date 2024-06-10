export interface TokenListToken {
  name: string;
  address: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
  chainId: number;
  balance?: string;
}

export interface TokenList {
  name: string;
  logoURI: string;
  keywords: string[];
  timestamp: string;
  version: {
    major: number;
    minor: number;
    patch: number;
  };
  tokens: TokenListToken[];
}