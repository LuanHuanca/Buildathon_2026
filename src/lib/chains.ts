import {
  avalanche,
  avalancheFuji,
  baseSepolia,
  sepolia,
} from "wagmi/chains";

export const DONATION_CHAIN_ID = Number(
  process.env.NEXT_PUBLIC_DONATION_CHAIN_ID ?? 43113,
);
export const UNLOCK_CHAIN_ID = Number(
  process.env.NEXT_PUBLIC_UNLOCK_CHAIN_ID ?? 11155111,
);

const chainMap = {
  [avalanche.id]: avalanche,
  [avalancheFuji.id]: avalancheFuji,
  [baseSepolia.id]: baseSepolia,
  [sepolia.id]: sepolia,
} as const;

type SupportedChainId = keyof typeof chainMap;

export const donationChain =
  chainMap[DONATION_CHAIN_ID as SupportedChainId] ?? avalancheFuji;
export const unlockChain =
  chainMap[UNLOCK_CHAIN_ID as SupportedChainId] ?? sepolia;

export const USDC_ADDRESSES: Record<number, `0x${string}`> = {
  [avalanche.id]: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  [avalancheFuji.id]: "0x5425890298aed601595a70AB815c96711a31Bc65",
  [baseSepolia.id]: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  [sepolia.id]: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
};

export const UNLOCK_ADDRESSES: Record<number, `0x${string}`> = {
  [avalanche.id]: "0x70cBE5F72dD85aA634d07d2227a421144Af734b3",
  [baseSepolia.id]: "0x259813B665C8f6074391028ef782e27B65840d89",
  [sepolia.id]: "0x36b34e10295cCE69B652eEB5a8046041074515Da",
};

const EXPLORERS: Record<number, string> = {
  [avalanche.id]: "https://snowtrace.io",
  [avalancheFuji.id]: "https://testnet.snowtrace.io",
  [baseSepolia.id]: "https://sepolia.basescan.org",
  [sepolia.id]: "https://sepolia.etherscan.io",
};

export const txUrl = (hash: string, chainId: number = DONATION_CHAIN_ID) =>
  `${EXPLORERS[chainId] ?? EXPLORERS[avalanche.id]}/tx/${hash}`;

export const addressUrl = (
  address: string,
  chainId: number = UNLOCK_CHAIN_ID,
) => `${EXPLORERS[chainId] ?? EXPLORERS[avalanche.id]}/address/${address}`;

export const unlockSubgraphUrl = (chainId: number = UNLOCK_CHAIN_ID) =>
  `https://subgraph.unlock-protocol.com/${chainId}`;

export const networkName = (chainId: number) =>
  chainMap[chainId as SupportedChainId]?.name ?? `Chain ${chainId}`;
