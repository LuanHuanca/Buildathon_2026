"use client";

import { Lock } from "lucide-react";

import { useAccount } from "wagmi";

function LockedState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-8 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Lock className="h-6 w-6 text-palmera-muted" />
      </span>
      <p className="max-w-sm text-sm text-palmera-slate">{message}</p>
    </div>
  );
}

export function UnlockGate({
  lockAddress,
  children,
  fallback,
}: {
  lockAddress?: string | null;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isConnected } = useAccount();

  if (!lockAddress) {
    return (
      <>
        {fallback ?? (
          <LockedState message="El contenido exclusivo de esta comunidad estará disponible cuando se despliegue su Lock en Unlock Protocol." />
        )}
      </>
    );
  }

  if (!isConnected) {
    return (
      <>
        {fallback ?? (
          <LockedState message="Conecta tu wallet para desbloquear el contenido exclusivo de esta comunidad." />
        )}
      </>
    );
  }

  return <>{children}</>;
}
