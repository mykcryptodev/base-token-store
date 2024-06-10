import { type ChainMetadata } from "node_modules/thirdweb/dist/types/chains/types";
import { createContext } from "react";
import { type Chain} from "thirdweb/chains"

import { DEFAULT_CHAIN, DEFAULT_CHAIN_METADATA } from "~/constants/chain";

type IActiveChainContext = {
  activeChain: Chain;
  activeChainMetadata: ChainMetadata;
  updateActiveChain: (chainId: number) => void;
}
const defaultState = {
  activeChain: DEFAULT_CHAIN,
  activeChainMetadata: DEFAULT_CHAIN_METADATA,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateActiveChain: () => {},
}

const ActiveChainContext = createContext<IActiveChainContext>(defaultState);

export default ActiveChainContext;