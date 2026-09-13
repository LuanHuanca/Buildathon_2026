"use client";

import { Button } from "~/components/ui/button";

export function DonacionPollar({
  amountUsdc,
  communityName,
  disabled,
}: {
  amountUsdc: number;
  communityName: string;
  disabled?: boolean;
}) {
  return (
    <Button className="w-full" size="lg" disabled={disabled}>
      Donar {amountUsdc} USDC a {communityName}
    </Button>
  );
}
