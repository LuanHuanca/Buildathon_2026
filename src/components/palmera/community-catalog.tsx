"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "~/components/ui/input";
import { CategoryFilter } from "./category-filter";
import { CommunityCard, type CommunityCardData } from "./community-card";

export function CommunityCatalog({
  communities,
}: {
  communities: CommunityCardData[];
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<string | null>(null);

  const departments = useMemo(() => {
    const set = new Set(communities.map((c) => c.department));
    return Array.from(set).sort();
  }, [communities]);

  const filtered = communities.filter((community) => {
    if (selected && community.category !== selected) return false;
    if (department && community.department !== department) return false;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const haystack =
        `${community.name} ${community.problem} ${community.department}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="text-outline absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar iniciativas, guardianes, biomas..."
            className="pl-9"
          />
        </div>
        <div className="border-border/40 bg-surface-container flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-2">
          <select
            value={department ?? "all"}
            onChange={(e) =>
              setDepartment(e.target.value === "all" ? null : e.target.value)
            }
            className="text-foreground bg-transparent font-mono text-xs tracking-wide uppercase focus:outline-none"
          >
            <option value="all" className="bg-surface-container">
              Todos los departamentos
            </option>
            {departments.map((dept) => (
              <option key={dept} value={dept} className="bg-surface-container">
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <CategoryFilter selected={selected} onChange={setSelected} />
        <span className="text-primary hidden font-mono text-[11px] sm:block">
          {filtered.length} {filtered.length === 1 ? "proyecto" : "proyectos"}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="border-border/40 bg-surface-container-low flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-16 text-center">
          <span className="bg-surface-container-high text-outline mb-3 flex h-14 w-14 items-center justify-center rounded-full">
            <Search className="h-6 w-6" />
          </span>
          <p className="font-display text-foreground text-lg font-bold">
            Sin proyectos en este cuadrante
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            Prueba con otra categoría, departamento o término de búsqueda.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      )}
    </div>
  );
}
