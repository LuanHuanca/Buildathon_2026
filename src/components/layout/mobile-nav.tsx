"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/comunidades", label: "Explorar" },
  { href: "/#mapa", label: "Mapa" },
  { href: "/investigadores", label: "Investigadores" },
  { href: "/turismo", label: "Turismo comunitario" },
  { href: "/transparencia", label: "Transparencia" },
  { href: "/perfil", label: "Mi impacto" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((value) => !value)}
        className="text-foreground hover:bg-surface-container-high flex h-9 w-9 items-center justify-center rounded-md"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open ? (
        <nav className="surface-glass border-border absolute inset-x-0 top-16 border-b px-5 py-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-primary block py-3 text-sm font-medium tracking-wide"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
