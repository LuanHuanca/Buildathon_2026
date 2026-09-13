# Palmera — Task Tracker

## Commit convention
feat(scope): new feature
fix(scope): bug fix
chore(scope): config/tooling
style(scope): visual only
refactor(scope): no behavior change

## Status legend
- [ ] Pending
- [~] In progress
- [x] Done — commit: {hash}

---

## Phase 0 — Foundation
- [x] T3 stack init — commit: 0a9d510
- [x] .claude/ context system — commit: 6168b88
- [x] Tailwind design tokens + fonts
- [ ] .env.local setup
- [x] Prisma schema (Palmera models)
- [x] Prisma migrate + seed (3 communities)

## Phase 1 — Design System (from Lumio)
- [ ] Copy UI components from Lumio: Button, Card, Badge,
      Progress, Input, Select, Modal, Toast, Skeleton, Avatar
- [ ] Apply Palmera color tokens
- [ ] Apply Palmera typography (Playfair Display + Inter)
- [ ] Layout: Header + Footer + PageWrapper adapted from Lumio
- [ ] Verify components render correctly (visual smoke test)

## Phase 2 — tRPC Routers
- [ ] communityRouter: getAll, getBySlug, getFeatured
- [ ] donationRouter: create, getAll, getTotals

## Phase 3 — Web3 Layer
- [ ] WagmiProvider (Avalanche config)
- [ ] WalletButton component
- [ ] UnlockGate component
- [ ] DonacionPollar component

## Phase 4 — Pages
- [ ] /transparencia — public dashboard (no web3)
- [ ] /comunidades — catalog with category filter
- [ ] / — landing with Bolivia map
- [ ] /comunidades/[slug] — detail with Unlock gate

## Phase 5 — Integration & Polish
- [ ] End-to-end donation flow test
- [ ] Unlock checkout flow test
- [ ] Mobile responsive pass
- [ ] README.md for judges
- [ ] Video demo prep (5 key screens)

---
Last updated: 2026-09-12
