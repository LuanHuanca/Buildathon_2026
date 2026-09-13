// Adapted from LumioLearn: src/components/ui/skeleton.tsx
// Changes: none.

import { cn } from "~/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-surface-container-high", className)}
      {...props}
    />
  );
}

export { Skeleton };
