import { createContext, useContext } from 'react';
import useAdvertisement from '~/hooks/useAdvertisement';

const AdvertisementContext = createContext<ReturnType<typeof useAdvertisement> | null>(null);

export const AdvertisementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const advertisement = useAdvertisement();
  return <AdvertisementContext.Provider value={advertisement}>{children}</AdvertisementContext.Provider>;
};

export const useAdvertisementContext = () => {
  const context = useContext(AdvertisementContext);
  if (!context) {
    throw new Error('useAdvertisementContext must be used within a AdvertisementProvider');
  }
  return context;
};
