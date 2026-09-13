import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { verifyUnlockKey } from "~/server/unlock/verify";

const communitySummarySelect = {
  id: true,
  slug: true,
  name: true,
  department: true,
  category: true,
  problem: true,
  goalAmount: true,
  raisedAmount: true,
  images: true,
  lat: true,
  lng: true,
  responsible: true,
  status: true,
  treasuryAddress: true,
} as const;

export const communityRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.community.findMany({
      where: { status: "active" },
      orderBy: { name: "asc" },
      select: communitySummarySelect,
    });
  }),

  getFeatured: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.community.findMany({
      where: { status: "active" },
      orderBy: { raisedAmount: "desc" },
      take: 3,
      select: communitySummarySelect,
    });
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const community = await ctx.db.community.findUnique({
        where: { slug: input.slug },
        include: {
          sections: {
            orderBy: { order: "asc" },
            include: { items: { orderBy: { order: "asc" } } },
          },
          updates: { orderBy: { createdAt: "desc" } },
          donations: { orderBy: { createdAt: "desc" }, take: 3 },
        },
      });
      if (!community) return null;

      return {
        ...community,
        sections: community.sections.map((section) =>
          section.isGated
            ? {
                ...section,
                items: section.items.map((item) => ({
                  ...item,
                  body: null,
                  mediaUrl: null,
                })),
              }
            : section,
        ),
      };
    }),

  getGated: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
        walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
        lockAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
      }),
    )
    .query(async ({ ctx, input }) => {
      const valid = await verifyUnlockKey(
        input.lockAddress,
        input.walletAddress,
      );
      if (!valid) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Esta wallet no tiene una membresía Unlock vigente.",
        });
      }

      const community = await ctx.db.community.findUnique({
        where: { slug: input.slug },
        select: {
          sections: {
            where: { isGated: true },
            orderBy: { order: "asc" },
            include: { items: { orderBy: { order: "asc" } } },
          },
        },
      });
      return community?.sections ?? [];
    }),
});
