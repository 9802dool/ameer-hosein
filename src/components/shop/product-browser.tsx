"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { productCategories, products, type ProductCategory } from "@content/products";
import { chipClass } from "@/components/brand";
import { formatMoney, stockCount } from "@/lib/money";

export function ProductBrowser() {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");
  const visible = products.filter((product) => filter === "all" || product.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2 pb-8" role="toolbar" aria-label="Filter products">
        <Filter current={filter} id="all" onSelect={setFilter}>
          All
        </Filter>
        {productCategories.map((category) => (
          <Filter key={category.id} current={filter} id={category.id} onSelect={setFilter}>
            {category.label}
          </Filter>
        ))}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => {
          const stock = stockCount(product.variants);
          return (
            <Link key={product.id} href={`/shop/${product.slug}`} className="card card-hover group block overflow-hidden">
              <div className="relative overflow-hidden">
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  width={1200}
                  height={1500}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-[4/5] w-full object-cover motion-safe:transition motion-safe:duration-700 motion-safe:group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-2xl">{product.name}</h2>
                  <p className="text-sm font-semibold">{formatMoney(product.price)}</p>
                </div>
                <p className="mt-1 text-sm text-muted">{stock > 0 ? "In stock" : "Sold out"}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Filter({
  current,
  id,
  onSelect,
  children,
}: {
  current: string;
  id: ProductCategory | "all";
  onSelect: (id: ProductCategory | "all") => void;
  children: React.ReactNode;
}) {
  const selected = current === id;
  return (
    <button
      aria-pressed={selected}
      className={chipClass(selected)}
      onClick={() => onSelect(id)}
    >
      {children}
    </button>
  );
}
