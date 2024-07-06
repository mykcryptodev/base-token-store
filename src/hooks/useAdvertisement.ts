import { useState } from 'react';
import { type Advertisement } from '~/types/advertisement';

const useAdvertisement = () => {
  const [advertisement, setAdvertisement] = useState<Advertisement | null>(null);

  const updateAdvertisement = (advertisement: Advertisement | null) => {
    setAdvertisement(advertisement);
  };

  return {
    advertisement,
    updateAdvertisement,
  };
};

export default useAdvertisement;
