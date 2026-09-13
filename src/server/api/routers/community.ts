import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
      return ctx.db.community.findUnique({
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
    }),
});
