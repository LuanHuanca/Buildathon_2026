# Palmera — Architecture Decisions

## ADR-000: Auth library
Date: 2026-09-12
Decision: better-auth (^1.3) with email/password, Prisma adapter,
sessions stored in DB. No GitHub/OAuth social provider for MVP.
Reason: Matches the LumioLearn/Vendiq family stack (better-auth, not
NextAuth). Simplifies env config (no third-party OAuth secrets).
Wallet login (walletAddress on User) is planned for the Web3 phase.
Status: Accepted

## ADR-000b: Tailwind version
Date: 2026-09-12
Decision: Tailwind CSS v4, config-less. Design tokens live in an
`@theme` block in `src/styles/globals.css` (no `tailwind.config.ts`).
Reason: Matches the family (LumioLearn/Vendiq use Tailwind v4).
Status: Accepted

## ADR-001: Gating strategy
Date: 2026-09-12
Decision: Frontend-only gating for MVP (Unlock key check
via usePaywall hook). Backend returns all content.
Reason: Sufficient for hackathon demo. Production would
require server-side key verification via Unlock API.
Status: Accepted for MVP

## ADR-002: Chain selection
Date: 2026-09-12
Decision: Avalanche C-Chain (chainId 43114)
Reason: Unlock Protocol fully supported, low fees,
EVM compatible, good for demo.
Status: Accepted

## ADR-003: Map library
Date: 2026-09-12
Decision: react-map-gl + Mapbox GL JS (light-v11 style)
Reason: Best UX for interactive markers. Free tier
sufficient for demo. SVG fallback for template/offline.
Status: Accepted — requires NEXT_PUBLIC_MAPBOX_TOKEN

## ADR-004: Payment flow
Date: 2026-09-12
Decision: Pollar for fiat→USDC ramp + Unlock for
membership Keys. Separate concerns: Pollar=donation,
Unlock=content access.
Status: Accepted

## ADR-005: Lumio component reuse
Date: 2026-09-12
Decision: Copy Lumio UI components verbatim (shadcn/Radix patterns),
apply Palmera color tokens via Tailwind `@theme` override.
Do not rewrite working components.
Status: Accepted

## ADR-006: Demo Post model removal
Date: 2026-09-12
Decision: Remove create-t3-app's demo `Post` model + `postRouter`
+ demo landing page; replace with a minimal Palmera placeholder.
Reason: The demo cruft has no Palmera equivalent and pollutes the
schema. Community/Donation routers arrive in Phase 2.
Status: Accepted
