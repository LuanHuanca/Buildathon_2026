import Link from "next/link";

import { WalletButton } from "~/components/web3/wallet-button";

import { MobileNav } from "./mobile-nav";
import { NetworkChip } from "./network-chip";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/comunidades", label: "Explorar" },
  { href: "/#mapa", label: "Mapa" },
  { href: "/investigadores", label: "Investigar" },
  { href: "/turismo", label: "Turismo" },
];

export function Header() {
  return (
    <header className="surface-glass fixed inset-x-0 top-0 z-50 border-b border-[rgba(229,142,38,0.12)]">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative flex h-10 w-10 items-center justify-center">
            <span
              aria-hidden
              className="bg-primary/25 absolute inset-1 rounded-full blur-md"
            />
            {/* White plate disappears on the clay canvas. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icon.png"
              alt=""
              className="relative h-10 w-10 object-contain mix-blend-multiply"
            />
          </span>
          <span className="flex flex-col">
            <span className="font-display text-lg leading-none font-bold tracking-tight">
              Munay
            </span>
            <span className="text-muted-foreground mt-1 font-mono text-[10px] tracking-[0.16em] uppercase">
              Culturas que nos unen
            </span>
          </span>
        </Link>

        <MobileNav />

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-primary font-mono text-xs tracking-widest uppercase transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <NetworkChip />
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
