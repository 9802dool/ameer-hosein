import Image from "next/image";
import { proClass } from "@content/courses";
import { whatsappLink } from "@content/site";
import { ghostClass } from "@/components/brand";
import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Pro Class",
  description:
    "The advanced photography class for graduates of The Fundamentals of Photography, built around a 10-minute pro challenge.",
  path: "/courses/pro",
});

export default function ProClassPage() {
  return (
    <>
      <PageIntro eyebrow={proClass.eyebrow} title={`${proClass.name} · ${proClass.edition}`} lede={proClass.summary} />
      <div className="shell grid gap-10 pb-16 md:grid-cols-2 md:gap-16">
        <div className="relative min-h-80 overflow-hidden rounded-[1.75rem] shadow-[var(--shadow)]">
          <Image src={proClass.image} alt={proClass.imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div className="space-y-4 text-lg leading-relaxed text-muted">
          {proClass.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <a className={`${ghostClass} mt-4`} href={whatsappLink(proClass.whatsapp)} target="_blank" rel="noreferrer">
            Ask about Pro Class
          </a>
        </div>
      </div>
      <section className="border-t border-line">
        <div className="shell py-16">
          <h2 className="font-display text-4xl">Graduate work · the 10-minute challenge</h2>
          <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {proClass.challenge.map((shot) => (
              <figure key={shot.title} className="mb-4 break-inside-avoid">
                <div className="relative overflow-hidden rounded-2xl shadow-[var(--shadow)]">
                  <Image
                    src={shot.image}
                    alt={shot.alt}
                    width={1200}
                    height={1500}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo-ah.svg" alt="" className="pointer-events-none absolute bottom-3 right-3 h-8 w-8" />
                </div>
                <figcaption className="mt-3 font-display text-2xl">{shot.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
