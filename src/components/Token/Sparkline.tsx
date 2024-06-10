import { type ApexOptions } from "apexcharts";
import { type FC } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(
  () => import(
    "react-apexcharts"),
  { ssr: false } // This line disables server-side rendering
);

type Props = {
  data: number[];
};

export const Sparkline: FC<Props> = ({ data }) => {
  const lastEntry = data[data.length - 1] ?? 0;
  const firstEntry = data[0] ?? 0;
  const trend = lastEntry - firstEntry > 0 ? 'up' : 'down';

  const series = [{
    data,
  }];
  const options = {
    chart: {
      type: 'line',
      height: 40,
      sparkline: {
        enabled: true
      },
    },
    stroke: {
      curve: 'smooth',
      width: 1.5,
    },
    fill: {
      opacity: 0.9,
    },
    yaxis: {
      min: 0,
      max: Math.max(...data),
    },
    colors: [trend === 'up' ? '#10B981' : '#EF4444'],
  } satisfies ApexOptions;
  return (
    <ReactApexChart 
      options={options} 
      series={series} 
      type="line" 
      height={35} 
      width={50}
    />
  )
}

export default Sparkline;