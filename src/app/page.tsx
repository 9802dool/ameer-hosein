import { site } from "@/lib/site";

const chapters = [
  {
    index: "01",
    title: "Found here",
    text: "This is the public home for Ameer Hosein.",
  },
  {
    index: "02",
    title: "Shown here",
    text: "Selected work and writing can be gathered in one place.",
  },
  {
    index: "03",
    title: "Reached here",
    text: "A direct way to start a conversation.",
  },
] as const;

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-paper text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
          <a href="#top" className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center border border-ink font-display text-sm"
            >
              AH
            </span>
            <span className="font-display text-lg tracking-tight">
              {site.name}
            </span>
          </a>
          <nav aria-label="Primary" className="flex gap-6 text-sm">
            <a className="hover:text-brick" href="#about">
              About
            </a>
            <a className="hover:text-brick" href="#contact">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main id="content" className="flex-1">
        <section
          id="top"
          className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-12 md:items-end md:py-28"
        >
          <div className="md:col-span-8">
            <p className="mb-8 text-xs font-medium uppercase tracking-[0.28em] text-moss">
              Personal site
            </p>
            <h1 className="font-display text-[4.5rem] leading-[0.86] tracking-tight sm:text-8xl md:text-9xl">
              Ameer
              <br />
              Hosein
            </h1>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-muted md:col-span-4 md:pb-3">
            A quiet home for introductions, selected work, and a straightforward
            way to get in touch.
          </p>
        </section>

        <section aria-label="What this site holds" className="border-y border-line">
          <ol className="mx-auto grid max-w-6xl md:grid-cols-3">
            {chapters.map((chapter) => (
              <li
                key={chapter.index}
                className="border-line px-6 py-8 md:border-l md:first:border-l-0"
              >
                <p className="font-display text-sm text-brick">{chapter.index}</p>
                <h2 className="mt-4 font-display text-3xl tracking-tight">
                  {chapter.title}
                </h2>
                <p className="mt-3 max-w-xs leading-relaxed text-muted">
                  {chapter.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section id="about" className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-12 md:py-28">
          <h2 className="font-display text-4xl tracking-tight md:col-span-4 md:text-5xl">
            About
          </h2>
          <div className="space-y-5 text-lg leading-relaxed md:col-span-7 md:col-start-6">
            <p>
              Ameer Hosein keeps this site as a single, clear address online.
              It introduces the name and leaves room for work worth sharing.
            </p>
            <p className="text-muted">
              The page stays personal: direct, spare, and easy to return to.
            </p>
          </div>
        </section>

        <section id="contact" className="border-t border-line bg-moss text-paper">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-12 md:items-end md:py-24">
            <div className="md:col-span-7">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#c9d7d1]">
                Contact
              </p>
              <h2 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">
                Start a conversation.
              </h2>
            </div>
            <div className="md:col-span-5">
              {site.email ? (
                <a
                  className="inline-flex border border-paper px-5 py-3 text-sm hover:bg-paper hover:text-moss"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              ) : (
                <p className="max-w-sm leading-relaxed text-[#d7e3de]">
                  A public email address has not been added yet. It can be set
                  in the site details whenever you are ready to share it.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{site.name}</p>
          <p>Personal site</p>
        </div>
      </footer>
    </div>
  );
}
