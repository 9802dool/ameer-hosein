import Image from "next/image";
import { fundamentals } from "@content/courses";
import { site, siteUrl } from "@content/site";
import { EnrolForm } from "@/components/forms";
import { PageIntro } from "@/components/page-intro";
import { JsonLd, pageMeta } from "@/lib/seo";
import { formatMoney } from "@/lib/money";

export const metadata = pageMeta({
  title: "Photography course in Trinidad",
  description:
    "The Fundamentals of Photography is a photography course in Trinidad, taught in Chaguanas. Camera, lighting, retouching, models, and a path into paid work. TT$2,000.",
  path: "/courses/fundamentals",
});

export default function FundamentalsPage() {
  const courseJson = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: fundamentals.name,
    description: `${fundamentals.summary} Photography classes in Chaguanas covering camera fundamentals, lighting, retouching, and professional models.`,
    provider: { "@type": "Person", name: site.name, url: siteUrl() },
    offers: {
      "@type": "Offer",
      price: fundamentals.price.toFixed(2),
      priceCurrency: fundamentals.currency,
      category: "Paid",
      availability: "https://schema.org/LimitedAvailability",
    },
  };

  return (
    <>
      <JsonLd data={courseJson} />
      <PageIntro eyebrow={fundamentals.eyebrow} title={fundamentals.name} lede={fundamentals.summary} />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 md:grid-cols-2 md:px-8">
        <div className="relative min-h-80">
          <Image src={fundamentals.image} alt={fundamentals.imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div className="space-y-4 text-lg leading-relaxed text-muted">
          {fundamentals.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <section className="border-y border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-display text-4xl">What we cover</h2>
            <ul className="mt-6 space-y-3">
              {fundamentals.covers.map((item) => (
                <li key={item} className="border-b border-line pb-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-panel p-6">
            <p className="inline-block bg-accent px-3 py-1 text-xs uppercase tracking-[0.18em] text-black">
              {fundamentals.limited}
            </p>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-muted">Fee</dt>
                <dd className="font-display text-3xl">{formatMoney(fundamentals.price)}</dd>
                <dd>Payment plans are available.</dd>
              </div>
              <div>
                <dt className="text-muted">When</dt>
                <dd>{fundamentals.schedule}</dd>
              </div>
              <div>
                <dt className="text-muted">Next cycle</dt>
                <dd>{fundamentals.nextCycleStarts}</dd>
              </div>
              <div>
                <dt className="text-muted">Where</dt>
                <dd>{fundamentals.venue}</dd>
              </div>
              <div>
                <dt className="text-muted">Included</dt>
                <dd>Certificate on completion, and all course materials.</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:px-8">
        <Image
          src={fundamentals.detailImage}
          alt={fundamentals.detailImageAlt}
          width={1200}
          height={1500}
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div>
          <h2 className="font-display text-4xl">Questions</h2>
          <div className="mt-6 space-y-3">
            {fundamentals.faq.map((item) => (
              <details key={item.question} className="border border-line px-4 py-3">
                <summary className="cursor-pointer text-lg">{item.question}</summary>
                <p className="pt-3 text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section id="enrol" className="border-t border-line bg-panel">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-display text-5xl">Join the next class.</h2>
            <p className="mt-4 text-muted">
              Tell me how you want to pay. I will confirm your seat for the cycle starting {fundamentals.nextCycleStarts}.
            </p>
          </div>
          <EnrolForm />
        </div>
      </section>
    </>
  );
}
