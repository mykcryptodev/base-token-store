import { Token } from "@uniswap/sdk";
import { getAddress,NATIVE_TOKEN_ADDRESS } from "thirdweb";
import { type Chain } from "thirdweb/chains";

import { WETH } from "~/constants/addresses";

function wethOrToken (token: Token, activeChain: Chain) {
  const weth = new Token(
    activeChain.id,
    WETH[activeChain.id]!,
    18,
    'WETH',
    'Wrapped Ether',
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return getAddress(token.address) === getAddress(NATIVE_TOKEN_ADDRESS) ? weth : token;
}

export default wethOrToken;