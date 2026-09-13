# Palmera — Database Schema

## Status: DONE (Phase 0)
Migration: `20260913005107_palmera_models`

## Auth models (from better-auth scaffold, kept)
- `User` — table `user` (added `walletAddress String?`)
- `Session` — table `session`
- `Account` — table `account`
- `Verification` — table `verification`

## Palmera models
- `Community` (maps to Lumio's Course)
- `CommunitySection` (maps to Lumio's Module/Chapter)
- `ContentItem` (maps to Lumio's Lesson/Chapter.content)
- `Donation` (maps to Lumio's Enrollment/Purchase)
- `CommunityUpdate` (new — no Lumio equivalent)

## Removed
- `Post` (create-t3-app demo model) — see ADR-006

## Full schema (prisma/schema.prisma)

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id
  name          String
  email         String
  emailVerified Boolean   @default(false)
  image         String?
  walletAddress String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @default(now()) @updatedAt
  sessions      Session[]
  accounts      Account[]

  @@unique([email])
  @@map("user")
}

model Session {
  id        String   @id
  expiresAt DateTime
  token     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([token])
  @@map("session")
}

model Account {
  id                    String    @id
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  @@map("account")
}

model Verification {
  id         String   @id
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @default(now()) @updatedAt

  @@map("verification")
}

model Community {
  id           String    @id @default(cuid())
  slug         String    @unique
  name         String
  department   String
  lat          Float
  lng          Float
  category     String
  problem      String
  description  String    @db.Text
  goalAmount   Float
  raisedAmount Float     @default(0)
  status       String    @default("active")
  lockAddress  String?
  network      Int       @default(43114)
  images       String[]
  responsible  String
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  donations    Donation[]
  updates      CommunityUpdate[]
  sections     CommunitySection[]
}

model CommunitySection {
  id          String        @id @default(cuid())
  communityId String
  community   Community     @relation(fields: [communityId], references: [id], onDelete: Cascade)
  title       String
  order       Int
  isGated     Boolean       @default(true)
  items       ContentItem[]

  @@index([communityId, order])
}

model ContentItem {
  id        String           @id @default(cuid())
  sectionId String
  section   CommunitySection @relation(fields: [sectionId], references: [id], onDelete: Cascade)
  type      String
  title     String
  body      String?          @db.Text
  mediaUrl  String?
  order     Int

  @@index([sectionId, order])
}

model Donation {
  id            String    @id @default(cuid())
  communityId   String
  community     Community @relation(fields: [communityId], references: [id], onDelete: Cascade)
  walletAddress String
  amountUsdc    Float
  txHash        String    @unique
  network       String    @default("avalanche")
  createdAt     DateTime  @default(now())

  @@index([communityId])
}

model CommunityUpdate {
  id          String    @id @default(cuid())
  communityId String
  community   Community @relation(fields: [communityId], references: [id], onDelete: Cascade)
  title       String
  body        String    @db.Text
  images      String[]
  createdAt   DateTime  @default(now())

  @@index([communityId, createdAt])
}
```

## Seed
`prisma/seed.ts` seeds 3 communities (Uru Chipaya, Tiwanaku, Tarabuco)
with sections, content items, updates, and sample donations (fake tx hashes).
