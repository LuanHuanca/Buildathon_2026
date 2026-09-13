import { createCallerFactory, createTRPCRouter, publicProcedure } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 * (communityRouter / donationRouter arrive in Phase 2.)
 */
export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => ({ ok: true })),
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.healthcheck();
 *       ^? { ok: boolean }
 */
export const createCaller = createCallerFactory(appRouter);
