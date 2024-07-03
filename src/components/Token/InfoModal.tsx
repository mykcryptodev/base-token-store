import { useState, type FC } from "react";
import { Portal } from "~/components/utils/Portal";
import { api } from "~/utils/api";
import Image from "next/image";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCartContext } from "~/contexts/Cart";
import { type CartItem } from "~/hooks/useCart";
import { type TokenListResponse } from "~/types/coingecko";

type Props = {
  token: TokenListResponse;
}

export const TokenInfoModal: FC<Props> = ({ token }) => {
  const { cart, addItem } = useCartContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenInfoFetchEnabled, setTokenInfoFetchEnabled] = useState<boolean>(false);
  const { data: tokenInfo } = api.coingecko.getTokenByIdQuery.useQuery({
    id: token.id,
  }, {
    enabled: tokenInfoFetchEnabled,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  console.log({ tokenInfo })

  const onAddToCart = async () => {
    // Add logic check here for prevent race condition
    if (loading || !tokenInfo) return;
    setLoading(true);
    const alreadyInCart = cart.find((item: CartItem) => item.id === token.id);

    console.log({ tokenInfo });
    const baseAddress = tokenInfo.platforms?.base ?? cart.find((item: CartItem) => item.id === tokenInfo.id)?.address;
    const baseDecimals = tokenInfo.detail_platforms?.base?.decimal_place ?? 18;
    if (!baseAddress) return setLoading(false);
    if (!alreadyInCart) {
      addItem({ 
        id: token.id,
        address: baseAddress,
        decimals: baseDecimals,
        symbol: tokenInfo.symbol,
        name: tokenInfo.name,
        usdAmountDesired: 1, 
        price: token.current_price,
        img: token.image,
      });
    }
    setLoading(false);
    // pop the side drawer
    document.getElementById('my-drawer')?.click();
  };

  return (
    <>
      <label 
        htmlFor={`${token.id}-token-info`}
        className="btn btn-ghost btn-sm hidden"
        onClick={() => setTokenInfoFetchEnabled(true)}
      >
        <EllipsisVerticalIcon className="h-6 w-6" />
      </label>

      <Portal>
        <input type="checkbox" id={`${token.id}-token-info`} className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle" role="dialog">
          <div className="modal-box relative overflow-hidden">
            <label htmlFor={`${token.id}-token-info`} className="btn btn-circle btn-sm btn-ghost absolute top-4 right-4">
              <XMarkIcon className="h-6 w-6" />
            </label>
            <h3 className="text-xl font-bold flex items-center gap-2 pb-4">
              <Image
                src={token.image}
                alt={token.name}
                width={20}
                height={20}
                className="rounded-full"
              />
              {token.name}
            </h3>
            <div className="flex flex-col gap-2">
              {tokenInfo?.description?.en ?? ""}
              <button 
                className="btn btn-secondary shadow-none hover:btn-primary hover:shadow z-10"
                onClick={() => {
                  void onAddToCart();
                  // close the modal
                  document.getElementById(`${token.id}-token-info`)?.click();
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Portal>
    </>
  )
};

export default TokenInfoModal;