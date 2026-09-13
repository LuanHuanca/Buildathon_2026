// Based on LumioLearn: src/components/user/courses/CourseFilter.tsx (pill pattern).
// Changes: Andean Cyber-Ecology mono chips with icons.

"use client";

import {
  GraduationCap,
  Landmark,
  LayoutGrid,
  Leaf,
  Palette,
  ShieldCheck,
} from "lucide-react";

import { cn } from "~/lib/utils";
import { CATEGORIES, CATEGORY_LABELS } from "./categories";

const CATEGORY_ICONS: Record<string, typeof Leaf> = {
  environment: Leaf,
  culture: Palette,
  heritage: Landmark,
  education: GraduationCap,
  resilience: ShieldCheck,
};

const options = [
  { key: "all", label: "Todas", icon: LayoutGrid },
  ...CATEGORIES.map((c) => ({
    key: c,
    label: CATEGORY_LABELS[c] ?? c,
    icon: CATEGORY_ICONS[c] ?? Leaf,
  })),
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
        const Icon = opt.icon;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key === "all" ? null : opt.key)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs tracking-wide uppercase transition-all",
              active
                ? "bg-primary text-primary-foreground border-transparent font-bold shadow-sm"
                : "border-border/40 bg-surface-container text-muted-foreground hover:bg-surface-container-high hover:text-foreground",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
