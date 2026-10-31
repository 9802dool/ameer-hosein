import Image from "next/image";
import { collaborations } from "@content/collaborations";
import { EnquiryForm } from "@/components/forms";
import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Content and collaborations",
  description: "Brand partnerships and press with Ameer Hosein, including the Loop News Caribbean Creators feature.",
  path: "/collaborations",
});

export default function CollaborationsPage() {
  return (
    <>
      <PageIntro eyebrow="Content & collaborations" title="Work with me" lede={collaborations.intro} />
      <div className="shell grid gap-6 md:grid-cols-2">
        {collaborations.partners.map((partner) => (
          <article key={partner.name} className="card overflow-hidden">
            <Image src={partner.image} alt={partner.alt} width={1400} height={1000} className="h-auto w-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="p-6">
              <h2 className="text-3xl">{partner.name}</h2>
              <p className="mt-2 text-muted">{partner.detail}</p>
            </div>
          </article>
        ))}
      </div>
      <article className="card shell mt-8 px-6 py-8 md:px-8">
        <p className="eyebrow">{collaborations.press.source}</p>
        <h2 className="mt-3 font-display text-4xl">
          <a href={collaborations.press.href} className="underline decoration-accent underline-offset-4" target="_blank" rel="noreferrer">
            {collaborations.press.title}
          </a>
        </h2>
        <p className="mt-3 max-w-2xl text-muted">{collaborations.press.note}</p>
      </article>
      <section className="shell grid gap-8 py-16 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="text-4xl">Brand enquiry</h2>
          <p className="mt-3 text-muted">Tell me the brand, the dates, and the picture you want people to remember.</p>
        </div>
        <div className="card p-6 md:p-8">
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
