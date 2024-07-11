import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, InboxIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { type FC, useEffect,useMemo,useState } from 'react';
import { toEther } from 'thirdweb';
import { MediaRenderer } from 'thirdweb/react';
import { resolveName } from "thirdweb/extensions/ens";

import { client } from '~/providers/Thirdweb';
import { api } from "~/utils/api";

type Day = {
  date: Date,
  isCurrentMonth: boolean,
  isToday: boolean,
  isSelected: boolean,
  dayId: number,
}
const today = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));
const year = today.getUTCFullYear();

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

const getDayId = (timestamp: number) => {
  return Math.floor(timestamp / 1000 / 60 / 60 / 24);
}

interface Props {
  callback?: (
    price: bigint,
    selectedDates: Date[],
  ) => void;
}

const AdvertisementCalendar: FC<Props> = ({ callback }) => {
  const [month, setMonth] = useState<number>(new Date(Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate()
  )).getMonth());
  const [selectedDates, setSelectedDates] = useState<number[]>([]);

  // make an array of 35 days that represent the current month.
  const days: Day[] = useMemo(() => {
    const firstDay = new Date(Date.UTC(year, month, 1));
    const startDay = firstDay.getUTCDay();
    const days: Day[] = [];
    for (let i = 1; i < 43; i++) {
      const date = new Date(Date.UTC(year, month, (i + 1) - startDay));
      days.push({
        date,
        isCurrentMonth: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - 1)).getUTCMonth() === month,
        isToday: getDayId(date.getTime()) === getDayId(today.getTime()),
        isSelected: selectedDates.some((timestamp) => date.getTime() === timestamp),
        dayId: getDayId(date.getTime()),
      });
    }
    return days;
  }, [month, selectedDates]);

  const { data: ads, isLoading: adsIsLoading } = api.advertisement.getByDayIds.useQuery({
    dayIds: days.map((day) => day.dayId),
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: standardPrice } = api.advertisement.getStandardPrice.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleUpdateSelectedDates = (timestamp: number) => {
    setSelectedDates((prev) => {
      let updatedDates;
      if (prev.some((selectedTimestamp) => selectedTimestamp === timestamp)) {
        updatedDates = prev.filter((selectedTimestamp) => selectedTimestamp !== timestamp);
      } else {
        updatedDates = [...prev, timestamp];
      }
      const price = updatedDates.reduce((acc, timestamp) => {
        const ad = ads?.find((ad) => ad.dayId === getDayId(timestamp).toString());
        if (ad) {
          return acc + BigInt(ad.resalePrice);
        } else {
          return acc + BigInt(standardPrice ?? "0");
        }
      }, BigInt(0));
      callback?.(price, updatedDates.map(timestamp => new Date(Date.UTC(
        new Date(timestamp).getUTCFullYear(),
        new Date(timestamp).getUTCMonth(),
        new Date(timestamp).getUTCDate()
      ))));
      return updatedDates;
    });
  }

  const OwnerName: FC<{ adOwner: string }> = ({ adOwner }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [ensName, setEnsName] = useState<string | null>(null);

    useEffect(() => {
      const fetchEnsName = async () => {
        try {
          setIsLoading(true);
          const name = await resolveName({
            client,
            address: adOwner,
          });
          setEnsName(name);
        } catch (e) {
          console.error(e);
          setEnsName(null);
        } finally {
          setIsLoading(false);
        }
      }
      void fetchEnsName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
      return (
        <div className="w-20 h-4 bg-base-300 animate-pulse rounded-lg" />
      )
    }

    return (
      <span>
        {ensName ?? `${adOwner.slice(0, 5)}...${adOwner.slice(-4)}`}
      </span>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center">
          <h2 className="flex-auto text-sm font-semibold">
            {new Date(Date.UTC(year, month + 1, 1)).toLocaleDateString([], {
              month: 'long',
            })}
            &nbsp;
            {new Date(Date.UTC(year, month + 1, 1)).toLocaleDateString([], {
              year: 'numeric',
            })}
          </h2>
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={() => setMonth(new Date().getMonth())}
            >
              <span className="sr-only">Previous month</span>
              <CalendarIcon className="-my-1.5 h-6 w-6 stroke-2 flex-none text-gray-400" aria-hidden="true" /> 
            </button>
            <button
              type="button"
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={() => setMonth(month - 1)}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5 stroke-2" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="-my-1.5 -mr-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={() => setMonth(month + 1)}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5 stroke-2" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-base-content text-opacity-50">
          <div className="min-w-24">S</div>
          <div className="min-w-24">M</div>
          <div className="min-w-24">T</div>
          <div className="min-w-24">W</div>
          <div className="min-w-24">T</div>
          <div className="min-w-24">F</div>
          <div className="min-w-24">S</div>
        </div>
        <div className="mt-2 grid grid-cols-7 text-sm">
          {days.map((day, dayIdx) => (
            <div key={day.date.toISOString()} className={classNames(dayIdx > 6 && 'border-t', 'py-4', 'min-w-24')}>
              <button
                type="button"
                className={classNames(
                  day.isSelected && 'text-secondary-content',
                  !day.isSelected && day.isToday && 'text-primary',
                  !day.isSelected && !day.isToday && day.isCurrentMonth && 'text-base-content',
                  !day.isSelected && !day.isToday && !day.isCurrentMonth && 'text-base-content text-opacity-50',
                  day.isSelected && day.isToday && 'bg-secondary text-primary-content',
                  day.isSelected && !day.isToday && 'bg-secondary',
                  !day.isSelected && 'hover:bg-base-200',
                  (day.isSelected || day.isToday) && 'font-semibold',
                  'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                )}
                onClick={() => handleUpdateSelectedDates(day.date.getTime())}
              >
                {ads?.find((ad) => Number(day.dayId + 1) === Number(ad.dayId)) ? (
                  <div className="indicator">
                    <span className="indicator-item indicator-start w-full text-center indicator-bottom text-xs opacity-50 overflow-ellipsis sm:flex hidden">
                      {toEther(BigInt(ads?.find((ad) => Number(ad.dayId) === Number(day.dayId + 1))?.resalePrice?.toString() ?? "0" as string))} ETH
                    </span>
                    <div className="grid place-items-center">
                      <div className="indicator">
                        <span className="indicator-item indicator-center badge badge-xs badge-secondary"></span>
                        <div className="grid p-2 place-items-center">
                          {new Date(Date.UTC(
                            new Date(day.date.getTime()).getUTCFullYear(),
                            new Date(day.date.getTime()).getUTCMonth(),
                            new Date(day.date.getTime()).getUTCDate()
                          )).toLocaleDateString([], {
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {new Date(Date.UTC(
                      new Date(day.date.getTime()).getUTCFullYear(),
                      new Date(day.date.getTime()).getUTCMonth(),
                      new Date(day.date.getTime()).getUTCDate()
                    )).toLocaleDateString([], {
                      day: 'numeric',
                    })}
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="collapse collapse-arrow">
        <input type="checkbox" className="peer" /> 
        <div className="collapse-title text-sm font-semibold max-w-3xl mx-auto">
          Schedule for
          &nbsp;
          {new Date(Date.UTC(year, month + 1, 1)).toLocaleDateString([], {
            month: 'long',
          })}
          &nbsp;
          {new Date(Date.UTC(year, month + 1, 1)).toLocaleDateString([], {
            year: 'numeric',
          })}
        </div>
        <div className="collapse-content mx-auto shadow-inner rounded-lg overflow-x-auto"> 
          <ol className="mt-4 space-y-1 text-sm leading-6 max-h-72 overflow-y-auto">
            {/* if the ads are not loading and there are no ads in the ads array with the selected month */}
            {!adsIsLoading && !ads?.find(ad => {
              const day = days.find(day => Number(day.dayId) + 1 === Number(ad.dayId))?.date;
              if (day) {
                return day.getMonth() === month;
              }
              return false;
            }) && (
              <div className="flex flex-col gap-2 w-full justify-center items-center h-48 font-bold opacity-50">
                <InboxIcon className="h-10 justify-center w-full stroke-2" />
                No Advertisements
              </div>
            )}
            {adsIsLoading && (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-48 w-full bg-base-200 rounded-lg animate-pulse" />
                ))}
              </div>
            )}
            {ads?.filter(
              // the id of the ad can be found in the days array where the day has a month that matches the current month
              (ad) => days.find((day) => Number(day.dayId + 1) === Number(ad.dayId))?.isCurrentMonth
            ).map((ad) => (
              <li
                key={ad.dayId}
                className="group flex items-start space-x-4 rounded-xl sm:px-4 py-2 focus-within:bg-base-100 hover:bg-base-100"
              >
                <div className="bg-base-100 border rounded-lg">
                  <figure className="md:h-[90px] md:w-[768px] h-[50px] w-[350px] m-auto cursor-pointer bg-base-200 rounded-lg">
                    <MediaRenderer
                      client={client}
                      src={ad.media || "/images/lockup.png"}
                      className="flex-none w-10 h-10 lg:rounded-none rounded-lg thirdweb-media !rounded-b-none"
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </figure>
                  <div className="shadow rounded-lg p-4">
                    <h2 className="card-title">
                      {days.find(day => Number(day.dayId) === Number(ad.dayId))?.date.toLocaleDateString([], {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </h2>
                    <Link 
                      href={`https://basescan.org/address/${ad.adOwner}`} 
                      className="flex items-center gap-2"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <OwnerName adOwner={ad.adOwner} />
                    </Link>
                    <div className="card-actions justify-end">
                      <button 
                        className={`${days.find(day => Number(day.dayId + 1) === Number(ad.dayId))?.isSelected ? "btn btn-secondary" : "btn btn-ghost"}`}
                        disabled={
                          // if the month is not the current month, disable the button
                          !days.find(day => Number(day.dayId + 1) === Number(ad.dayId))?.isCurrentMonth
                        }
                        onClick={() => {
                          handleUpdateSelectedDates(
                            days.find(day => Number(day.dayId + 1) === Number(ad.dayId))?.date.getTime() ?? 0
                          );
                        }}
                      >
                        <MediaRenderer
                          client={client}
                          src={"/images/eth.svg"}
                          width="14px"
                          height="14px"
                          className="rounded-full"
                        />
                        {toEther(BigInt(ad.resalePrice))} ETH
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        {selectedDates.length > 0 && (
          <div className="mt-4 px-4">
            <span className="text-sm font-semibold">
              Selected Dates
            </span>
            <ul className="mt-2 flex flex-wrap gap-2">
              {selectedDates.sort((a, b) => a - b).map((timestamp) => (
                <li key={timestamp} className="badge badge-secondary">
                  {new Date(Date.UTC(
                    new Date(timestamp).getUTCFullYear(),
                    new Date(timestamp).getUTCMonth(),
                    new Date(timestamp).getUTCDate()
                  )).toLocaleDateString([], {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdvertisementCalendar;