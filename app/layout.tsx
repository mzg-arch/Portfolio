import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Micahel Biru | Full-Stack Developer",
    template: "%s | Micahel Biru",
  },
  description:
    "Portfolio of Micahel Biru, a computer science student and full-stack developer building responsive web applications with Next.js, Node.js, and PostgreSQL.",
  applicationName: "Micahel Biru Portfolio",
  authors: [{ name: "Micahel Biru" }],
  creator: "Micahel Biru",
  keywords: [
    "Micahel Biru",
    "full-stack developer",
    "computer science student",
    "Next.js developer",
    "software engineering portfolio",
    "Springfield Virginia",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Micahel Biru | Full-Stack Developer",
    description:
      "Computer science student building full-stack applications from responsive interfaces through cloud deployment.",
    siteName: "Micahel Biru Portfolio",
  },
  twitter: {
    card: "summary",
    title: "Micahel Biru | Full-Stack Developer",
    description:
      "Computer science student building full-stack applications from responsive interfaces through cloud deployment.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f7f7f4",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
