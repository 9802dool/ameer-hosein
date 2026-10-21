import { bankTransfer } from "@content/shop";
import { products } from "@content/products";
import { site, siteUrl } from "@content/site";
import { notifyAddress, sendMail } from "@/lib/email";
import { formatMoney } from "@/lib/money";
import { signDownload, type Order } from "@/lib/orders";

function lines(order: Order) {
  return order.items
    .map(
      (item) =>
        `${item.quantity} × ${item.name} (${item.variantLabel}) — ${formatMoney(item.unitPrice * item.quantity)}`,
    )
    .join("\n");
}

function delivery(order: Order) {
  if (order.fulfilment.method === "digital") return "Digital delivery by email.";
  if (order.fulfilment.method === "pickup") return `Pickup at ${site.location.name}, ${site.location.area}.`;
  return `Delivery to ${order.fulfilment.address} (${order.fulfilment.areaName}). Fee ${formatMoney(order.fulfilment.fee)}.`;
}

function downloads(order: Order) {
  return order.items
    .filter((item) => item.fulfilment === "download")
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      if (!product?.downloadFile) return "";
      const token = signDownload(item.productId, order.id);
      return `${item.name}: ${siteUrl()}/api/downloads?token=${encodeURIComponent(token)}`;
    })
    .filter(Boolean);
}

function vouchers(order: Order) {
  return order.items
    .filter((item) => item.fulfilment === "voucher")
    .map((item) => `${item.name}: AH-GIFT-${order.id}`);
}

export async function emailOrder(order: Order) {
  const to = notifyAddress();
  if (!to) return { emailed: false as const };

  const paid = order.status === "paid";
  const links = paid ? downloads(order) : [];
  const codes = paid ? vouchers(order) : [];
  const payment =
    order.paymentMethod === "transfer"
      ? `Bank transfer\n${bankTransfer.bankName}\n${bankTransfer.accountName}\n${bankTransfer.accountNumber}\nReference: ${order.id}\n${bankTransfer.note}`
      : order.paymentMethod === "cash"
        ? "Pay on pickup or delivery."
        : paid
          ? `Card payment confirmed${order.transactionId ? ` (${order.transactionId})` : ""}.`
          : "Card payment is still pending.";

  const customerText = [
    `Order ${order.id}`,
    paid ? "Payment received." : "We have your order. Payment is still outstanding.",
    "",
    lines(order),
    `Subtotal: ${formatMoney(order.subtotal)}`,
    `Delivery: ${formatMoney(order.fulfilment.fee)}`,
    `Total: ${formatMoney(order.total)}`,
    "",
    delivery(order),
    "",
    payment,
    links.length ? `\nDownloads:\n${links.join("\n")}` : "",
    codes.length ? `\nVoucher codes:\n${codes.join("\n")}` : "",
    "",
    site.signOff,
  ]
    .filter(Boolean)
    .join("\n");

  const shopText = [
    `New order ${order.id} — ${order.status}`,
    `${order.customer.name}`,
    order.customer.phone,
    order.customer.email,
    "",
    lines(order),
    `Total: ${formatMoney(order.total)}`,
    delivery(order),
    payment,
    links.length ? `\nDownloads:\n${links.join("\n")}` : "",
    codes.length ? `\nVoucher codes:\n${codes.join("\n")}` : "",
  ].join("\n");

  const customer = await sendMail({
    to: order.customer.email,
    replyTo: to,
    subject: `AH Store order ${order.id}`,
    text: customerText,
  });
  await sendMail({
    to,
    replyTo: order.customer.email,
    subject: `New AH Store order ${order.id}`,
    text: shopText,
  });

  return customer;
}

export function downloadLinks(order: Order) {
  if (order.status !== "paid") return [];
  return downloads(order).map((line) => {
    const [label, href] = line.split(": ");
    return { label, href };
  });
}
