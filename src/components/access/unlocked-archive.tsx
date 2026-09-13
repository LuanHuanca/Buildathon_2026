import { networkName, UNLOCK_CHAIN_ID } from "~/lib/chains";

export function UnlockedArchive({
  address,
  sections,
}: {
  address: string;
  sections: {
    id: string;
    title: string;
    items: { id: string; title: string; body: string | null }[];
  }[];
}) {
  const short = `${address.slice(0, 6)}…${address.slice(-4)}`;

  return (
    <div className="border-tertiary/30 overflow-hidden rounded-xl border">
      <div className="border-tertiary/30 bg-tertiary/10 flex items-center gap-2 border-b px-4 py-2.5">
        <span className="bg-tertiary h-1.5 w-1.5 rounded-full" />
        <span className="text-tertiary font-mono text-[11px] tracking-wider uppercase">
          Llave válida · {networkName(UNLOCK_CHAIN_ID)} · {short}
        </span>
      </div>
      <div className="space-y-6 p-4">
        {sections.map((section) => (
          <section key={section.id}>
            <h3 className="font-display text-title-lg font-semibold">
              {section.title}
            </h3>
            <div className="mt-3 space-y-3">
              {section.items.map((item) => (
                <article
                  key={item.id}
                  className="border-border/40 bg-surface-container-low rounded-lg border p-4"
                >
                  <h4 className="text-foreground font-medium">{item.title}</h4>
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
      </div>
    </div>
  );
}
