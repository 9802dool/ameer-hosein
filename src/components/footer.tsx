import Link from "next/link";
import { site } from "@content/site";
import { Mark } from "@/components/brand";
import { FacebookIcon, InstagramIcon } from "@/components/icons";

const iconLinks = [
  { href: "https://www.instagram.com/ameerhoseintt/", label: "Instagram", icon: InstagramIcon },
  { href: "https://www.facebook.com/ameerhoseintt", label: "Facebook", icon: FacebookIcon },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-panel">
      <div className="h-0.5 bg-accent" />
      <div className="shell grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex items-center gap-3">
            <Mark className="h-11 w-11 overflow-hidden rounded-lg" />
            <span className="font-display text-2xl">{site.name}</span>
          </Link>
          <p className="mt-5 max-w-sm text-muted">Photography, classes, and the AH collection from Trinidad and Tobago.</p>
          <p className="mt-5 font-display text-2xl">{site.signOff}</p>
        </div>
        <div className="md:col-span-3">
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-muted uppercase">Quick Links</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {site.footer.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-accent-text">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-muted uppercase">Connect</h2>
          <p className="mt-5 text-sm">
            {site.location.name}
            <br />
            {site.location.area}, {site.location.country}
          </p>
          <p className="mt-3 text-sm">
            <a href={`tel:${site.phoneTel}`} className="transition hover:text-accent-text">
              {site.phoneDisplay}
            </a>
          </p>
          <div className="mt-5 flex gap-3">
            {iconLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink transition hover:border-accent hover:text-accent-text"
              >
                <item.icon />
              </a>
            ))}
          </div>
          <ul className="mt-5 space-y-2 text-sm text-muted">
            {site.socials.slice(2).map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition hover:text-accent-text" target="_blank" rel="noreferrer">
                  {item.label} {item.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="shell py-6 pr-24 text-sm text-muted">
          <p>&copy; 2026 AH ({site.name}). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
