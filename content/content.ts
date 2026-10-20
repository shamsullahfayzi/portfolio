// All site copy. Edit text here; components never hard-code words.
// Facts come from Shamsullah's CV (Shamsullah_Fayzi_CV.pdf) and project notes.

export const LINKS = {
  github: "https://github.com/shamsullahfayzi",
  linkedin: "https://www.linkedin.com/in/shamsullah-fayzi-b41884380/",
  email: "hello@shamsullahfayzi.dev",
  cv: "/cv.pdf", // public/cv.pdf (the button hides itself if this is emptied)
  photo: "/me.jpg", // public/me.jpg (a marked placeholder shows if this is emptied)
};

export type ProjectId =
  | "redmars"
  | "solar"
  | "attendance"
  | "alraheel"
  | "farhat"
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

// Live sites, shown beside the code link.
export const LIVE_LINKS: Partial<Record<ProjectId, string>> = {
  farhat: "https://www.farhat.af",
  zombie: "https://zombie-typing.netlify.app/",
};

// Private projects: visitors ask me for a walk-through instead of opening a link.
export const DEMO_REQUEST: ProjectId[] = ["redmars", "alraheel"];

export type SkillUse = { project?: ProjectId; note?: string };

// Where each skill shows up: project cards where the CV names one, otherwise a short note.
export const SKILL_USE: Record<string, SkillUse[]> = {
  // Languages. JS/TS go wherever React, Next.js, NestJS or Angular is in the stack; SQL wherever the CV names a database.
  JavaScript: [{ project: "redmars" }, { project: "solar" }, { project: "trendora" }, { project: "zombie" }, { project: "jobcenter" }, { note: "This portfolio" }],
  TypeScript: [{ project: "redmars" }, { project: "solar" }, { project: "trendora" }, { project: "zoya" }, { project: "zombie" }, { project: "jobcenter" }, { note: "This portfolio" }],
  Python: [{ project: "trendora" }, { project: "attendance" }],
  "C#": [{ project: "alraheel" }, { project: "musicmingle" }],
  Java: [{ project: "prescription" }],
  SQL: [{ project: "redmars" }, { project: "alraheel" }, { project: "trendora" }, { project: "musicmingle" }],

  // Frontend
  React: [{ project: "farhat" }, { project: "redmars" }, { project: "solar" }, { project: "trendora" }, { project: "zombie" }, { project: "jobcenter" }, { note: "This portfolio" }],
  "Next.js": [{ project: "farhat" }, { project: "trendora" }, { note: "This portfolio" }],
  Angular: [{ project: "zoya" }],
  Blazor: [{ project: "alraheel" }],
  Tailwind: [{ project: "zombie" }, { project: "jobcenter" }],
  MUI: [{ project: "trendora" }],
  Redux: [{ project: "trendora" }],
  "TanStack Query": [{ project: "redmars" }],

  // 3D & devices
  "Three.js": [{ project: "solar" }, { note: "This portfolio" }],
  "React Three Fiber": [{ project: "solar" }, { note: "This portfolio" }],
  "Web Bluetooth": [{ project: "solar" }],

  // Backend
  "Node.js": [{ project: "redmars" }, { project: "trendora" }, { note: "This portfolio" }],
  NestJS: [{ project: "redmars" }],
  FastAPI: [{ project: "trendora" }],
  "ASP.NET Core": [{ project: "alraheel" }, { project: "musicmingle" }],
  "REST APIs": [{ project: "redmars" }, { project: "trendora" }],
  "JWT auth": [{ project: "trendora" }, { project: "zoya" }],
  "Role-based access control": [{ project: "redmars" }, { project: "trendora" }, { project: "alraheel" }, { project: "zoya" }],

  // Databases
  PostgreSQL: [{ project: "redmars" }, { project: "alraheel" }],
  "SQL Server": [{ project: "trendora" }],
  Prisma: [{ project: "redmars" }],

  // AI / ML
  "Azure AI Document Intelligence": [{ project: "alraheel" }],
  "OCR (Tesseract)": [{ project: "alraheel" }],
  "Face recognition": [{ project: "attendance" }],

  // Desktop & DevOps
  JavaFX: [{ project: "prescription" }],
  Docker: [{ project: "redmars" }],
  Caddy: [{ project: "redmars" }],
  Azure: [{ project: "alraheel" }],
  Git: [{ project: "redmars" }, { project: "solar" }, { project: "zombie" }, { project: "jobcenter" }, { project: "zoya" }, { project: "musicmingle" }, { note: "This portfolio" }],
  GitHub: [{ project: "redmars" }, { project: "solar" }, { project: "zombie" }, { project: "jobcenter" }, { project: "zoya" }, { project: "musicmingle" }, { note: "This portfolio" }],

  // Skills with no project card: learned at university, then used on private projects (not public).
  Go: [{ note: "Studied at Kardan University." }, { note: "Used in my private projects." }],
  Vue: [{ note: "Studied at Kardan University." }, { note: "Used in my private projects." }],
  Bootstrap: [{ note: "Studied at Kardan University." }, { note: "Used in my private projects." }],
  "Chakra UI": [{ note: "Studied at Kardan University." }, { note: "Used in my private projects." }],
  Express: [{ note: "Studied at Kardan University." }, { note: "Used in my private projects." }],
  Firebase: [{ note: "Studied at Kardan University." }, { note: "Used in my private projects." }],
  Supabase: [{ note: "Studied at Kardan University." }, { note: "Used in my private projects." }],
  "LLM integration": [{ note: "Studied at Kardan University." }, { note: "Used in my private projects." }],
  "RAG pipelines": [{ note: "Studied at Kardan University." }, { note: "Used in my private projects." }],
  "Hugging Face": [{ note: "Studied at Kardan University." }, { note: "Used in my private projects." }],
  "Prompt engineering": [{ note: "Studied at Kardan University." }, { note: "Used in my private projects." }],
  "MCP services": [{ note: "Studied at Kardan University." }, { note: "Used in my private projects." }],
  Electron: [{ note: "Studied at Kardan University." }, { note: "Used in my private projects." }],
  "CI/CD": [{ note: "Studied at Kardan University." }, { note: "Used in my private projects." }],
  MySQL: [{ note: "Dived deep into it at Kardan University: schemas, joins and how queries really run." }, { note: "Used in my private projects." }],
  Oracle: [{ note: "Dived deep into it at Kardan University, down to how the engine stores and plans a query." }, { note: "Used in my private projects." }],
  MongoDB: [{ note: "Dived deep into it at Kardan University, from document modelling to aggregation pipelines." }, { note: "Used in my private projects." }],
  Linux: [{ note: "Dived deep into it at Kardan University: the shell, processes and permissions." }, { note: "Used in my private projects." }],
};

