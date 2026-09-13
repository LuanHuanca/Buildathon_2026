# Preparar, probar y desplegar Munay

## Qué hace falta (y qué no)

Munay **sí tiene backend**. Next.js no es un sitio estático: tRPC, Prisma y
la verificación de Unlock corren en el servidor. Hace falta PostgreSQL.

Docker **no despliega la app**. En local solo levanta Postgres (y MailHog).
En producción: Vercel (o cualquier host Node) + Postgres hospedado
(Neon, Supabase o Vercel Postgres). No uses
`docker compose --profile full` para el demo.

## Estado local ya configurado

| Pieza | Valor |
| --- | --- |
| Postgres | `docker compose up -d db mailhog` → `localhost:5434` |
| App | `pnpm dev` → http://localhost:3000 |
| Privy App ID | `cmtzrcc2z01i20cjn5jxnswlv` |
| Lock | `0x87c475aa76b776a4e0f9dba3e9c870dbc1f16421` en Sepolia |
| Explorador del Lock | https://sepolia.etherscan.io/address/0x87c475aa76b776a4e0f9dba3e9c870dbc1f16421 |
| Donaciones | Avalanche Fuji `43113` |
| Unlock | Ethereum Sepolia `11155111` |

## 1. Arrancar en local

```bash
docker compose up -d db mailhog
pnpm install
pnpm db:migrate
pnpm exec prisma db seed
pnpm dev
```

En Privy (`https://dashboard.privy.io`) habilita Google, email y wallet, y
agrega `http://localhost:3000` a los orígenes permitidos.

## 2. Tesorería de donación

Cada comunidad nace con tesorería `0x000…000`. El botón Donar queda
deshabilitado hasta que pongas una wallet real (la tuya de demo vale).

En `.env`:

```bash
DEMO_TREASURY_ADDRESS=0xTuWalletFuji
```

Luego:

```bash
pnpm exec prisma db seed
```

El seed no recrea comunidades si ya existen; solo rellena tesorerías en
cero. Para cambiar una ya asignada usa Prisma Studio (`pnpm db:studio`).

## 3. Fondos de prueba

Los tokens testnet no tienen valor:

- ETH Sepolia (gas + mint de la Key): faucets de Alchemy, Google Cloud o
  Sepolia PoW.
- AVAX Fuji (gas de donación): https://build.avax.network/console/primary-network/faucet
- USDC Fuji: https://faucet.circle.com → Avalanche Fuji.
  Contrato: `0x5425890298aed601595a70AB815c96711a31Bc65`.

Financia la misma dirección que muestra Privy.

## 4. Prueba end-to-end

1. Entra con Google; Privy crea una wallet embebida si no existe.
2. Abre una comunidad: el archivo gated debe verse borroso.
3. Emite la Key gratis en Sepolia desde el checkout de Unlock.
4. El contenido se abre al confirmar la Key.
5. Cambia a Fuji, pide USDC y dona (solo si hay tesorería).
6. Abre el hash en https://testnet.snowtrace.io.
7. Revisa `/perfil` y `/transparencia`.

Si el subgraph de Unlock tarda, espera unos segundos y recarga. No simules
acceso.

## 5. Desplegar (sin Docker)

1. Crea un Postgres hospedado y copia su `DATABASE_URL`.
2. En Vercel (o el host Node) configura:

   ```bash
   DATABASE_URL=
   BETTER_AUTH_SECRET=          # genera uno nuevo, no copies el de local
   BETTER_AUTH_URL=https://tu-dominio.vercel.app
   NEXT_PUBLIC_DONATION_CHAIN_ID=43113
   NEXT_PUBLIC_UNLOCK_CHAIN_ID=11155111
   NEXT_PUBLIC_PRIVY_APP_ID=
   NEXT_PUBLIC_MUNAY_LOCK_ADDRESS=0x87c475aa76b776a4e0f9dba3e9c870dbc1f16421
   DEMO_TREASURY_ADDRESS=       # opcional, misma wallet de demo
   ```

3. En Privy agrega el dominio HTTPS a los orígenes permitidos.
4. Tras el primer deploy, corre migraciones y seed contra la base de
   producción:

   ```bash
   DATABASE_URL="postgresql://..." pnpm db:migrate
   DATABASE_URL="postgresql://..." pnpm exec prisma db seed
   ```

5. No subas `.env`. No uses la imagen Docker de la app en Vercel.

## 6. Producción con dinero real

Cuando salgas de testnet:

```bash
NEXT_PUBLIC_DONATION_CHAIN_ID=43114
NEXT_PUBLIC_UNLOCK_CHAIN_ID=43114
NEXT_PUBLIC_MUNAY_LOCK_ADDRESS=0x... # Lock nuevo en Avalanche C-Chain
```

USDC nativo: `0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E`.
Retira AVAX por **Avalanche C-Chain**. Nunca envíes fondos al zero address.
Antes de producción hay que exigir firma de wallet (SIWE); hoy el servidor
confía en la dirección que manda el cliente.
