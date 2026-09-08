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
  imageSrc: string | null;
  imageAlt: string;
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
    context: "CodeSprint, DevScope, InventoryPro, NextBoard, and Nexora",
    type: "Project-based experience",
    summary:
      "Designed and built web applications spanning responsive interfaces, REST APIs, relational data models, authentication, and cloud deployment.",
    highlights: [
      "Built reusable, responsive interfaces with React, Next.js, TypeScript, and Tailwind CSS.",
      "Designed REST API routes, relational data models, and server-side validation workflows.",
      "Implemented secure JWT authentication and protected, role-aware application routes for InventoryPro.",
      "Built a persistent Kanban workflow with Supabase authentication, row-level security, task collaboration, and drag-and-drop interactions.",
      "Developed CodeSprint as a full-stack interview-practice platform with a code editor, authenticated progress tracking, and queued code execution.",
      "Deployed InventoryPro using Vercel for the frontend and Railway for the backend and PostgreSQL database.",
    ],
  },
] as const satisfies readonly ExperienceItem[];

export const projects = [
  {
    name: "CodeSprint",
    subtitle: "Coding Interview Practice Platform",
    description:
      "An open-source learning platform for practicing programming problems, running solutions, reviewing results, and tracking interview-preparation progress.",
    imageSrc: "/projects/codesprint.png",
    imageAlt: "CodeSprint home page showing its coding interview practice workspace",
    technologies: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "Monaco Editor",
    ],
    highlights: [
      "Built a responsive problem library and Monaco-powered workspace for writing, running, and submitting solutions.",
      "Implemented JWT authentication, protected user pages, and progress and submission history.",
      "Separated the web app, API, database package, and judge worker in a Turborepo monorepo.",
      "Added queued code execution with BullMQ and Redis, including validation and structured feedback.",
    ],
    status: "Deployed",
    sourceUrl: "https://github.com/mzg-arch/open-source-codesprint",
    sourceLabel: "View repository",
    liveUrl: "https://codesprint-theta.vercel.app",
  },
  {
    name: "InventoryPro",
    subtitle: "Inventory Management System",
    description:
      "A full-stack inventory platform with secure authentication, role-aware access, and a responsive dashboard for managing products and suppliers.",
    imageSrc: "/projects/inventorypro.png",
    imageAlt: "InventoryPro home page with an inventory dashboard preview",
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
    liveUrl: "https://inventorypro-dun.vercel.app",
  },
  {
    name: "NextBoard",
    subtitle: "Collaborative Kanban Workspace",
    description:
      "A responsive task-management workspace with persistent boards, guest authentication, team assignments, comments, and activity history.",
    imageSrc: "/projects/nextboard.png",
    imageAlt:
      "NextBoard project workspace showing task counters, filters, members, and four Kanban columns",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "dnd-kit",
      "Tailwind CSS",
      "Zod",
    ],
    highlights: [
      "Built a four-stage Kanban board with mouse, touch, and keyboard drag-and-drop interactions and persistent task ordering.",
      "Added task search and filters for priority, assignee, and labels, along with due dates and multi-member assignments.",
      "Implemented anonymous Supabase authentication and row-level security to isolate each user's task and team data.",
      "Added task comments and an activity timeline, then deployed the application on Vercel.",
    ],
    status: "Deployed",
    sourceUrl: "https://github.com/mzg-arch/nextplay-board",
    sourceLabel: "View repository",
    liveUrl: "https://nextplay-board.vercel.app",
  },
  {
    name: "DevScope",
    subtitle: "AI-Powered Repository Analyzer",
    description:
      "A full-stack tool that helps developers understand unfamiliar public GitHub repositories through file-tree exploration, technology detection, architecture views, and AI-generated explanations.",
    imageSrc: "/projects/devscope.png",
    imageAlt: "DevScope home page with its public repository analysis input",
    technologies: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "GitHub REST API",
      "Google Gemini API",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    highlights: [
      "Built a repository analysis workflow that retrieves verified metadata and code structure from the GitHub REST API.",
      "Created searchable file-tree and architecture views for exploring unfamiliar codebases.",
      "Integrated Google Gemini to generate explanations grounded in repository data and supporting file paths.",
      "Designed responsive loading, validation, and error states for the analysis dashboard.",
    ],
    status: "Deployed",
    sourceUrl: "https://github.com/mzg-arch/DevScope",
    sourceLabel: "View repository",
    liveUrl: "https://devscope-six.vercel.app",
  },
  {
    name: "Nexora",
    subtitle: "Client Management Platform",
    description:
      "A full-stack, SaaS-style client management platform covering authentication, client records, follow-ups, activity logs, account settings, and dashboard workflows.",
    imageSrc: null,
    imageAlt: "",
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
      "NestJS",
      "BullMQ",
      "REST APIs",
      "JWT Authentication",
      "Server-Side Validation",
    ],
  },
  {
    category: "Databases & Tools",
    skills: [
      "PostgreSQL",
      "Supabase",
      "Prisma ORM",
      "Redis",
      "Git",
      "GitHub",
      "Postman",
      "Vercel",
      "Railway",
    ],
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
