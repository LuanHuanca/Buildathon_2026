// Based on LumioLearn: src/components/user/courses/EnrolledCourseCard.tsx
// Changes: progressPercent → raisedAmount/goalAmount; Playfair Display title;
// category badge instead of level badge; removed dropdown menu.

import Link from "next/link";

import { Badge } from "~/components/ui/badge";
import { CATEGORY_LABELS } from "./categories";
import { ProgressGoal } from "./progress-goal";

export interface CommunityCardData {
  id: string;
  slug: string;
  name: string;
  department: string;
  category: string;
  problem: string;
  goalAmount: number;
  raisedAmount: number;
  images: string[];
}

export function CommunityCard({ community }: { community: CommunityCardData }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
      <Link
        href={`/comunidades/${community.slug}`}
        className="flex flex-1 flex-col"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {community.images[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={community.images[0]}
              alt={community.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-4xl font-bold text-palmera-muted">
                P
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-center gap-2">
            <Badge variant="success">
              {CATEGORY_LABELS[community.category] ?? community.category}
            </Badge>
            <span className="text-xs text-palmera-muted">
              {community.department}
            </span>
          </div>
          <h3 className="font-display text-lg font-bold leading-snug text-foreground">
            {community.name}
          </h3>
          <p className="line-clamp-2 text-sm text-palmera-slate">
            {community.problem}
          </p>
          <div className="mt-auto pt-1">
            <ProgressGoal
              goalAmount={community.goalAmount}
              raisedAmount={community.raisedAmount}
            />
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <Link
          href={`/comunidades/${community.slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-palmera-ochre"
        >
          Ver comunidad &rarr;
        </Link>
      </div>
    </div>
  );
}
