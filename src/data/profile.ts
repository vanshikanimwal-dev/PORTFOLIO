import type { Experience, ResumeProject } from "./types";

export const profile = {
  name: "Vanshika Nimwal",
  headline: "Software Developer",
  themeTitle: "Cyberpunk Developer",
  summary:
    "Software Developer with hands-on experience building cross-platform mobile applications, secure backend systems, and immersive XR experiences using Flutter, Java 21, Spring Boot, and Unity. Strong foundation in data structures, object-oriented programming, and software architecture, with practical experience delivering production-ready applications, integrating REST APIs, and developing concurrency-safe, real-time systems, including a double-entry wallet ledger that stays balanced under 100 concurrent transfers, a blockchain-anchored credential verifier with 6 independent checks, and an algorithm visualizer covering 20 algorithms with a live web demo. Passionate about performance optimization, clean code practices, and creating scalable, user-centric digital experiences.",
  tagline:
    "Software Developer with hands-on experience building cross-platform mobile applications, secure backend systems, and immersive XR experiences using Flutter, Java 21, Spring Boot, and Unity.",
  location: "Greater Noida, India",
  githubLocation: "noida",
  email: "vanshikanimwal2005@gmail.com",
  phone: "+91 7838989931",
  phoneHref: "tel:+917838989931",
  links: {
    github: "https://github.com/vanshikanimwal-dev",
    linkedin: "https://www.linkedin.com/in/vanshika-nimwal-90ab24314",
    linkedinResumeHandle: "vanshikanimwal",
    leetcode: "https://leetcode.com/u/vanni2005/",
    /** Follow badge on the GitHub profile README. Not verified as a second owned account beyond that badge. */
    githubBadge: "https://github.com/vanni2005",
  },
  github: {
    login: "vanshikanimwal-dev",
    name: "Vanshika Nimwal",
    bio: "Soon to be an engineer.",
    avatar: "https://avatars.githubusercontent.com/u/207143300?v=4",
    followers: 7,
    following: 2,
    publicRepos: 42,
    location: "noida",
    createdAt: "2025-04-11T06:11:18Z",
    htmlUrl: "https://github.com/vanshikanimwal-dev",
  },
  education: [
    {
      school: "Sharda University",
      credential: "Bachelor of Technology in Computer Science",
      location: "Greater Noida, India",
      display: "Aug 2023 – Present",
      start: "2023-08",
      end: null,
    },
  ],
  experience: [
    {
      role: "XR Developer Intern",
      org: "Riyalverse Technology Pvt Ltd",
      kind: "internship",
      display: "Oct 2025 – Mar 2026",
      start: "2025-10",
      end: "2026-03",
      points: [
        "Built immersive AR/VR applications using Unity and C#, using AR Foundation and Vuforia for augmented reality experiences.",
        "Implemented XR interactions and user controls using XR Interaction Toolkit, making virtual environments responsive and intuitive for users.",
        "Optimized 3D environments, lighting, and assets (modelled in Blender) for real-time performance, keeping scenes smooth on target devices.",
      ],
    },
    {
      role: "Software Developer Intern",
      org: "Alphaaid Healthcare Pvt Ltd",
      kind: "internship",
      display: "May 2025 – Oct 2025",
      start: "2025-05",
      end: "2025-10",
      points: [
        "Developed and maintained healthcare and mobile software applications used by real users, fixing issues and shipping updates.",
        "Designed modular backend and application components improving performance and scalability, making new features easier to add and test.",
        "Integrated REST APIs, Firebase services (Authentication, Firestore), and database systems across applications.",
      ],
    },
    {
      role: "Backend Developer",
      org: "Capital Bull Wave",
      kind: "employment",
      display: "TODO: dates not listed on resume",
      start: null,
      end: null,
      points: [
        "Built backend APIs for a gaming website: auth, SMS OTP, and player profiles, with 1 mobile number per account and rate limits (about 10 OTP sends per 15 minutes per device) so repeat login/OTP spam is blocked.",
        "Designed wallet and reward APIs so balances change only on the server. Concurrent clicks and retries use locking and one-time references, keeping duplicate credits at 0% when the same request is sent twice.",
        "Implemented game settlement and admin APIs (bets, live players, account stop/ban). Parallel actions are handled per player, and a single bet cannot exceed 10,000 credits, so two overlapping requests cannot spend the same balance.",
      ],
    },
    {
      role: "Freelance Flutter Developer",
      org: "Ferrero Rocher",
      kind: "freelance",
      display: "TODO: dates not listed on resume",
      start: null,
      end: null,
      points: [
        "Delivered an internal asset management mobile application in Flutter with real-time data synchronization between users and the backend.",
        "Integrated MySQL and Firebase backend services with Flutter frontend, keeping data consistent across the application.",
        "Managed full lifecycle development including architecture, testing, and deployment, from initial design through release.",
      ],
    },
  ] satisfies Experience[],
  resumeProjects: [
    {
      name: "CertiChain",
      stack: ["Java 21", "Spring Boot", "PostgreSQL", "Docker"],
      repo: "https://github.com/vanshikanimwal-dev/CertiChain",
      live: null,
      points: [
        "Built a credential platform where an institution issues 3 credential types (degree, transcript, bonafide) as signed PDFs, and a public page runs 6 separate checks: issuer record, Ed25519 signature, SHA-256 file hash, revocation, expiry, and chain anchor.",
        "Implemented 3 role-based views: an admin console, a student wallet that shows only credentials issued to that email with expiring share links, and a verifier desk for checking a credential ID.",
        "Anchored each certificate’s SHA-256 fingerprint on a persistent local blockchain (state survives restarts), with Sepolia support using the institution’s own RPC URL and signing key.",
      ],
    },
    {
      name: "PayFlow",
      stack: ["Java 21", "Spring Boot", "PostgreSQL", "Redis", "Flutter"],
      repo: "https://github.com/vanshikanimwal-dev/PayFlow",
      live: null,
      points: [
        "Built a wallet simulation with a double-entry ledger in integer paise so every transfer, 2% shop fee, 1% cashback line, and refund sums to zero and user balances cannot go negative.",
        "Prevented double payments and deadlocks with idempotency keys (verified under a 50-way replay), account locks in ascending id order (1,000 A-to-B and B-to-A transfers each way), and a top-up flow that calls the mock bank only after the database lock is released.",
        "Shipped a Flutter client for register, send, top-up, and history with a recipient check before money moves, backed by integration tests for 100 concurrent transfers, idempotent retries, refunds, and webhook recovery.",
      ],
    },
    {
      name: "AlgoVerse",
      stack: ["Java 21", "JavaFX", "HTML", "CSS", "JavaScript"],
      repo: "https://github.com/vanshikanimwal-dev/AlgoVerse",
      live: "https://vanshikanimwal-dev.github.io/AlgoVerse/",
      points: [
        "Built an interactive visualizer for 20 algorithms (12 sorting, 3 search, 5 pathfinding) plus linked lists and BSTs, with play/pause, step-through, and speed control.",
        "Added side-by-side sort comparison on the same array, highlighted pseudocode, and an info panel covering complexity and when to use each algorithm.",
        "Shipped a no-install browser demo (plain HTML, CSS, JS) on GitHub Pages plus a matching Java 21 + JavaFX desktop app, so the same animations run on the web and locally.",
      ],
    },
  ] satisfies ResumeProject[],
  certifications: [
    "Java Foundation and Advanced Certification – Oracle",
    "Android Studio: Complete Guide of Android App Development – Udemy",
    "Dart Mastery: Become a Dart Master From Zero to Hero – Udemy",
    "Flutter & Firebase Chat App: Master Flutter and Firebase – Udemy",
  ],
  achievements: [] as string[],
  hackathons: [] as string[],
  typewriter: [
    "Cyberpunk Developer",
    "Software Developer",
    "XR Developer",
    "Backend Developer",
    "Flutter Developer",
  ],
} as const;

