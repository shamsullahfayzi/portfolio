// All site copy, in English and Dari. Edit text here; components never hard-code words.
// Values marked TODO are details only Shamsullah can supply.

export type Lang = "en" | "fa";

export const LINKS = {
  github: "https://github.com/shamsullahfayzi",
  linkedin: "", // TODO: LinkedIn URL (link hides itself while empty)
  email: "", // TODO: contact email (button hides itself while empty)
  cv: "", // TODO: put cv.pdf in /public and set this to "/cv.pdf"
  redmars: "https://github.com/shamsullahfayzi/REDMARS",
};

type Project = {
  name: string;
  what: string;
  stack: string;
  code: string;
  live?: string;
};

type Job = { org: string; role: string; place: string; note: string };

type Copy = {
  langName: string; // name of THIS language, shown on the toggle when you're in the other one
  switchLabel: string; // accessible label for the toggle
  nav: { work: string; experience: string; contact: string };
  hero: { title: string; intro: string; seeWork: string; cv: string; github: string };
  redmars: {
    name: string;
    lede: string;
    flowTitle: string;
    flow: { step: string; detail: string }[];
    facts: { value: string; label: string }[];
    detailsTitle: string;
    details: string[];
    status: string;
    code: string;
  };
  more: { title: string; code: string; live: string; projects: Project[] };
  experience: { title: string; jobs: Job[]; toolsTitle: string; tools: string };
  contact: { title: string; body: string; email: string; linkedin: string; github: string };
  footer: string;
};

