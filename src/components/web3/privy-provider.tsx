"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import {
  WagmiProvider as PrivyWagmiProvider,
  createConfig as createPrivyConfig,
} from "@privy-io/wagmi";
import { http, createConfig, type CreateConnectorFn } from "wagmi";
import { WagmiProvider } from "wagmi";
import {
  avalanche,
  avalancheFuji,
  baseSepolia,
  sepolia,
} from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

import { donationChain, unlockChain } from "~/lib/chains";

const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID?.trim();
const walletConnectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID?.trim();

const chains = [avalanche, avalancheFuji, baseSepolia, sepolia] as const;
const supportedChains = [donationChain, unlockChain];

const transports = {
  [avalanche.id]: http(),
  [avalancheFuji.id]: http(),
  [baseSepolia.id]: http(),
  [sepolia.id]: http(),
};

const privyConfig = createPrivyConfig({ chains, transports });

const connectors: CreateConnectorFn[] = [injected()];
if (walletConnectId) {
  connectors.push(walletConnect({ projectId: walletConnectId }));
}

const fallbackConfig = createConfig({
  chains,
  transports,
  connectors,
});

export const isPrivyConfigured = Boolean(appId);

/**
 * Privy must wrap the QueryClient provider. TRPCReactProvider supplies that
 * provider in layout.tsx; Web3Provider is rendered inside it.
 */
export function PrivyAuthProvider({ children }: { children: React.ReactNode }) {
  if (!appId) return children;

  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ["wallet", "email", "google"],
        embeddedWallets: {
          ethereum: { createOnLogin: "users-without-wallets" },
        },
        defaultChain: donationChain,
        supportedChains,
        appearance: {
          theme: "dark",
          accentColor: "#ffb870",
          logo: "/icon.png",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}

export function Web3Provider({ children }: { children: React.ReactNode }) {
  if (!appId) {
    return <WagmiProvider config={fallbackConfig}>{children}</WagmiProvider>;
  }

  return (
    <PrivyWagmiProvider config={privyConfig}>{children}</PrivyWagmiProvider>
  );
}
