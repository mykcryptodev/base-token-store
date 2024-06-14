import { Inter } from "next/font/google";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Layout } from "~/components/Layout";
import Thirdweb from "~/providers/Thirdweb";
import { CartProvider } from "~/contexts/Cart";
import { ActiveChainProvider } from "~/contexts/ActiveChain";
import { Wagmi } from "~/providers/Wagmi";

const inter = Inter({ subsets: ['latin'] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={inter.className}>
      <ActiveChainProvider>
        <Wagmi>
          <Thirdweb>
            <CartProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <div id="portal" />
            </CartProvider>
          </Thirdweb>
        </Wagmi>
      </ActiveChainProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
