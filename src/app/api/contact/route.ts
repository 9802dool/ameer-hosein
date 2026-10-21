import { site } from "@content/site";
import { notifyAddress, sendMail } from "@/lib/email";
import { contactSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    body = null;
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const to = notifyAddress();
  if (!to) return Response.json({ ok: true, emailed: false });

  try {
    const owner = await sendMail({
      to,
      replyTo: parsed.data.email,
      subject: `Website enquiry — ${parsed.data.subject}`,
      text: [parsed.data.name, parsed.data.phone, parsed.data.email, parsed.data.subject, "", parsed.data.message].join("\n"),
    });
    if (owner.emailed) {
      await sendMail({
        to: parsed.data.email,
        replyTo: to,
        subject: "Ameer has your message",
        text: `Thanks for writing. Ameer will read this and reply.\n\n${site.signOff}`,
      });
    }
    return Response.json({ ok: true, emailed: owner.emailed });
  } catch {
    return Response.json({ ok: false, message: "The message could not be sent." }, { status: 502 });
  }
}
