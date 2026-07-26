import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/mzg-arch",
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mikaelsbit21",
    icon: LinkedInIcon,
  },
  {
    label: "Email",
    href: "mailto:mdawit384@gmail.com",
    icon: MailIcon,
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-subtle)]">
      <div className="page-shell flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--muted)]">
          © {new Date().getFullYear()} Micahel Biru
        </p>
        <div className="flex items-center gap-2" aria-label="Social links">
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="grid size-10 place-items-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-[color,transform,border-color] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              aria-label={label}
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
