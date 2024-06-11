import { base, type ChainMetadata } from "thirdweb/chains";

export const DEFAULT_CHAIN = process.env.NODE_ENV === 'production' ? base : base;

export const SUPPORTED_CHAINS = [base];

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