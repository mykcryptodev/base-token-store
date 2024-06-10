import { Head, Html, Main, NextScript } from "next/document";
import { useTheme } from "next-themes";

export default function Document() {
  const { theme } = useTheme();

  return (
    <Html data-theme={theme}>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon.png"></link>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <body className="font-brand">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}