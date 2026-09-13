import { formatUsdc } from "~/lib/format";

export function ProgressGoal({
  goalAmount,
  raisedAmount,
}: {
  goalAmount: number;
  raisedAmount: number;
}) {
  const pct =
    goalAmount > 0 ? Math.min(100, Math.round((raisedAmount / goalAmount) * 100)) : 0;

  return (
    <div className="space-y-2">
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-palmera-forest transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-palmera-slate">
        {formatUsdc(raisedAmount)} USDC de {formatUsdc(goalAmount)} USDC
        recaudados ({pct}%)
      </p>
    </div>
  );
}
