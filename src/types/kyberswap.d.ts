export interface RouteBuildApiResponse {
  code: string;
  message: string;
  data: {
    amountIn: string;
    amountInUsd: string;
    amountOut: string;
    amountOutUsd: string;
    gas: string;
    gasUsd: string;
    outputChange: {
      amount: string;
      percent: number;
      level: number;
    };
    data: string;
    routerAddress: string;
  };
}

export interface KyberswapApiResponse {
  code: number;
  message: string;
  data: Data;
  requestId: string;
}

interface Data {
  routeSummary: RouteSummary;
  routerAddress: string;
}

export interface RouteSummary {
  tokenIn: string;
  amountIn: string;
  amountInUsd: string;
  tokenInMarketPriceAvailable: boolean;
  tokenOut: string;
  amountOut: string;
  amountOutUsd: string;
  tokenOutMarketPriceAvailable: boolean;
  gas: string;
  gasPrice: string;
  gasUsd: string;
  extraFee: ExtraFee;
  route: Route[][];
  extra: Extra;
}

interface ExtraFee {
  feeAmount: string;
  chargeFeeBy: string;
  isInBps: boolean;
  feeReceiver: string;
}

interface Route {
  pool: string;
  tokenIn: string;
  tokenOut: string;
  limitReturnAmount: string;
  swapAmount: string;
  amountOut: string;
  exchange: string;
  poolLength: number;
  poolType: string;
  poolExtra: PoolExtra | null;
  extra: Extra | null;
}

interface PoolExtra {
  fee: number;
  feePrecision: number;
  blockNumber: number;
}

interface Extra {
  chunksInfo: ChunkInfo[];
}

interface ChunkInfo {
  amountIn: string;
  amountOut: string;
  amountInUsd: string;
  amountOutUsd: string;
}