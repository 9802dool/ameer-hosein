import Image from "next/image";
import { about } from "@content/about";
import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description:
    "Ameer Hosein is a photographer, lecturer, and the founder of The Fundamentals of Photography in Trinidad and Tobago.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About" title="Ameer Hosein" lede={about.lede} />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 md:grid-cols-[0.8fr_1.2fr] md:px-8">
        <div className="space-y-4 text-lg leading-relaxed text-muted">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="grid gap-4">
          {about.images.map((image) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={1600}
              height={1100}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          ))}
        </div>
      </div>
    </>
  );
}
