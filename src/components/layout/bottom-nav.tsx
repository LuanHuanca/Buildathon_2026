"use client";

import { Activity, Compass, Trees, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";

const items = [
  { href: "/", label: "Inicio", icon: Trees, exact: true },
  { href: "/comunidades", label: "Explorar", icon: Compass },
  { href: "/transparencia", label: "Impacto", icon: Activity },
  { href: "/perfil", label: "Perfil", icon: UserRound },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/40 bg-surface-container-low/85 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around">
        {items.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex h-16 w-20 flex-col items-center justify-center gap-1 transition-colors",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="font-mono text-[10px] uppercase tracking-wide">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
