# Munay

Plataforma Web3 que conecta investigación, comunidades y turismo responsable
en Bolivia. Las membresías usan Unlock Protocol y las donaciones USDC ocurren
exclusivamente en redes Avalanche.

## Stack

- Next.js 15 (App Router) + TypeScript
- tRPC v11 + React Query
- Prisma + PostgreSQL
- Privy (Google, email, wallet externa y wallet embebida)
- better-auth (flujo heredado durante la transición)
- Tailwind CSS v4
- wagmi + viem + Unlock Protocol
- Leaflet + GSAP

## ¿Hace falta backend? ¿Hace falta Docker?

Sí hay backend. Next.js no es un sitio estático: tRPC, Prisma y la
verificación de Unlock corren en el servidor. Necesitas PostgreSQL.

Docker **no despliega Munay**. En local solo sirve para levantar Postgres
(y MailHog). En producción la app va a Vercel y la base a un Postgres
hospedado (Neon, Supabase o Vercel Postgres).

## Probar en local

```bash
# 1. Solo la base (no construye la app)
docker compose up -d db mailhog

# 2. Completa .env (Privy, Lock, BETTER_AUTH_SECRET). Luego:
pnpm install
pnpm db:migrate
pnpm exec prisma db seed
pnpm dev
```

- App: http://localhost:3000
- PostgreSQL: `localhost:5434` (usuario y contraseña `postgres`)
- MailHog: http://localhost:8025

`DATABASE_URL` debe ser `postgresql://postgres:postgres@localhost:5434/palmera`
(Docker publica **5434**, no 5432).

En Privy agrega `http://localhost:3000` como origen permitido.

Para probar donaciones, pon tu wallet Fuji en `DEMO_TREASURY_ADDRESS` y
vuelve a correr `pnpm exec prisma db seed`. Sin eso el botón Donar queda
apagado (tesorería en cero).

Parar la base:

```bash
docker compose down          # conserva la data
docker compose down -v       # borra la data
```

La imagen completa de Next queda opcional:

```bash
docker compose --profile full up -d --build
```

## Acceso

Privy ofrece Google, email y wallets externas. Quien entra sin wallet recibe
una embebida. Sin `NEXT_PUBLIC_PRIVY_APP_ID`, Munay conserva un fallback de
wallet inyectada para desarrollo.

## Desplegar

1. Crea un Postgres hospedado y pega su URL en `DATABASE_URL`.
2. En Vercel configura las mismas variables de `.env`, más
   `BETTER_AUTH_URL` con el dominio HTTPS.
3. En Privy agrega ese dominio a los orígenes permitidos.
4. Corre las migraciones contra la base de producción
   (`pnpm db:migrate`).
5. No uses Docker en Vercel. Docker solo es para la base local.

## Estructura

```
src/
  app/            # comunidades, investigadores, turismo, perfil, transparencia
  server/api/     # routers tRPC (community, donation)
  server/better-auth/
  components/
    ui/           # design system (migrado de Lumio)
    palmera/      # componentes de negocio
    web3/         # Privy, wagmi y Unlock
    layout/       # Header, Footer, PageWrapper
  .claude/        # contexto del proyecto (tasks, decisiones, schema, componentes)
```

## Env vars

| Variable                                | Uso                                |
| --------------------------------------- | ---------------------------------- |
| `DATABASE_URL`                          | conexión PostgreSQL                |
| `BETTER_AUTH_SECRET`                    | secreto de sesiones                |
| `BETTER_AUTH_URL`                       | URL base (http://localhost:3000)   |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_FROM` | servidor de email (MailHog en dev) |
| `NEXT_PUBLIC_DONATION_CHAIN_ID`         | 43113 dev / 43114 producción       |
| `NEXT_PUBLIC_UNLOCK_CHAIN_ID`           | 11155111 Sepolia / 43114 Avalanche |
| `NEXT_PUBLIC_PRIVY_APP_ID`              | App ID público de Privy            |
| `NEXT_PUBLIC_WALLETCONNECT_ID`          | WalletConnect (opcional)           |
| `NEXT_PUBLIC_MUNAY_LOCK_ADDRESS`        | Lock único de investigación        |

Cada comunidad tiene su propia `treasuryAddress`. Las direcciones se inicializan
en cero de forma segura y deben configurarse antes de aceptar fondos.

## Guías

- [Integración de Unlock](docs/UNLOCK.md)
- [Preparar y probar la demo](docs/TESTING-SETUP.md)
- [Guion de presentación](docs/GUION-DEMO.md)
