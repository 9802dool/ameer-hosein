export function formatMoney(amount: number) {
  return `TT$${amount.toLocaleString("en-TT")}`;
}

export function variantLabel(variant: { size?: string; colour?: string }) {
  return [variant.colour, variant.size].filter(Boolean).join(" / ") || "Standard";
}

export function stockCount(variants: { stock: number }[]) {
  return variants.reduce((sum, variant) => sum + variant.stock, 0);
}
