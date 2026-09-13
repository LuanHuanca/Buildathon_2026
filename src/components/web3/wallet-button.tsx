"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

import { Button } from "~/components/ui/button";

function short(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <Button variant="secondary" size="sm" onClick={() => disconnect()}>
        {short(address)}
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => {
        const connector = connectors[0];
        if (connector) connect({ connector });
      }}
    >
      Conectar wallet
    </Button>
  );
}
