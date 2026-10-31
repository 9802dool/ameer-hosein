"use client";

import { useState } from "react";
import { fundamentals } from "@content/courses";
import { site, whatsappLink } from "@content/site";
import { buttonClass, fieldClass, ghostClass } from "@/components/brand";
import type { FieldErrors } from "@/lib/schemas";

type Status = { tone: "ok" | "error"; text: string } | null;

async function submit(url: string, body: unknown) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await response.json()) as {
    ok?: boolean;
    emailed?: boolean;
    message?: string;
    errors?: FieldErrors;
  };
  return { response, data };
}

function Errors({ errors, name }: { errors: FieldErrors; name: string }) {
  const message = errors[name]?.[0];
  if (!message) return null;
  return <span className="mt-1 block text-sm text-danger">{message}</span>;
}

export function EnrolForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>(null);
  const [pending, setPending] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        setStatus(null);
        const form = new FormData(event.currentTarget);
        const { response, data } = await submit("/api/enrol", {
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          payment: form.get("payment"),
        });
        setPending(false);
        setErrors(data.errors || {});
        if (!response.ok) {
          setStatus({ tone: "error", text: data.message || "Check the form and try again." });
          return;
        }
        setStatus({
          tone: "ok",
          text: data.emailed
            ? `You are on the list. ${site.signOff}`
            : "The form is valid, and email is not configured yet. WhatsApp Ameer so the seat request still reaches him.",
        });
        if (data.emailed) event.currentTarget.reset();
      }}
    >
      <label className="block text-sm">
        Name
        <input className={`${fieldClass} mt-2`} id="enrol-name" name="name" autoComplete="name" required />
        <Errors errors={errors} name="name" />
      </label>
      <label className="block text-sm">
        Phone
        <input className={`${fieldClass} mt-2`} name="phone" autoComplete="tel" required />
        <Errors errors={errors} name="phone" />
      </label>
      <label className="block text-sm">
        Email
        <input className={`${fieldClass} mt-2`} name="email" type="email" autoComplete="email" required />
        <Errors errors={errors} name="email" />
      </label>
      <fieldset>
        <legend className="text-sm">Payment</legend>
        <label className="mt-3 flex gap-2 text-sm">
          <input type="radio" name="payment" value="plan" defaultChecked />
          Payment plan
        </label>
        <label className="mt-2 flex gap-2 text-sm">
          <input type="radio" name="payment" value="full" />
          Full payment
        </label>
        <Errors errors={errors} name="payment" />
      </fieldset>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button className={buttonClass} disabled={pending}>
          {pending ? "Sending…" : "Request my seat"}
        </button>
        <a className={ghostClass} href={whatsappLink(fundamentals.enrolWhatsapp)} target="_blank" rel="noreferrer">
          Enrol on WhatsApp
        </a>
      </div>
      {status ? <p className={status.tone === "ok" ? "text-sm" : "text-sm text-danger"}>{status.text}</p> : null}
    </form>
  );
}

const subjects = ["Course", "Photoshoot", "Brand collab", "Other"] as const;

export function ContactForm({ initialSubject }: { initialSubject?: string }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>(null);
  const [pending, setPending] = useState(false);
  const subject = subjects.find((item) => item === initialSubject) || "Course";

  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        const form = new FormData(event.currentTarget);
        const { response, data } = await submit("/api/contact", {
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          subject: form.get("subject"),
          message: form.get("message"),
        });
        setPending(false);
        setErrors(data.errors || {});
        if (!response.ok) {
          setStatus({ tone: "error", text: data.message || "Check the form and try again." });
          return;
        }
        setStatus({
          tone: "ok",
          text: data.emailed
            ? `Message received. ${site.signOff}`
            : "Email is not configured yet. Use WhatsApp and the note will still get through.",
        });
        if (data.emailed) event.currentTarget.reset();
      }}
    >
      <label className="block text-sm">
        Name
        <input className={`${fieldClass} mt-2`} name="name" autoComplete="name" required />
        <Errors errors={errors} name="name" />
      </label>
      <label className="block text-sm">
        Phone
        <input className={`${fieldClass} mt-2`} name="phone" autoComplete="tel" required />
        <Errors errors={errors} name="phone" />
      </label>
      <label className="block text-sm">
        Email
        <input className={`${fieldClass} mt-2`} name="email" type="email" autoComplete="email" required />
        <Errors errors={errors} name="email" />
      </label>
      <label className="block text-sm">
        Subject
        <select className={`${fieldClass} mt-2`} name="subject" defaultValue={subject}>
          {subjects.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <Errors errors={errors} name="subject" />
      </label>
      <label className="block text-sm">
        Message
        <textarea className={`${fieldClass} mt-2 min-h-32`} name="message" required />
        <Errors errors={errors} name="message" />
      </label>
      <button className={buttonClass} disabled={pending}>
        {pending ? "Sending…" : "Send"}
      </button>
      {status ? <p className={status.tone === "ok" ? "text-sm" : "text-sm text-danger"}>{status.text}</p> : null}
    </form>
  );
}

export function EnquiryForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>(null);
  const [pending, setPending] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        const form = new FormData(event.currentTarget);
        const { response, data } = await submit("/api/enquiry", {
          name: form.get("name"),
          brand: form.get("brand"),
          email: form.get("email"),
          phone: form.get("phone"),
          message: form.get("message"),
        });
        setPending(false);
        setErrors(data.errors || {});
        if (!response.ok) {
          setStatus({ tone: "error", text: data.message || "Check the form and try again." });
          return;
        }
        setStatus({
          tone: "ok",
          text: data.emailed ? `Received. ${site.signOff}` : "Email is not configured yet. WhatsApp is the fastest way through.",
        });
        if (data.emailed) event.currentTarget.reset();
      }}
    >
      <label className="block text-sm">
        Your name
        <input className={`${fieldClass} mt-2`} name="name" required />
        <Errors errors={errors} name="name" />
      </label>
      <label className="block text-sm">
        Brand
        <input className={`${fieldClass} mt-2`} name="brand" required />
        <Errors errors={errors} name="brand" />
      </label>
      <label className="block text-sm">
        Email
        <input className={`${fieldClass} mt-2`} name="email" type="email" required />
        <Errors errors={errors} name="email" />
      </label>
      <label className="block text-sm">
        Phone
        <input className={`${fieldClass} mt-2`} name="phone" required />
        <Errors errors={errors} name="phone" />
      </label>
      <label className="block text-sm">
        The work you have in mind
        <textarea className={`${fieldClass} mt-2 min-h-32`} name="message" required />
        <Errors errors={errors} name="message" />
      </label>
      <button className={buttonClass} disabled={pending}>
        {pending ? "Sending…" : "Work with me"}
      </button>
      {status ? <p className={status.tone === "ok" ? "text-sm" : "text-sm text-danger"}>{status.text}</p> : null}
    </form>
  );
}
