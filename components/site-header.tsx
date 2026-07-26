"use client";

import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => setIsOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-[rgb(245_246_247/0.92)] backdrop-blur-md">
      <div className="page-shell flex h-18 items-center justify-between">
        <a
          href="#top"
          className="group flex items-center gap-3 rounded-sm font-semibold tracking-[-0.02em]"
          aria-label="Micahel Biru, back to top"
        >
          <span
            className="grid size-9 place-items-center rounded-full bg-[var(--foreground)] text-xs font-bold tracking-wide text-white transition-transform group-hover:-translate-y-0.5"
            aria-hidden="true"
          >
            MB
          </span>
          <span>Micahel Biru</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-2 text-sm font-medium text-[var(--muted)] transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--accent)] after:transition-transform hover:text-[var(--foreground)] hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[var(--foreground)] md:hidden"
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`page-shell overflow-hidden transition-[max-height,opacity] duration-300 md:hidden ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <div className="grid gap-1 border-t border-[var(--border)] py-3">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-3 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-subtle)] hover:text-[var(--foreground)]"
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
