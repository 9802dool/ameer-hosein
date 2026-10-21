"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products } from "@content/products";
import { whatsappLink } from "@content/site";
import { formatMoney, variantLabel } from "@/lib/money";
import { buttonClass, ghostClass } from "@/components/brand";

export type CartLine = {
  productId: string;
  variantId: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (line: CartLine) => void;
  update: (variantId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "ah-cart";
const emptyCart: CartLine[] = [];
const cartListeners = new Set<() => void>();
let cartMemory: CartLine[] = emptyCart;
let cartHydrated = false;

function readStoredCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]") as CartLine[];
    if (!Array.isArray(parsed)) return emptyCart;
    return parsed.filter((line) => line.productId && line.variantId && line.quantity > 0);
  } catch {
    return emptyCart;
  }
}

function getServerCartSnapshot() {
  return emptyCart;
}

function getCartSnapshot() {
  if (!cartHydrated) {
    cartHydrated = true;
    cartMemory = readStoredCart();
  }
  return cartMemory;
}

function subscribeCart(listener: () => void) {
  cartListeners.add(listener);
  return () => cartListeners.delete(listener);
}

function writeCart(lines: CartLine[]) {
  cartMemory = lines;
  localStorage.setItem(storageKey, JSON.stringify(lines));
  cartListeners.forEach((listener) => listener());
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribeCart, getCartSnapshot, getServerCartSnapshot);
  const [open, setOpen] = useState(false);

  const add = useCallback((line: CartLine) => {
    const current = getCartSnapshot();
    const existing = current.find((item) => item.variantId === line.variantId);
    const next = existing
      ? current.map((item) =>
          item.variantId === line.variantId
            ? { ...item, quantity: Math.min(10, item.quantity + line.quantity) }
            : item,
        )
      : [...current, line];
    writeCart(next);
    setOpen(true);
  }, []);

  const update = useCallback((variantId: string, quantity: number) => {
    const current = getCartSnapshot();
    writeCart(
      quantity <= 0
        ? current.filter((item) => item.variantId !== variantId)
        : current.map((item) => (item.variantId === variantId ? { ...item, quantity } : item)),
    );
  }, []);

  const clear = useCallback(() => writeCart([]), []);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const value = useMemo(
    () => ({ lines, count, open, setOpen, add, update, clear }),
    [lines, count, open, add, update, clear],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}

function describedLines(lines: CartLine[]) {
  return lines.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    const variant = product?.variants.find((item) => item.id === line.variantId);
    if (!product || !variant) return [];
    return [{ ...line, product, variant, label: variantLabel(variant) }];
  });
}

export function CartDrawer() {
  const router = useRouter();
  const { lines, open, setOpen, update } = useCart();
  const detailed = describedLines(lines);
  const subtotal = detailed.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const summary = [
    "Hi Ameer, I would like to order from AH Store:",
    ...detailed.map(
      (line) =>
        `${line.quantity} x ${line.product.name} (${line.label}) — ${formatMoney(line.product.price * line.quantity)}`,
    ),
    `Subtotal: ${formatMoney(subtotal)}`,
  ].join("\n");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button className="absolute inset-0 bg-black/60" aria-label="Close cart" onClick={() => setOpen(false)} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper text-ink shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="cart-title" className="font-display text-3xl">
            Your bag
          </h2>
          <button className="min-h-11 px-3 text-sm" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <div className="flex-1 space-y-5 overflow-auto px-5 py-5">
          {detailed.length === 0 ? (
            <p className="text-muted">Your bag is empty. The AH Store is one tap away.</p>
          ) : (
            detailed.map((line) => (
              <div key={line.variantId} className="grid grid-cols-[72px_1fr] gap-3 border-b border-line pb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={line.product.images[0]?.src} alt="" className="h-[88px] w-[72px] object-cover" />
                <div>
                  <p className="font-medium">{line.product.name}</p>
                  <p className="text-sm text-muted">{line.label}</p>
                  <p className="mt-1 text-sm">{formatMoney(line.product.price)}</p>
                  <label className="mt-2 flex items-center gap-2 text-sm">
                    Qty
                    <input
                      className="w-16 border border-line bg-paper px-2 py-2"
                      type="number"
                      min={1}
                      max={10}
                      value={line.quantity}
                      onChange={(event) => update(line.variantId, Number(event.target.value))}
                    />
                    <button className="text-muted underline" onClick={() => update(line.variantId, 0)}>
                      Remove
                    </button>
                  </label>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="space-y-3 border-t border-line px-5 py-5">
          <p className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatMoney(subtotal)}</span>
          </p>
          <Link
            href="/shop/checkout"
            className={`${buttonClass} w-full`}
            onClick={(event) => {
              event.preventDefault();
              router.push("/shop/checkout");
              setOpen(false);
            }}
          >
            Checkout
          </Link>
          <a href={whatsappLink(summary)} className={`${ghostClass} w-full`} target="_blank" rel="noreferrer">
            Order via WhatsApp
          </a>
        </div>
      </aside>
    </div>
  );
}

export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button
      className="min-h-11 px-2 text-sm"
      onClick={() => setOpen(true)}
      aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
    >
      Bag {count > 0 ? `(${count})` : ""}
    </button>
  );
}
