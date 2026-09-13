export function formatUsdc(amount: number): string {
  return new Intl.NumberFormat("es-BO", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount);
}
