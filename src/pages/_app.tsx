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
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react";
import { env } from "~/env";

if (typeof window !== 'undefined') {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'always',
    loaded: (posthog) => {
      if (env.NODE_ENV === 'development') posthog.debug() // debug mode in development
    },
  })
}

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <PostHogProvider client={posthog}>
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
    </PostHogProvider>
  );
};

export default api.withTRPC(MyApp);
