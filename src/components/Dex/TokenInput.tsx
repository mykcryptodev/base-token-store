import { TokenAmount } from "@uniswap/sdk";
import { type FC,useContext,useMemo, useRef } from "react";
import { ADDRESS_ZERO, type Chain, NATIVE_TOKEN_ADDRESS, toTokens, toUnits } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";

import TokenPicker from "~/components/Dex/TokenPicker";
import ActiveChainContext from "~/contexts/ActiveChain";
import DexContext from "~/contexts/Dex";
import { api } from "~/utils/api";

type Props = {
  isInput: boolean;
  hideTopLabel?: boolean;
  isDisabled?: boolean;
  disableTokenPicker?: boolean;
  isLoading?: boolean;
  overrideAmount?: string;
  overrideUsdAmount?: string;
  chain?: Chain;
}

export const TokenInput: FC<Props> = ({ isInput, hideTopLabel, isDisabled, isLoading, overrideAmount, overrideUsdAmount, chain, disableTokenPicker }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { activeChain } = useContext(ActiveChainContext);
  const tokenChain = chain ?? activeChain;
  const { data: etherPrice } = api.dex.getEtherPrice.useQuery({
    chainId: tokenChain.id,
  });

  const { 
    tokenInput, 
    tokenOutput,
    updateTokenInput, 
    updateTokenOutput,
    updateTokenInputAmount,
    updateTokenOutputAmount,
    isExactIn,
    updateIsExactIn,
    trade,
    tokensSwappedInputAt,
  } = useContext(DexContext);
  const account = useActiveAccount();

  const isEditable = useMemo(() => {
    if (isExactIn && isInput) {
      return true;
    }
    if (!isExactIn && !isInput) {
      return true;
    }
  }, [isExactIn, isInput]);

  const tradeAmount = useMemo(() => {
    // if there is an override provided and this is not editable, return the override
    if (overrideAmount) {
      return toTokens(BigInt(overrideAmount), isInput ? tokenInput.decimals : tokenOutput.decimals).toString();
    }
    // if the tokensSwappedInputAt is within 300ms, return 0
    if (tokensSwappedInputAt && Date.now() - tokensSwappedInputAt < 300) {
      // set the ref value to 0
      if (inputRef.current) {
        inputRef.current.value = '0';
      }
      return '0';
    }
    if (!trade) return;
    if (isExactIn && !isInput) {      
      return trade?.outputAmount.toSignificant(tokenOutput.decimals, { groupSeparator: ',' }) ?? '0';
    }
    if (!isExactIn && isInput) {
      return trade?.inputAmount.toSignificant(tokenInput.decimals, { groupSeparator: ',' });
    }
  }, [overrideAmount, tokensSwappedInputAt, trade, isExactIn, isInput, tokenOutput.decimals, tokenInput.decimals]);

  const handleAmountChange = (amount: string) => {
    if (!isEditable) return;
    // Don't allow negative numbers
    if (amount.startsWith('-')) {
      return;
    }    
    // Enforce max 18 decimals
    if (amount.includes('.')) {
      const parts = amount.split('.');
      const decimals = parts[1];
      // If more than 18 decimal places, truncate
      if (decimals?.length && decimals.length > 18) {
        amount = parts[0]! + '.' + decimals.substring(0, 18);
      }
    }
    if (isInput) {
      const etherAmount = !amount ? '0' : toUnits(amount, tokenInput.decimals).toString();
      void updateTokenInputAmount(
        new TokenAmount(tokenInput, etherAmount),
      );
    } else {
      const etherAmount = !amount ? '0' : toUnits(amount, tokenOutput.decimals).toString();
      void updateTokenOutputAmount(
        new TokenAmount(tokenOutput, etherAmount),
      );
    }
  }

  // focusing on the input changes isExactIn to true or false
  const handleFocus = () => {
    if (!isExactIn && isInput) {
      void updateIsExactIn(true);
    }
    if (isExactIn && !isInput) {
      void updateIsExactIn(false);
    }
  }

  const isEth = useMemo(() => {
    if (isInput) {
      return tokenInput.address.toLowerCase() === NATIVE_TOKEN_ADDRESS.toLowerCase();
    } else {
      return tokenOutput.address.toLowerCase() === NATIVE_TOKEN_ADDRESS.toLowerCase();
    }
  }, [isInput, tokenInput, tokenOutput]);
  
  const amount = useMemo(() => {
    if (!isEditable && overrideAmount) {
      if (isInput) {
        return new TokenAmount(
          tokenInput, 
          overrideAmount
        );
      }
      return new TokenAmount(
        tokenOutput, 
        overrideAmount
      );
    }
    if (isInput) {
      return trade?.inputAmount;
    } else {
      return trade?.outputAmount;
    }
  }, [isEditable, isInput, overrideAmount, tokenInput, tokenOutput, trade?.inputAmount, trade?.outputAmount]);

  const etherPriceAmount = useMemo(() => {
    if (etherPrice && isEth && amount) {
      const etherPriceNum = Number(etherPrice);
      const amountNum = amount?.toSignificant() ? Number(amount.toSignificant(amount.currency.decimals)) : 0;
      return etherPriceNum * amountNum;
    }
  }, [amount, etherPrice, isEth]);

  const { data: balance } = api.dex.getBalanceForToken.useQuery({
    chainId: tokenChain.id,
    token: isInput ? tokenInput : tokenOutput,
    address: account?.address ?? ADDRESS_ZERO,
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="rounded-xl p-2">
      <div className="stat px-2 pb-0">
        <div className="stat-figure">
          <TokenPicker
            id={isInput ? 'tokenInput' : 'tokenOutput'}
            disabled={disableTokenPicker}
            chain={tokenChain}
            callback={(token) => {
              if (isInput) {
                void updateTokenInput(token);
              } else {
                void updateTokenOutput(token);
              }
            }}
            noTokenIconLink={true}
            selectedToken={isInput ? tokenInput : tokenOutput}
          />
        </div>
        {hideTopLabel ? null : (
          <div className="stat-title text-xs">
            {isInput ? 'Sell' : 'Buy'}
          </div>
        )}
        {isLoading ? (
          <div className="h-8 my-2 w-32 bg-base-300 animate-pulse rounded-lg" />
        ) : (
          <div className="stat-value">
            <input 
              ref={isInput ? inputRef : undefined}
              className={`input w-full bg-transparent focus:outline-0 focus:border-0 text-2xl ${isLoading ? 'animate-pulse' : ''}`}
              style={{ 
                paddingLeft: '0px',
                ...isDisabled ? { background: 'transparent', color: 'inherit', border: 'none' } : {},
              }}
              placeholder="0.0"
              min="0"
              disabled={isDisabled}
              onFocus={() => void handleFocus()}
              inputMode="decimal"
              type={isEditable ? 'number' : 'text'}
              onChange={(e) => void handleAmountChange(e.target.value)}
              {...isEditable ? {} : { value: amount?.toSignificant(undefined, {
                groupSeparator: ',',
              }) ?? tradeAmount }}
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between w-full px-4 -mt-2 pb-2">
        {overrideUsdAmount && (
          <div className="stat-desc">
            ~${Number(overrideUsdAmount).toLocaleString([], { 
              currency: 'usd', 
              minimumFractionDigits: 2,
              maximumFractionDigits: 2 
            })}
          </div>
        )}
        {(isEth && !overrideUsdAmount) ? (
          <div className="stat-desc">
            {amount && (<span>~$</span>)}
            {amount && (
              <span>
                {etherPriceAmount?.toLocaleString([], { 
                  currency: 'usd', 
                  maximumFractionDigits: 2 
                })}
              </span>
            )} 
          </div>
        ) : (<div/>)}
        <div className="stat-desc text-end">
          {
            new TokenAmount(isInput ? tokenInput : tokenOutput, balance?.toString() ?? '0')
              .toSignificant(
                isInput ? tokenInput.decimals : tokenOutput.decimals, 
                { groupSeparator: ',' }
              )
              .replace(/(\.\d{4})\d+/, "$1") // truncate to 4 decimal places
          }
        </div>
      </div>
    </div>
  )
}

export default TokenInput;