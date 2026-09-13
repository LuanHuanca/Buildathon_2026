import Link from "next/link";

import { Button } from "~/components/ui/button";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/comunidades", label: "Comunidades" },
  { href: "/transparencia", label: "Transparencia" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-bold text-palmera-ochre"
        >
          Palmera
        </Link>
        <nav className="hidden items-center gap-6 sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-palmera-slate transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* WalletButton arrives in Phase 3 (web3). Placeholder for now. */}
        <Button size="sm" variant="secondary">
          Conectar wallet
        </Button>
      </div>
    </header>
  );
}
