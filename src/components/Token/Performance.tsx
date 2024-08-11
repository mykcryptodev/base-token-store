import { useMemo, useState, type FC } from "react";
import { base } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";
import { api } from "~/utils/api";
import { toDecimalPlace } from "~/helpers/toDecimalPlace";
import { type TokenDetailResponse } from "~/types/coingecko";
import { type NFT } from "thirdweb";

type Props = {
  tokenInfo: TokenDetailResponse | undefined;
  referralNft?: (Omit<NFT, 'id'> & { id: string }) | null;
}

export const Performance: FC<Props> = ({ tokenInfo, referralNft }) => {
  const account = useActiveAccount();
  const timeframes = ["30d", "60d", "90d", "All"] as const;
  const [activeTimeframe, setActiveTimeframe] = useState<string>(timeframes[0]);
  const addressToTrackPerformance = referralNft?.owner ?? account?.address ?? "";
  console.log({addressToTrackPerformance})
  const { 
    data: performance, 
    isLoading, 
  } = api.moralis.getWalletPerformance.useQuery({
    address: addressToTrackPerformance,
    chainId: base.id,
    days: activeTimeframe.replace('d', '').toLowerCase(),
    tokens: [tokenInfo?.platforms?.base ?? ""],
  }, {
    enabled: !!addressToTrackPerformance && !!tokenInfo?.platforms?.base,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const tokenPerformance = useMemo(() => {
    if (!performance) return null;
    const basePlatform = tokenInfo?.platforms?.base;
    if (!basePlatform) return null;
    return performance?.result?.find((item) => item.token_address.toLowerCase() === basePlatform.toLowerCase());
  }, [tokenInfo?.platforms, performance]);

  console.log({ isLoading, tokenPerformance, referralNft, account })
  if (!isLoading && !tokenPerformance) return (
    <div className="h-40 flex items-center justify-center w-full">
      <div className="opacity-50 text-center">No performance data available</div>
    </div>
  );
  
  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold sm:text-lg flex items-center justify-between">
        <div>{referralNft?.metadata.name ? `${referralNft.metadata.name}'s` : 'Your'} Performance</div>
        <div role="tablist" className="tabs tabs-boxed sm:tabs-sm tabs-xs">
          {timeframes.map((timeframe) => (
            <a 
              key={timeframe} 
              role="tab" 
              onClick={() => setActiveTimeframe(timeframe)}
              className={`tab ${timeframe === activeTimeframe ? 'tab-active' : ''}`}
            >
              {timeframe}
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between">
          <span>Realized Profit</span>
          {tokenPerformance ? (
            <span>${toDecimalPlace(tokenPerformance.realized_profit_usd, 2)}</span>
          ) : (
            <span className="w-32 h-6 bg-base-200 animate-pulse rounded-lg" />
          )}
        </div>
        <div className="flex justify-between">
          <span>Realized Profit %</span>
          {tokenPerformance ? (
            <span>{tokenPerformance.realized_profit_percentage.toPrecision(2)}%</span>
          ) : (
            <span className="w-32 h-6 bg-base-200 animate-pulse rounded-lg" />
          )}
        </div>
        <div className="divider my-0" />
        <div className="flex justify-between">
          <span>Total Amount Bought</span>
          {tokenPerformance ? (
            <span>${toDecimalPlace(tokenPerformance.total_usd_invested, 2)}</span>
          ) : (
            <span className="w-32 h-6 bg-base-200 animate-pulse rounded-lg" />
          )}
        </div>
        <div className="flex justify-between">
          <span>Total Amount Sold</span>
          {tokenPerformance ? (
            <span>${toDecimalPlace(tokenPerformance.total_sold_usd, 2)}</span>
          ) : (
            <span className="w-32 h-6 bg-base-200 animate-pulse rounded-lg" />
          )}
        </div>
        <div className="divider my-0" />
        <div className="flex justify-between">
          <span>Average Buy Price</span>
          {tokenPerformance ? (
            <span>${toDecimalPlace(tokenPerformance.avg_buy_price_usd, 2)}</span>
          ) : (
            <span className="w-32 h-6 bg-base-200 animate-pulse rounded-lg" />
          )}
        </div>
        <div className="flex justify-between">
          <span>Average Sell Price</span>
          {tokenPerformance ? (
            <span>${toDecimalPlace(tokenPerformance.avg_sell_price_usd, 2)}</span>
          ) : (
            <span className="w-32 h-6 bg-base-200 animate-pulse rounded-lg" />
          )}
        </div>
        <div className="divider my-0" />
        <div className="flex justify-between">
          <span>Number of Buys</span>
          {tokenPerformance ? (
            <span>{tokenPerformance.total_buys}</span>
          ) : (
            <span className="w-32 h-6 bg-base-200 animate-pulse rounded-lg" />
          )}
        </div>
        <div className="flex justify-between">
          <span>Number of Sells</span>
          {tokenPerformance ? (
            <span>{tokenPerformance.total_sells}</span>
          ) : (
            <span className="w-32 h-6 bg-base-200 animate-pulse rounded-lg" />
          )}
        </div>
      </div>
    </div>
  )
};

export default Performance;