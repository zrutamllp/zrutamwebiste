export function formatCurrency(value: number, currency: string): string {
  if (currency === "USD") {
    if (value >= 1_000_000) return "$" + (value / 1_000_000).toFixed(2) + "M";
    return "$" + value.toLocaleString("en-US");
  }
  // INR
  if (value >= 10_000_000) return "\u20B9" + (value / 10_000_000).toFixed(2) + " Cr";
  if (value >= 100_000) return "\u20B9" + (value / 100_000).toFixed(2) + " L";
  return "\u20B9" + value.toLocaleString("en-IN");
}
