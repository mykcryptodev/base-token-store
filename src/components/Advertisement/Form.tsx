import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import { type FC, useState } from 'react';
import { getContract, toEther, toWei, encode } from 'thirdweb';
import { base } from 'thirdweb/chains';
import { ConnectButton, useActiveAccount, useActiveWallet, useSendTransaction } from 'thirdweb/react';
import { upload } from 'thirdweb/storage';
import { useAccount, useDisconnect } from 'wagmi';
import { useSendCalls, useCapabilities } from 'wagmi/experimental';
import { APP_NAME } from '~/constants';
import { BANNER_ADVERTISEMENT } from '~/constants/addresses';
import { DEFAULT_CHAIN } from '~/constants/chain';
import { client } from '~/providers/Thirdweb';
import { buyAdSpace } from '~/thirdweb/8453/0x4047f984f20f174919bffbf0c5f347270d13a112';
import { api } from "~/utils/api";
import { useDisconnect as useDisconnectThirdweb } from 'thirdweb/react';

const Upload = dynamic(() => import('~/components/Upload'), { ssr: false });

interface Props {
  price: string;
  pricePerBannerSlot: string;
  selectedDayIds: number[];
  onAdsBought: () => void;
}

const AdvertisementForm: FC<Props> = ({ price, pricePerBannerSlot, selectedDayIds, onAdsBought }) => {
  const { sendCallsAsync } = useSendCalls();
  const wagmiAccount = useAccount();
  const wallet = useActiveWallet();
  const { disconnect: disconnectWagmi } = useDisconnect();
  const { disconnect: disconnectTw } = useDisconnectThirdweb();
  const { data: capabilities } = useCapabilities();
  console.log({ capabilities });
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();
  const [buyIsLoading, setBuyIsLoading] = useState<boolean>(false);
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [resalePrice, setResalePrice] = useState<string>(toEther(BigInt(pricePerBannerSlot ?? toWei('0.002'))));

  const { data: royalty } = api.advertisement.getRoyalty.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleBuy = async () => {
    try {
      setBuyIsLoading(true);
      const metadata = {
        media: mediaUrl,
        link,
      };
      const contentUri = await upload({
        client,
        files: [new File([JSON.stringify(metadata)], 'metadata.json')],
      });
      const tx = buyAdSpace({
        contract: getContract({
          client,
          chain: base,
          address: BANNER_ADVERTISEMENT,
        }),
        dayIds: selectedDayIds.map((dayId) => BigInt(dayId)),
        contentURIs: selectedDayIds.map(() => contentUri),
        resalePrices: selectedDayIds.map(() => BigInt(toWei(resalePrice))),
        maxCost: BigInt(price),
      });
      const txWithValue = {
        ...tx,
        value: BigInt(price),
      }
      const encodedData = await encode(txWithValue);
      if (!capabilities && account) {
        sendTransaction({
          chain: DEFAULT_CHAIN,
          client,
          to: txWithValue.to,
          data: encodedData,
          value: txWithValue.value,
        }, {
          onSuccess(data, variables, context) {
            console.log(`SUCCESS`)
            console.log({
              data, variables, context
            })
            onAdsBought();
            setMediaUrl("");
            setLink("");
            setResalePrice(toEther(BigInt(pricePerBannerSlot ?? toWei('0.002'))));
          },
          onSettled(data, variables, context) {
            console.log(`SETTLED`)
            console.log({
              data, variables, context
            });
            setBuyIsLoading(false);
          }
        });
        return;
      }
      await sendCallsAsync({
        calls: [{
          to: BANNER_ADVERTISEMENT,
          data: encodedData,
          value: BigInt(price),
        }],
        capabilities: {
          auxiliaryFunds: {
            supported: true
          },
          paymasterService: {
            url: `https://${base.id}.bundler.thirdweb.com/${client.clientId}`
          }
        },
      }, {
        onSuccess(data, variables, context) {
          console.log(`SUCCESS`)
          console.log({
            data, variables, context
          })
          onAdsBought();
          setMediaUrl("");
          setLink("");
          setResalePrice(toEther(BigInt(pricePerBannerSlot ?? toWei('0.002'))));
        },
        onSettled(data, variables, context) {
          console.log(`SETTLED`)
          console.log({
            data, variables, context
          });
          setBuyIsLoading(false);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Ad Media</span>
          </label>
          <div className={`m-auto md:h-[90px] md:w-[768px] h-[50px] w-[350px]`}>
            <Upload
              initialUrls={[mediaUrl]}
              onUpload={(urls) => setMediaUrl(urls.resolvedUrls[0] ?? "")}
              objectCover={true}
              height={'h-full'} 
              label={'Upload Ad Media'}
            />
          </div>
          <label className="label opacity-50">
            <div />
            <span className="label-text-alt">Content is dislayed 768x90 on desktop and 350x50 on mobile</span>
          </label>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Click through URL</span>
          </label>
          <input
            type="text"
            placeholder="Click through url"
            className="input input-lg input-bordered w-full"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Resale Price (min: {toEther(BigInt(pricePerBannerSlot ?? toWei('0.002')))} ETH)</span>
          </label>
          <input
            type="text"
            placeholder="0.002 ETH"
            className="input input-lg input-bordered w-full"
            value={resalePrice}
            onChange={(e) => {
              const value = e.target.value;
              if (!isNaN(Number(value))) {
                setResalePrice(value);
              }
            }}
          />
          <label className="label">
            <span className="label-text-alt"></span>
            <span className="label-text-alt flex items-center gap-1">
              <span className="opacity-50">If someone bought out one of your ad slot days, what would they need to pay you?</span>
              <div className="tooltip tooltip-left cursor-pointer" data-tip={`${APP_NAME} takes a ${royalty ?? "2"}% royalty on ad space resales`}>
                <QuestionMarkCircleIcon className="h-4 w-4 stroke-2 opacity-50" />
              </div>
            </span>
          </label>
        </div>
        <button
          className="btn btn-primary btn-lg w-full"
          onClick={() => void handleBuy()}
          disabled={buyIsLoading || price === "0" || Number(resalePrice) <= 0}
        >
          {buyIsLoading && (
            <div className="loading loading-spinner w-4 h-4"></div>
          )}
          Buy Ad ({toEther(BigInt(price)).toString()} ETH)
        </button>
        {wagmiAccount?.address ? (
          <button
            className="btn btn-secondary btn-lg w-full"
            onClick={() => {
              disconnectWagmi();
              if (wallet) {
                disconnectTw(wallet);
              }
            }}
          >
            Log out to buy with a different wallet
          </button>
        ) : (
          <ConnectButton
            client={client}
            chain={DEFAULT_CHAIN}
            connectButton={{
              label: "Buy with non-smart wallet",
              className: "!btn !btn-secondary !btn-lg !w-full"
            }}
            detailsButton={{
              render: () => (
                <div 
                  className="btn btn-secondary btn-lg w-full font-normal animate-none"
                >
                  Buy with non-smart wallet
                </div>
              )
            }}
          />
        )}
      </div>
    </div>
  )
}

export default AdvertisementForm;
