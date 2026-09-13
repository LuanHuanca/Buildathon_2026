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
- [x] Copy UI components from Lumio: Button, Card, Badge,
      Progress, Input, Select, Modal, Toast, Skeleton, Avatar
- [x] Apply Palmera color tokens
- [x] Apply Palmera typography (Playfair Display + Inter)
- [x] Layout: Header + Footer + PageWrapper adapted from Lumio
- [ ] Verify components render correctly (visual smoke test)

## Phase 2 — tRPC Routers
- [x] communityRouter: getAll, getBySlug, getFeatured
- [x] donationRouter: create, getAll, getTotals

## Phase 3 — Web3 Layer
- [x] WagmiProvider (Avalanche config)
- [x] WalletButton component
- [x] UnlockGate component
- [x] DonacionPollar component

## Phase 4 — Pages
- [x] /transparencia — public dashboard (no web3)
- [x] /comunidades — catalog with category filter
- [x] / — landing with Bolivia map
- [x] /comunidades/[slug] — detail with Unlock gate

## Phase 5 — Integration & Polish
- [ ] End-to-end donation flow test
- [ ] Unlock checkout flow test
- [ ] Mobile responsive pass
- [ ] README.md for judges
- [ ] Video demo prep (5 key screens)

---
Last updated: 2026-09-12
