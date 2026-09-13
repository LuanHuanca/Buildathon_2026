# Palmera — Environment Variables

## Status: PENDING setup

## From T3 base (already in .env)
DATABASE_URL=""            # PostgreSQL connection string
BETTER_AUTH_SECRET=""      # generate: openssl rand -base64 32

## Palmera-specific (add to .env.local)
NEXT_PUBLIC_MAPBOX_TOKEN=""          # mapbox.com → tokens
NEXT_PUBLIC_WALLETCONNECT_ID=""      # cloud.walletconnect.com
NEXT_PUBLIC_LOCK_ADDRESS_URU=""      # after Unlock deploy
NEXT_PUBLIC_LOCK_ADDRESS_TIWANAKU="" # after Unlock deploy
NEXT_PUBLIC_LOCK_ADDRESS_TARABUCO="" # after Unlock deploy
NEXT_PUBLIC_NETWORK_ID="43114"       # Avalanche mainnet

## How to get each value
- MAPBOX_TOKEN: mapbox.com → Account → Tokens → Create token
- WALLETCONNECT_ID: cloud.walletconnect.com → New project
- LOCK_ADDRESS: app.unlock-protocol.com → Create Lock
  (network: Avalanche, price: 5 USDC, duration: 365 days)
  → Deploy → copy contract address
- DATABASE_URL: local postgres or Railway/Supabase free tier

## What works without .env values
- All pages render (map shows blank tile without Mapbox)
- tRPC endpoints work
- Lumio design system components
- Static community data from seed
- Unlock gate shows "connect wallet" state
