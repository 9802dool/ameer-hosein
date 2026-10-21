"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Product } from "@content/products";
import { buttonClass } from "@/components/brand";
import { useCart } from "@/components/shop/cart";
import { formatMoney, variantLabel } from "@/lib/money";

export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  const colours = [...new Set(product.variants.map((variant) => variant.colour).filter(Boolean))] as string[];
  const sizes = [...new Set(product.variants.map((variant) => variant.size).filter(Boolean))] as string[];
  const [colour, setColour] = useState(colours[0] || "");
  const [size, setSize] = useState(sizes[0] || "");
  const [image, setImage] = useState(0);
  const variant = useMemo(
    () =>
      product.variants.find(
        (item) => (colours.length === 0 || item.colour === colour) && (sizes.length === 0 || item.size === size),
      ) || product.variants[0],
    [colour, colours.length, product.variants, size, sizes.length],
  );
  const current = product.images[image] || product.images[0];

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <div className="relative overflow-hidden">
          <Image
            src={current.src}
            alt={current.alt}
            width={1200}
            height={1500}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-auto w-full object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-ah.svg" alt="" className="pointer-events-none absolute bottom-4 right-4 h-10 w-10" />
        </div>
        {product.images.length > 1 ? (
          <div className="mt-3 flex gap-2">
            {product.images.map((item, index) => (
              <button key={item.src} aria-label={`Show image ${index + 1}`} onClick={() => setImage(index)}>
                <Image src={item.src} alt="" width={96} height={120} className="h-20 w-16 object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-accent">AH Store</p>
        <h1 className="mt-3 font-display text-5xl leading-none">{product.name}</h1>
        <p className="mt-4 text-lg">{formatMoney(product.price)}</p>
        <p className="mt-4 max-w-md leading-relaxed text-muted">{product.description}</p>
        {colours.length > 0 ? (
          <div className="mt-6">
            <p className="text-sm">Colour</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {colours.map((item) => (
                <button
                  key={item}
                  aria-pressed={item === colour}
                  className={`min-h-11 border px-4 text-sm ${item === colour ? "border-accent text-accent" : "border-line"}`}
                  onClick={() => setColour(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {sizes.length > 0 ? (
          <div className="mt-5">
            <p className="text-sm">Size</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {sizes.map((item) => (
                <button
                  key={item}
                  aria-pressed={item === size}
                  className={`min-h-11 border px-4 text-sm ${item === size ? "border-accent text-accent" : "border-line"}`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <p className="mt-5 text-sm">{variant && variant.stock > 0 ? `${variant.stock} in stock` : "Sold out"}</p>
        <button
          className={`${buttonClass} mt-6`}
          disabled={!variant || variant.stock < 1}
          onClick={() => {
            if (!variant || variant.stock < 1) return;
            add({ productId: product.id, variantId: variant.id, quantity: 1 });
          }}
        >
          {variant && variant.stock > 0 ? `Add ${variantLabel(variant)} to bag` : "Sold out"}
        </button>
      </div>
    </div>
  );
}