// Project ids that get a full-size feature treatment, in display order.
export const FEATURED: ProjectId[] = ["redmars", "solar", "attendance", "alraheel", "farhat", "trendora", "zombie", "jobcenter"];
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

export type Step = { label: string; title: string; text: string; proof: ProjectId[] };

type Copy = {
  meta: { title: string; description: string };
  nav: { work: string; skills: string; process: string; contact: string };
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
    live: string;
    noCode: string;
    request: {
      button: string; title: string; sub: string; name: string; email: string; message: string;
      placeholder: string; send: string; sending: string; sent: string; sentText: string; fallback: string; close: string; note: string;
    };
    stack: string;
    more: string;
    enter3d: string;
    projects: Record<ProjectId, Project>;
  };
  skills: { title: string; intro: string; hint: string; usedIn: string; none: string; together: string; groups: SkillGroup[] };
  process: { title: string; intro: string; proofLabel: string; studying: string; steps: Step[] };
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
  nav: { work: "Work", skills: "Range", process: "Process", contact: "Contact" },
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
    intro: "Ten projects, one habit: ship the whole thing, from the database to the screen.",
    code: "Read the code",
    live: "Live site",
    request: {
      button: "Request demo",
      title: "Request a demo of",
      sub: "Tell me who you are and what you would like to see. I reply personally, usually within a day.",
      name: "Your name",
      email: "Your email",
      message: "Message",
      placeholder: "What would you like to see, and when suits you?",
      send: "Send request",
      sending: "Sending…",
      sent: "Request sent",
      sentText: "Thank you. I will reply to the email address you gave me.",
      fallback: "Could not send it directly, so I opened your email app with the message ready instead.",
      close: "Close",
      note: "I only use these details to reply to you.",
    },
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
      farhat: {
        name: "Farhat Hospital",
        kind: "Client project · hospital website",
        pitch:
          "The public website of a psychiatric, neurological and addiction treatment hospital in Kabul. A frightened family needs one thing from it: to find the phone number and feel safe calling.",
        stats: [
          { value: "3", label: "languages: Dari, Pashto, English" },
          { value: "24h", label: "open, call or WhatsApp in one tap" },
        ],
        stack: ["Next.js", "React"],
        points: [
          "Right-to-left Dari and Pashto alongside English, switchable from any screen.",
          "A daily-schedule timeline that highlights what is happening at the hospital right now.",
          "Services, admission steps and the inpatient programme explained plainly, with call and WhatsApp always in reach.",
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
    intro: "Pick a skill to see the projects it went into.",
    hint: "Select a skill",
    usedIn: "Used in",
    none: "On my CV. Ask me where I’ve used it.",
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
  process: {
    title: "How I work",
    intro: "Self-employed since 2024: client work and my own products, from the first conversation to a running deployment.",
    proofLabel: "See it in",
    studying: "Alongside the work: B.Sc. Computer Engineering at Kardan University, expected April 2028.",
    steps: [
      {
        label: "01",
        title: "Start with the people",
        text: "I work out how the job gets done today before I design anything. REDMARS grew with a Kabul hospital as design partner; Al-Raheel replaced an agency’s Excel process.",
        proof: ["redmars", "alraheel"],
      },
      {
        label: "02",
        title: "Model the data first",
        text: "A solid schema makes everything after it simpler. REDMARS runs on 47 PostgreSQL tables; Al-Raheel uses triggers and views for its complex queries.",
        proof: ["redmars", "alraheel"],
      },
      {
        label: "03",
        title: "Build the API and the interface",
        text: "Typed APIs with interfaces made for the people using them: bilingual right-to-left screens, a desktop app, a 3D phone controller.",
        proof: ["redmars", "prescription", "solar"],
      },
      {
        label: "04",
        title: "Make it safe",
        text: "Rules are enforced on the server, not just hidden in the UI: 6 roles and about 60 permissions, an audit trail, allergy hard-blocks at prescribing, hashed passwords and httpOnly sessions.",
        proof: ["redmars", "trendora"],
      },
      {
        label: "05",
        title: "Ship it and keep it running",
        text: "Load-tested with 40 concurrent patients, fixed a connection-pool exhaustion, then shipped in Docker containers behind HTTPS with nightly backups and a verified restore.",
        proof: ["redmars"],
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
