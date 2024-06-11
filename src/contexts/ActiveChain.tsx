import { createContext, useContext } from 'react';
import useActiveChain from '~/hooks/useActiveChain';

const ActiveChainContext = createContext<ReturnType<typeof useActiveChain> | null>(null);

export const ActiveChainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const activeChain = useActiveChain();
  return <ActiveChainContext.Provider value={activeChain}>{children}</ActiveChainContext.Provider>;
};

export const useActiveChainContext = () => {
  const context = useContext(ActiveChainContext);
  if (!context) {
    throw new Error('useActiveChainContext must be used within an ActiveChainProvider');
  }
  return context;
};

export default ActiveChainContext;
