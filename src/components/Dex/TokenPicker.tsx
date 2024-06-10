import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Token, TokenAmount } from "@uniswap/sdk";
import Image from "next/image";
import { type ChainMetadata } from "node_modules/thirdweb/dist/types/chains/types";
import { type FC,useCallback, useEffect, useMemo, useRef,useState } from "react";
import { getContract, isAddress,NATIVE_TOKEN_ADDRESS } from "thirdweb";
import { type Chain,getChainMetadata } from "thirdweb/chains";
import { getCurrencyMetadata } from "thirdweb/extensions/erc20";
import { useActiveAccount } from "thirdweb/react";

import TokenIcon from "~/components/Dex/TokenIcon";
import { Portal } from "~/components/utils/Portal";
import { DEFAULT_CHAIN_METADATA } from "~/constants/chain";
import coingeckoTokenListJson from "~/constants/tokenLists/coingecko.json";
import { customTokenList } from "~/constants/tokenLists/custom";
import useDebounce from "~/hooks/useDebounce";
import { client } from "~/providers/Thirdweb";
import { type TokenList, type TokenListToken } from "~/types/tokenList";
import { api } from "~/utils/api";

const coingeckoTokenList: TokenList = coingeckoTokenListJson;

interface TokenPickerProps {
  selectedToken: Token;
  noTokenIconLink?: boolean;
  callback: (token: Token) => void;
  disabled?: boolean;
  id: string;
  chain: Chain;
  className?: string;
  displayedWalletBalance?: string; // if passed in, token balances of this address will be displayed
}

