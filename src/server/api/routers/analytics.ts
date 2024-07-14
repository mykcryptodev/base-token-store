import fetch from "node-fetch";
import { env } from "~/env";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const analyticsRouter = createTRPCRouter({
  getPageviews: publicProcedure
    .query(async () => {
      const url = new URL('https://app.posthog.com/api/projects/79090/insights/1718619?refresh=true');
      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${env.POSTHOG_PERSONAL_API_KEY}`
        }
      });
      type PageviewEventResult = {
        result: {
          data: number[];
          labels: string[];
        }[];
      };
      const data = await response.json() as PageviewEventResult;
      return data;
    }),
  getAdvertisementClicks: publicProcedure
    .query(async () => {
      const url = new URL('https://app.posthog.com/api/projects/79090/insights/1720933?refresh=true');
      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${env.POSTHOG_PERSONAL_API_KEY}`
        }
      });
      type PageviewEventResult = {
        result: {
          data: number[];
          labels: string[];
          label: string;
        }[];
      };
      const data = await response.json() as PageviewEventResult;
      return data;
    }),
});