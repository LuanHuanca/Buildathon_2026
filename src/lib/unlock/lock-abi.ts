export const publicLockAbi = [
  {
    type: "function",
    name: "getHasValidKey",
    stateMutability: "view",
    inputs: [{ name: "_owner", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;
