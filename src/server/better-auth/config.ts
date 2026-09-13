import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { db } from "~/server/db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql", // or "sqlite" or "mysql"
  }),
  emailAndPassword: {
    enabled: true,
  },
  // NOTE: wallet-based auth (walletAddress on User) is planned for the Web3 phase.
  // Social providers are intentionally omitted for the MVP (see .claude/decisions.md ADR-000).
  user: {
    additionalFields: {
      walletAddress: {
        type: "string",
        required: false,
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
