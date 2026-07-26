export interface NavigationItem {
  label: string;
  href: `#${string}`;
}

export interface SocialLink {
  label: "GitHub" | "LinkedIn" | "Email";
  href: string;
  ariaLabel: string;
}

export interface ExperienceItem {
  title: string;
  context: string;
  type: "Project-based experience";
  summary: string;
  highlights: readonly string[];
}

export type ProjectStatus = "Deployed" | "Work in Progress";

export interface Project {
  name: string;
  subtitle: string;
  description: string;
  technologies: readonly string[];
  highlights: readonly string[];
  status: ProjectStatus;
  sourceUrl: string;
  sourceLabel: string;
  liveUrl: string | null;
}

export interface SkillGroup {
  category: string;
  skills: readonly string[];
}

export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  graduation: string;
  coursework: readonly string[];
}

const email = "mdawit384@gmail.com";
const githubUrl = "https://github.com/mzg-arch";
const linkedInUrl = "https://www.linkedin.com/in/mikaelsbit21";

export const profile = {
  name: "Micahel Biru",
  role: "Computer Science Student & Full-Stack Developer",
  location: "Springfield, VA 22153, USA",
  email,
  introduction:
    "I build full-stack web applications across responsive interfaces, APIs, databases, and cloud deployment.",
  about:
    "I'm a computer science student at Northern Virginia Community College with hands-on experience building full-stack web applications. My projects have taken me from relational data modeling and REST API design to responsive interfaces and cloud deployment. I'm continuing to strengthen those skills while working toward my Associate of Science in Computer Science, expected in 2027.",
} as const;

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const satisfies readonly NavigationItem[];

export const contact = {
  email,
  emailHref: `mailto:${email}`,
  location: profile.location,
  githubUrl,
  linkedInUrl,
} as const;

export const socialLinks = [
  {
    label: "GitHub",
    href: githubUrl,
    ariaLabel: "Visit Micahel Biru's GitHub profile",
  },
  {
    label: "LinkedIn",
    href: linkedInUrl,
    ariaLabel: "Visit Micahel Biru's LinkedIn profile",
  },
  {
    label: "Email",
    href: `mailto:${email}`,
    ariaLabel: "Email Micahel Biru",
  },
] as const satisfies readonly SocialLink[];

export const experience = [
  {
    title: "Full-Stack Project Development",
    context: "InventoryPro and Nexora",
    type: "Project-based experience",
    summary:
      "Designed and built web applications spanning responsive interfaces, REST APIs, relational data models, authentication, and cloud deployment.",
    highlights: [
      "Built reusable, responsive interfaces with React, Next.js, TypeScript, and Tailwind CSS.",
      "Designed REST API routes, relational data models, and server-side validation workflows.",
      "Implemented secure JWT authentication and protected, role-aware application routes for InventoryPro.",
      "Deployed InventoryPro using Vercel for the frontend and Railway for the backend and PostgreSQL database.",
    ],
  },
] as const satisfies readonly ExperienceItem[];

export const projects = [
  {
    name: "InventoryPro",
    subtitle: "Inventory Management System",
    description:
      "A full-stack inventory platform with secure authentication, role-aware access, and a responsive dashboard for managing products and suppliers.",
    technologies: [
      "Next.js",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "JWT",
      "Tailwind CSS",
    ],
    highlights: [
      "Built authentication, product, and supplier modules with protected routes and role-aware access.",
      "Designed REST API routes and relational models for products and suppliers, with complete CRUD and server-side validation.",
      "Integrated frontend services for immediate inventory and supplier data updates.",
      "Deployed the frontend on Vercel and the backend and PostgreSQL database on Railway.",
    ],
    status: "Deployed",
    sourceUrl: "https://github.com/mzg-arch/InventoryPro",
    sourceLabel: "View repository",
    liveUrl: null,
  },
  {
    name: "Nexora",
    subtitle: "Client Management Platform",
    description:
      "A full-stack, SaaS-style client management platform covering authentication, client records, follow-ups, activity logs, account settings, and dashboard workflows.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Radix UI", "ShadCN UI"],
    highlights: [
      "Built reusable interface components and responsive client-management layouts for desktop and mobile.",
      "Implemented a RESTful client API and structured models for clients, tasks, notes, and AI-assisted follow-ups.",
      "Organized pages and components to support maintainable feature expansion and a consistent interface.",
    ],
    status: "Work in Progress",
    sourceUrl: "https://github.com/mzg-arch/Nexora",
    sourceLabel: "View repository",
    liveUrl: null,
  },
] as const satisfies readonly Project[];

export const skillGroups = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "HTML", "CSS"],
  },
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "ShadCN UI",
      "Radix UI",
      "Responsive Web Design",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "Server-Side Validation",
    ],
  },
  {
    category: "Databases & Tools",
    skills: ["PostgreSQL", "Prisma ORM", "Git", "GitHub", "Postman", "Vercel", "Railway"],
  },
] as const satisfies readonly SkillGroup[];

export const education = [
  {
    institution: "Northern Virginia Community College (NOVA)",
    location: "Virginia",
    degree: "Associate of Science in Computer Science",
    graduation: "Expected 2027",
    coursework: [
      "Data Structures",
      "Programming",
      "Database Concepts",
      "Computer Systems",
      "Discrete Mathematics",
    ],
  },
] as const satisfies readonly EducationItem[];
