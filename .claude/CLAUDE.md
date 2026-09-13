# Palmera — Claude Context

## What is this project?
Token-gated platform connecting global supporters with
indigenous Bolivian communities. Transparent crowdfunding
+ ethical cultural tourism via Unlock Protocol.

## Stack
- Next.js (App Router) + TypeScript
- Prisma + PostgreSQL
- tRPC v11
- better-auth (email/password; wallet login planned)
- Tailwind CSS v4 (config-less, tokens in `@theme` in `globals.css`)
- wagmi + viem (Avalanche C-Chain, chainId 43114)
- @unlock-protocol/paywall
- @pollar/react
- react-map-gl + mapbox-gl

## Import alias
- `~/*` maps to `./src/*` (set in `tsconfig.json`). Use `~/` everywhere.

## Source inspiration
Adapted from LumioLearn (online courses SaaS).
Mapping: Course=Community, Enrollment=Donation,
Lesson=ContentItem, Locked content=Gated community content.
Full context in: `.claude/lumio-context-summary.md`

## Key decisions
See: `.claude/decisions.md`

## Current task status
See: `.claude/tasks.md`

## Database schema
See: `.claude/schema.md`

## Component inventory
See: `.claude/components.md`

## Environment variables needed
See: `.claude/env.md`

## How to work on this project
1. Read this file (CLAUDE.md)
2. Read `.claude/tasks.md` to know what's done and pending
3. Read the specific `.claude/` file relevant to your task
4. Build the task
5. Update `.claude/tasks.md` and relevant files
6. Commit with the format: `type(scope): description`
