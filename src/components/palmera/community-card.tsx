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
  environment: "from-[#2a2118] via-surface-container to-surface-container-low",
  culture: "from-[#3e241c] via-surface-container to-surface-container-low",
  heritage: "from-[#322018] via-surface-container to-surface-container-low",
  education: "from-[#2c221c] via-surface-container to-surface-container-low",
  resilience: "from-[#3a1c22] via-surface-container to-surface-container-low",
};

export function CommunityCard({ community }: { community: CommunityCardData }) {
  const href = `/comunidades/${community.slug}`;
  const contract = `#${community.id.slice(-4).toUpperCase()}`;

  return (
    <article className="group border-border/40 bg-surface-container-low flex flex-col overflow-hidden rounded-xl border shadow-lg transition-transform active:scale-[0.99]">
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
            <span className="absolute inset-0 bg-[radial-gradient(400px_200px_at_70%_20%,rgba(229,142,38,0.16),transparent)]" />
            <Leaf className="text-primary/60 relative h-10 w-10" />
          </div>
        )}
        <div className="from-surface-container-low via-surface-container-low/20 absolute inset-0 bg-gradient-to-t to-transparent" />
        <div className="absolute top-2.5 left-2.5">
          <Badge variant="glass" className="border-primary/20">
            <span className="bg-primary h-1 w-1 animate-pulse rounded-full" />
            Verificado Unlock
          </Badge>
        </div>
        <div className="absolute top-2.5 right-2.5">
          <Badge variant="success">Activo</Badge>
        </div>
        <div className="text-foreground absolute bottom-2 left-3 flex items-center gap-1 font-mono text-[11px]">
          <MapPin className="text-secondary h-3.5 w-3.5" />
          {community.department}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-3.5">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <Badge variant="glass">
              {CATEGORY_LABELS[community.category] ?? community.category}
            </Badge>
            <span className="text-outline font-mono text-[10px] tracking-wider uppercase">
              Lock {contract}
            </span>
          </div>
          <h3 className="font-display text-foreground pt-1 text-lg leading-tight font-bold">
            <Link href={href} className="hover:text-primary transition-colors">
              {community.name}
            </Link>
          </h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {community.problem}
          </p>
        </div>

        <div className="bg-surface-container rounded-lg p-2.5">
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
