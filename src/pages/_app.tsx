import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Wagmi from "~/providers/Wagmi";
import { Layout } from "~/components/Layout";
import Thirdweb from "~/providers/Thirdweb";
import { CartProvider } from "~/contexts/Cart";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Thirdweb>
      <Wagmi>
        <CartProvider>
          <main className={GeistSans.className}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <div id="portal" />
          </main>
        </CartProvider>
      </Wagmi>
    </Thirdweb>
  );
};

export default api.withTRPC(MyApp);
