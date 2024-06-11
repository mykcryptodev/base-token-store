import Head from "next/head";
import { type NextPage } from "next";

import { type GetServerSideProps } from "next";
import { isAddress } from "thirdweb";
import { base } from "thirdweb/chains";
import { resolveAddress } from "thirdweb/extensions/ens";
import { client } from "~/providers/Thirdweb";
import { api } from "~/utils/api";
import dynamic from "next/dynamic";
import { type ApexOptions } from "apexcharts";
import { useDisconnect } from "wagmi";
import useShortenedAddress from "~/hooks/useShortenedAddress";

const ReactApexChart = dynamic(
  () => import(
    "react-apexcharts"),
  { ssr: false } // This line disables server-side rendering
);

interface ProfileProps {
  address: string;
  isValidAddress: boolean;
  ens: string | null;
}

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (context) => {
  const { handle } = context.params as { handle: string };
  let address = handle;
  const handleIsAddress = isAddress(handle);
  let isValidAddress = handleIsAddress;
  let ens = null;

  if (!handleIsAddress) {
    try {
      address = await resolveAddress({
        client,
        name: handle,
      });
      isValidAddress = true;
      ens = handle;
    } catch (e) {
      isValidAddress = false;
      console.error(e);
    }
  }

  return {
    props: {
      address,
      isValidAddress,
      ens,
    },
  };
};


export const Profile: NextPage<ProfileProps> = ({ address, ens, isValidAddress }) => {
  const { disconnect } = useDisconnect();
  const { getShortenedAddress } = useShortenedAddress();

  const { data: networth } = api.moralis.getWalletNetworth.useQuery({
    address,
    chainIds: [base.id],
  }, {
    enabled: isValidAddress,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const { data: portfolio } = api.moralis.getPortfolioPositions.useQuery({
    address,
    chainId: base.id,
  }, {
    enabled: isValidAddress,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const series = portfolio?.result.map((position) => position.portfolio_percentage) ?? [];
  const options: ApexOptions = {
    chart: {
      width: 380,
      type: 'pie',
    },
    tooltip: {
      enabled: false
    },
    labels: portfolio?.result.map((position) =>`${position.name} - $${position.usd_value.toLocaleString([], { currency: 'usd', maximumFractionDigits: 2, minimumFractionDigits: 2 })}`) ?? [],
    colors: portfolio?.result.map(() => "#FEFEFE") ?? [],
    fill: {
      type: 'image',
      opacity: 0.85,
      image: {
        src: portfolio?.result.map((position) => position.logo ?? "") ?? [],
        width: 100,
      },
    },
    stroke: {
      width: 4
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#111']
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        borderWidth: 0
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <>
      <Head>
        <title>Base Token Store - {address}</title>
        <meta name="description" content="A place to buy and sell tokens on Base" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] flex items-center gap-4 flex-wrap">
            {ens ?? getShortenedAddress(address)}
          </h1>
          <button 
            className="btn btn-secondary w-fit" 
            onMouseDown={() => void disconnect()
          }>
            Disconnect
          </button>
          <h2 className="text-2xl font-bold">${networth?.total_networth_usd}</h2>
          <div className="flex w-full justify-center">
            <ReactApexChart options={options} series={series} type="pie" width={400} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;