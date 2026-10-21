import { Resend } from "resend";

type Mail = {
  to: string | string[];
  subject: string;
  text: string;
  replyTo?: string;
};

export async function sendMail(message: Mail) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    return { emailed: false as const };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: message.to,
    subject: message.subject,
    text: message.text,
    replyTo: message.replyTo,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { emailed: true as const };
}

export function notifyAddress() {
  return process.env.CONTACT_TO_EMAIL || "";
}
