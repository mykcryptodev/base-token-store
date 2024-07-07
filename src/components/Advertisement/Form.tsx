import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import { type FC, useState } from 'react';
import { getContract, toEther, toWei, encode } from 'thirdweb';
import { base } from 'thirdweb/chains';
import { upload } from 'thirdweb/storage';
import { useSendCalls } from 'wagmi/experimental';
import { APP_NAME } from '~/constants';
import { BANNER_ADVERTISEMENT } from '~/constants/addresses';
import { client } from '~/providers/Thirdweb';
import { buyAdSpace } from '~/thirdweb/8453/0x4047f984f20f174919bffbf0c5f347270d13a112';
import { api } from "~/utils/api";

const Upload = dynamic(() => import('~/components/Upload'), { ssr: false });

const getDayId = (date: Date) => {
  // count how many days elapsed from Jan 1, 1970 to the date passed in
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return Math.floor((utcDate.getTime() - new Date(1970, 0, 1).getTime()) / 1000 / 60 / 60 / 24) + 1;
}

interface Props {
  price: string;
  selectedDates: Date[];
  onAdsBought: () => void;
}

const AdvertisementForm: FC<Props> = ({ price, selectedDates, onAdsBought }) => {
  const { sendCallsAsync } = useSendCalls();
  const [buyIsLoading, setBuyIsLoading] = useState<boolean>(false);
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [resalePrice, setResalePrice] = useState<string>("");

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
        dayIds: selectedDates.map((date) => BigInt(getDayId(date))),
        contentURIs: selectedDates.map(() => contentUri),
        resalePrices: selectedDates.map(() => BigInt(toWei(resalePrice))),
        maxCost: BigInt(price),
      });
      const txWithValue = {
        ...tx,
        value: BigInt(price),
      }
      const encodedData = await encode(txWithValue);
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
          setResalePrice("");
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
            <span className="label-text">Resale Price</span>
          </label>
          <input
            type="text"
            placeholder="0.001 ETH"
            className="input input-lg input-bordered w-full"
            value={resalePrice}
            onChange={(e) => setResalePrice(e.target.value)}
          />
          <label className="label">
            <span className="label-text-alt"></span>
            <span className="label-text-alt flex items-center gap-1">
              If someone bought out one of your ad slot days, what would they need to pay you?
              <div className="tooltip tooltip-left cursor-pointer" data-tip={`${APP_NAME} takes a ${royalty ?? "2"}% royalty on ad space resales`}>
                <QuestionMarkCircleIcon className="h-4 w-4 stroke-2" />
              </div>
            </span>
          </label>
        </div>
        <button
          className="btn btn-primary btn-lg w-full"
          onClick={() => void handleBuy()}
          disabled={buyIsLoading || price === "0"}
        >
          {buyIsLoading && (
            <div className="loading loading-spinner w-4 h-4"></div>
          )}
          Create Ad ({toEther(BigInt(price)).toString()} ETH)
        </button>
      </div>
    </div>
  )
}

export default AdvertisementForm;
