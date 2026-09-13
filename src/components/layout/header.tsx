import Link from "next/link";

import { WalletButton } from "~/components/web3/wallet-button";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/comunidades", label: "Explorar" },
  { href: "/transparencia", label: "Impacto" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-surface-container-low/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded bg-primary/15 font-display text-lg font-bold text-primary">
            P
          </span>
          <span className="flex flex-col">
            <span className="flex items-center gap-1.5 font-display text-lg font-bold leading-none tracking-tight">
              Palmera
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            </span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Unlock Hub · Crowdfunding
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <span className="hidden items-center gap-1.5 rounded bg-surface-container-high/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            BOL_L2
          </span>
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
