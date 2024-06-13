import { ShoppingBagIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState, type FC } from 'react';
import { ADDRESS_ZERO, prepareTransaction, toWei } from 'thirdweb';
import { base } from 'thirdweb/chains';
import { useCartContext } from '~/contexts/Cart';
import { api } from '~/utils/api';
import { useCapabilities } from "thirdweb/wallets/eip5792";
import { useSendCalls } from 'wagmi/experimental'
import { client } from '~/providers/Thirdweb';
import { useActiveAccount } from 'thirdweb/react';
import { DEFAULT_CHAIN } from '~/constants/chain';

const Cart: FC = () => {
  const { sendCalls } = useSendCalls()
  const { data: capabilities } = useCapabilities();
  const { cart, updateItem, deleteItem } = useCartContext();
  const account = useActiveAccount();
  const { data: etherPrice } = api.dex.getEtherPrice.useQuery({
    chainId: base.id,
  });
  const { mutateAsync: getSwapEncodedData } = api.kyberswap.getCheckoutData.useMutation();
  const [checkoutIsLoading, setCheckoutIsLoading] = useState<boolean>(false);

  const checkout = async () => {
    setCheckoutIsLoading(true);
    try {
      const encodedData = await getSwapEncodedData({
        tokensToBuy: cart.map((item) => {
          const amountInEther = item.usdAmountDesired / Number(etherPrice ?? 1);
          return {
            token: item.address,
            amount: toWei(amountInEther.toString()).toString(),
          };
        }),
        chainId: base.id,
        from: account?.address ?? ADDRESS_ZERO,
        to: account?.address ?? ADDRESS_ZERO,
      });
      sendCalls({
        calls: encodedData.map(swap => ({
          to: swap.data.routerAddress as `0x${string}`,
          data: swap.data.data as `0x${string}`,
          value: BigInt(swap.data.amountIn),
        })),
        capabilities: {
          ...capabilities,
          auxiliaryFunds: {
            supported: true
          },
          paymasterService: {
            url: `https://${DEFAULT_CHAIN.id}.bundler.thirdweb.com/${client.clientId}`
          }
        }
      });
      // close the drawer
      void document.getElementById('my-drawer')?.click();
    } catch (e) {
      console.error(e);
    } finally {
      setCheckoutIsLoading(false);
    }
  }

  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl flex items-center gap-1">
          <ShoppingBagIcon className="h-6 w-6 stroke-2" />
          Cart
        </h2>
        <button 
          className="btn btn-ghost"
          onMouseDown={() => void document.getElementById('my-drawer')?.click()}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <ul className="menu p-4 w-full min-h-full bg-base-200 text-base-content">
        {cart.map((item) => (
          <li key={item.id}>
            <div className="flex sm:flex-row flex-col flex-nowrap w-full">
              <div className="flex items-center gap-2">
                <Image
                  src={item.img}
                  alt={item.name}
                  height={40}
                  width={40}
                  className="rounded-full w-full max-w-10 h-full max-h-10"
                />
                <div className="flex flex-col">
                  <span className="font-bold">{item.name}</span>
                  <span className="text-xs">${item.price.toPrecision(2)}</span>
                </div>
              </div>
              <div className="flex flex-col justify-end grow">
                <div className="flex items-center justify-end gap-1">
                  <button className="btn btn-xs btn-ghost sm:block hidden" onClick={() => updateItem(item.id, { usdAmountDesired: item.usdAmountDesired - 1 })}>-</button>
                  <div className="relative">
                    <input
                      type="number"
                      value={item.usdAmountDesired}
                      onChange={(e) => updateItem(item.id, { usdAmountDesired: parseInt(e.target.value) })}
                      className="input input-bordered w-32 text-center"
                    />
                    <span className="absolute opacity-50 left-4 top-3.5 uppercase">$</span>
                  </div>
                  <button className="btn btn-xs btn-ghost sm:block hidden" onClick={() => updateItem(item.id, { usdAmountDesired: item.usdAmountDesired + 1 })}>+</button>
                  <button className="btn btn-xs btn-ghost" onClick={() => deleteItem(item.id)}>
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-xs text-end opacity-30 sm:mr-16 mr-10 mt-1 uppercase">{isNaN(item.price * item.usdAmountDesired) ? 0 : (item.price * item.usdAmountDesired).toLocaleString([], { currency: 'usd' })} ${item.symbol}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* print the total of the cart */}
      <div className="divider mt-0 px-4" />
      <div className="flex justify-end">
        <span className="font-bold text-xl">Total: ${isNaN(cart.reduce((acc, item) => acc + item.usdAmountDesired, 0)) ? 0 : cart.reduce((acc, item) => acc + item.usdAmountDesired, 0).toLocaleString([], { currency: 'usd' })}</span>
      </div>
      <button 
        disabled={checkoutIsLoading}
        className="btn btn-primary btn-block btn-lg mt-8"
        onClick={() => void checkout()}
      >
        {checkoutIsLoading && (
          <div className="loading loading-spinner" />
        )}
        Checkout
      </button>
    </div>
  );
};

export default Cart;
