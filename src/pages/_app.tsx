import { type AppType } from "next/app";
import { ThemeProvider } from "next-themes";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Layout } from "~/components/Layout";
import Thirdweb from "~/providers/Thirdweb";
import { CartProvider } from "~/contexts/Cart";
import { ActiveChainProvider } from "~/contexts/ActiveChain";
import { Wagmi } from "~/providers/Wagmi";
import { Analytics } from "@vercel/analytics/react";
import { AdvertisementProvider } from "~/contexts/Advertisement";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
  <ThemeProvider>
    <main>
      <ActiveChainProvider>
        <Wagmi>
          <Thirdweb>
            <AdvertisementProvider>
              <CartProvider>
                <Layout>
                  <Component {...pageProps} />
                  <Analytics />
                </Layout>
                <div id="portal" />
              </CartProvider>
            </AdvertisementProvider>
          </Thirdweb>
        </Wagmi>
      </ActiveChainProvider>
    </main>
  </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
