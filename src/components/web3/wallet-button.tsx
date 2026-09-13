"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { Button } from "~/components/ui/button";
import { isPrivyConfigured } from "~/components/web3/privy-provider";

function short(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function LegacyWalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <Button
        variant="secondary"
        size="sm"
        className="glow-amber"
        onClick={() => disconnect()}
      >
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

function PrivyWalletButton() {
  const { address } = useAccount();
  const { authenticated, login, logout, ready } = usePrivy();

  if (!ready) {
    return (
      <span
        aria-label="Cargando acceso"
        className="bg-foreground/10 h-9 w-32 animate-pulse rounded-lg"
      />
    );
  }

  return authenticated ? (
    <Button variant="secondary" size="sm" onClick={() => void logout()}>
      {address ? short(address) : "Conectado"}
    </Button>
  ) : (
    <Button variant="secondary" size="sm" onClick={login}>
      Entrar o conectar
    </Button>
  );
}

export function WalletButton() {
  return isPrivyConfigured ? <PrivyWalletButton /> : <LegacyWalletButton />;
}
