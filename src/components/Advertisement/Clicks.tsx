import { type FC } from "react";
import { type ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(
  () => import(
    "react-apexcharts"),
  { ssr: false } // This line disables server-side rendering
);

import { api } from "~/utils/api";

export const AdClicks: FC = () => {
  const { data: analytics } = api.analytics.getAdvertisementClicks.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  console.log({ analytics });

  if (!analytics) {
    return <div>Loading...</div>;
  }

  const options: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: analytics.result[0]?.labels ?? [],
    },
    legend: {
      show: false,
    },
    tooltip: {
      custom: (
        { series, seriesIndex, dataPointIndex } : 
        { series: number[][], seriesIndex: number, dataPointIndex: number }
      ) => {
        return `<div class="bg-base-100 p-2">${series[seriesIndex]?.[dataPointIndex]}</div>`;
      },
    },
    grid: {
      show: false
    },
  };

  const series = analytics.result.map((result) => ({
    data: result.data ?? [],
  }));

  return (
    <div>
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default AdClicks;