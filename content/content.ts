// All site copy. Edit text here; components never hard-code words.
// Facts come from Shamsullah's CV (Shamsullah_Fayzi_CV.pdf) and project notes.

export const LINKS = {
  github: "https://github.com/shamsullahfayzi",
  linkedin: "https://www.linkedin.com/in/shamsullah-fayzi-b41884380/",
  email: "shams.fayzi@gmail.com",
  cv: "/cv.pdf", // public/cv.pdf (the button hides itself if this is emptied)
  photo: "/me.jpg", // public/me.jpg (a marked placeholder shows if this is emptied)
};

export type ProjectId =
  | "redmars"
  | "solar"
  | "attendance"
  | "alraheel"
  | "trendora"
  | "zombie"
  | "jobcenter"
  | "prescription"
  | "zoya"
  | "musicmingle";

// Missing entry = no public code (the project's `note` says why).
export const PROJECT_LINKS: Partial<Record<ProjectId, string>> = {
  redmars: "https://github.com/shamsullahfayzi/REDMARS",
  solar: "https://github.com/shamsullahfayzi/solar-taxi-label",
  zombie: "https://github.com/shamsullahfayzi/zombie-typing",
  jobcenter: "https://github.com/shamsullahfayzi/job-center",
  zoya: "https://github.com/shamsullahfayzi/Zoya",
  musicmingle: "https://github.com/shamsullahfayzi/MusicMingle",
};

export type SkillUse = { project?: ProjectId; note?: string };

// Where each skill shows up. A skill missing here simply has no project card yet (the UI says so).
export const SKILL_USE: Record<string, SkillUse[]> = {
  React: [{ project: "redmars" }, { project: "trendora" }, { project: "zombie" }, { project: "jobcenter" }, { note: "This portfolio" }],
  "Next.js": [{ project: "trendora" }, { note: "This portfolio" }],
  Angular: [{ project: "zoya" }],
  Blazor: [{ project: "alraheel" }],
  Tailwind: [{ project: "zombie" }, { project: "jobcenter" }],
  MUI: [{ project: "trendora" }],
  Redux: [{ project: "trendora" }],
  "TanStack Query": [{ project: "redmars" }],
  NestJS: [{ project: "redmars" }],
  FastAPI: [{ project: "trendora" }],
  "ASP.NET Core": [{ project: "alraheel" }, { project: "musicmingle" }],
  "REST APIs": [{ project: "redmars" }],
  "JWT auth": [{ project: "trendora" }, { project: "zoya" }],
  "Role-based access control": [{ project: "redmars" }, { project: "trendora" }, { project: "alraheel" }],
  PostgreSQL: [{ project: "redmars" }, { project: "alraheel" }],
  "SQL Server": [{ project: "trendora" }],
  Prisma: [{ project: "redmars" }],
  Python: [{ project: "trendora" }, { project: "attendance" }],
  "C#": [{ project: "alraheel" }, { project: "musicmingle" }],
  Java: [{ project: "prescription" }],
  JavaFX: [{ project: "prescription" }],
  "Three.js": [{ project: "solar" }, { note: "This portfolio" }],
  "React Three Fiber": [{ project: "solar" }, { note: "This portfolio" }],
  "Web Bluetooth": [{ project: "solar" }],
  "Face recognition": [{ project: "attendance" }],
  "Azure AI Document Intelligence": [{ project: "alraheel" }],
  "OCR (Tesseract)": [{ project: "alraheel" }],
  Docker: [{ project: "redmars" }],
  Caddy: [{ project: "redmars" }],
};

// Project ids that get a full-size feature treatment, in display order.
export const FEATURED: ProjectId[] = ["redmars", "solar", "attendance", "alraheel", "trendora", "zombie", "jobcenter"];
// Compact strip at the end.
export const MINOR: ProjectId[] = ["prescription", "zoya", "musicmingle"];

type Stat = { value: string; label: string };

