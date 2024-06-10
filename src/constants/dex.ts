import { Percent, Token } from "@uniswap/sdk";
import { NATIVE_TOKEN_ADDRESS } from "thirdweb";
import { base, baseSepolia, ethereum, polygon } from "thirdweb/chains";

import { binance, binanceTestnet } from "~/constants/chain";

export const DEFAULT_SLIPPAGE_TOLERANCE = new Percent('50', '100');
export const COINGECKO_UNKNOWN_IMG = 'https://static.coingecko.com/s/missing_thumb_2x-38c6e63b2e37f3b16510adf55368db6d8d8e6385629f6e9d41557762b25a6eeb.png';

export const CHARTS_ENABLED = false;

export const DEFAULT_TOKEN_INPUT = {
  [ethereum.id]: new Token(
    ethereum.id,
    NATIVE_TOKEN_ADDRESS,
    18,
    "ETH",
    "Ethereum",
  ),
  [base.id]: new Token(
    base.id,
    NATIVE_TOKEN_ADDRESS,
    18,
    "ETH",
    "Ethereum",
  ),
  [baseSepolia.id]: new Token(
    base.id,
    NATIVE_TOKEN_ADDRESS,
    18,
    "ETH",
    "Ethereum",
  ),
  [binanceTestnet.id]: new Token(
    binanceTestnet.id,
    NATIVE_TOKEN_ADDRESS,
    18,
    "tBNB",
    "Binance Coin",
  ),
  [binance.id]: new Token(
    binance.id,
    NATIVE_TOKEN_ADDRESS,
    18,
    "BNB",
    "Binance Coin",
  ),
  [polygon.id]: new Token(
    polygon.id,
    NATIVE_TOKEN_ADDRESS,
    18,
    "MATIC",
    "Polygon",
  ),
}

export const DEFAULT_TOKEN_OUTPUT = {
  [ethereum.id]: new Token(
    ethereum.id,
    '0xaecc217a749c2405b5ebc9857a16d58bdc1c367f',
    9,
    'PAWTH',
    'Pawthereum',
  ),
  [base.id]: new Token(
    base.id,
    '0xf6e932ca12afa26665dc4dde7e27be02a7c02e50',
    18,
    'MOCHI',
    'Mochi',
  ),
  [baseSepolia.id]: new Token(
    baseSepolia.id,
    '0x7236489aEF2AAcAFb2c2322681D9e53b6B795169',
    18,
    'MOCHI',
    'Mochi',
  ),
  [binanceTestnet.id]: new Token(
    binanceTestnet.id,
    '0x5356cdD9f3bA09734aE4c39eEA7a3666F9e91380',
    18,
    'MOCHI',
    'Mochi',
  ),
  [binance.id]: new Token(
    binance.id,
    '0x409e215738e31d8ab252016369c2dd9c2008fee0',
    9,
    'PAWTH',
    'Pawthereum',
  ),
  [polygon.id]: new Token(
    polygon.id,
    '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    6,
    'USDC',
    'US Dollar Coin',
  ),
}

export const SUPPORTED_TOKENS = {
  [binanceTestnet.id]: [
    {
      address: "0x5356cdD9f3bA09734aE4c39eEA7a3666F9e91380",
      name: "Mochi",
      symbol: "MOCHI",
      icon: "https://assets.coingecko.com/coins/images/33083/standard/mochi200.png?1703024216",
    },
  ],
  [base.id]: [
    {
      address: '0xf6e932ca12afa26665dc4dde7e27be02a7c02e50',
      name: 'MOCHI',
      symbol: 'Mochi',
      icon: "https://assets.coingecko.com/coins/images/33083/standard/mochi200.png?1703024216",
    },
  ],
  [baseSepolia.id]: [
    {
      address: '0xf6e932ca12afa26665dc4dde7e27be02a7c02e50',
      name: 'MOCHI',
      symbol: 'Mochi',
      icon: "https://assets.coingecko.com/coins/images/33083/standard/mochi200.png?1703024216",
    },
  ],
  [binance.id]: [
    {
      address: '0x409e215738e31d8ab252016369c2dd9c2008fee0',
      name: 'PAWTH',
      symbol: 'Pawthereum',
      icon: "https://assets.coingecko.com/coins/images/19275/thumb/pawth.png?1635127429",
    },
  ],
  [polygon.id]: [
    {
      address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      name: 'US Dollar Coin',
      symbol: 'USDC',
      icon: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    }
  ]
}