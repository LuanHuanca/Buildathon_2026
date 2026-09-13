# Palmera — Component Inventory

## Status: PENDING (Phase 1)
Will be filled as components are created/migrated.

## Lumio components to migrate (from lumio-context.md)
- [ ] Button — variants: primary, secondary, ghost, danger
- [ ] Card — generic container
- [ ] Badge — category labels
- [ ] Progress — bar with percentage (note: Lumio has NO reusable
      <Progress>; only inline `UsageBar` pattern + `@radix-ui/react-progress`
      dep installed. Build `ui/progress.tsx` from scratch — see ADR-005)
- [ ] Input — with label and error state
- [ ] Select — with options
- [ ] Modal — with backdrop
- [ ] Toast — success/error notifications (sonner)
- [ ] Skeleton — loading placeholder
- [ ] Avatar — user photo with fallback

## Palmera-specific components (new)
- [ ] CommunityCard — based on Lumio's EnrolledCourseCard/CourseCard
- [ ] ProgressGoal — fundraising specific (amount/goal/%)
- [ ] CategoryFilter — pill filter bar
- [ ] DonationPanel — sidebar with amount picker
- [ ] TransparencyTable — on-chain tx history
- [ ] BoliviaMap — react-map-gl with community markers
- [ ] CommunityPreviewPanel — map click panel
- [ ] UnlockGate — web3 content gate
- [ ] WalletButton — connect/disconnect wallet
- [ ] DonacionPollar — Pollar payment button

## File structure
src/
  components/
    ui/          ← migrated from Lumio (generic)
    palmera/     ← Palmera-specific (business logic)
    web3/        ← wagmi + Unlock + Pollar components
    layout/      ← Header, Footer, PageWrapper