export type Project = {
  name: string;
  kind: string; // short label above the title, as the CV words it
  pitch: string;
  stats: Stat[];
  stack: string[];
  points: string[];
  note?: string; // e.g. "Client work, no public code"
};

export type SkillGroup = { id: string; name: string; blurb: string; items: string[] };

export type Job = { org: string; role: string; place: string; dates: string; points: string[] };

type Copy = {
  meta: { title: string; description: string };
  nav: { work: string; skills: string; experience: string; contact: string };
  hero: {
    kicker: string;
    name: string;
    line: string;
    seeWork: string;
    cv: string;
    scroll: string;
    ticker: string[];
  };
  work: {
    title: string;
    intro: string;
    code: string;
    noCode: string;
    stack: string;
    more: string;
    enter3d: string;
    projects: Record<ProjectId, Project>;
  };
  skills: { title: string; intro: string; hint: string; usedIn: string; none: string; together: string; groups: SkillGroup[] };
  experience: { title: string; present: string; jobs: Job[] };
  contact: {
    title: string;
    words: string[];
    body: string;
    email: string;
    linkedin: string;
    github: string;
    copy: string;
    copied: string;
    time: string;
  };
  footer: string;
  placeholder: { photo: string; screenshot: string };
};

export const COPY: Copy = {
  meta: {
    title: "Shamsullah Fayzi, full-stack software engineer",
    description:
      "Full-stack engineer building web apps, desktop apps, AI features, 3D interfaces and games. React, Next.js, NestJS, FastAPI, PostgreSQL, Three.js.",
  },
  nav: { work: "Work", skills: "Range", experience: "Path", contact: "Contact" },
  hero: {
    kicker: "Full-stack software engineer",
    name: "Shamsullah Fayzi",
    line: "I build whatever the problem needs: web apps, desktop apps, AI features, 3D interfaces, games.",
    seeWork: "See the work",
    cv: "Download CV",
    scroll: "Scroll",
    ticker: ["Web apps", "Desktop apps", "AI features", "3D interfaces", "Games", "Databases", "DevOps"],
  },
  work: {
    title: "Selected work",
    intro: "Seven projects, one habit: ship the whole thing, from the database to the screen.",
    code: "Read the code",
    noCode: "No public code",
    stack: "Built with",
    more: "Also built",
    enter3d: "View in 3D room",
    projects: {
      redmars: {
        name: "REDMARS",
        kind: "Hospital management system · independent product, 2026",
        pitch:
          "A bilingual Dari/English, right-to-left hospital system that runs on-premise, built with a Kabul hospital as design partner. Registration to pharmacy, on one server.",
        stats: [
          { value: "47", label: "database tables" },
          { value: "30+", label: "API modules" },
          { value: "6", label: "roles, ~60 permissions" },
          { value: "40", label: "concurrent patients in load tests" },
        ],
        stack: ["NestJS", "Prisma", "PostgreSQL", "React 19", "TanStack Query", "Docker", "Caddy"],
        points: [
          "An audit trail of every write and every read of a medical record.",
          "Allergy hard-blocks at prescribing (override needs a written reason), plus drug-interaction warnings.",
          "Load-tested, fixed a connection-pool exhaustion, shipped in Docker behind HTTPS with nightly backups and a verified restore.",
        ],
      },
      solar: {
        name: "Solar Taxi Roof Sign",
        kind: "Product prototype · 2026",
        pitch:
          "A phone controller and a real-time 3D model of a solar LED roof sign for shared taxis, showing destination, fare and free seats.",
        stats: [
          { value: "3D", label: "real-time twin" },
          { value: "BLE", label: "Web Bluetooth layer" },
        ],
        stack: ["React 19", "React Three Fiber", "Three.js", "Zustand", "Web Bluetooth"],
        points: [
          "A Bluetooth transport that mirrors the Web Bluetooth API, so the simulator and real ESP32 hardware swap without UI changes.",
        ],
      },
      attendance: {
        name: "AI attendance system",
        kind: "Team lead · university project",
        pitch: "A camera recognises students' faces and marks attendance automatically, across multiple classes.",
        stats: [
          { value: "98%", label: "recognition accuracy" },
          { value: "3", label: "person team, I led it" },
        ],
        stack: ["Python", "Face recognition", "Live camera input"],
        points: [
          "Multi-class support with separate rosters per section.",
          "I owned the architecture and integration of the recognition module.",
          "Won a Certificate of Appreciation.",
        ],
      },
      alraheel: {
        name: "Al-Raheel Travel Agency",
        kind: "Client project · 2026",
        pitch:
          "Replaced the agency's Excel-based customer and booking process with a web system, and automated data entry by reading passport and ID details from scanned documents.",
        stats: [{ value: "75%", label: "less manual processing time" }],
        stack: ["Blazor (.NET 8)", "EF Core", "PostgreSQL", "ASP.NET Identity", "Azure AI Document Intelligence", "Tesseract OCR"],
        points: [
          "Azure AI Document Intelligence and Tesseract OCR extract the customer details.",
          "Layered architecture on PostgreSQL, with triggers and views for complex queries and role-based sign-in.",
        ],
        note: "Client work, no public code",
      },
      trendora: {
        name: "Trendora",
        kind: "E-commerce platform · team lead, 2024",
        pitch: "A full-stack store where customers buy and sellers manage their own products, led by me with a team of three.",
        stats: [{ value: "2", label: "user sides: customers and sellers" }],
        stack: ["React", "Next.js", "MUI", "Redux", "FastAPI", "SQLAlchemy", "SQL Server"],
        points: [
          "FastAPI backend with bcrypt password hashing and JWT sessions in httpOnly cookies.",
          "Separate customer and seller roles.",
          "Product search, filtering and cart workflows across hundreds of demo products and multiple sellers.",
        ],
      },
      zombie: {
        name: "Zombie Typing",
        kind: "Game · 2026",
        pitch:
          "A typing game with live WPM and accuracy, a leaderboard, and original characters and sound. Playable in English, Dari and Pashto.",
        stats: [{ value: "3", label: "languages" }],
        stack: ["React 19", "Tailwind CSS", "Netlify"],
        points: ["A pooled audio engine so rapid sound effects overlap cleanly.", "Scales to any screen, laptop to 2560px."],
      },
      jobcenter: {
        name: "Job Center",
        kind: "Web app · 2026",
        pitch: "A two-sided job board: seekers browse and apply; employers post jobs and review applicants.",
        stats: [{ value: "2", label: "sides, one app" }],
        stack: ["React 19", "React Router", "Tailwind CSS"],
        points: ["Reducer-based state and a storage layer ready to swap for a real API."],
      },
      prescription: {
        name: "Prescription Management App",
        kind: "Client project · 2025",
        pitch:
          "A desktop app doctors use to write prescriptions faster: pick medicine, dosage, frequency and quantity instead of writing by hand. Adopted by several doctors.",
        stats: [],
        stack: ["Java", "JavaFX"],
        points: [],
        note: "Client work, no public code",
      },
      zoya: {
        name: "Zoya Clinic",
        kind: "Client project · 2024",
        pitch:
          "Patient registration and appointment tracking for a private clinic, with JWT login, role-guarded routes and admin dashboards.",
        stats: [],
        stack: ["Angular 16", "Angular Material", "RxJS", "JWT", "ApexCharts"],
        points: [],
      },
      musicmingle: {
        name: "MusicMingle",
        kind: "Event booking site",
        pitch: "An event booking site with an admin back office.",
        stats: [],
        stack: ["ASP.NET Core 9", "EF Core", "Identity"],
        points: [],
      },
    },
  },
  skills: {
    title: "Range",
    intro: "Not a list of logos. Pick a skill and see where I've actually used it.",
    hint: "Select a skill",
    usedIn: "Used in",
    none: "On my CV, no project card for it yet.",
    together: "Often used together with",
    groups: [
      {
        id: "lang",
        name: "Languages",
        blurb: "Seven, used for real work.",
        items: ["JavaScript", "TypeScript", "Python", "C#", "Java", "Go", "SQL"],
      },
      {
        id: "front",
        name: "Frontend",
        blurb: "From dashboards to 3D scenes.",
        items: ["React", "Next.js", "Angular", "Vue", "Blazor", "Tailwind", "Bootstrap", "MUI", "Chakra UI", "Redux", "TanStack Query"],
      },
      {
        id: "three",
        name: "3D & Devices",
        blurb: "Real-time graphics, talking to hardware.",
        items: ["Three.js", "React Three Fiber", "Web Bluetooth"],
      },
      {
        id: "back",
        name: "Backend",
        blurb: "APIs that hold up.",
        items: ["Node.js", "Express", "NestJS", "FastAPI", "ASP.NET Core", "REST APIs", "JWT auth", "Role-based access control"],
      },
      {
        id: "data",
        name: "Databases",
        blurb: "Relational first, others when they fit.",
        items: ["PostgreSQL", "SQL Server", "MySQL", "MongoDB", "Oracle", "Prisma", "Firebase", "Supabase"],
      },
      {
        id: "ai",
        name: "AI / ML",
        blurb: "Models wired into real products.",
        items: [
          "LLM integration",
          "RAG pipelines",
          "Hugging Face",
          "Prompt engineering",
          "MCP services",
          "Azure AI Document Intelligence",
          "OCR (Tesseract)",
          "Face recognition",
        ],
      },
      {
        id: "ops",
        name: "Desktop & DevOps",
        blurb: "Ship it and keep it running.",
        items: ["Electron", "JavaFX", "Docker", "Caddy", "Linux", "Azure", "Git", "GitHub", "CI/CD"],
      },
    ],
  },
  experience: {
    title: "Path",
    present: "Present",
    jobs: [
      {
        org: "RedwanMarsa ICT",
        role: "Junior Software Engineer",
        place: "Kabul",
        dates: "Aug 2025 – Present",
        points: [
          "Built and deployed the Al-Raheel Travel Agency system, replacing an Excel-based process and cutting manual processing time by 75%.",
          "Integrated AI models to automatically extract customer details.",
          "Built a JavaFX prescription app used by several doctors (dosage, frequency, quantity, medicine selection).",
          "Clean architecture with advanced PostgreSQL (triggers, views for complex queries).",
        ],
      },
      {
        org: "Axon Psychiatric Hospital",
        role: "Junior Software Engineer",
        place: "Kabul",
        dates: "Apr 2024 – Jul 2025",
        points: [
          "Helped build the hospital's official website, which met a Ministry of Health requirement.",
          "IT infrastructure: network setup, system maintenance and technical support across departments.",
        ],
      },
      {
        org: "Freelance & independent products",
        role: "Self-employed full-stack developer",
        place: "",
        dates: "2024 – Present",
        points: ["Client work and independent products, built alongside full-time university study."],
      },
      {
        org: "Kardan University",
        role: "B.Sc. Computer Engineering",
        place: "Kabul",
        dates: "Expected April 2028",
        points: [],
      },
    ],
  },
  contact: {
    title: "Let's build something",
    words: ["useful.", "fast.", "3D.", "playable.", "smart."],
    body: "Open to roles and projects. Email is the fastest way to reach me.",
    email: "Email me",
    linkedin: "LinkedIn",
    github: "GitHub",
    copy: "Copy email",
    copied: "Copied",
    time: "Dubai",
  },
  footer: "Built by Shamsullah Fayzi.",
  placeholder: { photo: "Photo goes here", screenshot: "Screenshot goes here" },
};
