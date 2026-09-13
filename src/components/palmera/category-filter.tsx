// Based on LumioLearn: src/components/user/courses/CourseFilter.tsx (pill pattern).
// Changes: filter keys → community categories.

"use client";

import { cn } from "~/lib/utils";
import { CATEGORIES, CATEGORY_LABELS } from "./categories";

const options = [
  { key: "all", label: "Todas" },
  ...CATEGORIES.map((c) => ({ key: c, label: CATEGORY_LABELS[c] ?? c })),
];

export function CategoryFilter({
  selected,
  onChange,
}: {
  selected: string | null;
  onChange: (cat: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = (selected ?? "all") === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key === "all" ? null : opt.key)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card text-palmera-slate hover:bg-muted hover:text-foreground",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
