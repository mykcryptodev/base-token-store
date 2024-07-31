import { type NextPage } from "next";
import { base } from "thirdweb/chains";
import { useActiveWallet } from "thirdweb/react";
import { api } from "~/utils/api";
import Image from "next/image";
import { useRef, useState } from "react";

export const Performance: NextPage = () => {
  const wallet = useActiveWallet();
  const { data, isLoading } = api.moralis.getWalletPerformance.useQuery({
    address: wallet?.getAccount()?.address ?? "",
    chainId: base.id,
    days: "90",
  }, {
    enabled: !!wallet,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  console.log({ data });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [dragCursor, setDragCursor] = useState<string>('cursor-grab');

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollContainerRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollContainerRef.current?.scrollLeft ?? 0;
    setDragCursor('cursor-grabbing');
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    setDragCursor('cursor-grab');
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setDragCursor('cursor-grab');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.5;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };
  
  return (
    <div 
      className={`flex flex-col overflow-x-auto min-w-full ${dragCursor}`}
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className={`flex flex-nowrap items-stretch w-full gap-4 pb-6 pt-2 ${!data?.result?.length && !isLoading ? 'hidden' : ''}`}>
        {data?.result?.map((token, index) => (
          <div className={`card max-w-[236px] min-w-[200px] min-h-[300px] h-70 sm:h-96 sm:raise-on-hover overflow-hidden`} key={index}>
          <div className="absolute inset-0 bg-cover filter blur-lg " style={{ backgroundImage: `url(${token.logo})`, transform: 'scale(2)', opacity: 0.2, pointerEvents: 'none' }}></div>
          <div className="card-body p-4">
            <div className="flex w-full justify-between items-center gap-2">
              <Image 
                src={token.logo} 
                alt={token.name} 
                width={100} 
                height={100} 
                className="rounded-full w-12 h-12" 
              />
              {token.realized_profit_usd ? (
                <div className="flex flex-col">
                  <span>${token.realized_profit_usd}</span>
                  <span 
                    className={`text-right ${token.realized_profit_percentage > 0 ? 'text-success' : 'text-[#8a8d91]'}`}
                  >
                    {token.realized_profit_percentage > 0 && '+'}
                    {/* truncate % change to 1 decimal place */}
                    {token.realized_profit_percentage.toString().replace(/(\.\d{1})\d+/, "$1")}%
                  </span>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <span className="bg-base-200 w-20 h-6 rounded" />
                  <span className="bg-base-200 w-20 h-6 rounded" />
                </div>
              )}
            </div>
            <h2 className="card-title grid grid-rows-2 gap-0">
              <span className="whitespace-nowrap truncate">{token.name.replace("(Base)", "")}</span>
              <span className="text-sm opacity-75 font-normal -mt-2">${token.symbol.toLowerCase()}</span>
            </h2>
            <div className="w-full h-28 sm:h-44">
              {/* <Sparkline data={token.sparkline_in_7d.price} /> */}
            </div>
            <div className="card-actions flex flex-nowrap items-center justify-between">
              <button 
                disabled={isLoading}
                className="btn btn-secondary shadow-none hover:btn-primary hover:shadow z-10"
                // onClick={() => onAddToCart()}
              >Add to cart</button>
              {/* <TokenInfoModal token={token} /> */}
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Performance;