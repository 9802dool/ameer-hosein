import Link from "next/link";
import { site } from "@content/site";

export function Mark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    // The SVG is the file Ameer will replace. next/image blocks SVG unless the optimizer is opened up.
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo-ah.svg" alt="" className={className} />
  );
}

export function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Mark />
      {compact ? null : (
        <span className="leading-tight">
          <span className="block font-display text-sm tracking-[0.22em]">{site.mark}</span>
          <span className="block text-xs text-muted">{site.name}</span>
        </span>
      )}
    </Link>
  );
}

export const fieldClass =
  "w-full border border-line bg-paper px-3 py-3 text-base text-ink placeholder:text-muted";

export const buttonClass =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-400";

export const ghostClass =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink transition hover:border-neutral-500";
