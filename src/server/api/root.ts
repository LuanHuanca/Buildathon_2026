import { communityRouter } from "~/server/api/routers/community";
import { donationRouter } from "~/server/api/routers/donation";
import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => ({ ok: true })),
  community: communityRouter,
  donation: donationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.community.getAll();
 */
export const createCaller = createCallerFactory(appRouter);
