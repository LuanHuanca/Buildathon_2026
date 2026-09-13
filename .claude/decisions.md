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

## ADR-007: Web3 library versions
Date: 2026-09-13
Decision: wagmi v2 + viem v2 (Avalanche C-Chain 43114).
Reason: wagmi v3 requires zod v4 (conflicts with zod v3 used by
tRPC/better-auth/@t3-oss/env-nextjs). wagmi 2.14.0 pinned — later 2.19.x
pulls `@base-org/account`→`@x402/*`, which webpack can't resolve under
pnpm (fails `next build`). Unlock membership check (`usePaywall`) and
Pollar onramp are deferred until LOCK_ADDRESS + Pollar API keys exist;
UnlockGate is a connect-wallet gate for now (extends ADR-001).
Status: Accepted

## ADR-009: Donation flow — native Avalanche (Pollar dropped)
Date: 2026-09-13
Decision: Drop Pollar (fiat onramp) and make donations a native USDC
transfer on Avalanche C-Chain via wagmi/viem (`erc20Abi` + `transfer` to
NEXT_PUBLIC_TREASURY_ADDRESS). On tx submission, record the donation via
`donationRouter.create` (publicProcedure) with the tx hash.
Reason: Pollar required a call with the provider that couldn't happen.
Native USDC keeps the on-chain transparency promise with no fiat ramp.
Status: Accepted — requires NEXT_PUBLIC_TREASURY_ADDRESS

## ADR-008: Design system — "Andean Cyber-Ecology"
Date: 2026-09-13
Decision: Replace the initial light Palmera palette with the Stitch
design system from `stitch_palmera_web3_crowdfunding_platform/`
("Andean Cyber-Ecology"). Dark baseline (`#101412`), emerald neon primary
(`#00E599`), Andean gold secondary (`#FFB800`), typography Syne (display)
+ Space Grotesk (body) + JetBrains Mono (telemetry), glassmorphism + HUD
mono labels. Source: DESIGN.md + code.html in the Stitch folder.
Reason: User-provided improved design; wanted a more structured landing.
Status: Accepted
