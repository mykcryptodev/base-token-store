import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    THIRDWEB_SECRET_KEY: z.string(),
    THIRDWEB_ENGINE_URL: z.string(),
    THIRDWEB_ENGINE_ACCESS_TOKEN: z.string(),
    MORALIS_API_KEY: z.string(),
    KYBERSWAP_CLIENT_ID: z.string(),
    COINGECKO_API_KEY: z.string(),
    OPENSEA_API_KEY: z.string(),
    SIMPLEHASH_API_KEY: z.string(),
    GOOGLE_VISION_API_KEY: z.string(),
    DEFINED_API_KEY: z.string(),
    POSTHOG_PERSONAL_API_KEY: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string(),
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: z.string(),
    NEXT_PUBLIC_PAYMASTER_URL: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_PAYMASTER_URL: process.env.NEXT_PUBLIC_PAYMASTER_URL,
    THIRDWEB_ENGINE_URL: process.env.THIRDWEB_ENGINE_URL,
    THIRDWEB_ENGINE_ACCESS_TOKEN: process.env.THIRDWEB_ENGINE_ACCESS_TOKEN,
    THIRDWEB_SECRET_KEY: process.env.THIRDWEB_SECRET_KEY,
    MORALIS_API_KEY: process.env.MORALIS_API_KEY,
    KYBERSWAP_CLIENT_ID: process.env.KYBERSWAP_CLIENT_ID,
    COINGECKO_API_KEY: process.env.COINGECKO_API_KEY,
    OPENSEA_API_KEY: process.env.OPENSEA_API_KEY,
    SIMPLEHASH_API_KEY: process.env.SIMPLEHASH_API_KEY,
    GOOGLE_VISION_API_KEY: process.env.GOOGLE_VISION_API_KEY,
    DEFINED_API_KEY: process.env.DEFINED_API_KEY,
    POSTHOG_PERSONAL_API_KEY: process.env.POSTHOG_PERSONAL_API_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
