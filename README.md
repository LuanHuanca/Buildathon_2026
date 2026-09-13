# Palmera

Plataforma token-gated que conecta aliados globales con comunidades indígenas de Bolivia. Crowdfunding transparente + turismo cultural ético vía Unlock Protocol.

## Stack

- Next.js 15 (App Router) + TypeScript
- tRPC v11 + React Query
- Prisma + PostgreSQL
- better-auth (email/password)
- Tailwind CSS v4
- wagmi + viem (Avalanche C-Chain, chainId 43114)

## Correr con Docker (recomendado)

```bash
docker compose up -d --build
```

Esto levanta PostgreSQL + la app (aplica migraciones, siembra las 3 comunidades de ejemplo y arranca el servidor).

- App: http://localhost:3000
- PostgreSQL: `localhost:5434` (user/pass: `postgres`)

Parar:

```bash
docker compose down          # conserva la data
docker compose down -v       # borra la data
```

## Correr en local (desarrollo)

Requisitos: Node 22+, pnpm 10, PostgreSQL.

```bash
cp .env.example .env   # y completá DATABASE_URL y BETTER_AUTH_SECRET
pnpm install
pnpm db:push           # o pnpm db:generate
pnpm db:seed
pnpm dev
```

## Estructura

```
src/
  app/            # páginas (/, /comunidades, /comunidades/[slug], /transparencia)
  server/api/     # routers tRPC (community, donation)
  server/better-auth/
  components/
    ui/           # design system (migrado de Lumio)
    palmera/      # componentes de negocio
    web3/         # wagmi + Unlock + Pollar
    layout/       # Header, Footer, PageWrapper
  .claude/        # contexto del proyecto (tasks, decisiones, schema, componentes)
```

## Env vars

| Variable | Uso |
|---|---|
| `DATABASE_URL` | conexión PostgreSQL |
| `BETTER_AUTH_SECRET` | secreto de sesiones |
| `BETTER_AUTH_URL` | URL base (http://localhost:3000) |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | mapa interactivo (opcional) |
| `NEXT_PUBLIC_WALLETCONNECT_ID` | WalletConnect (opcional) |
| `NEXT_PUBLIC_LOCK_ADDRESS_*` | Locks de Unlock Protocol (por comunidad) |
| `NEXT_PUBLIC_NETWORK_ID` | 43114 (Avalanche) |

Sin las envs opcionales, todo renderiza igual (mapa SVG ilustrativo + gate "conecta tu wallet").
