import { site } from "@content/site";
import { notifyAddress, sendMail } from "@/lib/email";
import { enquirySchema } from "@/lib/schemas";

export async function POST(request: Request) {
  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    body = null;
  }
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const to = notifyAddress();
  if (!to) return Response.json({ ok: true, emailed: false });

  try {
    const owner = await sendMail({
      to,
      replyTo: parsed.data.email,
      subject: `Brand enquiry — ${parsed.data.brand}`,
      text: [parsed.data.name, parsed.data.brand, parsed.data.phone, parsed.data.email, "", parsed.data.message].join("\n"),
    });
    if (owner.emailed) {
      await sendMail({
        to: parsed.data.email,
        replyTo: to,
        subject: "Ameer has your brand enquiry",
        text: `Thanks for the note about ${parsed.data.brand}. Ameer will be in touch.\n\n${site.signOff}`,
      });
    }
    return Response.json({ ok: true, emailed: owner.emailed });
  } catch {
    return Response.json({ ok: false, message: "The message could not be sent." }, { status: 502 });
  }
}
