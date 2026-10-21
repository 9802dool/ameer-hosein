import Image from "next/image";
import Link from "next/link";
import { fundamentals } from "@content/courses";
import { home } from "@content/home";
import { instagramPosts } from "@content/instagram";
import { site } from "@content/site";
import { FadeIn } from "@/components/fade-in";
import { buttonClass } from "@/components/brand";
import { TestimonialSlider } from "@/components/testimonials";
import { featuredProducts } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";

export default function Home() {
  const merch = featuredProducts();

  return (
    <>
      <section className="relative min-h-svh bg-black text-white">
        {home.hero.video ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={home.hero.image}
          >
            <source src={home.hero.video} />
          </video>
        ) : (
          <Image
            src={home.hero.image}
            alt={home.hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/25" />
        <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8">
          <p className="text-xs uppercase tracking-[0.32em] text-white/80">{site.mark}</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.95] md:text-7xl">{home.hero.tagline}</h1>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={home.hero.primaryCta.href} className={buttonClass}>
              {home.hero.primaryCta.label}
            </Link>
            <Link
              href={home.hero.secondaryCta.href}
              className="inline-flex min-h-11 items-center justify-center border border-white px-5 py-3 text-sm"
            >
              {home.hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      <FadeIn className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
        <Image
          src={home.intro.image}
          alt={home.intro.imageAlt}
          width={1200}
          height={1500}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-auto w-full object-cover"
        />
        <div>
          <h2 className="font-display text-4xl leading-tight md:text-6xl">{home.intro.heading}</h2>
          {home.intro.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-5 text-lg leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </FadeIn>

      <section className="border-y border-line" aria-label="At a glance">
        <dl className="mx-auto grid max-w-6xl sm:grid-cols-3">
          {home.stats.map((stat) => (
            <div key={stat.label} className="border-line px-5 py-8 md:px-8 sm:border-l sm:first:border-l-0">
              <dt className="text-sm text-muted">{stat.label}</dt>
              <dd className="mt-2 font-display text-5xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <FadeIn className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <div className="relative min-h-80">
          <Image
            src={fundamentals.image}
            alt={fundamentals.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">{fundamentals.shortName}</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">{fundamentals.name}</h2>
          <p className="mt-4 text-lg text-muted">{fundamentals.summary}</p>
          <p className="mt-4 text-sm">
            {formatMoney(fundamentals.price)} · {fundamentals.schedule}
          </p>
          <Link href="/courses/fundamentals" className={`${buttonClass} mt-6 self-start`}>
            See the class
          </Link>
        </div>
      </FadeIn>

      <section className="mx-auto max-w-6xl px-5 py-8 md:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl">In their words</h2>
          <Link href="/testimonials" className="text-sm underline">
            All testimonials
          </Link>
        </div>
        <TestimonialSlider />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8" aria-label="Instagram">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-4xl">On the feed</h2>
          <a className="text-sm underline" href="https://instagram.com/ameerhoseintt">
            @ameerhoseintt
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {instagramPosts.map((post) => (
            <a key={post.id} href={post.href} className="group relative block overflow-hidden" target="_blank" rel="noreferrer">
              <Image
                src={post.image}
                alt={post.alt}
                width={1080}
                height={1080}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="aspect-square w-full object-cover motion-safe:transition motion-safe:duration-700 motion-safe:group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-accent">AH Store</p>
              <h2 className="mt-2 font-display text-4xl">Shop AH</h2>
            </div>
            <Link href="/shop" className="text-sm underline">
              All pieces
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {merch.map((product) => (
              <Link key={product.id} href={`/shop/${product.slug}`} className="group">
                <div className="overflow-hidden">
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    width={1200}
                    height={1500}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="aspect-[4/5] w-full object-cover motion-safe:transition motion-safe:duration-700 motion-safe:group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 font-display text-2xl">{product.name}</p>
                <p className="text-sm text-muted">{formatMoney(product.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <h2 className="max-w-xl font-display text-5xl leading-none">{home.closing.heading}</h2>
            <p className="mt-4 max-w-md text-white/85">{home.closing.text}</p>
          </div>
          <Link href="/contact" className="inline-flex min-h-11 items-center justify-center bg-white px-5 py-3 text-sm font-medium text-black">
            Contact AH
          </Link>
        </div>
      </section>
    </>
  );
}
