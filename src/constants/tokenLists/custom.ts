import { APP_NAME } from "~/constants/index";
import { type TokenList } from "~/types/tokenList";

const timestamp = new Date().toISOString();

export const customTokenList: TokenList = {
  "name": APP_NAME,
  "logoURI": "https://www.coingecko.com/assets/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png",
  "keywords": [
    "defi"
  ],
  "timestamp": timestamp,
  "tokens": [
    {
      chainId: 97,
      address: "0x5356cdD9f3bA09734aE4c39eEA7a3666F9e91380",
      name: "Mochi",
      symbol: "MOCHI",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/33083/standard/CIRCLE-200x200.png?1713297273",
    },
    {
      chainId: 8453,
      address: "0xf6e932ca12afa26665dc4dde7e27be02a7c02e50",
      name: "Mochi",
      symbol: "MOCHI",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/33083/standard/CIRCLE-200x200.png?1713297273",
    },
    {
      chainId: 8453,
      address: "0x4200000000000000000000000000000000000006",
      name: "Wrapped Ether",
      symbol: "WETH",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/2518/standard/weth.png?1696503332",
    },
    {
      chainId: 137,
      address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      name: "US Dollar Coin",
      symbol: "USDC",
      decimals: 6,
    },
    {
      chainId: 8454,
      address: "0xf6e932ca12afa26665dc4dde7e27be02a7c02e50",
      name: "Mochi",
      symbol: "MOCHI",
      decimals: 18,
      logoURI: "/images/logo.png",
    },
    {
      chainId: 1,
      address: "0xaecc217a749c2405b5ebc9857a16d58bdc1c367f",
      name: "Pawthereum",
      symbol: "PAWTH",
      decimals: 9,
      logoURI: "https://assets.coingecko.com/coins/images/33083/standard/mochi200.png?1703024216",
    }
  ],
  "version": {
    "major": 1,
    "minor": 0,
    "patch": 0
  }
}