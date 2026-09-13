# LumioLearn → Palmera Mapping Summary

## Source: lumio-context.md (full version in workspace)

## Key reuse decisions

### Button (src/components/ui/button.tsx — shadcn/CVA)
- Maps to: Palmera `ui/button.tsx`
- Changes needed: swap `primary` brand color to palmera-indigo; keep CVA variant API
- Reuse verbatim: yes (with token color change)

### Card (src/components/ui/card.tsx — shadcn)
- Maps to: Palmera `ui/card.tsx`
- Changes needed: none (neutral container)
- Reuse verbatim: yes

### Badge (src/components/ui/badge.tsx — shadcn)
- Maps to: Palmera `ui/badge.tsx` (category labels)
- Changes needed: add category color variants
- Reuse verbatim: yes

### Input (src/components/ui/input.tsx — shadcn)
- Maps to: Palmera `ui/input.tsx`
- Changes needed: none
- Reuse verbatim: yes

### Select (src/components/ui/select.tsx — shadcn/Radix)
- Maps to: Palmera `ui/select.tsx`
- Changes needed: none
- Reuse verbatim: yes

### Dialog/Modal (src/components/ui/dialog.tsx — shadcn/Radix)
- Maps to: Palmera `ui/modal.tsx` (or keep `dialog.tsx`)
- Changes needed: none
- Reuse verbatim: yes

### Avatar (src/components/ui/avatar.tsx — shadcn/Radix)
- Maps to: Palmera `ui/avatar.tsx`
- Changes needed: none
- Reuse verbatim: yes

### Skeleton (src/components/ui/skeleton.tsx — shadcn)
- Maps to: Palmera `ui/skeleton.tsx`
- Changes needed: none
- Reuse verbatim: yes

### Toaster (src/components/ui/toaster.tsx — sonner)
- Maps to: Palmera `ui/toaster.tsx` + mount `<Toaster />`
- Changes needed: none
- Reuse verbatim: yes

### Progress — DOES NOT EXIST in Lumio
- Only inline `UsageBar` pattern (div.bg-muted + div.bg-primary with width %) +
  `@radix-ui/react-progress` installed but never wrapped.
- Build `ui/progress.tsx` from scratch wrapping `@radix-ui/react-progress`.

### EnrolledCourseCard (src/components/user/courses/EnrolledCourseCard.tsx)
- Maps to: Palmera `palmera/community-card.tsx`
- Changes needed: progressPercent → raisedAmount/goalAmount; drop dropdown menu CTA;
  Playfair Display title; category badge instead of level badge
- Reuse verbatim: no (adapt structure)

### CourseFilter (src/components/user/courses/CourseFilter.tsx)
- Maps to: Palmera `palmera/category-filter.tsx`
- Changes needed: filter keys become community categories (environment/culture/...)
- Reuse verbatim: no (adapt pill pattern)

### UsageBar (dashboard/settings/plan/page.tsx inline)
- Maps to: Palmera `palmera/progress-goal.tsx`
- Changes needed: fill color → palmera-forest (#2D6A4F); labels "X USDC de Y USDC (Z%)"
- Reuse verbatim: no (extract to component)

### Transparency table — DOES NOT EXIST as buyer-facing component
- Data model exists (PaymentTransaction/TenantPayout). Build `transparency-table.tsx`
  wrapping `ui/table.tsx` + `scrollable-table.tsx` pattern.

### UnlockGate — DOES NOT EXIST
- Lumio gates via query field exclusion (getPublicCourse vs getCourseDetail +
  UserCourseEnrollment check), not a visual component. Build Palmera UnlockGate
  from scratch for frontend-only Unlock key check (see ADR-001).

## Web3 / map
- wagmi/viem: not present in any family repo → add from scratch.
- Map: no map library in family (only Peru INEI hierarchical geodata) → react-map-gl from scratch.
