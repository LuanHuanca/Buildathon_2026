# Palmera — Environment Variables

## Status: PENDING setup

## From T3 base (already in .env)
DATABASE_URL=""            # PostgreSQL connection string
BETTER_AUTH_SECRET=""      # generate: openssl rand -base64 32

## Email (dev: MailHog)
SMTP_HOST="localhost"      # "mailhog" inside docker-compose
SMTP_PORT="1025"
SMTP_FROM="Palmera <no-reply@palmera.local>"

## Palmera-specific (add to .env.local)
NEXT_PUBLIC_NETWORK_ID="43114"                    # Avalanche C-Chain
NEXT_PUBLIC_USDC_ADDRESS="0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"  # native USDC on Avalanche
NEXT_PUBLIC_TREASURY_ADDRESS=""                   # wallet that receives donations (multisig)
NEXT_PUBLIC_WALLETCONNECT_ID=""                   # cloud.walletconnect.com (optional)
NEXT_PUBLIC_MAPBOX_TOKEN=""                       # mapbox.com → tokens (optional, for react-map-gl)
NEXT_PUBLIC_LOCK_ADDRESS_URU=""                   # Unlock Protocol lock (after deploy)
NEXT_PUBLIC_LOCK_ADDRESS_TIWANAKU=""              # Unlock Protocol lock (after deploy)
NEXT_PUBLIC_LOCK_ADDRESS_TARABUCO=""              # Unlock Protocol lock (after deploy)

## How to get each value
- TREASURY_ADDRESS: any Avalanche wallet (e.g. Safe multisig) that will hold donated USDC.
- USDC_ADDRESS: native USDC on Avalanche C-Chain (default already set).
- WALLETCONNECT_ID: cloud.walletconnect.com → New project (optional, injected wallet works without it).
- MAPBOX_TOKEN: mapbox.com → Account → Tokens → Create token (optional).
- LOCK_ADDRESS: app.unlock-protocol.com → Create Lock → Deploy → copy address (optional).
- DATABASE_URL: local postgres or Railway/Supabase free tier.

## What works without .env values
- All pages render (map shows illustrative SVG without Mapbox).
- tRPC endpoints work.
- Design system components.
- Static community data from seed.
- Donation panel renders; the "Donar" button is disabled until NEXT_PUBLIC_TREASURY_ADDRESS is set.
- Unlock gate shows "connect wallet" state.
