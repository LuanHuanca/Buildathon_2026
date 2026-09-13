import { z } from "zod";
import {
  createPublicClient,
  decodeFunctionData,
  erc20Abi,
  http,
  parseUnits,
} from "viem";

import { DONATION_CHAIN_ID, donationChain, USDC_ADDRESSES } from "~/lib/chains";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const publicClient = createPublicClient({
  chain: donationChain,
  transport: http(),
});

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

  getByWallet: publicProcedure
    .input(z.object({ walletAddress: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.donation.findMany({
        where: { walletAddress: input.walletAddress },
        orderBy: { createdAt: "desc" },
        include: { community: { select: { name: true, slug: true } } },
      });
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
      const community = await ctx.db.community.findUnique({
        where: { id: input.communityId },
        select: { treasuryAddress: true },
      });
      const usdc = USDC_ADDRESSES[DONATION_CHAIN_ID];
      if (!community || !usdc)
        throw new Error("Configuración de donación inválida");

      const hash = input.txHash as `0x${string}`;
      const [transaction, receipt] = await Promise.all([
        publicClient.getTransaction({ hash }),
        publicClient.getTransactionReceipt({ hash }),
      ]);
      if (receipt.status !== "success") throw new Error("La transacción falló");
      if (
        transaction.from.toLowerCase() !== input.walletAddress.toLowerCase() ||
        transaction.to?.toLowerCase() !== usdc.toLowerCase()
      ) {
        throw new Error("La transacción no corresponde a esta donación");
      }

      const decoded = decodeFunctionData({
        abi: erc20Abi,
        data: transaction.input,
      });
      const expectedAmount = parseUnits(String(input.amountUsdc), 6);
      const [recipient, amount] = decoded.args ?? [];
      if (
        decoded.functionName !== "transfer" ||
        String(recipient).toLowerCase() !==
          community.treasuryAddress.toLowerCase() ||
        amount !== expectedAmount
      ) {
        throw new Error("El destino o monto on-chain no coincide");
      }

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
