import Image from "next/image";
import Link from "next/link";
import { fundamentals, proClass } from "@content/courses";
import { home } from "@content/home";
import { instagramPosts } from "@content/instagram";
import { getProduct } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";
import { buttonClass } from "@/components/brand";
import { ArrowIcon, InstagramIcon } from "@/components/icons";
import { AddToCartButton } from "@/components/shop/add-to-cart";

export default function Home() {
  const pieces = home.store.pieces.flatMap((piece) => {
    const product = getProduct(piece.slug);
    if (!product) return [];
    const variant = product.variants.find((item) => item.stock > 0);
    const colours = [...new Set(product.variants.map((item) => item.colour).filter(Boolean))].join(" / ");
    return [{ ...piece, product, variant, colours }];
  });

  return (
    <>
      <section className="relative overflow-hidden border-b border-line pt-32 pb-20 md:pt-44 md:pb-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.1),transparent_50%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              {home.hero.eyebrow}
            </span>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              {home.hero.heading}{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                {home.hero.headingAccent}.
              </span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-muted">{home.hero.text}</p>
            <div className="flex flex-wrap gap-4">
              <Link href={home.hero.primaryCta.href} className={`${buttonClass} px-8 py-4 shadow-lg shadow-amber-500/20`}>
                {home.hero.primaryCta.label}
              </Link>
              <a
                href={home.hero.secondaryCta.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-8 py-4 font-semibold transition hover:border-neutral-500"
              >
                <InstagramIcon />
                {home.hero.secondaryCta.label}
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-panel shadow-2xl">
              <Image
                src={home.hero.image}
                alt={home.hero.imageAlt}
                width={1000}
                height={1250}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Instagram" className="border-b border-line py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold tracking-widest text-accent uppercase">From the feed</h2>
              <p className="mt-2 text-3xl font-bold">@ameerhoseintt</p>
            </div>
            <a
              href="https://www.instagram.com/ameerhoseintt/"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-amber-400 hover:text-amber-300"
            >
              Instagram
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href={post.href}
                target="_blank"
                rel="noreferrer"
                aria-label={post.alt}
                className="group relative block overflow-hidden rounded-2xl"
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  width={1200}
                  height={1500}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="aspect-[4/5] w-full object-cover motion-safe:transition motion-safe:duration-700 motion-safe:group-hover:scale-105"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="store" className="bg-[#0c0c0e] py-24 text-neutral-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col justify-between md:flex-row md:items-end">
            <div>
              <h2 className="mb-3 text-sm font-semibold tracking-widest text-accent uppercase">{home.store.eyebrow}</h2>
              <p className="text-3xl font-bold tracking-tight md:text-4xl">{home.store.heading}</p>
            </div>
            <p className="mt-4 max-w-md text-neutral-400 md:mt-0">{home.store.text}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pieces.map((piece) => (
              <article
                key={piece.product.id}
                className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 transition hover:border-amber-500/50"
              >
                <Link
                  href={`/shop/${piece.product.slug}`}
                  aria-label={piece.product.name}
                  className="relative block aspect-square overflow-hidden bg-neutral-800"
                >
                  <Image
                    src={piece.product.images[0].src}
                    alt={piece.product.images[0].alt}
                    width={800}
                    height={800}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="h-full w-full object-cover motion-safe:transition motion-safe:duration-500 motion-safe:group-hover:scale-105"
                  />
                  {"badge" in piece && piece.badge ? (
                    <span
                      className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold ${
                        piece.badge === "New Drop" ? "bg-accent text-black" : "bg-black/70 text-amber-400 backdrop-blur-md"
                      }`}
                    >
                      {piece.badge}
                    </span>
                  ) : null}
                </Link>
                <div className="p-6">
                  <h3 className="mb-1 text-lg font-bold">
                    <Link href={`/shop/${piece.product.slug}`}>{piece.product.name}</Link>
                  </h3>
                  <p className="mb-4 text-sm text-neutral-400">{piece.colours || piece.product.description}</p>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xl font-extrabold">{formatMoney(piece.product.price)}</span>
                    {piece.variant ? (
                      <AddToCartButton productId={piece.product.id} variantId={piece.variant.id} />
                    ) : (
                      <Link href={`/shop/${piece.product.slug}`} className="text-sm font-semibold text-accent">
                        View
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="courses" className="border-t border-line py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 max-w-2xl">
            <h2 className="mb-3 text-sm font-semibold tracking-widest text-accent uppercase">{home.courses.eyebrow}</h2>
            <p className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">{home.courses.heading}</p>
            <p className="text-muted">{home.courses.text}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <article className="rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 text-neutral-100">
              <span className="text-sm font-bold tracking-wider text-accent uppercase">In-person course</span>
              <h3 className="mt-2 mb-4 text-2xl font-bold">{fundamentals.name}</h3>
              <p className="mb-6 leading-relaxed text-neutral-400">
                {fundamentals.summary} {fundamentals.schedule} at {fundamentals.venue}. {formatMoney(fundamentals.price)}, with payment plans.
              </p>
              <Link href="/courses/fundamentals#enrol" className="inline-flex items-center gap-2 font-semibold text-amber-400 hover:text-amber-300">
                Check enrollment details <ArrowIcon />
              </Link>
            </article>
            <article className="rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 text-neutral-100">
              <span className="text-sm font-bold tracking-wider text-accent uppercase">{proClass.eyebrow}</span>
              <h3 className="mt-2 mb-4 text-2xl font-bold">
                {proClass.name} {proClass.edition}
              </h3>
              <p className="mb-6 leading-relaxed text-neutral-400">{proClass.summary} The centrepiece is the 10-minute pro challenge.</p>
              <Link href="/courses/pro" className="inline-flex items-center gap-2 font-semibold text-amber-400 hover:text-amber-300">
                See the class <ArrowIcon />
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
