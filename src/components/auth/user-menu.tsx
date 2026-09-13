"use client";

import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { authClient } from "~/server/better-auth/client";

export function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="h-8 w-20 animate-pulse rounded bg-surface-container-high" />;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/perfil"
          className="flex items-center gap-1.5 rounded px-2 py-1 font-mono text-xs text-foreground transition-colors hover:bg-surface-container-high"
        >
          <User className="h-3.5 w-3.5 text-primary" />
          {session.user.name}
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            await authClient.signOut();
            router.refresh();
          }}
        >
          <LogOut className="h-3.5 w-3.5" />
          Salir
        </Button>
      </div>
    );
  }

  return (
    <Button asChild variant="outline" size="sm">
      <Link href="/login">Iniciar sesión</Link>
    </Button>
  );
}
