import { NextResponse, type NextRequest } from "next/server";
import { siteUrl } from "@content/site";
import { emailOrder } from "@/lib/order-mail";
import { readOrder, signOrder } from "@/lib/orders";
import { paymentProvider } from "@/lib/payments";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const destination = new URL("/shop/confirmation", siteUrl());
  const order = readOrder(params.get("data") || "");

  if (!order) {
    return NextResponse.redirect(destination);
  }

  const success = params.get("status") === "success";
  const verified =
    success &&
    paymentProvider().verifySuccess({
      transactionId: params.get("transaction_id") || "",
      hash: params.get("hash") || "",
      originalTotal: order.chargedTotal,
    });

  const next = {
    ...order,
    status: verified ? ("paid" as const) : ("failed" as const),
    transactionId: params.get("transaction_id") || undefined,
  };
  const token = signOrder(next);
  destination.searchParams.set("token", token);

  const response = NextResponse.redirect(destination);
  if (verified && !request.cookies.get(`ah_sent_${order.id}`)) {
    try {
      await emailOrder(next);
      response.cookies.set(`ah_sent_${order.id}`, "1", {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
    } catch {
      // The confirmation page still shows the paid order and download links.
    }
  }

  return response;
}
