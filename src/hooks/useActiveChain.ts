import { useEffect, useState } from 'react';
import { type Chain } from 'thirdweb';
import { getChainMetadata, type ChainMetadata } from 'thirdweb/chains';

import { DEFAULT_CHAIN, DEFAULT_CHAIN_METADATA, SUPPORTED_CHAINS } from '~/constants/chain';

const useActiveChain = () => {
  const [activeChain, setActiveChain] = useState<Chain>(DEFAULT_CHAIN);
  const [metadata, setMetadata] = useState<ChainMetadata>(DEFAULT_CHAIN_METADATA);

  const updateActiveChain = (chainId: number) => {
    const chain = SUPPORTED_CHAINS.find(c => c.id === chainId);
    if (!chain) {
      throw new Error(`Chain with id ${chainId} not found`);
    }
    setActiveChain(chain);
  }

  useEffect(() => {
    const fetchMetadata = async () => {
      const metadata = await getChainMetadata(activeChain);
      setMetadata(metadata);
    }
    void fetchMetadata();
  }, [activeChain]);

  return {
    activeChain,
    activeChainMetadata: metadata,
    updateActiveChain,
  }
}

export default useActiveChain;