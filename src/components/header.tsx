"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@content/site";
import { BagIcon } from "@/components/icons";
import { CartButton } from "@/components/shop/cart";

export function Header() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", localStorage.getItem("ah-theme") !== "light");
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function toggleTheme() {
    const nextDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("ah-theme", nextDark ? "dark" : "light");
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[var(--header)] backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-extrabold tracking-wider text-ink">
          AH<span className="text-accent">.</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center space-x-8 text-sm font-medium text-muted md:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-amber-400">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="hidden min-h-11 px-2 text-sm lg:inline-flex" onClick={toggleTheme}>
            <span className="dark:hidden">Dark</span>
            <span className="hidden dark:inline">Light</span>
          </button>
          <CartButton />
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-400 sm:px-5"
          >
            <BagIcon />
            <span className="hidden sm:inline">Shop Merch</span>
            <span className="sm:hidden">Shop</span>
          </Link>
          <button
            className="min-h-11 px-2 text-sm md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setMenuPath(open ? null : pathname)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-paper px-6 py-4 md:hidden">
          <ul className="space-y-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-3 text-lg">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="block py-3 text-lg">
                Contact
              </Link>
            </li>
          </ul>
          <button className="mt-2 min-h-11 text-sm" onClick={toggleTheme}>
            <span className="dark:hidden">Switch to dark mode</span>
            <span className="hidden dark:inline">Switch to light mode</span>
          </button>
        </nav>
      ) : null}
    </header>
  );
}