export const COPY: Record<Lang, Copy> = {
  en: {
    langName: "English",
    switchLabel: "Switch the site to Dari",
    nav: { work: "Work", experience: "Experience", contact: "Contact" },
    hero: {
      title:
        "I build hospital software that works in two languages and keeps working when the internet doesn't.",
      intro:
        "I'm Shamsullah Fayzi, a full-stack engineer in Dubai. I design systems end to end, from the database to the screen a receptionist uses all day, and ship them to real clinics in Afghanistan.",
      seeWork: "See my work",
      cv: "Download CV",
      github: "GitHub",
    },
    redmars: {
      name: "REDMARS hospital system",
      lede:
        "An outpatient system for a psychiatric hospital in Kabul. It carries a patient's whole visit, from the front desk to the pharmacy, on one server inside the building, in Dari and English.",
      flowTitle: "One visit through REDMARS",
      flow: [
        { step: "Reception", detail: "Registers, opens the visit and takes payment on one screen" },
        { step: "Doctor's queue", detail: "Updates live as patients arrive" },
        { step: "Consultation", detail: "Diagnosis, notes and prescription, all from the keyboard" },
        { step: "Lab", detail: "Orders arrive instantly; abnormal results are flagged" },
        { step: "Billing", detail: "Partial payments, refunds and capped discounts" },
        { step: "Pharmacy", detail: "Sees only medicines and allergies, nothing else" },
        { step: "Reports", detail: "Daily numbers for hospital management" },
      ],
      facts: [
        { value: "47", label: "database tables" },
        { value: "30+", label: "API modules" },
        { value: "6 roles", label: "about 60 permissions" },
        { value: "40", label: "patients at once in load tests" },
      ],
      detailsTitle: "Decisions I'm proud of",
      details: [
        "Every time someone opens a medical record, it's logged, not only when they change it.",
        "A prescription is blocked if the patient is allergic. A doctor can override it, but only by giving a reason.",
        "Backups run every night, and I tested the restore by deleting the database and bringing it back.",
        "The interface switched between Dari and English from the first day, because adding right-to-left later means rebuilding every screen.",
      ],
      status: "Built and hardened. Staff training and go-live are next.",
      code: "Read the code",
    },
    more: {
      title: "More projects",
      code: "Code",
      live: "Try it",
      projects: [
        {
          name: "Solar taxi roof sign",
          what:
            "A phone remote and a live 3D model of a solar LED sign for shared taxis. The Bluetooth layer is ready for real ESP32 hardware.",
          stack: "React Three Fiber, Three.js, Web Bluetooth",
          code: "https://github.com/shamsullahfayzi/solar-taxi-label",
        },
        {
          name: "Zombie Typing",
          what:
            "A typing game where you stop each zombie by typing its word. Plays in English, Dari and Pashto, with a speed leaderboard.",
          stack: "React 19, Tailwind CSS",
          code: "https://github.com/shamsullahfayzi/zombie-typing",
        },
        {
          name: "Job Center",
          what: "A job board with two sides: seekers browse and apply, employers post jobs and review applicants.",
          stack: "React 19, React Router",
          code: "https://github.com/shamsullahfayzi/job-center",
        },
        {
          name: "Zoya Clinic",
          what: "Patient registration and appointment tracking for a clinic. My first healthcare app.",
          stack: "Angular, Angular Material",
          code: "https://github.com/shamsullahfayzi/Zoya",
        },
        {
          name: "MusicMingle",
          what: "Find and book music events, with a back office for admins.",
          stack: "ASP.NET Core, Entity Framework",
          code: "https://github.com/shamsullahfayzi/MusicMingle",
        },
      ],
    },
    experience: {
      title: "Experience",
      jobs: [
        {
          org: "RedwanMarsa ICT",
          role: "Junior full-stack engineer",
          place: "Dubai",
          note: "Web applications with React, Next.js and NestJS.", // TODO: confirm or describe your work
        },
        {
          org: "Axon Psychiatric Hospital",
          role: "Software for hospital operations", // TODO: your exact title
          place: "Kabul",
          note: "Where I first built tools for clinical and administrative staff.", // TODO: confirm
        },
        {
          org: "Kardan University",
          role: "B.Sc. in Computer Engineering",
          place: "In progress",
          note: "",
        },
      ],
      toolsTitle: "What I work with",
      tools:
        "TypeScript, React, Next.js, Angular, Node.js, NestJS, Python, C#, PostgreSQL, Prisma, SQL Server, Docker, Electron",
    },
    contact: {
      title: "Hiring a full-stack engineer?",
      body: "I'm based in Dubai and open to on-site and remote roles. The fastest way to reach me is email.",
      email: "Email me",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    footer: "Built by Shamsullah Fayzi with Next.js. This site works in English and Dari.",
  },

  fa: {
    langName: "دری",
    switchLabel: "تغییر زبان سایت به انگلیسی",
    nav: { work: "کارها", experience: "تجربه", contact: "تماس" },
    hero: {
      title: "نرم‌افزار شفاخانه می‌سازم که به دو زبان کار می‌کند و وقتی انترنت قطع شود، از کار نمی‌افتد.",
      intro:
        "من شمس‌الله فیضی هستم، انجنیر فول‌استک در دبی. سیستم‌ها را از دیتابیس تا صفحه‌ای که پذیرش هر روز با آن کار می‌کند طراحی می‌کنم و در کلینیک‌های واقعی افغانستان به کار می‌اندازم.",
      seeWork: "کارهایم را ببینید",
      cv: "دانلود سی‌وی",
      github: "گیت‌هاب",
    },
    redmars: {
      name: "سیستم شفاخانه REDMARS",
      lede:
        "سیستم بخش سرپایی برای یک شفاخانه روانی در کابل. تمام مراجعه مریض را، از پذیرش تا دواخانه، روی یک سرور داخل همان ساختمان و به زبان‌های دری و انگلیسی پیش می‌برد.",
      flowTitle: "یک مراجعه در REDMARS",
      flow: [
        { step: "پذیرش", detail: "ثبت مریض، باز کردن مراجعه و گرفتن پول در یک صفحه" },
        { step: "نوبت داکتر", detail: "با رسیدن هر مریض به‌روز می‌شود" },
        { step: "معاینه", detail: "تشخیص، یادداشت و نسخه، همه با کیبورد" },
        { step: "لابراتوار", detail: "درخواست‌ها فوری می‌رسند و نتایج غیرعادی نشانی می‌شوند" },
        { step: "صندوق", detail: "پرداخت قسمی، بازپرداخت و تخفیف با سقف معین" },
        { step: "دواخانه", detail: "فقط دواها و حساسیت‌ها را می‌بیند، نه چیز دیگر" },
        { step: "گزارش‌ها", detail: "ارقام روزانه برای مدیریت شفاخانه" },
      ],
      facts: [
        { value: "۴۷", label: "جدول دیتابیس" },
        { value: "+۳۰", label: "ماژول API" },
        { value: "۶ نقش", label: "حدود ۶۰ صلاحیت" },
        { value: "۴۰", label: "مریض هم‌زمان در آزمایش فشار" },
      ],
      detailsTitle: "تصمیم‌هایی که به آن افتخار می‌کنم",
      details: [
        "هر بار که کسی پرونده صحی را باز کند ثبت می‌شود، نه فقط وقتی آن را تغییر دهد.",
        "اگر مریض به دوایی حساسیت داشته باشد، نسخه متوقف می‌شود. داکتر می‌تواند آن را رد کند، اما فقط با نوشتن دلیل.",
        "پشتیبان هر شب گرفته می‌شود و بازیابی را با پاک کردن دیتابیس و برگرداندن آن آزمایش کردم.",
        "رابط کاربری از روز اول بین دری و انگلیسی تغییر می‌کرد، چون اضافه کردن راست‌به‌چپ در آخر یعنی ساختن دوباره هر صفحه.",
      ],
      status: "ساخته و محکم‌کاری شده است. آموزش کارمندان و شروع کار، قدم بعدی است.",
      code: "دیدن کد",
    },
    more: {
      title: "پروژه‌های دیگر",
      code: "کد",
      live: "امتحان کنید",
      projects: [
        {
          name: "تابلوی سقف تکسی سولری",
          what:
            "ریموت موبایلی و مدل سه‌بعدی زنده یک تابلوی LED سولری برای تکسی‌های لینی. بخش بلوتوث برای سخت‌افزار واقعی ESP32 آماده است.",
          stack: "React Three Fiber، Three.js، Web Bluetooth",
          code: "https://github.com/shamsullahfayzi/solar-taxi-label",
        },
        {
          name: "زامبی تایپینگ",
          what: "بازی تایپ که هر زامبی را با تایپ کلمه‌اش متوقف می‌کنید. به انگلیسی، دری و پشتو، با جدول سرعت.",
          stack: "React 19، Tailwind CSS",
          code: "https://github.com/shamsullahfayzi/zombie-typing",
        },
        {
          name: "مرکز کار",
          what: "سایت کاریابی دو طرفه: کارجو وظیفه می‌بیند و درخواست می‌دهد، کارفرما وظیفه اعلان می‌کند و درخواست‌ها را می‌بیند.",
          stack: "React 19، React Router",
          code: "https://github.com/shamsullahfayzi/job-center",
        },
        {
          name: "کلینیک زویا",
          what: "ثبت مریض و پیگیری نوبت‌ها برای یک کلینیک. اولین برنامه صحی من.",
          stack: "Angular، Angular Material",
          code: "https://github.com/shamsullahfayzi/Zoya",
        },
        {
          name: "میوزیک مینگل",
          what: "پیدا کردن و رزرو برنامه‌های موسیقی، با بخش مدیریت برای ادمین.",
          stack: "ASP.NET Core، Entity Framework",
          code: "https://github.com/shamsullahfayzi/MusicMingle",
        },
      ],
    },
    experience: {
      title: "تجربه",
      jobs: [
        {
          org: "RedwanMarsa ICT",
          role: "انجنیر فول‌استک",
          place: "دبی",
          note: "برنامه‌های ویب با React، Next.js و NestJS.",
        },
        {
          org: "شفاخانه روانی اکسون",
          role: "نرم‌افزار برای کارهای شفاخانه",
          place: "کابل",
          note: "جایی که اولین ابزارها را برای کارمندان صحی و اداری ساختم.",
        },
        {
          org: "پوهنتون کاردان",
          role: "لیسانس انجنیری کمپیوتر",
          place: "در حال تحصیل",
          note: "",
        },
      ],
      toolsTitle: "ابزارهایی که با آن کار می‌کنم",
      tools:
        "TypeScript، React، Next.js، Angular، Node.js، NestJS، Python، C#، PostgreSQL، Prisma، SQL Server، Docker، Electron",
    },
    contact: {
      title: "انجنیر فول‌استک استخدام می‌کنید؟",
      body: "در دبی هستم و برای کار حضوری و از راه دور آماده‌ام. سریع‌ترین راه تماس، ایمیل است.",
      email: "ایمیل بفرستید",
      linkedin: "لینکدین",
      github: "گیت‌هاب",
    },
    footer: "ساخته شمس‌الله فیضی با Next.js. این سایت به انگلیسی و دری کار می‌کند.",
  },
};
