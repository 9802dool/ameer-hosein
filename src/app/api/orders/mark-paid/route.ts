import { emailOrder } from "@/lib/order-mail";
import { readOrder, signOrder } from "@/lib/orders";

export async function POST(request: Request) {
  const secret = process.env.ORDER_ADMIN_SECRET;
  if (!secret || request.headers.get("x-admin-secret") !== secret) {
    return Response.json({ ok: false }, { status: 401 });
  }

  let token = "";
  try {
    const body = (await request.json()) as { token?: string };
    token = body.token || "";
  } catch {
    token = "";
  }

  const order = readOrder(token);
  if (!order) return Response.json({ ok: false, message: "Unknown order." }, { status: 400 });

  const paid = { ...order, status: "paid" as const };
  await emailOrder(paid);
  return Response.json({ ok: true, token: signOrder(paid) });
}
