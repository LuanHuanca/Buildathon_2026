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
    <div className="container py-10">
      <div className="mb-4 flex items-center gap-2">
        <Badge variant="success">
          {CATEGORY_LABELS[community.category] ?? community.category}
        </Badge>
        <span className="text-sm text-palmera-muted">
          {community.department}
        </span>
      </div>
      <h1 className="font-display text-4xl font-bold">{community.name}</h1>
      <p className="mt-2 max-w-2xl text-palmera-slate">
        {community.description}
      </p>
      <div className="mt-4 max-w-xl">
        <ProgressGoal
          goalAmount={community.goalAmount}
          raisedAmount={community.raisedAmount}
        />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {community.sections.map((section) => (
            <section key={section.id}>
              <h2 className="mb-4 font-display text-xl font-bold">
                {section.title}
              </h2>
              {section.isGated ? (
                <UnlockGate lockAddress={community.lockAddress}>
                  {section.items.map((item) => (
                    <article
                      key={item.id}
                      className="mb-4 rounded-lg border border-border bg-card p-4"
                    >
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.body && (
                        <p className="mt-1 text-sm text-palmera-slate">
                          {item.body}
                        </p>
                      )}
                    </article>
                  ))}
                </UnlockGate>
              ) : (
                section.items.map((item) => (
                  <article
                    key={item.id}
                    className="mb-4 rounded-lg border border-border bg-card p-4"
                  >
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.body && (
                      <p className="mt-1 text-sm text-palmera-slate">
                        {item.body}
                      </p>
                    )}
                  </article>
                ))
              )}
            </section>
          ))}

          {community.updates.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-xl font-bold">Avances</h2>
              {community.updates.map((update) => (
                <article
                  key={update.id}
                  className="mb-4 rounded-lg border border-border bg-card p-4"
                >
                  <h3 className="font-semibold">{update.title}</h3>
                  <p className="mt-1 text-sm text-palmera-slate">
                    {update.body}
                  </p>
                </article>
              ))}
            </section>
          )}
        </div>

        <aside>
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
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
