"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { deliveryAreas, bankTransfer, shopCopy } from "@content/shop";
import { products } from "@content/products";
import { site, whatsappLink } from "@content/site";
import { buttonClass, fieldClass, ghostClass } from "@/components/brand";
import { useCart } from "@/components/shop/cart";
import { formatMoney, variantLabel } from "@/lib/money";

export function CheckoutForm() {
  const { lines, clear } = useCart();
  const [method, setMethod] = useState<"delivery" | "pickup">("pickup");
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const detailed = useMemo(
    () =>
      lines.flatMap((line) => {
        const product = products.find((item) => item.id === line.productId);
        const variant = product?.variants.find((item) => item.id === line.variantId);
        if (!product || !variant) return [];
        return [{ ...line, product, label: variantLabel(variant) }];
      }),
    [lines],
  );
  const physical = detailed.some((line) => line.product.fulfilment === "physical");
  const subtotal = detailed.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const summary = detailed
    .map((line) => `${line.quantity} x ${line.product.name} (${line.label})`)
    .join("\n");

  if (detailed.length === 0) {
    return (
      <p className="text-muted">
        Your bag is empty. <Link className="text-ink underline" href="/shop">Shop AH</Link>.
      </p>
    );
  }

  return (
    <form
      className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]"
      onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        setStatus(null);
        const form = new FormData(event.currentTarget);
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.get("name"),
            phone: form.get("phone"),
            email: form.get("email"),
            method: physical ? method : "pickup",
            areaId: form.get("areaId") || undefined,
            address: form.get("address") || undefined,
            paymentMethod: form.get("paymentMethod"),
            items: detailed.map((line) => ({
              productId: line.productId,
              variantId: line.variantId,
              quantity: line.quantity,
            })),
          }),
        });
        const data = (await response.json()) as {
          ok?: boolean;
          message?: string;
          redirect?: string;
          confirmation?: string;
        };
        setPending(false);
        if (!response.ok || !data.ok) {
          setStatus(data.message || "The order could not be placed.");
          return;
        }
        if (data.redirect) {
          window.location.href = data.redirect;
          return;
        }
        if (data.confirmation) {
          clear();
          window.location.href = data.confirmation;
        }
      }}
    >
      <div className="space-y-4">
        <label className="block text-sm">
          Name
          <input className={`${fieldClass} mt-2`} name="name" autoComplete="name" required />
        </label>
        <label className="block text-sm">
          Phone
          <input className={`${fieldClass} mt-2`} name="phone" autoComplete="tel" required />
        </label>
        <label className="block text-sm">
          Email
          <input className={`${fieldClass} mt-2`} name="email" type="email" autoComplete="email" required />
        </label>
        {physical ? (
          <fieldset className="space-y-3">
            <legend className="text-sm">Delivery or pickup</legend>
            <label className="flex gap-2 text-sm">
              <input type="radio" name="fulfilment" checked={method === "pickup"} onChange={() => setMethod("pickup")} />
              Pickup — {shopCopy.pickup}
            </label>
            <label className="flex gap-2 text-sm">
              <input type="radio" name="fulfilment" checked={method === "delivery"} onChange={() => setMethod("delivery")} />
              Delivery
            </label>
            {method === "delivery" ? (
              <>
                <label className="block text-sm">
                  Area
                  <select className={`${fieldClass} mt-2`} name="areaId" required>
                    <option value="">Choose an area</option>
                    {deliveryAreas.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name} — {formatMoney(area.fee)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm">
                  Address
                  <textarea className={`${fieldClass} mt-2`} name="address" required />
                </label>
                <p className="text-xs text-muted">{shopCopy.deliveryNote}</p>
              </>
            ) : null}
          </fieldset>
        ) : (
          <p className="text-sm text-muted">This order is delivered by email after payment is confirmed.</p>
        )}
        <fieldset className="space-y-2">
          <legend className="text-sm">Payment</legend>
          <label className="flex gap-2 text-sm">
            <input type="radio" name="paymentMethod" value="card" defaultChecked />
            Card via WiPay
          </label>
          <label className="flex gap-2 text-sm">
            <input type="radio" name="paymentMethod" value="transfer" />
            Bank transfer — reference shown on the next page
          </label>
          <label className="flex gap-2 text-sm">
            <input type="radio" name="paymentMethod" value="cash" />
            Pay on pickup or delivery
          </label>
          <p className="text-xs text-muted">
            {bankTransfer.bankName}. {bankTransfer.accountName}. {bankTransfer.accountNumber}.
          </p>
        </fieldset>
        <button className={buttonClass} disabled={pending}>
          {pending ? "Placing order…" : "Place order"}
        </button>
        <a
          className={ghostClass}
          href={whatsappLink(`Hi Ameer, I would like to order from AH Store:\n${summary}\nSubtotal: ${formatMoney(subtotal)}`)}
          target="_blank"
          rel="noreferrer"
        >
          Order via WhatsApp
        </a>
        {status ? <p className="text-sm text-danger">{status}</p> : null}
      </div>
      <aside className="card h-fit p-6 md:sticky md:top-24">
        <h2 className="font-display text-3xl">Order</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {detailed.map((line) => (
            <li key={line.variantId} className="flex justify-between gap-3">
              <span>
                {line.quantity} × {line.product.name}
                <span className="block text-muted">{line.label}</span>
              </span>
              <span>{formatMoney(line.product.price * line.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between border-t border-line pt-4 text-sm">
          <span>Subtotal</span>
          <span>{formatMoney(subtotal)}</span>
        </p>
        <p className="mt-4 text-xs text-muted">{site.signOff}</p>
      </aside>
    </form>
  );
}
