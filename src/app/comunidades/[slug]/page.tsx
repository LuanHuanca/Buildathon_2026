import { notFound } from "next/navigation";

import { CATEGORY_LABELS } from "~/components/palmera/categories";
import {
  DonationPanel,
  type RecentDonation,
} from "~/components/palmera/donation-panel";
import { ProgressGoal } from "~/components/palmera/progress-goal";
import { Badge } from "~/components/ui/badge";
import { UnlockGate } from "~/components/web3/unlock-gate";
import { api } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function CommunityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const community = await api.community.getBySlug({ slug });
  if (!community) notFound();

  const recentDonations: RecentDonation[] = community.donations.map((d) => ({
    id: d.id,
    walletAddress: d.walletAddress,
    amountUsdc: d.amountUsdc,
    createdAt: d.createdAt,
  }));

  return (
    <div className="container py-8">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
          LOC // {community.lat.toFixed(4)}, {community.lng.toFixed(4)} ·{" "}
          {community.department.toUpperCase()}
        </span>
        <Badge variant="success">
          {CATEGORY_LABELS[community.category] ?? community.category}
        </Badge>
      </div>

      <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight">
        {community.name}
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        {community.description}
      </p>

      <div className="mt-6 max-w-xl rounded-lg border border-border/40 bg-surface-container-low p-4">
        <ProgressGoal
          goalAmount={community.goalAmount}
          raisedAmount={community.raisedAmount}
        />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {community.sections.map((section) => (
            <section key={section.id}>
              <div className="mb-4 flex items-center gap-2">
                <h2 className="font-display text-xl font-bold">
                  {section.title}
                </h2>
                {section.isGated && (
                  <span className="flex items-center gap-1 rounded bg-secondary/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-secondary">
                    <span className="h-1 w-1 rounded-full bg-secondary" />
                    Gated
                  </span>
                )}
              </div>

              {section.isGated ? (
                <UnlockGate lockAddress={community.lockAddress}>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <article
                        key={item.id}
                        className="rounded-lg border border-border/40 bg-surface-container-low p-4"
                      >
                        <h3 className="font-medium text-foreground">
                          {item.title}
                        </h3>
                        {item.body && (
                          <p className="mt-1.5 text-sm text-muted-foreground">
                            {item.body}
                          </p>
                        )}
                      </article>
                    ))}
                  </div>
                </UnlockGate>
              ) : (
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-lg border border-border/40 bg-surface-container-low p-4"
                    >
                      <h3 className="font-medium text-foreground">
                        {item.title}
                      </h3>
                      {item.body && (
                        <p className="mt-1.5 text-sm text-muted-foreground">
                          {item.body}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </section>
          ))}

          {community.updates.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-xl font-bold">Avances</h2>
              <div className="space-y-3">
                {community.updates.map((update) => (
                  <article
                    key={update.id}
                    className="rounded-lg border border-border/40 bg-surface-container-low p-4"
                  >
                    <h3 className="font-medium text-foreground">
                      {update.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {update.body}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside>
          <div className="sticky top-24 rounded-xl border border-border/40 bg-surface-container-low p-5">
            <DonationPanel
              communityId={community.id}
              communityName={community.name}
              recentDonations={recentDonations}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
