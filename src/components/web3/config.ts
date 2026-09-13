"use client";

import { http, createConfig, type CreateConnectorFn } from "wagmi";
import { avalanche, sepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const walletConnectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID;

const connectors: CreateConnectorFn[] = [injected()];
if (walletConnectId) {
  connectors.push(walletConnect({ projectId: walletConnectId }));
}

export const config = createConfig({
  chains: [avalanche, sepolia],
  connectors,
  transports: {
    [avalanche.id]: http(),
    [sepolia.id]: http(),
  },
});
