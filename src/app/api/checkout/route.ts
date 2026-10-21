import { siteUrl } from "@content/site";
import { quoteOrder } from "@/lib/catalog";
import { emailOrder } from "@/lib/order-mail";
import { signOrder } from "@/lib/orders";
import { paymentProvider } from "@/lib/payments";
import { checkoutSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    body = null;
  }
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, message: "Check the form and try again.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const quoted = quoteOrder(parsed.data);
  if ("error" in quoted) {
    return Response.json({ ok: false, message: quoted.error }, { status: 400 });
  }

  const token = signOrder(quoted.order);

  if (quoted.order.paymentMethod === "card") {
    try {
      const session = await paymentProvider().createCheckout({
        orderId: quoted.order.id,
        total: quoted.order.chargedTotal,
        email: quoted.order.customer.email,
        name: quoted.order.customer.name,
        phone: quoted.order.customer.phone,
        data: token,
        responseUrl: `${siteUrl()}/api/payments/wipay`,
      });
      return Response.json({ ok: true, redirect: session.url });
    } catch (error) {
      return Response.json(
        { ok: false, message: error instanceof Error ? error.message : "Card payment could not start." },
        { status: 502 },
      );
    }
  }

  try {
    await emailOrder(quoted.order);
  } catch {
    return Response.json(
      { ok: false, message: "The order was created, but the receipt email failed. Please WhatsApp Ameer with your name." },
      { status: 502 },
    );
  }

  return Response.json({
    ok: true,
    confirmation: `/shop/confirmation?token=${encodeURIComponent(token)}`,
  });
}
