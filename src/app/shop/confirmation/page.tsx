import { Suspense } from "react";
import Link from "next/link";
import { bankTransfer } from "@content/shop";
import { site } from "@content/site";
import { buttonClass } from "@/components/brand";
import { PageIntro } from "@/components/page-intro";
import { ClearCart } from "@/components/shop/clear-cart";
import { downloadLinks } from "@/lib/order-mail";
import { formatMoney } from "@/lib/money";
import { readOrder } from "@/lib/orders";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Order received",
  description: "Your AH Store order confirmation.",
  path: "/shop/confirmation",
});

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  return (
    <Suspense fallback={<p className="px-5 pt-32">Opening your order…</p>}>
      <Confirmation searchParams={searchParams} />
    </Suspense>
  );
}

async function Confirmation({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const params = await searchParams;
  const order = params.token ? readOrder(params.token) : null;

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-36">
        <h1 className="font-display text-5xl">We could not open that order.</h1>
        <p className="mt-4 text-muted">If you just paid, check your email. The receipt is sent there as well.</p>
        <Link href="/shop" className={`${buttonClass} mt-8`}>
          Back to AH Store
        </Link>
      </div>
    );
  }

  const links = downloadLinks(order);
  const paid = order.status === "paid";

  return (
    <>
      {order.status !== "failed" ? <ClearCart /> : null}
      <PageIntro
        eyebrow={order.id}
        title={paid ? "Payment received." : order.status === "failed" ? "Payment was not completed." : "Order received."}
        lede={
          paid
            ? "A receipt is on its way to your inbox."
            : order.status === "failed"
              ? "The card payment did not confirm. Your bag is still here if you want to try again."
              : "Keep this reference. Ameer has the order, and the receipt email follows once mail is configured."
        }
      />
      <div className="mx-auto max-w-3xl px-5 pb-20 md:px-8">
        <ul className="space-y-3 border-y border-line py-6 text-sm">
          {order.items.map((item) => (
            <li key={item.variantId} className="flex justify-between gap-4">
              <span>
                {item.quantity} × {item.name}
                <span className="block text-muted">{item.variantLabel}</span>
              </span>
              <span>{formatMoney(item.unitPrice * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between text-sm">
          <span>Total</span>
          <span>{formatMoney(order.total)}</span>
        </p>
        {order.paymentMethod === "transfer" && !paid ? (
          <div className="mt-8 border border-line p-5 text-sm">
            <p className="font-medium">Bank transfer</p>
            <p className="mt-2">{bankTransfer.bankName}</p>
            <p>{bankTransfer.accountName}</p>
            <p>{bankTransfer.accountNumber}</p>
            <p className="mt-2">Reference: {order.id}</p>
            <p className="text-muted">{bankTransfer.note}</p>
          </div>
        ) : null}
        {order.paymentMethod === "cash" && !paid ? (
          <p className="mt-6 text-sm">Pay when you collect the order, or when it arrives.</p>
        ) : null}
        {order.fulfilment.method === "pickup" ? (
          <p className="mt-4 text-sm text-muted">Pickup at {site.location.name}, {site.location.area}.</p>
        ) : null}
        {order.fulfilment.method === "delivery" ? (
          <p className="mt-4 text-sm text-muted">
            Delivering to {order.fulfilment.address}, {order.fulfilment.areaName}.
          </p>
        ) : null}
        {links.length > 0 ? (
          <ul className="mt-6 space-y-2 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <a className="underline" href={link.href}>
                  Download {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        <p className="mt-10 font-display text-3xl">{site.signOff}</p>
      </div>
    </>
  );
}
