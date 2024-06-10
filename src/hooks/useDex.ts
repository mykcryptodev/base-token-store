import { Pair, type Percent, type Token, TokenAmount, Trade } from '@uniswap/sdk';
import { useCallback,useContext,useEffect, useMemo, useState } from 'react';
import { ADDRESS_ZERO, getContract,NATIVE_TOKEN_ADDRESS } from 'thirdweb';
import { useActiveAccount } from 'thirdweb/react';
import { parseEther } from 'viem';

import { ROUTER } from '~/constants/addresses';
import { DEFAULT_CHAIN } from '~/constants/chain';
import { DEFAULT_SLIPPAGE_TOLERANCE, DEFAULT_TOKEN_INPUT, DEFAULT_TOKEN_OUTPUT } from '~/constants/dex';
import ActiveChainContext from '~/contexts/ActiveChain';
import wethOrToken from '~/helpers/wethOrToken';
import useDebounce from '~/hooks/useDebounce';
import usePrevious from '~/hooks/usePrevious';
import { client } from '~/providers/Thirdweb';
import { allowance } from '~/thirdweb/97/0x514bb83a97fb2240d8081ff1e8d76b657731d469';
import { api } from '~/utils/api';

const useDex = () => {
  const { activeChain } = useContext(ActiveChainContext);
  const account = useActiveAccount();
  const [tokenInput, setTokenInput] = useState<Token>(DEFAULT_TOKEN_INPUT[DEFAULT_CHAIN.id]!);
  const [tokenOutput, setTokenOutput] = useState<Token>(DEFAULT_TOKEN_OUTPUT[DEFAULT_CHAIN.id]!);
  const [tokenInputAmount, setTokenInputAmount] = useState<TokenAmount>(new TokenAmount(wethOrToken(tokenInput, activeChain), '0'));
  const prevTokenInputAmount = usePrevious(tokenInputAmount);
  const debouncedTokenInputAmount = useDebounce(tokenInputAmount, 500);
  const [tokenOutputAmount, setTokenOutputAmount] = useState<TokenAmount>(new TokenAmount(wethOrToken(tokenOutput, activeChain), '0'));
  const [usdIn, setUsdIn] = useState<string>('0');
  const [swapSimply, setSwapSimply] = useState<boolean>(true);
  const prevTokenOutputAmount = usePrevious(tokenOutputAmount);
  const [isExactIn, setIsExactIn] = useState<boolean>(true); // true = exact in, false = exact out
  const [trade, setTrade] = useState<Trade | undefined>();
  const [tradeError, setTradeError] = useState<string | undefined>(undefined);
  const [slippageTolerance, setSlippageTolerance] = useState<Percent>(DEFAULT_SLIPPAGE_TOLERANCE);
  const tokenInputContract = getContract({
    client,
    chain: activeChain,
    address: tokenInput.address,
  });
  const [requiresSwapApproval, setRequiresSwapApproval] = useState<boolean>(false);

  const { data: pairData, isLoading: pairDataIsLoading, error: pairDataError } = api.dex.getPairData.useQuery({
    chainId: activeChain.id,
    token0: wethOrToken(tokenInput, activeChain).address,
    token1: wethOrToken(tokenOutput, activeChain).address,
  });
  const [tokensSwappedInputAt, setTokensSwappedInputAt] = useState<number>(0);

  const { data: etherPrice } = api.dex.getEtherPrice.useQuery({
    chainId: activeChain.id,
  });

  const usdInEther = useMemo(() => {
    return etherPrice ? Number(usdIn) / Number(etherPrice) : 0;
  }, [usdIn, etherPrice]);
  console.log({ usdInEther, usdIn })

  const { data: simpleSwapRoute } = api.kyberswap.getSwapRoute.useQuery({
    chainId: activeChain.id,
    tokenIn: NATIVE_TOKEN_ADDRESS,
    tokenOut: tokenOutput.address,
    amountIn: parseEther(usdInEther.toString()).toString(),
  }, {
    enabled: swapSimply,
  });

  const { data: swapRoute } = api.kyberswap.getSwapRoute.useQuery({
    chainId: activeChain.id,
    tokenIn: tokenInput.address,
    tokenOut: tokenOutput.address,
    amountIn: tokenInputAmount.raw.toString(),
  }, {
    enabled: !swapSimply,
  });

  console.log({ swapRoute, simpleSwapRoute, amountInUsdToEther: parseEther(usdInEther.toString()).toString(), slippageTolerance, slippy: Number(slippageTolerance.toFixed(2)) * 100 });

  const nonNativeTokenInSwap = useMemo(() => {
    return tokenInput.address.toLowerCase() === NATIVE_TOKEN_ADDRESS.toLowerCase()
      ? tokenOutput
      : tokenInput;
  }, [tokenInput, tokenOutput]);

  // update the trade error when the listed token error changes
  useEffect(() => {
    if (pairDataError) {
      setTradeError(pairDataError.message);
    }
  }, [pairDataError]);

  // update the tokens themselves
  const updateTokenInput = useCallback((token: Token) => {
    setTokenInput(token);
    setTokenInputAmount(new TokenAmount(wethOrToken(token, activeChain), ''));
  }, [activeChain]);
  const updateTokenOutput = useCallback((token: Token) => {
    setTokenOutput(token);
    setTokenOutputAmount(new TokenAmount(wethOrToken(token, activeChain), ''));
  }, [activeChain]);

  // update the token amounts
  const updateTokenInputAmount = (amount: TokenAmount) => {
    const rawAmount = amount.raw.toString();
    setTokenInputAmount(new TokenAmount(wethOrToken(tokenInput, activeChain), rawAmount));
  }
  const updateTokenOutputAmount = (amount: TokenAmount) => {
    const rawAmount = amount.raw.toString();
    setTokenOutputAmount(new TokenAmount(wethOrToken(tokenOutput, activeChain), rawAmount));
  }

  const updateUsdIn = (usdIn: string) => {
    setUsdIn(usdIn);
  }

  const updateSwapSimply = (swapSimply: boolean) => {
    setSwapSimply(swapSimply);
  }

  // update slippage
  const updateSlippageTolerance = (slippageTolerance: Percent) => {
    setSlippageTolerance(slippageTolerance);
  }

  // update the trade type
  const updateIsExactIn = (isExactIn: boolean) => {
    setIsExactIn(isExactIn);
  }

  // update the last time tokens swapped positions
  const updateTokensSwappedInputsAt = (timestamp: number) => {
    setTokensSwappedInputAt(timestamp);
  }

  // check if the user has approved the router to spend their tokens
  useEffect(() => {
    const checkApproval = async () => {
      try {
        if (!account?.address || !tokenInputContract) {
          return;
        }
        const allowanceOf = await allowance({
          contract: tokenInputContract,
          arg_0: account.address,
          arg_1: ROUTER[activeChain.id]!,
        });
        const allowanceTokenAmount = new TokenAmount(wethOrToken(tokenInput, activeChain), allowanceOf?.toString() ?? '0');
        const requiresSwapApproval = allowanceTokenAmount.lessThan(debouncedTokenInputAmount);
        setRequiresSwapApproval(requiresSwapApproval);
        setTradeError(undefined);
      } catch (error) {
        console.error(error);
        setTradeError("Error checking approval");
      }
    }
    if (account?.address && tokenInputContract && tokenInput.address.toLowerCase() !== NATIVE_TOKEN_ADDRESS.toLowerCase()) {
      void checkApproval();
    }
  }, [debouncedTokenInputAmount, activeChain.id, tokenInputContract, tokenInput, activeChain, account?.address]);

  // update default in and out on chain changes
  useEffect(() => {
    updateTokenInput(DEFAULT_TOKEN_INPUT[activeChain.id]!);
    updateTokenOutput(DEFAULT_TOKEN_OUTPUT[activeChain.id]!);
  }, [activeChain.id, updateTokenInput, updateTokenOutput]);

  // update the trade
  useEffect(() => {
    const createTrade = () => {
      try {
        if (!pairData?.reserves) {
          setTradeError('No reserves');
          return;
        }
        const reserve0 = BigInt(pairData.reserves[0]);
        const reserve1 = BigInt(pairData.reserves[1]);
        const tokens = [wethOrToken(tokenInput, activeChain), wethOrToken(tokenOutput, activeChain)] as [Token, Token];
        const [token0, token1] = (tokens[0]).sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]] as [Token, Token];
        const pair = new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString())); 
        console.log({ pair, pairData: pairData.pairAddress, token0, reserve0: reserve0.toString(), token1, reserve1: reserve1.toString() });   

        const trades = isExactIn 
          ? Trade.bestTradeExactIn([pair], tokenInputAmount, wethOrToken(tokenOutput, activeChain), { maxHops: 3 })
          : Trade.bestTradeExactOut([pair], wethOrToken(tokenInput, activeChain), tokenOutputAmount, { maxHops: 3 });
        setTradeError(undefined);
        setTrade(trades[0]);
      } catch (error) {
        type TradeError = {
          name: string;
          message?: string;
        }
        const tradeError = error as TradeError;
        setTradeError(tradeError.message ?? tradeError.name);
      }
    }
    if (pairData?.reserves && tokenInput && tokenOutput && tokenInputAmount && tokenOutputAmount) {
      const inputsOrOutputsChanged = !prevTokenInputAmount?.equalTo(tokenInputAmount) || !prevTokenOutputAmount?.equalTo(tokenOutputAmount);
      if (inputsOrOutputsChanged) {
        void createTrade();
      }
    }
  }, [tokenInput, tokenOutput, tokenInputAmount, tokenOutputAmount, isExactIn, pairData?.reserves, activeChain.id, prevTokenInputAmount, prevTokenOutputAmount, activeChain, pairData?.pairAddress])

  return {
    tokenInput,
    tokenOutput,
    updateTokenInput,
    updateTokenOutput,
    tokenInputAmount,
    tokenOutputAmount,
    updateTokenInputAmount,
    updateTokenOutputAmount,
    updateUsdIn,
    updateSwapSimply,
    swapSimply,
    nonNativeTokenInSwap,
    trade,
    slippageTolerance,
    updateSlippageTolerance,
    isExactIn,
    updateIsExactIn,
    tradeError,
    requiresSwapApproval,
    pairData: pairData ? pairData : {
      pairAddress: ADDRESS_ZERO,
      error: null,
      reserves: [BigInt(0), BigInt(0), 0] as readonly [bigint, bigint, number],
    },
    pairDataIsLoading,
    tokensSwappedInputAt,
    updateTokensSwappedInputsAt,
    swapRoute,
    simpleSwapRoute,
  }
}

export default useDex;