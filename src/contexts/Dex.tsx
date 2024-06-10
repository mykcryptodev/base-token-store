import { type Percent, type Token, TokenAmount, type Trade } from "@uniswap/sdk";
import { createContext } from "react";

import { DEFAULT_CHAIN } from "~/constants/chain";
import { DEFAULT_SLIPPAGE_TOLERANCE, DEFAULT_TOKEN_INPUT, DEFAULT_TOKEN_OUTPUT } from "~/constants/dex";
import { type PairData } from "~/types/dex";
import { type KyberswapApiResponse } from "~/types/kyberswap";

type IDexContext = {
  tokenInput: Token;
  tokenOutput: Token;
  updateTokenInput: (token: Token) => void;
  updateTokenOutput: (token: Token) => void;
  tokenInputAmount: TokenAmount,
  tokenOutputAmount: TokenAmount,
  updateTokenInputAmount: (tokenAmount: TokenAmount) => void,
  updateTokenOutputAmount: (tokenAmount: TokenAmount) => void,
  updateUsdIn: (usdIn: string) => void,
  swapSimply: boolean,
  updateSwapSimply: (swapSimply: boolean) => void,
  nonNativeTokenInSwap: Token,
  trade: Trade | undefined,
  tradeError: string | undefined,
  slippageTolerance: Percent,
  updateSlippageTolerance: (slippageTolerance: Percent) => void,
  isExactIn: boolean,
  updateIsExactIn: (isExactIn: boolean) => void,
  requiresSwapApproval: boolean,
  pairData: PairData | undefined,
  pairDataIsLoading: boolean,
  tokensSwappedInputAt: number,
  updateTokensSwappedInputsAt: (timestamp: number) => void,
  swapRoute: undefined | KyberswapApiResponse;
  simpleSwapRoute: undefined | KyberswapApiResponse;
}
const defaultState = {
  tokenInput: DEFAULT_TOKEN_INPUT[DEFAULT_CHAIN.id]!,
  tokenOutput: DEFAULT_TOKEN_OUTPUT[DEFAULT_CHAIN.id]!,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateTokenInput: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateTokenOutput: () => {},
  tokenInputAmount: new TokenAmount(DEFAULT_TOKEN_INPUT[DEFAULT_CHAIN.id]!, '0'),
  tokenOutputAmount: new TokenAmount(DEFAULT_TOKEN_OUTPUT[DEFAULT_CHAIN.id]!, '0'),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateTokenInputAmount: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateTokenOutputAmount: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateUsdIn: () => {},
  swapSimply: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateSwapSimply: () => {},
  nonNativeTokenInSwap: DEFAULT_TOKEN_OUTPUT[DEFAULT_CHAIN.id]!,
  trade: undefined,
  tradeError: undefined,
  slippageTolerance: DEFAULT_SLIPPAGE_TOLERANCE,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateSlippageTolerance: () => {},
  isExactIn: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateIsExactIn: () => {},
  requiresSwapApproval: false,
  pairData: undefined,
  pairDataIsLoading: true,
  tokensSwappedInputAt: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateTokensSwappedInputsAt: () => {},
  swapRoute: undefined,
  simpleSwapRoute: undefined,
}

const DexContext = createContext<IDexContext>(defaultState);

export default DexContext;