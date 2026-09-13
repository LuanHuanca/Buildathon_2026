# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/palmera
COPY package.json pnpm-lock.yaml .npmrc ./
COPY prisma/schema.prisma ./prisma/schema.prisma
RUN pnpm install --frozen-lockfile

# ---- Build (standalone) ----
FROM base AS builder
ENV SKIP_ENV_VALIDATION=1
ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/palmera
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm prisma generate && pnpm build

# ---- Runtime (slim) ----
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# standalone app + assets + prisma schema/migrations + generated client
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/package.json ./package.json

# migrate + seed tooling (prisma CLI + tsx), kept out of the app runtime deps
RUN npm install --prefix /tools --no-save prisma@6.19.3 tsx@4.23.13
ENV PATH="/tools/node_modules/.bin:${PATH}"

EXPOSE 3000

CMD ["sh", "-c", "prisma migrate deploy && prisma db seed && node server.js"]
