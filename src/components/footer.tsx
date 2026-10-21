import Link from "next/link";
import { site } from "@content/site";
import { Mark } from "@/components/brand";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Mark />
            <div>
              <p className="font-display text-sm tracking-[0.22em]">{site.mark}</p>
              <p className="text-sm text-muted">{site.name}</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">{site.tagline}</p>
          <p className="mt-6 font-display text-2xl">{site.signOff}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-accent">Visit</p>
          <ul className="mt-4 space-y-2 text-sm">
            {site.footer.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-accent">Find AH</p>
          <ul className="mt-4 space-y-2 text-sm">
            {site.socials.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-accent" target="_blank" rel="noreferrer">
                  {item.handle}
                </a>
              </li>
            ))}
            <li>
              <a href={`tel:${site.phoneTel}`} className="hover:text-accent">
                {site.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
