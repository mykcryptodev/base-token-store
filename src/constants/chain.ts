import { base, baseSepolia, defineChain, ethereum, polygon, type ChainMetadata } from "thirdweb/chains";
 
export const binanceTestnet = defineChain({
  id: 97,
  rpc: "https://bsc-testnet-rpc.publicnode.com",
  blockExplorers: [
    {
      name: "BscScan",
      url: "https://testnet.bscscan.com",
    },
  ],
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "tBNB",
    decimals: 18,
  },
});

export const binance = defineChain({
  id: 56,
  rpc: "https://bsc-dataseed.binance.org",
  blockExplorers: [
    {
      name: "BscScan",
      url: "https://bscscan.com",
    },
  ],
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
  },
});

export const DEFAULT_CHAIN = process.env.NODE_ENV === 'production' ? base : base;

export const SUPPORTED_CHAINS = [base, binance, ethereum, polygon, baseSepolia];

export const DEFAULT_CHAIN_METADATA: ChainMetadata = {
  name: "Base",
  title: "Base",
  chain: "base",
  rpc: [DEFAULT_CHAIN.rpc],
  nativeCurrency: {
    name: "Base",
    symbol: "BASE",
    decimals: 18,
  },
  shortName: "base",
  chainId: DEFAULT_CHAIN.id,
  testnet: false,
  slug: "base",
};