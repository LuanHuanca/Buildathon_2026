# Palmera — Component Inventory

## Status: Phase 1 done (design system migrated)

## Lumio components migrated → src/components/ui/
- [x] Button — variants: primary, secondary, ghost, danger
- [x] Card — generic container (+ Header/Title/Description/Content/Footer)
- [x] Badge — category labels (variants: default, secondary, outline, success)
- [x] Progress — built from scratch wrapping @radix-ui/react-progress
- [x] Input — with label and error state
- [x] Select — Radix select
- [x] Modal — Radix dialog (renamed Dialog* → Modal*)
- [x] Toast — sonner Toaster (fixed light theme)
- [x] Skeleton — loading placeholder
- [x] Avatar — Radix avatar with fallback

## Palmera-specific components → src/components/palmera/
- [x] CommunityCard — based on Lumio's EnrolledCourseCard
- [x] ProgressGoal — fundraising specific (amount/goal/%)
- [x] CategoryFilter — pill filter bar
- [x] DonationPanel — sidebar with amount picker
- [x] TransparencyTable — on-chain tx history
- [x] BoliviaMap — SVG fallback with community markers (react-map-gl pending token)
- [x] CommunityCatalog — client wrapper: CategoryFilter + CommunityCard grid
- [ ] CommunityPreviewPanel — map click panel (Phase 4, pending interactive map)
- [x] UnlockGate — web3 content gate (Phase 3)
- [x] WalletButton — connect/disconnect wallet (Phase 3)
- [x] DonacionPollar — Pollar payment button (Phase 3)

## Layout → src/components/layout/
- [x] Header — nav Inicio/Comunidades/Transparencia + wallet placeholder
- [x] Footer — tagline + Proyectos/Transparencia/GitHub
- [x] PageWrapper — Header + main + Footer

## Shared helpers
- [x] src/lib/utils.ts — cn() (clsx + tailwind-merge)
- [x] src/lib/format.ts — formatUsdc()
- [x] src/components/palmera/categories.ts — CATEGORIES + CATEGORY_LABELS

## Notes
- DonationPanel/TransparencyTable are presentational; they accept data as props.
  Wiring to tRPC (donationRouter/communityRouter) is Phase 2 (done).
- src/components/web3/: wagmi config (Avalanche), WagmiProvider, WalletButton,
  UnlockGate, DonacionPollar. Unlock membership check (usePaywall) + Pollar
  onramp are deferred pending API keys (see ADR-007).

## File structure
src/
  components/
    ui/          ← migrated from Lumio (generic)
    palmera/     ← Palmera-specific (business logic)
    web3/        ← wagmi + Unlock + Pollar components (pending)
    layout/      ← Header, Footer, PageWrapper
