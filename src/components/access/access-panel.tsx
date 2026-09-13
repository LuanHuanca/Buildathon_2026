"use client";

import { skipToken } from "@tanstack/react-query";

import { Button } from "~/components/ui/button";
import { useHasKey } from "~/hooks/use-has-key";
import { networkName, UNLOCK_CHAIN_ID } from "~/lib/chains";
import { api } from "~/trpc/react";

import { LockedArchive } from "./locked-archive";
import { UnlockedArchive } from "./unlocked-archive";

export function AccessPanel({
  slug,
  lockAddress,
  titles,
}: {
  slug: string;
  lockAddress?: string | null;
  titles: string[];
}) {
  const {
    hasKey,
    isLoading,
    isConnected,
    address,
    lockAddress: lock,
    refetch,
  } = useHasKey(lockAddress);

  const gated = api.community.getGated.useQuery(
    hasKey && address && lock
      ? { slug, walletAddress: address, lockAddress: lock }
      : skipToken,
    { retry: 2, retryDelay: 1500 },
  );

  if (isConnected && isLoading) {
    return (
      <p className="text-muted-foreground py-8 text-center font-mono text-[11px] tracking-wider uppercase">
        Comprobando llave en {networkName(UNLOCK_CHAIN_ID)}…
      </p>
    );
  }

  if (!hasKey || !address) {
    return (
      <LockedArchive
        isConnected={isConnected}
        lockAddress={lock}
        titles={titles}
        onPurchased={async () => {
          for (let attempt = 0; attempt < 6; attempt += 1) {
            const result = await refetch();
            if (result.data) return;
            await new Promise((resolve) => setTimeout(resolve, 1200));
          }
        }}
      />
    );
  }

  if (gated.isLoading) {
    return (
      <p className="text-muted-foreground py-8 text-center font-mono text-[11px] tracking-wider uppercase">
        Abriendo el archivo…
      </p>
    );
  }

  if (gated.isError) {
    return (
      <div className="space-y-3 py-8 text-center">
        <p className="text-muted-foreground text-sm">
          La wallet ya tiene llave, pero el servidor no pudo abrir el archivo.
          Reintenta en unos segundos.
        </p>
        <Button variant="ghost" size="sm" onClick={() => void gated.refetch()}>
          Reintentar archivo
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <UnlockedArchive address={address} sections={gated.data ?? []} />
      <Button variant="ghost" size="sm" onClick={() => void refetch()}>
        Volver a comprobar la llave
      </Button>
    </div>
  );
}
