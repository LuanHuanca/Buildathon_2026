import { KeyRound, Wallet } from "lucide-react";
import { notFound } from "next/navigation";

import { CATEGORY_LABELS } from "~/components/palmera/categories";
import {
  DonationPanel,
  type RecentDonation,
} from "~/components/palmera/donation-panel";
import { ProgressGoal } from "~/components/palmera/progress-goal";
import { Badge } from "~/components/ui/badge";
import { AccessPanel } from "~/components/access/access-panel";
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
        <span className="text-primary font-mono text-[11px] tracking-widest uppercase">
          LOC // {community.lat.toFixed(4)}, {community.lng.toFixed(4)} ·{" "}
          {community.department.toUpperCase()}
        </span>
        <Badge variant="success">
          {CATEGORY_LABELS[community.category] ?? community.category}
        </Badge>
      </div>

      <h1 className="font-display text-headline lg:text-headline-xl max-w-3xl leading-tight font-bold">
        {community.name}
      </h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">
        {community.description}
      </p>

      <div className="border-border/40 bg-surface-container-low mt-6 max-w-xl rounded-lg border p-4">
        <ProgressGoal
          goalAmount={community.goalAmount}
          raisedAmount={community.raisedAmount}
        />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {community.sections
            .filter((section) => !section.isGated)
            .map((section) => (
              <section key={section.id}>
                <h2 className="font-display text-title-lg mb-4 font-semibold">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <article
                      key={item.id}
                      className="border-border/40 bg-surface-container-low rounded-lg border p-4"
                    >
                      <h3 className="text-foreground font-medium">
                        {item.title}
                      </h3>
                      {item.body ? (
                        <p className="text-muted-foreground mt-1.5 text-sm">
                          {item.body}
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>
            ))}

          {community.sections.some((section) => section.isGated) ? (
            <section id="archivo" className="scroll-mt-24">
              <div className="mb-2 flex items-center gap-2">
                <KeyRound className="text-secondary h-4 w-4" />
                <h2 className="font-display text-title-lg font-semibold">
                  Archivo
                </h2>
                <span className="bg-secondary/15 text-secondary rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase">
                  Sepolia
                </span>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                La llave Unlock se comprueba en Sepolia. No mueve USDC.
              </p>
              <AccessPanel
                slug={community.slug}
                lockAddress={community.lockAddress}
                titles={community.sections
                  .filter((section) => section.isGated)
                  .flatMap((section) =>
                    section.items.map((item) => item.title),
                  )}
              />
            </section>
          ) : null}

          {community.updates.length > 0 && (
            <section>
              <h2 className="font-display mb-4 text-xl font-bold">Avances</h2>
              <div className="space-y-3">
                {community.updates.map((update) => (
                  <article
                    key={update.id}
                    className="border-border/40 bg-surface-container-low rounded-lg border p-4"
                  >
                    <h3 className="text-foreground font-medium">
                      {update.title}
                    </h3>
                    <p className="text-muted-foreground mt-1.5 text-sm">
                      {update.body}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside>
          <div
            id="donar"
            className="border-border/40 bg-surface-container-low sticky top-24 scroll-mt-24 rounded-xl border p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <Wallet className="text-tertiary h-4 w-4" />
              <p className="text-tertiary font-mono text-[11px] tracking-wider uppercase">
                Avalanche
              </p>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              La donación es un transfer de USDC en Avalanche. No abre el
              archivo.
            </p>
            <DonationPanel
              communityId={community.id}
              communityName={community.name}
              treasuryAddress={community.treasuryAddress}
              recentDonations={recentDonations}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
