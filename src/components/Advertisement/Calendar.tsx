import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, InboxIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { type FC, useEffect,useMemo,useState } from 'react';
import { toEther } from 'thirdweb';
import { MediaRenderer } from 'thirdweb/react';

import { client } from '~/providers/Thirdweb';
import { api } from "~/utils/api";

type Day = {
  date: Date,
  dateString: string,
  isCurrentMonth: boolean,
  isToday: boolean,
  isSelected: boolean,
  dayId: number,
}
const today = new Date();
const year = today.getFullYear();

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

const getDayId = (date: Date) => {
  // count how many days elapsed from Jan 1, 1970 to the date passed in
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return Math.floor((utcDate.getTime() - new Date(1970, 0, 1).getTime()) / 1000 / 60 / 60 / 24) + 1;
}

interface Props {
  callback?: (
    price: bigint,
    selectedDates: Date[],
  ) => void;
  refetchKey?: number;
}

const AdvertisementCalendar: FC<Props> = ({ callback, refetchKey }) => {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const days = Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, i) => ({
    date: new Date(year, month, i + 1),
    dateString: new Date(year, month, i + 1).toISOString().split('T')[0],
    isCurrentMonth: true,
    isToday: new Date(year, month, i + 1).toDateString() === today.toDateString(),
    isSelected: selectedDates.some((date) => date.toDateString() === new Date(year, month, i + 1).toDateString()),
    dayId: getDayId(new Date(year, month, i)),
  })) as Day[];
  // if the first day of the days array is not Monday, add days from the previous month to the beginning of the array
  const firstDay = days[0]?.date.getDay() ?? new Date().getDay();
  if (firstDay !== 1) {
    const previousMonth = new Date(year, month, 0);
    const previousMonthDays = Array.from({ length: previousMonth.getDate() }, (_, i) => ({
      date: new Date(year, month - 1, i + 1),
      dateString: new Date(year, month - 1, i + 1).toISOString().split('T')[0],
      isCurrentMonth: false,
      isToday: new Date(year, month - 1, i + 1).toDateString() === today.toDateString(),
      isSelected: selectedDates.some((date) => date.toDateString() === new Date(year, month - 1, i + 1).toDateString()),
      dayId: getDayId(new Date(year, month - 1, i)),
    })) as Day[];
    days.unshift(...previousMonthDays.slice(previousMonthDays.length - firstDay + 1));
  }
  // if the last day of the days array is not Sunday, add days from the next month to the end of the array
  const lastDay = days[days.length - 1]?.date.getDay() ?? new Date().getDay();
  if (lastDay !== 0) {
    const nextMonthDays = Array.from({ length: 7 - lastDay }, (_, i) => ({
      date: new Date(year, month + 1, i + 1),
      dateString: new Date(year, month + 1, i + 1).toISOString().split('T')[0],
      isCurrentMonth: false,
      isToday: new Date(year, month + 1, i).toDateString() === today.toDateString(),
      isSelected: selectedDates.some((date) => date.toDateString() === new Date(year, month + 1, i).toDateString()),
      dayId: getDayId(new Date(year, month + 1, i)),
    })) as Day[];
    days.push(...nextMonthDays);
  }

  const { data: ads, isLoading: adsIsLoading, refetch } = api.advertisement.getByDayIds.useQuery({
    dayIds: days.map((day) => day.dayId),
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: standardPrice } = api.advertisement.getStandardPrice.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log(" calling refetch... ");
    void refetch();
  }, [refetch, refetchKey]);

  console.log({ ads, refetchKey });

  const price = useMemo(() => {
    // for each selected date, get the corresponding ad and sum up the prices
    return selectedDates.reduce((acc, date) => {
      const ad = ads?.find((ad) => ad.dayId === getDayId(date).toString());
      if (ad) {
        return acc + BigInt(ad.resalePrice);
      } else {
        return acc + BigInt(standardPrice ?? "0");
      }
    }, BigInt(0));
  }, [selectedDates, ads, standardPrice]);

  useEffect(() => {
    callback?.(price, selectedDates);
  }, [callback, price, selectedDates]);

  return (
    <div className="w-full">
      <div className="flex items-center">
        <h2 className="flex-auto text-sm font-semibold">
          {new Date(year, month, 1).toLocaleDateString([], {
            month: 'long',
          })}
          &nbsp;
          {new Date(year, month, 1).toLocaleDateString([], {
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
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      <div className="mt-2 grid grid-cols-7 text-sm">
        {days.map((day, dayIdx) => (
          <div key={day.date.toISOString()} className={classNames(dayIdx > 6 && 'border-t', 'py-4')}>
            <button
              type="button"
              className={classNames(
                day.isSelected && 'text-secondary-content',
                !day.isSelected && day.isToday && 'text-primary',
                !day.isSelected && !day.isToday && day.isCurrentMonth && 'text-base-content',
                !day.isSelected && !day.isToday && !day.isCurrentMonth && 'text-base-content text-opacity-50',
                day.isSelected && day.isToday && 'bg-primary text-primary-content',
                day.isSelected && !day.isToday && 'bg-secondary',
                !day.isSelected && 'hover:bg-base-200',
                (day.isSelected || day.isToday) && 'font-semibold',
                'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
              )}
              onClick={() => setSelectedDates((prev) => {
                if (prev.some((date) => date.toDateString() === day.date.toDateString())) {
                  return prev.filter((date) => date.toDateString() !== day.date.toDateString());
                } else {
                  return [...prev, day.date];
                }
              })}
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
                        <time dateTime={day.dateString}>{day.dateString.split('-').pop()?.replace(/^0/, '')}</time>
                      </div>
                    </div>
                  </div>
                </div>

              ) : (
                <time dateTime={day.dateString}>{day.dateString.split('-').pop()?.replace(/^0/, '')}</time>
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="collapse collapse-arrow">
        <input type="checkbox" className="peer" /> 
        <div className="collapse-title text-sm font-semibold">
          Schedule for
          &nbsp;
          {new Date(year, month, 1).toLocaleDateString([], {
            month: 'long',
          })}
          &nbsp;
          {new Date(year, month, 1).toLocaleDateString([], {
            year: 'numeric',
          })}
        </div>
        <div className="collapse-content shadow-inner rounded-lg"> 
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
                className="group flex items-start space-x-4 rounded-xl px-4 py-2 focus-within:bg-base-100 hover:bg-base-100"
              >
                <div className="card bg-base-100 shadow min-w-full">
                  <figure className="w-full max-h-48 bg-base-200">
                    <MediaRenderer
                      client={client}
                      src={ad.media || "/images/lockup.png"}
                      className="flex-none w-10 h-10 lg:rounded-none rounded-lg thirdweb-media !rounded-b-none"
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {days.find(day => Number(day.dayId + 1) === Number(ad.dayId))?.date.toLocaleDateString([], {
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
                      {ad.adOwner}
                    </Link>
                    <div className="card-actions justify-end">
                      <button 
                        className={`${days.find(day => Number(day.dayId + 1) === Number(ad.dayId))?.isSelected ? "btn btn-secondary" : "btn btn-ghost"}`}
                        onClick={() => setSelectedDates((prev) => {
                          const day = days.find(day => Number(day.dayId + 1) === Number(ad.dayId))?.date;
                          if (day) {
                            if (prev.some((date) => date.toDateString() === day.toDateString())) {
                              return prev.filter((date) => date.toDateString() !== day.toDateString());
                            } else {
                              return [...prev, day];
                            }
                          }
                          return prev;
                        })}
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
      </div>
    </div>
  )
}

export default AdvertisementCalendar;