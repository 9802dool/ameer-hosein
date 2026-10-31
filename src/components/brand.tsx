import Link from "next/link";
import { site } from "@content/site";

export function Mark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    // The SVG is the file Ameer will replace. next/image blocks SVG unless the optimizer is opened up.
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo-ah.svg" alt="" className={className} />
  );
}

export function LogoLockup() {
  return (
    <Link href="/" aria-label={site.name} className="flex min-w-0 items-center gap-2.5">
      <Mark className="h-9 w-9 shrink-0 overflow-hidden rounded-md" />
      <span className="hidden truncate text-sm font-medium sm:block">{site.name}</span>
    </Link>
  );
}

export const fieldClass =
  "mt-2 w-full rounded-2xl border border-line bg-paper px-4 py-3 text-base text-ink shadow-sm outline-none transition placeholder:text-muted focus:border-accent";

export const buttonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_-16px_var(--accent)] transition hover:brightness-110 active:brightness-95 disabled:cursor-not-allowed disabled:opacity-50";

export const ghostClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-panel px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:border-accent hover:text-accent-text";

export const textLinkClass =
  "inline-flex items-center gap-2 font-semibold text-accent-text motion-safe:transition-[gap] motion-safe:hover:gap-3";

export function chipClass(selected: boolean) {
  return `min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium transition ${
    selected ? "border-accent bg-accent text-white" : "border-line bg-panel text-ink hover:border-accent-text"
  }`;
}
