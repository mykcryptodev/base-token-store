import { base, baseSepolia, ethereum, polygon } from "thirdweb/chains";

import { binance, binanceTestnet } from "~/constants/chain";

type ContractAddress = Record<number, string>
export const WETH: ContractAddress = {
  [ethereum.id]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  [baseSepolia.id]: "0x4200000000000000000000000000000000000006",
  [base.id]: "0x4200000000000000000000000000000000000006",
  [binanceTestnet.id]: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
  [binance.id]: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  [polygon.id]: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
};

export const FACTORY: ContractAddress = {
  [ethereum.id]: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f", // uni
  [base.id]: "0x71524B4f93c58fcbF659783284E38825f0622859", // sushi
  [baseSepolia.id]: "0xC3203CE26Ecd02f63681D4c0a9b902a2E6383ff0", // uni
  [binanceTestnet.id]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4", // sushi
  [binance.id]: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73", // pancakeswap
  [polygon.id]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4", // sushi
}

export const ROUTER: ContractAddress = {
  [ethereum.id]: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // uni
  [base.id]: "0x6BDED42c6DA8FBf0d2bA55B2fa120C5e0c8D7891", // sushi
  [baseSepolia.id]: "0x233Dd9b3E4569Ebb3760FaF59FDa12fAC34B7672", // uni
  [binanceTestnet.id]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", // sushi
  [binance.id]: "0x10ED43C718714eb63d5aA57B78B54704E256024E", // pancakeswap
  [polygon.id]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", // sushi
}

export const SMART_WALLET_FACTORY: ContractAddress = {
  [base.id]: '0x7d51950913147e0d464dee1a07c49ca7a2e1b17d',
  [baseSepolia.id]: '0x0b6d891DcA65eD409af14758aAF2A5516E7Ee183',
  [binanceTestnet.id]: "0xd5c9Ca7adD5c6E55e24d0d97fE6C491d0f4276A9",
  [binance.id]: "0xddfE3Bb8629a8B7049abA4AA82c4bf9f945f4d4B",
  [polygon.id]: "0x3882A2c2eB5ad48bbe1a8DECd7D6d72F1F5Bae17",
}