"use client";

import { useAccount, useReadContract } from "wagmi";

import { publicLockAbi } from "~/lib/unlock/lock-abi";
import { resolveLockAddress } from "~/lib/unlock/checkout";
import { UNLOCK_CHAIN_ID } from "~/lib/chains";

const ZERO = "0x0000000000000000000000000000000000000000" as const;

export function useHasKey(lockAddress?: string | null) {
  const { address, isConnected } = useAccount();
  const lock = resolveLockAddress(lockAddress);
  const canRead = Boolean(address && lock);

  const { data, isLoading, isFetching, refetch } = useReadContract({
    address: (lock ?? ZERO) as `0x${string}`,
    abi: publicLockAbi,
    functionName: "getHasValidKey",
    args: address ? [address] : undefined,
    chainId: UNLOCK_CHAIN_ID,
    query: { enabled: canRead },
  });

  return {
    hasKey: Boolean(data),
    isLoading: canRead && (isLoading || isFetching),
    isConnected,
    address,
    lockAddress: lock,
    refetch,
  };
}
