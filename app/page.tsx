import { ContactForm } from "@/components/contact-form";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CodeIcon,
  DatabaseIcon,
  DownloadIcon,
  GitHubIcon,
  LayersIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  ToolIcon,
} from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  contact,
  education,
  experience,
  profile,
  projects,
  skillGroups,
} from "@/lib/portfolio-data";

const skillIcons = [CodeIcon, LayersIcon, DatabaseIcon, ToolIcon] as const;

const aboutCapabilities = [
  {
    number: "01",
    label: "Interfaces",
    detail: "React, Next.js, and responsive UI",
  },
  {
    number: "02",
    label: "APIs",
    detail: "REST routes, validation, and JWT",
  },
  {
    number: "03",
    label: "Data",
    detail: "PostgreSQL, Prisma, and relational models",
  },
  {
    number: "04",
    label: "Deployment",
    detail: "Vercel, Railway, and cloud deployment",
  },
] as const;

export default function Home() {
  return (
    <main id="main-content">
      <section id="top" className="hero-grid border-b border-[var(--border)]">
        <div className="page-shell flex py-12 sm:py-16 lg:min-h-[calc(100svh-4.5rem)] lg:items-center lg:py-20">
          <div className="grid w-full items-center gap-9 lg:grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.8fr)] lg:gap-14">
            <div>
              <p className="eyebrow">Computer science student</p>
              <h1 className="mt-6 text-[clamp(3.25rem,8vw,5.75rem)] font-semibold leading-none tracking-[-0.065em]">
                {profile.name}
                <span className="text-[var(--accent)]">.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-balance text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.035em] text-[var(--foreground-soft)]">
                I build <span className="text-[var(--accent)]">full-stack</span> web
                applications.
              </p>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
                My projects span responsive interfaces, REST APIs, databases,
                authentication, and cloud deployment. I&apos;m currently studying at
                Northern Virginia Community College and growing through hands-on project
                work.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#projects"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-6 text-sm font-semibold text-white transition-[transform,background-color] motion-safe:hover:-translate-y-0.5 hover:bg-[var(--accent)]"
                >
                  View projects
                  <ArrowRightIcon className="size-4" />
                </a>
                <a
                  href="/resume/Micahel-Biru-Resume.pdf"
                  download
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-6 text-sm font-semibold text-[var(--foreground)] transition-[transform,border-color] motion-safe:hover:-translate-y-0.5 hover:border-[var(--foreground)]"
                >
                  <DownloadIcon className="size-4" />
                  Download resume
                </a>
              </div>

              <div className="mt-7 flex items-center gap-5">
                <a
                  href={contact.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  <GitHubIcon className="size-5" />
                  GitHub
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <span className="h-4 w-px bg-[var(--border-strong)]" aria-hidden="true" />
                <a
                  href={contact.linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  <LinkedInIcon className="size-5" />
                  LinkedIn
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>

            <aside
              className="relative overflow-hidden rounded-[1.5rem] border border-[var(--border-strong)] bg-[var(--surface-muted)] p-6 shadow-[0_20px_45px_-34px_rgb(25_29_35/0.48)] sm:p-8"
              aria-label="At a glance"
            >
              <div
                className="absolute right-0 top-0 size-24 translate-x-10 -translate-y-10 rounded-full border-[18px] border-[var(--accent-soft)]"
                aria-hidden="true"
              />
              <p className="text-sm font-semibold">At a glance</p>
              <dl className="mt-8 divide-y divide-[var(--border-strong)]">
                <div className="grid gap-1 py-5 first:pt-0">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                    Education
                  </dt>
                  <dd className="text-sm font-medium">
                    A.S. in Computer Science
                    <span className="mt-1 block font-normal text-[var(--muted)]">
                      Expected 2027
                    </span>
                  </dd>
                </div>
                <div className="grid gap-1 py-5">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                    Focus
                  </dt>
                  <dd className="text-sm font-medium">
                    Full-stack web development
                    <span className="mt-1 block font-normal text-[var(--muted)]">
                      Interfaces, APIs &amp; data
                    </span>
                  </dd>
                </div>
                <div className="grid gap-1 py-5 last:pb-0">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                    Based in
                  </dt>
                  <dd className="flex items-center gap-2 text-sm font-medium">
                    <MapPinIcon className="size-4 text-[var(--accent)]" />
                    Springfield, Virginia
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section id="about" className="bg-[var(--surface-muted)]">
        <div className="page-shell section-shell">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.38fr_1.62fr] lg:gap-14">
              <aside className="about-rule border-b border-[var(--border-strong)] pb-8 pt-7 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--foreground-soft)]">
                  About / 01
                </p>
                <dl className="mt-9 grid grid-cols-2 gap-5 text-sm lg:grid-cols-1 lg:gap-7">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                      Based in
                    </dt>
                    <dd className="mt-2 font-medium">Springfield, Virginia</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                      Graduation
                    </dt>
                    <dd className="mt-2 font-medium">Expected 2027</dd>
                  </div>
                </dl>
              </aside>

              <div>
                <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-4xl">
                  Building from the interface to the database.
                </h2>
                <p className="mt-8 max-w-4xl text-pretty text-xl leading-8 tracking-[-0.015em] text-[var(--foreground)] sm:text-[1.35rem] sm:leading-9">
                  {profile.about}
                </p>
                <p className="mt-6 max-w-3xl text-pretty leading-7 text-[var(--muted)]">
                  Through InventoryPro and Nexora, I&apos;ve worked on the pieces that
                  connect a product: reusable interfaces, authentication, API routes, data
                  models, validation, and deployment. That end-to-end view is the
                  direction I want to keep developing in future software engineering and
                  web development roles.
                </p>

                <ul className="mt-10 grid gap-px overflow-hidden border-y border-[var(--border-strong)] bg-[var(--border-strong)] sm:grid-cols-2 lg:grid-cols-4">
                  {aboutCapabilities.map((capability) => (
                    <li key={capability.number} className="bg-[var(--surface-muted)] p-5">
                      <span className="font-mono text-xs font-semibold text-[var(--accent)]">
                        {capability.number}
                      </span>
                      <h3 className="mt-4 text-sm font-semibold">{capability.label}</h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        {capability.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="experience" className="section-divider bg-[var(--surface)]">
        <div className="page-shell section-shell">
          <Reveal>
            <SectionHeading
              eyebrow="Experience"
              title="Hands-on, project-based development."
              description="My experience so far comes from taking full-stack applications from initial structure through deployment and continued feature work."
            />
          </Reveal>

          <div className="mt-12">
            {experience.map((item) => (
              <Reveal key={item.title} delay={80}>
                <article className="surface-card grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14 lg:p-10">
                  <div>
                    <span className="inline-flex rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                      {item.type}
                    </span>
                    <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-[var(--muted)]">
                      {item.context}
                    </p>
                    <p className="mt-5 text-pretty leading-7 text-[var(--muted)]">
                      {item.summary}
                    </p>
                  </div>
                  <ul
                    className="grid content-start gap-4"
                    aria-label="Experience highlights"
                  >
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 border-b border-[var(--border)] pb-4 last:border-0 last:pb-0"
                      >
                        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                          <CheckIcon className="size-3.5" />
                        </span>
                        <span className="text-sm leading-6 text-[var(--foreground)] sm:text-base">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section-divider bg-[var(--surface-subtle)]">
        <div className="page-shell section-shell">
          <Reveal>
            <SectionHeading
              eyebrow="Featured projects"
              title="Applications built around real workflows."
              description="These projects reflect my work across interface design, API development, data modeling, authentication, collaboration, and deployment."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.name} delay={index * 90} className="h-full">
                <article className="surface-card group flex h-full flex-col overflow-hidden transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_24px_55px_-30px_rgb(25_26_28/0.38)]">
                  <div className="flex items-start justify-between border-b border-[var(--border)] p-6 sm:p-8">
                    <span className="font-mono text-sm text-[var(--muted)]">
                      0{index + 1}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        project.status === "Work in Progress"
                          ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                          : "bg-[var(--surface-muted)] text-[var(--muted)]"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                      {project.subtitle}
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                      {project.name}
                    </h3>
                    <p className="mt-4 text-pretty leading-7 text-[var(--muted)]">
                      {project.description}
                    </p>

                    <ul
                      className="mt-7 grid gap-3"
                      aria-label={`${project.name} highlights`}
                    >
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3 text-sm leading-6">
                          <span
                            className="mt-[0.65rem] size-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                            aria-hidden="true"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div
                      className="mt-8 flex flex-wrap gap-2"
                      aria-label={`${project.name} technologies`}
                    >
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs font-medium text-[var(--muted)]"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-3 pt-9">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-2.5 text-sm font-semibold text-[var(--background)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[var(--accent)]"
                        >
                          Visit live site
                          <ArrowUpRightIcon className="size-4" />
                        </a>
                      ) : null}
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] transition-[transform,border-color,color] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        <GitHubIcon className="size-4" />
                        {project.sourceLabel}
                        <ArrowUpRightIcon className="size-4" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="section-divider bg-[var(--surface)]">
        <div className="page-shell section-shell">
          <Reveal>
            <SectionHeading
              eyebrow="Skills"
              title="Tools I’ve used to build and ship."
              description="Organized by where they fit in my current full-stack workflow."
            />
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group, index) => {
              const Icon = skillIcons[index] ?? CodeIcon;

              return (
                <Reveal key={group.category} delay={index * 60} className="h-full">
                  <article className="surface-card h-full p-6 sm:p-7">
                    <div className="grid size-10 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{group.category}</h3>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className="text-sm leading-6 text-[var(--muted)] before:mr-2 before:text-[var(--accent)] before:content-['/']"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="education" className="section-divider bg-[var(--surface)]">
        <div className="page-shell section-shell">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <SectionHeading
                eyebrow="Education"
                title="Building the foundation."
                description="Coursework supporting my practical work in software development."
              />
              {education.map((item) => (
                <article key={item.institution} className="surface-card p-6 sm:p-8">
                  <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.02em]">
                        {item.institution}
                      </h3>
                      <p className="mt-2 text-[var(--muted)]">{item.degree}</p>
                    </div>
                    <span className="w-fit rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                      {item.graduation}
                    </span>
                  </div>
                  <div className="pt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                      Relevant coursework
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.coursework.map((course) => (
                        <li
                          key={course}
                          className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
                        >
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="section-divider">
        <div className="page-shell section-shell">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
              <div>
                <SectionHeading
                  eyebrow="Contact"
                  title="Let’s start a conversation."
                  description="If you have an internship, software engineering, or web development opportunity in mind, send me a note."
                />
                <div className="mt-8 grid gap-4">
                  <a
                    href={contact.emailHref}
                    className="group flex items-center gap-3 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    <span className="grid size-10 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[var(--foreground)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                      <MailIcon className="size-4" />
                    </span>
                    {contact.email}
                  </a>
                  <p className="flex items-center gap-3 text-sm text-[var(--muted)]">
                    <span className="grid size-10 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[var(--foreground)]">
                      <MapPinIcon className="size-4" />
                    </span>
                    {contact.location}
                  </p>
                </div>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
