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
        <span className="font-semibold text-foreground">
          {formatUsdc(raisedAmount)} USDC{" "}
          <span className="font-normal text-muted-foreground">recaudado</span>
        </span>
        <span className="font-bold text-primary">{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>Meta: {formatUsdc(goalAmount)} USDC</span>
        <span>
          Restan {formatUsdc(Math.max(0, goalAmount - raisedAmount))} USDC
        </span>
      </div>
    </div>
  );
}
