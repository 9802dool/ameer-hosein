import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import type { Fulfilment } from "@content/products";

export type OrderItem = {
  productId: string;
  slug: string;
  name: string;
  variantId: string;
  variantLabel: string;
  quantity: number;
  unitPrice: number;
  fulfilment: Fulfilment;
};

export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  customer: { name: string; phone: string; email: string };
  fulfilment: {
    method: "delivery" | "pickup" | "digital";
    areaId?: string;
    areaName?: string;
    address?: string;
    fee: number;
  };
  paymentMethod: "card" | "transfer" | "cash";
  subtotal: number;
  total: number;
  chargedTotal: string;
  status: "pending" | "paid" | "failed";
  transactionId?: string;
};

function secret() {
  const value = process.env.ORDER_SIGNING_SECRET;
  if (value) return value;
  if (process.env.NODE_ENV === "production") {
    throw new Error("ORDER_SIGNING_SECRET is not set");
  }
  return "dev-only-order-secret";
}

function sign(payload: string, prefix: string) {
  return createHmac("sha256", secret()).update(`${prefix}.${payload}`).digest("base64url");
}

function matches(given: string, expected: string) {
  const left = Buffer.from(given);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function createOrderId() {
  const now = new Date();
  const stamp = [
    String(now.getFullYear()).slice(2),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  return `AH-${stamp}-${randomBytes(2).toString("hex").toUpperCase()}`;
}

export function signOrder(order: Order) {
  const body = Buffer.from(JSON.stringify(order)).toString("base64url");
  return `${body}.${sign(body, "order")}`;
}

export function readOrder(token: string): Order | null {
  const [body, signature] = token.split(".");
  if (!body || !signature || !matches(signature, sign(body, "order"))) return null;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as Order;
  } catch {
    return null;
  }
}

export function signDownload(productId: string, orderId: string) {
  const body = Buffer.from(
    JSON.stringify({
      productId,
      orderId,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 14,
    }),
  ).toString("base64url");
  return `${body}.${sign(body, "download")}`;
}

export function readDownload(token: string) {
  const [body, signature] = token.split(".");
  if (!body || !signature || !matches(signature, sign(body, "download"))) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as {
      productId: string;
      orderId: string;
      exp: number;
    };
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
