import "server-only";

import { isAddress } from "viem";

import { unlockSubgraphUrl } from "~/lib/chains";

type KeysResponse = {
  data?: { keys?: Array<{ expiration: string }> };
  errors?: Array<{ message: string }>;
};

export async function verifyUnlockKey(
  lockAddress: string,
  ownerAddress: string,
): Promise<boolean> {
  if (!isAddress(lockAddress) || !isAddress(ownerAddress)) return false;

  const query = `query ValidKeys {
    keys(where: {
      lock: "${lockAddress.toLowerCase()}"
      owner: "${ownerAddress.toLowerCase()}"
    }) {
      expiration
    }
  }`;

  try {
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
  } catch {
    // The gate fails closed if the indexer is unavailable.
    return false;
  }
}
