import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Layout } from "~/components/Layout";
import Thirdweb from "~/providers/Thirdweb";
import { CartProvider } from "~/contexts/Cart";
import { ActiveChainProvider } from "~/contexts/ActiveChain";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={GeistSans.className}>
      <ActiveChainProvider>
        <Thirdweb>
          <CartProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <div id="portal" />
          </CartProvider>
        </Thirdweb>
      </ActiveChainProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