export const TokenPicker: FC<TokenPickerProps> = ({ selectedToken, callback, disabled, id, chain, displayedWalletBalance, className, noTokenIconLink }) => {
  const account = useActiveAccount();
  // if we were passed a displayedWalletBalance, use that otherwise use the connected wallet
  const balanceAddress = useMemo(() => {
    if (displayedWalletBalance) return displayedWalletBalance;
    return account?.address ?? "";
  }, [account, displayedWalletBalance]);
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(query, 500);
  const [fetchedToken, setFetchedToken] = useState<TokenListToken | undefined>(undefined);
  const { data: fetchedTokenData, isLoading: fetchedTokenIsLoading } = api.dex.getTokenByAddressAndChain.useQuery({
    address: fetchedToken?.address ?? "",
    chainId: chain.id,
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const [chainMetadata, setChainMetadata] = useState<ChainMetadata>(DEFAULT_CHAIN_METADATA);
  useEffect(() => {
    void getChainMetadata(chain).then(setChainMetadata);
  }, [chain]);
  const { data: userTokens } = api.user.getTokenBalancesInWallet.useQuery({
    address: balanceAddress,
    chainId: chain.id,
  }, {
    enabled: !!balanceAddress,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const tokenList: TokenListToken[] = useMemo(() => {
    return [...new Set(customTokenList.tokens.concat(
      coingeckoTokenList.tokens
    ).concat(
      userTokens ?? []
    ))];
  }, [userTokens]);

  useEffect(() => {
    if (!isAddress(debouncedQuery)) return;
    try {
      const fetchedTokenContract = getContract({
        client,
        chain,
        address: debouncedQuery,
      });
      void getCurrencyMetadata({
        contract: fetchedTokenContract,
      }).then((metadata) => {
        if (!metadata) return;
        setFetchedToken({
          name: metadata.name ?? "Unknown Token",
          address: fetchedTokenContract.address,
          symbol: metadata.symbol ?? "UNKNOWN",
          decimals: metadata.decimals,
          logoURI: undefined,
          chainId: chain.id,
        });
      });
    } catch (e) {
      console.error('error fetching token metadata', e);
    }
  }, [chain, chain.id, debouncedQuery]);

  useEffect(() => {
    if (!fetchedTokenData) return;
    setFetchedToken({
      name: fetchedTokenData.name ?? "Unknown Token",
      address: fetchedTokenData.address,
      symbol: fetchedTokenData.symbol ?? "UNKNOWN",
      decimals: fetchedTokenData.decimals,
      logoURI: undefined,
      chainId: chain.id,
    })
  }, [chain.id, fetchedTokenData]);

  const selectToken = (token: Token) => {
    callback(new Token(
      chain.id,
      token.address,
      token.decimals,
      token.symbol,
      token.name
    ));
    document.getElementById(`token-picker-modal-${id}`)?.click();
  };

  const featuredCurrencies = [
    new Token(
      chain.id,
      NATIVE_TOKEN_ADDRESS,
      chainMetadata.nativeCurrency.decimals,
      chainMetadata.nativeCurrency.symbol,
      chainMetadata.nativeCurrency.name,
    ),
    new Token(
      8453 as number,
      "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      6,
      'USDC',
      'US Dollar Coin',
    ),
  ];

  const [itemsToShow, setItemsToShow] = useState<number>(20);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const target = modalContentRef.current;
    console.log({ target });
    if (target) {
      const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
      console.log("bottom check", bottom)
      if (bottom) {
        console.log({ bottom });
        setItemsToShow((prevItemsToShow) => prevItemsToShow + 10);
      }
    }
  }, []);

  useEffect(() => {
    const modalContent = modalContentRef.current;
    if (modalContent) {
      modalContent.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      if (modalContent) {
        modalContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    console.log("useEffect called");
    const modalContent = modalContentRef.current;
    console.log("Modal content ref:", modalContent);
  
    if (modalContent) {
      console.log("Modal content is not null");
    }
  }, []);

  // Modify the slice method to use itemsToShow state
  const visibleTokens = useMemo(() => tokenList.filter(token => 
    token.chainId === chain.id && 
    token.address.toLowerCase() !== selectedToken.address.toLowerCase()
  ).filter(token => 
    token.symbol.toLowerCase().includes(query.toLowerCase()) || 
    token.name.toLowerCase().includes(query.toLowerCase()) || 
    token.address.toLowerCase().includes(query.toLowerCase())
  ).slice(0, itemsToShow), [itemsToShow, query, tokenList, selectedToken.address, chain.id]);


  interface UserTokenBalanceProps {
    token: Token;
  }
  const UserTokenBalance: FC<UserTokenBalanceProps> = ({ token }) => {
    const { data: tokenBalance, isLoading } = api.dex.getBalanceForToken.useQuery({
      token: {
        address: token.address,
        name: token.name,
        symbol: token.symbol,
        decimals: token.decimals,
      },
      address: balanceAddress,
      chainId: chain.id,
    });
    const tokenBalanceAmount = useMemo(() => {
      return new TokenAmount(
        token,
        tokenBalance ?? '0',
      );
    }, [token, tokenBalance]);

    if (isLoading) return (
      <div className="h-4 w-24 bg-base-200 animate-pulse rounded-lg" />
    )

    if (!tokenBalance) return null;

    return (
      <div className="text-sm">{tokenBalanceAmount.toSignificant(6, { groupSeparator: "," })}</div>
    )
  }

  interface TokenOptionProps {
    token: TokenListToken | undefined;
    showBalance: boolean;
  }
  const TokenOption: FC<TokenOptionProps> = ({ token, showBalance }) => {
    if (!token) return null;
    return (
      <div className="flex items-center justify-between py-2">
        <div className="flex items-start">
          {token.logoURI ? (
            <Image
              src={token.logoURI}
              alt={token.symbol}
              width={24}
              height={24}
              className="rounded-lg"
            />
          ) : (
            <TokenIcon
              token={new Token(
                chain.id,
                token.address,
                token.decimals,
                token.symbol,
                token.name
              )}
              noLink={noTokenIconLink}
              className="h-5 w-5 mt-1"
              style={{ height: '1.25rem', width: '1.25rem' }}
            />
          )}
          <div className="ml-2 flex flex-col">
            <div>{token.symbol}</div>
            <div className="text-sm">{token.name}</div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {(!token.balance && showBalance) ? (
            <UserTokenBalance 
              key={token.address} 
              token={new Token(
                chain.id,
                token.address,
                token.decimals,
                token.symbol,
                token.name
              )}
            />
          ) : (
            <div className="text-sm">{
              new TokenAmount(new Token(
                chain.id,
                token.address,
                token.decimals,
                token.symbol,
                token.name
              ), token.balance ?? '0').toSignificant(undefined, { groupSeparator: "," })
            }</div>
          )}
          <button
            className="btn btn-primary"
            onClick={() => selectToken(new Token(
              token.chainId,
              token.address,
              token.decimals,
              token.symbol,
              token.name
            ))}
          >
            Select
          </button>
        </div>
      </div>
    )
  }
  return (
    <div>
      <label htmlFor={`${disabled ? '' : `token-picker-modal-${id}`}`}>
        <div className={`flex items-center cursor-pointer ${className ?? ""}`}>
          {userTokens?.find(t => t.address.toLowerCase() === selectedToken.address.toLowerCase()) ? (
            <Image
              src={userTokens?.find(t => t.address.toLowerCase() === selectedToken.address.toLowerCase())?.thumbnail ?? ''}
              alt="Verified"
              width={16}
              height={16}
            />
          ) : (
            <TokenIcon
              token={selectedToken}
              className="h-5 w-5"
              style={{ height: '1.25rem', width: '1.25rem' }}
              noLink={noTokenIconLink}
            />
          )}
          <span className="ml-2">{selectedToken.symbol}</span>
          {!disabled && (<ChevronDownIcon className="h-4 w-4 stroke-2" />)}
        </div>
      </label>

      <Portal>
        <input type="checkbox" id={`token-picker-modal-${id}`} className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box h-96 relative">
            <label htmlFor={`token-picker-modal-${id}`} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
              <XMarkIcon className="h-4 w-4" />
            </label>
            <h3 className="font-bold text-lg">Select token</h3>
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input input-bordered w-full my-4"
              placeholder="Search token"
            />
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {featuredCurrencies.filter(t => t.chainId as number === chain.id).map((token) => (
                <button 
                  key={token.address} 
                  className={`btn ${token.address.toLowerCase() === selectedToken.address.toLowerCase() ? 'btn-primary' : 'btn-outline'} mb-4`}
                  onClick={() => selectToken(token)}
                >
                  {token.symbol}
                </button>
              ))}
            </div>
            {/* {tokenList.filter(token => 
              token.chainId === chain.id && 
              token.address.toLowerCase() !== selectedToken.address.toLowerCase()
            ).filter(token => 
              token.symbol.toLowerCase().includes(query.toLowerCase()) || 
              token.name.toLowerCase().includes(query.toLowerCase()) || 
              token.address.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 10)
            .map((token, i) => (
              <TokenOption key={token.address} token={token} showBalance={i < 10} />
            ))} */}
            <div ref={modalContentRef} className="min-h-96 overflow-y-auto">
              {visibleTokens.map((token, i) => (
                <TokenOption key={token.address} token={token} showBalance={i < 10} />
              ))}
            </div>
            {fetchedTokenIsLoading ? (
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="avatar w-5 h-5 bg-base-200 rounded-full animate-pulse" />
                  <div className="w-full ml-2 flex flex-col gap-2">
                    <div className="w-16 h-4 bg-base-200 animate-pulse rounded-lg" />
                    <div className="w-32 h-4 bg-base-200 animate-pulse rounded-lg" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-24 bg-base-200 animate-pulse rounded-lg" />
                  <div className="h-12 w-24 bg-base-200 animate-pulse rounded-lg" />
                </div>
              </div>
            ) : (
              <TokenOption token={fetchedToken} showBalance={true} />
            )}
          </div>
        </div>
      </Portal>
    </div>
  )
}

export default TokenPicker;