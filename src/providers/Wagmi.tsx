import { type FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, createConfig, WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [
    coinbaseWallet({
      chainId: base.id,
      appName: 'onchainkit',
    }),
  ],
  ssr: true,
});

type Props = {
  children: React.ReactNode;
};

export const Wagmi: FC<Props> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Wagmi;