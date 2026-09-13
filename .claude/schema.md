# Palmera — Database Schema

## Status: PENDING (Phase 0)
Will be filled after: prisma migrate

## Auth models (from better-auth scaffold, kept)
- User (add walletAddress String? field)
- Session
- Account
- Verification

## Models to create
- Community (maps to Lumio's Course)
- CommunitySection (maps to Lumio's Module/Chapter)
- ContentItem (maps to Lumio's Lesson/Chapter.content)
- Donation (maps to Lumio's Enrollment/Purchase)
- CommunityUpdate (new — no Lumio equivalent)

## Removed
- Post (create-t3-app demo model) — see ADR-006

## Full schema definition
(Claude fills this after running prisma migrate)
