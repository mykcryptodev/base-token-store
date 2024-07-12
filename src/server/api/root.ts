import { advertisementRouter } from "~/server/api/routers/advertisement";
import { analyticsRouter } from "~/server/api/routers/analytics";
import { catsRouter } from "~/server/api/routers/cats";
import { coingeckoRouter } from "~/server/api/routers/coingecko";
import { dexRouter } from "~/server/api/routers/dex";
import { endaomentRouter } from "~/server/api/routers/endaoment";
import { engineRouter } from "~/server/api/routers/engine";
import { googleRouter } from "~/server/api/routers/google";
import { kyberswapRouter } from "~/server/api/routers/kyberswap";
import { moralisRouter } from "~/server/api/routers/moralis";
import { nftRouter } from "~/server/api/routers/nft";
import { openSeaRouter } from "~/server/api/routers/opensea";
import { simpleHashRouter } from "~/server/api/routers/simpleHash";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  advertisement: advertisementRouter,
  analytics: analyticsRouter,
  cats: catsRouter,
  coingecko: coingeckoRouter,
  dex: dexRouter,
  endaoment: endaomentRouter,
  engine: engineRouter,
  google: googleRouter,
  kyberswap: kyberswapRouter,
  moralis: moralisRouter,
  nft: nftRouter,
  openSea: openSeaRouter,
  simpleHash: simpleHashRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
