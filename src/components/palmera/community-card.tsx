// Based on LumioLearn: src/components/user/courses/EnrolledCourseCard.tsx
// Changes: Andean Cyber-Ecology project card (telemetry, mono labels).

import { ArrowRight, Leaf, MapPin } from "lucide-react";
import Link from "next/link";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
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

const CATEGORY_GRADIENTS: Record<string, string> = {
  environment: "from-canopy-glass via-surface-container to-surface-container-low",
  culture: "from-[#3a2a00] via-surface-container to-surface-container-low",
  heritage: "from-[#00211a] via-surface-container to-surface-container-low",
  education: "from-[#002a3a] via-surface-container to-surface-container-low",
  resilience: "from-[#2a0018] via-surface-container to-surface-container-low",
};

export function CommunityCard({ community }: { community: CommunityCardData }) {
  const href = `/comunidades/${community.slug}`;
  const contract = `#${community.id.slice(-4).toUpperCase()}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border/40 bg-surface-container-low shadow-lg transition-transform active:scale-[0.99]">
      <Link href={href} className="relative h-44 w-full overflow-hidden">
        {community.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={community.images[0]}
            alt={community.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center bg-gradient-to-br",
              CATEGORY_GRADIENTS[community.category] ??
                CATEGORY_GRADIENTS.environment,
            )}
          >
            <span className="absolute inset-0 bg-[radial-gradient(400px_200px_at_70%_20%,rgba(0,229,153,0.18),transparent)]" />
            <Leaf className="relative h-10 w-10 text-primary/60" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/20 to-transparent" />
        <div className="absolute left-2.5 top-2.5">
          <Badge variant="glass" className="border-primary/20">
            <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
            Verificado Unlock
          </Badge>
        </div>
        <div className="absolute right-2.5 top-2.5">
          <Badge variant="success">Activo</Badge>
        </div>
        <div className="absolute bottom-2 left-3 flex items-center gap-1 font-mono text-[11px] text-foreground">
          <MapPin className="h-3.5 w-3.5 text-secondary" />
          {community.department}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-3.5">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <Badge variant="glass">
              {CATEGORY_LABELS[community.category] ?? community.category}
            </Badge>
            <span className="font-mono text-[10px] uppercase tracking-wider text-outline">
              Lock {contract}
            </span>
          </div>
          <h3 className="pt-1 font-display text-lg font-bold leading-tight text-foreground">
            <Link href={href} className="transition-colors hover:text-primary">
              {community.name}
            </Link>
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {community.problem}
          </p>
        </div>

        <div className="rounded-lg bg-surface-container p-2.5">
          <ProgressGoal
            goalAmount={community.goalAmount}
            raisedAmount={community.raisedAmount}
          />
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-1">
          <Button asChild variant="outline" size="sm" className="h-9">
            <Link href={href}>Ver detalles</Link>
          </Button>
          <Button asChild size="sm" className="h-9">
            <Link href={href}>
              Apoyar
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
