"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@content/site";
import { LogoLockup } from "@/components/brand";
import { BagIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { CartButton } from "@/components/shop/cart";

export function Header() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);
  const open = menuPath === pathname;

  useEffect(() => {
    const next = localStorage.getItem("ah-theme") !== "light";
    document.documentElement.classList.toggle("dark", next);
    if (next) return;
    const id = window.setTimeout(() => setDark(false), 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuPath(null);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggleTheme() {
    const nextDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("ah-theme", nextDark ? "dark" : "light");
    setDark(nextDark);
  }

  function closeMenu() {
    setMenuPath(null);
  }

  return (
    <>
    <header
      className={`sticky top-0 z-50 h-16 border-b border-line/80 bg-paper ${
        scrolled
          ? "shadow-[0_12px_30px_-20px_rgba(0,0,0,0.55),inset_0_-2px_0_var(--accent)]"
          : "shadow-[inset_0_-2px_0_var(--accent)]"
      }`}
    >
      <div className="shell flex h-full items-center justify-between gap-3">
        <LogoLockup />
        <nav aria-label="Primary" className="hidden items-center gap-7 text-sm font-medium md:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 transition hover:text-ink ${active ? "text-ink" : "text-muted"}`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 -bottom-1.5 h-0.5 origin-left bg-accent motion-safe:transition-transform ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            className="hidden min-h-11 items-center rounded-full border border-line px-3 text-sm font-medium lg:inline-flex"
            onClick={toggleTheme}
          >
            {dark ? "Light" : "Dark"}
          </button>
          <CartButton />
          <Link
            href="/shop"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-3.5 py-2 text-sm font-semibold text-white transition hover:brightness-110 sm:px-4"
          >
            <BagIcon />
            <span className="sm:hidden">Shop</span>
            <span className="hidden sm:inline">Shop AH</span>
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setMenuPath(open ? null : pathname)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
    </header>
      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-auto bg-paper px-6 py-10 md:hidden"
        >
          <ul className="space-y-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-3 font-display text-4xl" onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="block py-3 font-display text-4xl" onClick={closeMenu}>
                Contact
              </Link>
            </li>
          </ul>
          <button type="button" className="mt-8 inline-flex min-h-11 items-center text-sm font-medium" onClick={toggleTheme}>
            {dark ? "Switch to light mode" : "Switch to dark mode"}
          </button>
        </nav>
      ) : null}
    </>
  );
}
