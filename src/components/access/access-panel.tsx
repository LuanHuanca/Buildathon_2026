"use client";

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
    {
      slug,
      walletAddress: address ?? "0x0000000000000000000000000000000000000000",
      lockAddress: lock ?? "0x0000000000000000000000000000000000000000",
    },
    { enabled: hasKey && Boolean(address && lock), retry: false },
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
          await refetch();
          await gated.refetch();
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

  return (
    <div className="space-y-3">
      <UnlockedArchive address={address} sections={gated.data ?? []} />
      <Button variant="ghost" size="sm" onClick={() => void refetch()}>
        Volver a comprobar la llave
      </Button>
    </div>
  );
}
