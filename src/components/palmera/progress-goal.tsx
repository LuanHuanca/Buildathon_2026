import { formatUsdc } from "~/lib/format";

export function ProgressGoal({
  goalAmount,
  raisedAmount,
}: {
  goalAmount: number;
  raisedAmount: number;
}) {
  const pct =
    goalAmount > 0
      ? Math.min(100, Math.round((raisedAmount / goalAmount) * 100))
      : 0;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between font-mono text-xs">
        <span className="text-foreground font-semibold">
          {formatUsdc(raisedAmount)} USDC{" "}
          <span className="text-muted-foreground font-normal">recaudado</span>
        </span>
        <span className="text-primary font-bold">{pct}%</span>
      </div>
      <div className="bg-surface-container-highest h-2 w-full overflow-hidden rounded-full">
        <div
          className="bg-primary h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-muted-foreground flex items-center justify-between font-mono text-[10px] tracking-wider uppercase">
        <span>Meta: {formatUsdc(goalAmount)} USDC</span>
        <span>
          Restan {formatUsdc(Math.max(0, goalAmount - raisedAmount))} USDC
        </span>
      </div>
    </div>
  );
}
