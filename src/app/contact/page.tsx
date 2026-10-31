import { Suspense } from "react";
import { site } from "@content/site";
import { ContactForm } from "@/components/forms";
import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Book a shoot or ask about photography classes in Chaguanas. Ameer Hosein teaches at Plaza De Montrose and replies on WhatsApp.",
  path: "/contact",
});

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const map = `https://maps.google.com/maps?q=${encodeURIComponent(site.location.mapQuery)}&z=16&output=embed`;

  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Start with a message."
        lede="Course, photoshoot, brand work, or something else. Call, WhatsApp, or use the form."
      />
      <div className="shell grid gap-12 pb-20 md:grid-cols-2 md:gap-16">
        <div>
          <p className="font-display text-4xl">
            <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
          </p>
          <p className="mt-2 text-muted">Phone and WhatsApp</p>
          <p className="mt-6">
            {site.location.name}
            <br />
            {site.location.area}, Trinidad
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {site.socials.map((item) => (
              <li key={item.href}>
                <a className="underline decoration-line underline-offset-4 transition hover:text-accent-text" href={item.href} target="_blank" rel="noreferrer">
                  {item.label} {item.handle}
                </a>
              </li>
            ))}
          </ul>
          <iframe
            title="Map showing Plaza De Montrose, Chaguanas"
            src={map}
            className="mt-8 h-72 w-full rounded-[1.75rem] border border-line shadow-[var(--shadow)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="card p-6 md:p-8">
          <Suspense fallback={<p className="text-muted">Loading the form…</p>}>
            <ContactPanel searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

async function ContactPanel({ searchParams }: { searchParams: Promise<{ subject?: string }> }) {
  const params = await searchParams;
  return <ContactForm initialSubject={params.subject} />;
}
