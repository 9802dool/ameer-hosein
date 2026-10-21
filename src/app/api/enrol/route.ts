import { fundamentals } from "@content/courses";
import { site } from "@content/site";
import { notifyAddress, sendMail } from "@/lib/email";
import { formatMoney } from "@/lib/money";
import { enrolSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const body = await readBody(request);
  const parsed = enrolSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const to = notifyAddress();
  if (!to) return Response.json({ ok: true, emailed: false });

  const payment =
    parsed.data.payment === "full"
      ? `Full payment (${formatMoney(fundamentals.price)})`
      : "Payment plan";
  const text = [
    "New Fundamentals of Photography enrolment",
    parsed.data.name,
    parsed.data.phone,
    parsed.data.email,
    payment,
    `Next cycle: ${fundamentals.nextCycleStarts}`,
  ].join("\n");

  try {
    const owner = await sendMail({
      to,
      replyTo: parsed.data.email,
      subject: `FOP enrolment — ${parsed.data.name}`,
      text,
    });
    if (owner.emailed) {
      await sendMail({
        to: parsed.data.email,
        replyTo: to,
        subject: "Your FOP seat request",
        text: `Ameer has your request for ${fundamentals.name}.\n${payment}\nNext cycle: ${fundamentals.nextCycleStarts}\n\n${site.signOff}`,
      });
    }
    return Response.json({ ok: true, emailed: owner.emailed });
  } catch {
    return Response.json({ ok: false, message: "The message could not be sent." }, { status: 502 });
  }
}

async function readBody(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
