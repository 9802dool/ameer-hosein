"use client";

import { useCart } from "@/components/shop/cart";

export function AddToCartButton({ productId, variantId }: { productId: string; variantId: string }) {
  const { add } = useCart();

  return (
    <button
      type="button"
      onClick={() => add({ productId, variantId, quantity: 1 })}
      className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
    >
      Add to Cart
    </button>
  );
}