/** Gaps left blank on purpose. Do not invent values for these. */
export const profileTodos = [
  "No portrait file was on the resume. The site uses the GitHub avatar.",
  "Capital Bull Wave has no start or end date on the resume.",
  "The Ferrero Rocher freelance role has no dates on the resume.",
  "The resume heading is Certification & Achievements, but only four certifications are listed. No separate achievements were found.",
  "No hackathon is named on the resume. Organ-Donation-System-frontend mentions an unnamed hackathon in the GitHub description.",
  "Years of professional experience are not stated. Dated internships run May 2025–Mar 2026, so a year-count is not shown.",
  "Availability (open to work) is not stated on the resume.",
  "Resume LinkedIn handle is “vanshikanimwal”. The GitHub profile README links https://www.linkedin.com/in/vanshika-nimwal-90ab24314. The site uses the full URL.",
  "The GitHub profile README also badges https://github.com/vanni2005 and LeetCode https://leetcode.com/u/vanni2005/. Those URLs are hers as published; ownership of vanni2005 beyond the badge was not verified.",
  "MongoDB appears as a badge on the GitHub profile README and was not found in the resume or in repository language stats, so it is not listed as a skill.",
  "React is on the profile README and in myportfolio / AV-GRAPHICS-ART, but not on the resume skill list. It is included because the repos use it.",
  "Most repositories have no screenshot in the README.",
  "Survey System and Password Generator READMEs do not say whether the GUI is JavaFX or Swing.",
  "Production site URL is not set. NEXT_PUBLIC_SITE_URL still defaults to localhost.",
  "Contact delivery needs RESEND_API_KEY before messages can send.",
] as const;
