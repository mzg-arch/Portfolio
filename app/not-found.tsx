import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="page-shell grid min-h-[70svh] place-items-center py-20">
      <div className="max-w-lg text-center">
        <p className="eyebrow justify-center before:hidden">404</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em]">
          This page isn&apos;t here.
        </h1>
        <p className="mt-4 leading-7 text-[var(--muted)]">
          The link may be outdated, or the page may have moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--foreground)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent)]"
        >
          Back to portfolio
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </main>
  );
}
