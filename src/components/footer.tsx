import Link from "next/link";
import { site } from "@content/site";
import { FacebookIcon, InstagramIcon } from "@/components/icons";

const iconLinks = [
  { href: "https://www.instagram.com/ameerhoseintt/", label: "Instagram", icon: InstagramIcon },
  { href: "https://www.facebook.com/ameerhoseintt", label: "Facebook", icon: FacebookIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#050507] py-16 text-neutral-300">
      <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="text-2xl font-extrabold tracking-wider text-white">
            AH<span className="text-accent">.</span>
          </span>
          <p className="mt-4 max-w-sm text-neutral-400">
            Photography, classes, and the AH collection from Trinidad and Tobago.
          </p>
          <p className="mt-4 font-display text-lg text-white">{site.signOff}</p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold tracking-widest text-neutral-300 uppercase">Quick Links</h2>
          <ul className="space-y-2 text-sm text-neutral-400">
            {site.footer.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-amber-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold tracking-widest text-neutral-300 uppercase">Connect</h2>
          <div className="flex space-x-4">
            {iconLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 transition hover:border-accent hover:text-amber-400"
              >
                <item.icon />
              </a>
            ))}
          </div>
          <ul className="mt-4 space-y-2 text-sm text-neutral-400">
            {site.socials.slice(2).map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition hover:text-amber-400" target="_blank" rel="noreferrer">
                  {item.handle}
                </a>
              </li>
            ))}
            <li>
              <a href={`tel:${site.phoneTel}`} className="transition hover:text-amber-400">
                {site.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between border-t border-neutral-900 px-6 pt-8 text-sm text-neutral-500 md:flex-row">
        <p>&copy; 2026 AH ({site.name}). All rights reserved.</p>
      </div>
    </footer>
  );
}
