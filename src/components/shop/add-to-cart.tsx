"use client";

import { useCart } from "@/components/shop/cart";

export function AddToCartButton({ productId, variantId }: { productId: string; variantId: string }) {
  const { add } = useCart();

  return (
    <button
      type="button"
      onClick={() => add({ productId, variantId, quantity: 1 })}
      className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-accent"
    >
      Add to Cart
    </button>
  );
}
