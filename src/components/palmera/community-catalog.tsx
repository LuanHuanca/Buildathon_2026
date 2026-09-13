"use client";

import { useState } from "react";

import { CategoryFilter } from "./category-filter";
import { CommunityCard, type CommunityCardData } from "./community-card";

export function CommunityCatalog({
  communities,
}: {
  communities: CommunityCardData[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = selected
    ? communities.filter((community) => community.category === selected)
    : communities;

  return (
    <div className="space-y-6">
      <CategoryFilter selected={selected} onChange={setSelected} />
      {filtered.length === 0 ? (
        <p className="text-palmera-muted">No hay comunidades en esta categoría.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      )}
    </div>
  );
}
