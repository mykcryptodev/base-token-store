export type PairData = {
  pairAddress: string;
  error: string | null;
  reserves: readonly [bigint, bigint, number]; // [token0, token1, blockTimestampLast]
}