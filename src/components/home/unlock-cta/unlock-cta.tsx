import { KeyRound, Wallet } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";

export function UnlockCta({ href }: { href: string }) {
  return (
    <section className="border-border border-t">
      <div className="container flex flex-col gap-8 py-16 lg:flex-row lg:items-end lg:justify-between lg:py-24">
        <div className="max-w-xl">
          <p className="text-primary font-mono text-[11px] tracking-[0.18em] uppercase">
            Dos actos
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold lg:text-5xl">
            La llave y la donación no son lo mismo.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-prose">
            La llave Unlock abre el archivo en Sepolia. La donación USDC se
            envía en Avalanche. Cada una tiene su botón.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={`${href}#archivo`}>
              <KeyRound />
              Llave · Sepolia
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href={`${href}#donar`}>
              <Wallet />
              Donar · Avalanche
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
