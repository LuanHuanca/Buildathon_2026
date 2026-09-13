"use client";

import { useWallets } from "@privy-io/react-auth";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { useWalletClient } from "wagmi";

import { Button } from "~/components/ui/button";
import { isPrivyConfigured } from "~/components/web3/privy-provider";
import { WalletButton } from "~/components/web3/wallet-button";
import { networkName, UNLOCK_CHAIN_ID } from "~/lib/chains";
import {
  openUnlockCheckout,
  type PaywallProvider,
} from "~/lib/unlock/checkout";

function CheckoutButton({
  lockAddress,
  onPurchased,
}: {
  lockAddress: string;
  onPurchased: () => void | Promise<void>;
}) {
  return isPrivyConfigured ? (
    <PrivyCheckoutButton lockAddress={lockAddress} onPurchased={onPurchased} />
  ) : (
    <InjectedCheckoutButton
      lockAddress={lockAddress}
      onPurchased={onPurchased}
    />
  );
}

function PrivyCheckoutButton({
  lockAddress,
  onPurchased,
}: {
  lockAddress: string;
  onPurchased: () => void | Promise<void>;
}) {
  const { wallets, ready } = useWallets();
  const [pending, setPending] = useState(false);

  const checkout = async () => {
    const wallet =
      wallets.find((item) => item.walletClientType === "privy") ?? wallets[0];
    if (!wallet) return;
    setPending(true);
    try {
      const provider = await wallet.getEthereumProvider();
      await openUnlockCheckout(lockAddress, provider);
      await onPurchased();
    } finally {
      setPending(false);
    }
  };

  return (
    <Button
      disabled={!ready || pending || wallets.length === 0}
      onClick={checkout}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      Obtener membresía
    </Button>
  );
}

function InjectedCheckoutButton({
  lockAddress,
  onPurchased,
}: {
  lockAddress: string;
  onPurchased: () => void | Promise<void>;
}) {
  const { data: walletClient } = useWalletClient();
  const [pending, setPending] = useState(false);

  const checkout = async () => {
    if (!walletClient) return;
    setPending(true);
    try {
      await openUnlockCheckout(
        lockAddress,
        walletClient.transport as PaywallProvider,
      );
      await onPurchased();
    } finally {
      setPending(false);
    }
  };

  return (
    <Button disabled={!walletClient || pending} onClick={checkout}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      Obtener membresía
    </Button>
  );
}

export function LockedArchive({
  isConnected,
  lockAddress,
  titles,
  onPurchased,
}: {
  isConnected: boolean;
  lockAddress: string | null;
  titles: string[];
  onPurchased: () => void | Promise<void>;
}) {
  return (
    <div className="surface-card relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none space-y-3 p-6 blur-sm select-none"
      >
        {(titles.length > 0 ? titles : ["Informe de custodia", "Asamblea"]).map(
          (title) => (
            <p key={title} className="text-body text-muted-foreground">
              {title}. El texto completo no viaja en esta página hasta que la
              llave sea válida.
            </p>
          ),
        )}
      </div>
      <div className="bg-surface/80 absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="bg-surface-container-high flex h-12 w-12 items-center justify-center rounded-full">
          <Lock className="text-primary h-5 w-5" />
        </span>
        {!lockAddress ? (
          <p className="text-muted-foreground max-w-sm text-sm">
            El archivo se abre cuando configures el Lock único de investigación.
          </p>
        ) : !isConnected ? (
          <>
            <p className="text-muted-foreground max-w-sm text-sm">
              Conecta o entra con Google. La membresía se comprueba en{" "}
              {networkName(UNLOCK_CHAIN_ID)}.
            </p>
            <WalletButton />
          </>
        ) : (
          <>
            <p className="text-muted-foreground max-w-sm text-sm">
              No hay llave válida. El checkout de Unlock cobra lo que defina el
              Lock — en el demo, precio 0.
            </p>
            <CheckoutButton
              lockAddress={lockAddress}
              onPurchased={onPurchased}
            />
          </>
        )}
      </div>
    </div>
  );
}
