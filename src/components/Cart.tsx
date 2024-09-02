import React from 'react'
import { ShoppingBagIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useMemo, useState, type FC } from 'react';
import { ZERO_ADDRESS, getContract, toWei} from 'thirdweb';
import { base } from 'thirdweb/chains';
import { useCartContext } from '~/contexts/Cart';
import { api } from '~/utils/api';
import { useSendCalls, useShowCallsStatus } from 'wagmi/experimental'
import { client } from '~/providers/Thirdweb';
import { useActiveAccount, useActiveWallet } from 'thirdweb/react';
import { DEFAULT_CHAIN } from '~/constants/chain';
import { Connect } from '~/components/Connect';
import { parseAbiItem, encodeFunctionData } from "viem";
import { flattenObject } from '~/helpers/flattenObject';
import Donation from '~/components/Donation';
import { REFERRAL_CODE_NFT } from '~/constants/addresses';
import { ownerOf } from 'thirdweb/extensions/erc721';
import ReferralChip from '~/components/Referral/ReferralChip';
import posthog from "posthog-js";
import { env } from '~/env';
import { config } from '~/providers/Wagmi';

const Cart: FC = () => {
  const { showCallsStatus } = useShowCallsStatus({ config });
  const { sendCalls } = useSendCalls();
  const { cart, referralCode, updateItem, deleteItem } = useCartContext();
  const wallet = useActiveWallet();
  const account = useActiveAccount();
  const { data: etherPrice } = api.dex.getEtherPrice.useQuery({
    chainId: base.id,
  });
  const { mutateAsync: getSwapEncodedData } = api.kyberswap.getCheckoutData.useMutation();
  const { mutateAsync: getNftPurchaseEncodedData } = api.openSea.getPurchaseEncodedData.useMutation();
  const { mutateAsync: getDonationEncodedData } = api.endaoment.getDonationTransaction.useMutation();

  const [checkoutIsLoading, setCheckoutIsLoading] = useState<boolean>(false);

  const cartTotalUsd = useMemo(() => {
    const total = cart.reduce((acc, item) => acc + item.usdAmountDesired, 0);
    if (referralCode) {
      return total + total * 0.01;
    }
    return total;
  }, [cart, referralCode]);

  const updateItemQuantity = (id: string, value: number) => {
    updateItem(id, { usdAmountDesired: Math.max(0, value) });
  }

  const checkout = async () => {
    if (!wallet) return;
    setCheckoutIsLoading(true);
    const referralCodeNftContract = getContract({
      address: REFERRAL_CODE_NFT,
      client,
      chain: base
    });
    try {
      const [nftEncodedData, encodedData, donationEncodedData, referrer] = await Promise.all([
        getNftPurchaseEncodedData({
          orders: cart.filter(item => item.isNft).map((item) => ({
            listing: {
              hash: item.nftOrderHash!,
              chain: DEFAULT_CHAIN.name?.toLowerCase() ?? 'base',
              protocol_address: item.nftExchangeAddress!,
            },
            fulfiller: {
              address: account?.address ?? wallet.getAccount()?.address ?? ZERO_ADDRESS,
            }
          })),
        }),
        getSwapEncodedData({
          tokensToBuy: cart.filter(item => !item.isNft && !item.isDonation).map((item) => {
            const amountInEther = item.usdAmountDesired / Number(etherPrice ?? 1);
            return {
              token: item.address,
              amount: toWei(amountInEther.toString()).toString(),
            };
          }),
          chainId: base.id,
          from: account?.address ?? ZERO_ADDRESS,
          to: account?.address ?? ZERO_ADDRESS,
        }),
        getDonationEncodedData({
          donations: cart.filter(item => item.isDonation).map((item) => ({
            ein: item.symbol,
            donationAmountInWei: toWei(
              etherPrice ? (item.usdAmountDesired / Number(etherPrice)).toString() : '0'
            ).toString(),
          })),
        }),
        ...referralCode ? [
          ownerOf({
            contract: referralCodeNftContract,
            tokenId: BigInt(referralCode),
          })
        ] : [],
      ]);
      const nftPurchaseCalls = nftEncodedData.map((purchase) => {
        const seaportAddress = purchase.fulfillment_data.transaction.to as `0x${string}`;
        const abiItem = parseAbiItem(`function ${purchase.fulfillment_data.transaction.function}`);
        const parameters = flattenObject(purchase.fulfillment_data.transaction.input_data.parameters);
        const functionName = purchase.fulfillment_data.transaction.function.split('(')[0]!;
        const data = encodeFunctionData({
          abi: [abiItem],
          functionName,
          args: [parameters]
        });
        return {
          to: seaportAddress,
          data,
          value: BigInt(purchase.fulfillment_data.transaction.value),
        };
      });
      const donationCalls = donationEncodedData.map((donation) => {
        return {
          to: donation.to,
          data: donation.data,
          value: BigInt(donation.value),
        };
      });
      const referrerCall = referrer ? [{
        to: referrer as `0x${string}`,
        data: "0x0" as `0x${string}`,
        // cart from usd to ether and then 1% of that in wei
        value: BigInt(toWei((cartTotalUsd / Number(etherPrice) * 0.01).toString())),
      }] : [];
      sendCalls({
        calls: encodedData.map(swap => ({
          to: swap.data.routerAddress as `0x${string}`,
          data: swap.data.data as `0x${string}`,
          value: BigInt(swap.data.amountIn),
        })).concat(...nftPurchaseCalls, ...donationCalls, ...referrerCall),
        capabilities: {
          auxiliaryFunds: {
            supported: true
          },
          paymasterService: {
            url: env.NEXT_PUBLIC_PAYMASTER_URL,
          }
        }
      }, {
        onSuccess(tx) {
          // show the transaction completed screen
          showCallsStatus({
            id: tx,
          });
          posthog.capture('checkout', { success: true });
          // delete all items from cart
          cart.forEach((item) => deleteItem(item.id));
        },
        onError(error) {
          posthog.capture('checkout', { success: false, error });
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
      <ul className="p-4 pb-2 w-full min-h-full bg-base-200 text-base-content">
        {cart.map((item, index) => (
          <li key={item.id}>
            <div className="flex flex-col flex-nowrap w-full">
              <div className="flex items-start gap-2">
                <Image
                  src={item.img}
                  alt={item.name}
                  height={100}
                  width={100}
                  className={`${item.isNft ? 'rounded-lg' : 'rounded-full'} w-full max-w-20 h-full max-h-20`}
                />
                <div className="flex flex-col grow">
                  <span className="font-bold">{item.name}</span>
                  <span className={`text-xs opacity-50`}>
                    {item.isDonation ? (
                      'Donation'
                    ) : (
                      `$${item.price.toPrecision(2)} per token`
                    )}
                  </span>
                </div>
                <button className="btn btn-xs btn-ghost shrink" onClick={() => deleteItem(item.id)}>
                  <XCircleIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col w-full justify-end">
                <div className="flex items-center justify-end gap-1">
                  <button 
                    className={`btn btn-xs btn-ghost ${item.isNft ? 'invisible' : 'block'}`}
                    onClick={() => updateItemQuantity(item.id, item.usdAmountDesired - 1)}
                  >
                    -
                  </button>
                  <div className="relative">
                    <input
                      type="number"
                      value={item.usdAmountDesired.toString().replace(/(\.\d{2})\d+/, "$1")}
                      onChange={(e) => item.isNft ? {} : updateItemQuantity(item.id, parseInt(e.target.value))}
                      className="input input-bordered w-32 text-center"
                    />
                    <span className="absolute opacity-50 left-4 top-3 uppercase">$</span>
                  </div>
                  <button 
                    className={`btn btn-xs btn-ghost ${item.isNft ? 'invisible' : 'block'}`}
                    onClick={() => updateItemQuantity(item.id, item.usdAmountDesired + 1)}
                  >
                    +
                  </button>
                </div>
                {item.isDonation && (
                  <span 
                    className={`text-xs text-end opacity-30 sm:mr-8 mr-10 mt-1`}
                  >
                    {`you're awesome`}
                  </span>
                )}
                <span 
                  className={`text-xs text-end opacity-30 sm:mr-8 mr-10 mt-1 uppercase ${item.isDonation ? 'hidden' : ''}`}
                >
                  {isNaN(item.price * item.usdAmountDesired) 
                    ? 0 
                    : item.isNft 
                      ? '1' 
                      : (item.usdAmountDesired / item.price).toLocaleString([], { currency: 'usd' })}
                      &nbsp;{item.isNft ? `${item.nftCollectionName}` : `$${item.symbol}`}
                </span>
              </div>
            </div>
            <div className={`divider ${index === cart.length - 1 ? 'mb-0' : ''}`} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <Donation />
        {referralCode && <ReferralChip />}
      </div>
      <button 
        disabled={checkoutIsLoading || !account || cart.length === 0}
        className="btn btn-primary btn-block btn-lg mt-4"
        onClick={() => void checkout()}
      >
        {checkoutIsLoading && (
          <div className="loading loading-spinner" />
        )}
        Checkout ${cartTotalUsd.toLocaleString([], { currency: 'usd', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </button>
      {!account && (
        <div className="mt-2">
          <Connect fullWidth={true} />
        </div>
      )}
    </div>
  );
};

export default Cart;
