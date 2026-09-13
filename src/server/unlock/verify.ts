import "server-only";

import { createPublicClient, fallback, http, isAddress } from "viem";

import { UNLOCK_CHAIN_ID, unlockChain, unlockSubgraphUrl } from "~/lib/chains";
import { publicLockAbi } from "~/lib/unlock/lock-abi";

const ZERO = "0x0000000000000000000000000000000000000000";

type KeysResponse = {
  data?: { keys?: Array<{ expiration: string }> };
  errors?: Array<{ message: string }>;
};

const unlockClient = createPublicClient({
  chain: unlockChain,
  transport: fallback([
    http(`https://rpc.unlock-protocol.com/${UNLOCK_CHAIN_ID}`),
    http(),
  ]),
});

function isUsableAddress(value: string): boolean {
  return isAddress(value) && value.toLowerCase() !== ZERO;
}

async function verifyOnChain(
  lockAddress: string,
  ownerAddress: string,
): Promise<boolean> {
  try {
    return await unlockClient.readContract({
      address: lockAddress as `0x${string}`,
      abi: publicLockAbi,
      functionName: "getHasValidKey",
      args: [ownerAddress as `0x${string}`],
    });
  } catch {
    return false;
  }
}

async function verifySubgraph(
  lockAddress: string,
  ownerAddress: string,
): Promise<boolean> {
  const query = `query ValidKeys {
    keys(where: {
      lock: "${lockAddress.toLowerCase()}"
      owner: "${ownerAddress.toLowerCase()}"
    }) {
      expiration
    }
  }`;

  const response = await fetch(unlockSubgraphUrl(), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  if (!response.ok) return false;
  const payload = (await response.json()) as KeysResponse;
  if (payload.errors?.length) return false;

  const now = BigInt(Math.floor(Date.now() / 1000));
  return (payload.data?.keys ?? []).some(({ expiration }) => {
    try {
      // Unlock uses 0 for an expired/cancelled key. Perpetual keys use
      // uint256.max, which naturally passes this comparison.
      return BigInt(expiration) > now;
    } catch {
      return false;
    }
  });
}

export async function verifyUnlockKey(
  lockAddress: string,
  ownerAddress: string,
): Promise<boolean> {
  if (!isUsableAddress(lockAddress) || !isUsableAddress(ownerAddress)) {
    return false;
  }

  // The lock contract is the source of truth. The subgraph can lag right
  // after checkout and used to fail-closed the demo.
  if (await verifyOnChain(lockAddress, ownerAddress)) return true;

  try {
    return await verifySubgraph(lockAddress, ownerAddress);
  } catch {
    return false;
  }
}
