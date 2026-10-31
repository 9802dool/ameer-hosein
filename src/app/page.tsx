import Image from "next/image";
import Link from "next/link";
import { fundamentals, proClass } from "@content/courses";
import { home } from "@content/home";
import { instagramPosts } from "@content/instagram";
import { site } from "@content/site";
import { getProduct } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";
import { buttonClass, ghostClass, textLinkClass } from "@/components/brand";
import { ArrowIcon, InstagramIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
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
      <section className="relative overflow-hidden">
        <div className="shell grid items-center gap-12 pt-10 pb-14 md:min-h-[calc(100svh-4rem)] md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:pt-8 md:pb-16">
          <div>
            <p className="eyebrow">{home.hero.eyebrow}</p>
            <h1 className="mt-5 max-w-xl text-[2.7rem] sm:text-6xl md:text-7xl">
              {home.hero.heading} <span className="text-accent-text">{home.hero.headingAccent}.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{home.hero.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={home.hero.primaryCta.href} className={`${buttonClass} px-7`}>
                {home.hero.primaryCta.label}
              </Link>
              <a href={home.hero.secondaryCta.href} target="_blank" rel="noreferrer" className={ghostClass}>
                <InstagramIcon />
                {home.hero.secondaryCta.label}
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div aria-hidden className="absolute -right-1 -bottom-4 left-8 top-8 rounded-[1.75rem] bg-accent sm:left-12" />
            <div className="relative overflow-hidden rounded-[1.75rem] bg-panel shadow-[var(--shadow)]">
              <Image
                src={home.hero.image}
                alt={home.hero.imageAlt}
                width={1000}
                height={1250}
                priority
                sizes="(max-width: 768px) 100vw, 46vw"
                className="aspect-[4/5] h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="border-y border-line bg-panel/70">
          <ul className="shell grid gap-4 py-6 text-sm sm:grid-cols-3 sm:py-7">
            <li className="font-display text-xl">{home.hero.eyebrow}</li>
            <li className="font-display text-xl">
              {site.location.name}, {site.location.area}
            </li>
            <li className="font-display text-xl">{site.tagline}</li>
          </ul>
        </div>
      </section>

      <Reveal>
        <section aria-label="Instagram" className="py-20 md:py-28">
          <div className="shell">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">From the feed</p>
                <h2 className="mt-3 text-3xl md:text-4xl">@ameerhoseintt</h2>
              </div>
              <a
                href="https://www.instagram.com/ameerhoseintt/"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-accent-text"
              >
                Instagram
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {instagramPosts.map((post) => (
                <a
                  key={post.id}
                  href={post.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={post.alt}
                  className="group relative block overflow-hidden rounded-2xl shadow-[var(--shadow)]"
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
      </Reveal>

      <Reveal>
        <section id="store" className="border-t border-line bg-panel/50 py-20 md:py-28">
          <div className="shell">
            <div className="mb-12 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">{home.store.eyebrow}</p>
                <h2 className="mt-3 text-3xl md:text-5xl">{home.store.heading}</h2>
              </div>
              <p className="max-w-md text-muted">{home.store.text}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pieces.map((piece) => (
                <article key={piece.product.id} className="card card-hover group overflow-hidden">
                  <Link
                    href={`/shop/${piece.product.slug}`}
                    aria-label={piece.product.name}
                    className="relative block aspect-square overflow-hidden bg-paper"
                  >
                    <Image
                      src={piece.product.images[0].src}
                      alt={piece.product.images[0].alt}
                      width={800}
                      height={800}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="h-full w-full object-cover motion-safe:transition motion-safe:duration-500 motion-safe:group-hover:scale-105"
                    />
                    {"badge" in piece && piece.badge ? (
                      <span
                        className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold ${
                          piece.badge === "New Drop" ? "bg-accent text-white" : "bg-paper/90 text-ink backdrop-blur-md"
                        }`}
                      >
                        {piece.badge}
                      </span>
                    ) : null}
                  </Link>
                  <div className="p-5 md:p-6">
                    <h3 className="text-2xl">
                      <Link href={`/shop/${piece.product.slug}`}>{piece.product.name}</Link>
                    </h3>
                    <p className="mt-2 text-sm text-muted">{piece.colours || piece.product.description}</p>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="text-xl font-semibold">{formatMoney(piece.product.price)}</span>
                      {piece.variant ? (
                        <AddToCartButton productId={piece.product.id} variantId={piece.variant.id} />
                      ) : (
                        <Link href={`/shop/${piece.product.slug}`} className="text-sm font-semibold text-accent-text">
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
      </Reveal>

      <Reveal>
        <section id="courses" className="py-20 md:py-28">
          <div className="shell">
            <div className="mb-12 max-w-2xl md:mb-14">
              <p className="eyebrow">{home.courses.eyebrow}</p>
              <h2 className="mt-3 text-3xl md:text-5xl">{home.courses.heading}</h2>
              <p className="mt-4 text-muted">{home.courses.text}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <article className="card card-hover p-7 md:p-8">
                <span className="eyebrow">In-person course</span>
                <h3 className="mt-4 text-3xl">{fundamentals.name}</h3>
                <p className="mt-4 leading-relaxed text-muted">
                  {fundamentals.summary} {fundamentals.schedule} at {fundamentals.venue}. {formatMoney(fundamentals.price)}, with payment plans.
                </p>
                <Link href="/courses/fundamentals#enrol" className={`${textLinkClass} mt-6`}>
                  Check enrollment details <ArrowIcon />
                </Link>
              </article>
              <article className="card card-hover p-7 md:p-8">
                <span className="eyebrow">{proClass.eyebrow}</span>
                <h3 className="mt-4 text-3xl">
                  {proClass.name} {proClass.edition}
                </h3>
                <p className="mt-4 leading-relaxed text-muted">{proClass.summary} The centrepiece is the 10-minute pro challenge.</p>
                <Link href="/courses/pro" className={`${textLinkClass} mt-6`}>
                  See the class <ArrowIcon />
                </Link>
              </article>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
