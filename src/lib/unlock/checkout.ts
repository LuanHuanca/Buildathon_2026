import {
  avalanche as unlockAvalanche,
  baseSepolia as unlockBaseSepolia,
  sepolia as unlockSepolia,
} from "@unlock-protocol/networks";
import { Paywall } from "@unlock-protocol/paywall";

import { UNLOCK_CHAIN_ID } from "~/lib/chains";

export type PaywallProvider = Parameters<Paywall["connect"]>[0];

const unlockNetworks: Record<number, unknown> = {
  // The package ships declarations outside its exports map; runtime values are typed as errors.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  43114: unlockAvalanche,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  84532: unlockBaseSepolia,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  11155111: unlockSepolia,
};

export function resolveLockAddress(lockAddress?: string | null): string | null {
  const value = [lockAddress, process.env.NEXT_PUBLIC_MUNAY_LOCK_ADDRESS]
    .map((item) => item?.trim())
    .find((item) => item?.startsWith("0x") && item.length === 42);
  return value ?? null;
}

export async function openUnlockCheckout(
  lockAddress: string,
  provider: PaywallProvider,
) {
  const network = unlockNetworks[UNLOCK_CHAIN_ID];
  if (!network) throw new Error("Red de Unlock no soportada");

  const paywall = new Paywall({ [UNLOCK_CHAIN_ID]: network });
  await paywall.connect(provider);

  return paywall.loadCheckoutModal({
    locks: {
      [lockAddress]: {
        network: UNLOCK_CHAIN_ID,
        name: "Acceso a Investigación Munay",
      },
    },
    title: "Acceso al archivo comunitario",
    pessimistic: true,
    skipRecipient: true,
    persistentCheckout: false,
    callToAction: {
      default: "Emite tu membresía para abrir la investigación completa.",
      confirmed: "Membresía confirmada. Ya puedes abrir el archivo.",
    },
  });
}
