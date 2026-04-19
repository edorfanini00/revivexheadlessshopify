import type { Money } from "./types";

export function formatPrice(money: Money): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode,
  }).format(parseFloat(money.amount));
}
