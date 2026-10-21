import Link from "next/link";
import { buttonClass } from "@/components/brand";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-40">
      <p className="text-xs uppercase tracking-[0.28em] text-accent">404</p>
      <h1 className="mt-4 font-display text-6xl">That frame is empty.</h1>
      <p className="mt-4 text-muted">The page is not on this site. Head home, or look through the work.</p>
      <Link href="/" className={`${buttonClass} mt-8`}>
        Back home
      </Link>
    </div>
  );
}
