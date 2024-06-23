import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http, createConfig } from "wagmi";
import { arbitrum, avalanche, base, bsc, mainnet, optimism, polygon } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const config = createConfig({
  chains: [
    arbitrum,
    avalanche,
    base,
    bsc,
    optimism,
    polygon,
    mainnet,
  ],
  connectors: [coinbaseWallet({
    appName: "Base Token Store",
    appLogoUrl: "https://avatars.githubusercontent.com/u/108554348?s=200&v=4",
    preference: "smartWalletOnly",
  })],
  transports: {
    [arbitrum.id]: http(),
    [avalanche.id]: http(),
    [base.id]: http(),
    [bsc.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export const Wagmi = ({ children } : { 
  children: React.ReactNode
 }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};