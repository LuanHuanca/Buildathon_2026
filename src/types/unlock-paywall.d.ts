declare module "@unlock-protocol/paywall" {
  export class Paywall {
    constructor(networkConfigs: Record<number, unknown>);
    connect(provider?: unknown): Promise<void>;
    loadCheckoutModal(config?: unknown, unlockUrl?: string): Promise<unknown>;
  }
}
