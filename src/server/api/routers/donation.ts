import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const donationRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.donation.findMany({
      orderBy: { createdAt: "desc" },
      include: { community: { select: { name: true, slug: true } } },
    });
  }),

  getTotals: publicProcedure.query(async ({ ctx }) => {
    const [totalDonations, aggregate] = await Promise.all([
      ctx.db.donation.count(),
      ctx.db.donation.aggregate({ _sum: { amountUsdc: true } }),
    ]);
    return {
      totalDonations,
      totalUsdc: aggregate._sum.amountUsdc ?? 0,
    };
  }),

  create: publicProcedure
    .input(
      z.object({
        communityId: z.string().min(1),
        walletAddress: z.string().min(1),
        amountUsdc: z.number().positive(),
        txHash: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [donation] = await ctx.db.$transaction([
        ctx.db.donation.create({
          data: {
            communityId: input.communityId,
            walletAddress: input.walletAddress,
            amountUsdc: input.amountUsdc,
            txHash: input.txHash,
          },
        }),
        ctx.db.community.update({
          where: { id: input.communityId },
          data: { raisedAmount: { increment: input.amountUsdc } },
        }),
      ]);
      return donation;
    }),
});
