import { Head, Html, Main, NextScript } from "next/document";
import { useTheme } from "next-themes";
import { APP_DESCRIPTION, APP_NAME } from "~/constants";

export default function Document() {
  const { theme } = useTheme();

  return (
    <Html data-theme={theme}>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon.png"></link>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta property="og:title" content={APP_NAME} />
        <meta property="og:description" content={APP_DESCRIPTION} />
        <meta property="og:image" content="/images/lockup.webp" />
        <meta property="og:url" content="https://basetokenstore.com" />
      </Head>
      <body className="font-brand">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}