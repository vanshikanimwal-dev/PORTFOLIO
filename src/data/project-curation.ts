import type { CurationEntry } from "./types";

/**
 * Hand-written descriptions from each repository README and, where the README
 * was missing, from files fetched with it (package.json, index.html, root listing).
 * `npm run sync:github` keeps these lines and refreshes stars, dates, and languages.
 */
export const curation: Record<string, CurationEntry> = {
  CertiChain: {
    category: "Backend",
    featured: true,
    rank: 1,
    stack: ["Java", "Spring Boot", "PostgreSQL", "Docker", "TypeScript", "Solidity", "MinIO"],
    description:
      "Issues a digital certificate and lets anyone check it from a public link. The certificate file stays off-chain, an SHA-256 fingerprint is what gets anchored, and the admin site talks to a Spring Boot API backed by PostgreSQL, MinIO, and either a local chain or Sepolia. The README states that records in the project are synthetic, not real academic credentials.",
  },
  PayFlow: {
    category: "Backend",
    featured: true,
    rank: 2,
    stack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Flutter", "Dart", "Docker"],
    description:
      "Wallet and payments simulation that never handles real card data or real money. Amounts are integer paise. The Spring Boot API covers auth, a ledger, transfers, locking, idempotency, a mock gateway, top-ups, merchant payments, refunds, and admin routes. The Flutter client in mobile/ covers register, login, the wallet, send, top-up, history, and merchant QR.",
  },
  AlgoVerse: {
    category: "Tools",
    featured: true,
    rank: 3,
    stack: ["Java", "JavaFX", "HTML", "CSS", "JavaScript"],
    description:
      "Learn sorting, searching, and pathfinding by watching them run in the browser or in JavaFX. The README describes animations for sorting, searching, pathfinding, side-by-side sort compare, linked lists, and binary search trees, with a GitHub Pages demo that needs no install. The same animations are available as a local Java desktop app.",
  },
  "FINAL-YEAR-PROJECT-": {
    category: "AI/ML",
    featured: true,
    rank: 4,
    stack: ["Python", "Streamlit"],
    description:
      "Holds PipelineIQ, a simulated study of machine-learning bottleneck detection in CI/CD pipelines plus a Streamlit dashboard. It builds 4,800 simulated runs and trains logistic regression, an RBF SVM, gradient boosting, and a random forest. A stage alert fires only when model probability and a duration rule both trip. The README says the runs are simulated because no public dataset linked developer behavior to bottleneck labels.",
  },
  SyncSound: {
    category: "Web",
    featured: true,
    rank: 5,
    stack: ["TypeScript", "Python", "FastAPI", "SQLite", "Vite"],
    description:
      "Coordinates one YouTube video across separate phones so each phone plays locally into headphones already paired with it. A host shares a room code, link, or QR code. Playback is a scheduled start plus drift correction, and audio never passes through the server. The current build is a Vite client and a single-process FastAPI server that stores rooms in memory and in SQLite.",
  },
  BULLPAY: {
    category: "Web",
    featured: true,
    rank: 6,
    stack: ["JavaScript", "Node.js", "SQLite"],
    description:
      "Self-hosted checkout for one Indian merchant. The customer pays in a normal UPI app and the rupees land in the merchant’s own UPI ID. BULLPAY does not hold a balance or call a bank or NPCI API. It marks a checkout paid only when a bank credit alert matches that open session. The README says it is experimental software and not an RBI-licensed payment product.",
  },
  PORTFOLIO: {
    category: "Web",
    stack: [],
    description:
      "Repository for this portfolio. At the last GitHub sync it contained an MIT license and a one-line README, with no site source pushed yet.",
  },
  "final-year-projecr": {
    category: "Learning",
    stack: [],
    description:
      "Empty GitHub repository. There is no README and the contents API reports no files, so there is no project to describe.",
  },
  "vanshikanimwal-dev": {
    category: "Learning",
    stack: [],
    description:
      "GitHub profile repository. GitHub’s description calls it config files for the profile. The README introduces Vanshika as an app, Java, web, and AR/VR developer and links the LinkedIn and LeetCode profiles used on this site.",
  },
  "AV-GRAPHICS-ART": {
    category: "Web",
    stack: ["React", "Express", "Node.js", "Vite", "Tailwind CSS", "JavaScript"],
    description:
      "React and Express site for AV Graphics Art. index.html describes LED boards, glow signs, and name plates in Delhi and names Anand Prakash Nimwal in the author meta tag. There is no README. This summary comes from package.json and that page metadata. The repository homepage is https://av-graphics-art.vercel.app.",
  },
  "leetcode-daily": {
    category: "Learning",
    stack: ["Java"],
    description:
      "Personal log of daily LeetCode practice. The README says solutions are written in Java and are meant to include the problem, the approach, and time and space complexity. Topics listed include arrays, recursion, lists, trees, graphs, dynamic programming, and greedy algorithms. It describes a goal of one problem a day.",
  },
  "review-property-app": {
    category: "Mobile",
    stack: ["Flutter", "Dart"],
    description:
      "Flutter repository whose README is still the default starter text from the Flutter template. No product features are documented. GitHub reports Dart together with the engine files that ship inside a Flutter project.",
  },
  "New-Repo": {
    category: "Learning",
    stack: [],
    description:
      "README only says changes were made in an app in order to earn a badge, and that this was done a second time. No application source is described.",
  },
  "Expense-tracker": {
    category: "Mobile",
    stack: ["Flutter", "Dart", "Firebase", "Riverpod"],
    description:
      "Flutter expense tracker. The README describes Clean Architecture, Firebase email and password auth, income and expense transactions, and a dashboard for spending analytics with cloud sync. Those features are what the README claims. This sync did not open every screen to re-verify them.",
  },
  "AR-Business-card": {
    category: "XR",
    stack: ["Unity", "C#", "AR Foundation", "Blender"],
    description:
      "Unity AR business card. A phone camera tracks a printed card and shows 3D content and buttons in that spot. The README specifies Unity 2022.3.6f2, AR Foundation, ARCore, C#, and Blender assets, and says the target is Android. GitHub reported no language bytes for the repo.",
  },
  "Resume-Builder": {
    category: "Tools",
    stack: [],
    description:
      "Repository titled Resume-Builder. The README is only that title, so no builder features are documented.",
  },
  "Unique-Gemini-Project-in-HTML": {
    category: "Web",
    stack: ["HTML"],
    description:
      "A single HTML file the README says to save as index.html and open in a browser. The notes describe finger tracking: the index finger moves a shape, a pinch scales it, two fingers switch the shape, and a fist triggers fireworks.",
  },
  "student-management-system": {
    category: "Learning",
    stack: ["Java"],
    description:
      "Console student manager in Java, framed as a data-structures exercise before adding a GUI. It can add a student, list students, search by id with linear search, and delete by id. Records sit in an ArrayList, with Student and StudentManager kept separate.",
  },
  ferrero: {
    category: "Mobile",
    stack: ["Flutter", "Dart"],
    description:
      "Flutter app for Ferrero field agents to track and audit assets at retail outlets. The README describes login that stores a bearer token, search by outlet name or UOC, and submissions that can include images and GPS. It is marked as an internal app for Android and iOS.",
  },
  "ferrero-version1.2": {
    category: "Mobile",
    stack: [],
    description:
      "Empty GitHub repository. There is no README and no files to describe.",
  },
  "ferrero-version1.1": {
    category: "Mobile",
    stack: [],
    description:
      "README contains only the line ferrero-version1.1. No features are documented.",
  },
  knovatortask: {
    category: "Mobile",
    stack: ["Flutter", "Dart"],
    description:
      "Flutter assessment app for a Knovator task. It lists posts from the JSONPlaceholder API using BLoC, stores them in Shared Preferences, and refreshes from the network while keeping each post’s read flag. Tapping a post marks it read and opens a detail screen.",
  },
  "knovator-task": {
    category: "Mobile",
    stack: [],
    description:
      "No README. The repository only contains .gitignore and LICENSE, so there is no app code to describe.",
  },
  "morphix-version-1.1": {
    category: "Mobile",
    stack: ["Flutter", "Dart"],
    description:
      "The GitHub description and the README both call this an all-in-one image editing app. The README does not list editing tools or screens. Dart is the primary language.",
  },
  "Weather-App": {
    category: "Mobile",
    stack: ["Flutter", "Dart"],
    description:
      "Flutter weather app. The README says the theme and background change with the current conditions, the app reads the device location, cities can be searched, and it shows hourly and 7-day forecasts. Weather data comes from OpenWeatherMap, with the API key left as a placeholder in lib/main.dart.",
  },
  "Morphix-App": {
    category: "Mobile",
    stack: [],
    description:
      "The GitHub description and the README both call this an all-in-one image editing app. No language bytes were reported, and the README does not list tools or screens.",
  },
  "calculator-app": {
    category: "Tools",
    stack: [],
    description:
      "No README. The repository only contains .gitignore and LICENSE, so there is no calculator implementation to describe.",
  },
  test: {
    category: "Mobile",
    stack: ["Flutter", "Dart"],
    description:
      "Flutter build of a Ferrero asset app. The README covers login, search by outlet name or UOC, filters for status and date range, and opening a consent-form PDF when an asset is completed. Other statuses navigate to a consent-form page.",
  },
  "new-version-ferrero-app-": {
    category: "Mobile",
    stack: ["Flutter", "Dart"],
    description:
      "Flutter project named ferrero_asset_management. The README is still the default Flutter starter text, so this copy does not document its own features.",
  },
  "app-version-new": {
    category: "Mobile",
    stack: ["Flutter", "Dart"],
    description:
      "Flutter prototype titled Ferrero Asset Management App. The README says field agents capture shop photos and location and run a digital consent and OTP flow with shop owners. It also mentions search and status filters such as Completed, In Progress, Pending, and Open.",
  },
  "asset-management-app": {
    category: "Mobile",
    stack: ["Flutter", "Dart"],
    description:
      "README is only the title asset-management-app. Dart is the main language GitHub reported. No feature list is written in the repository.",
  },
  "flutter-app": {
    category: "Mobile",
    stack: ["Flutter"],
    description:
      "Default Flutter starter README titled ferrero_asset_management. No custom features are documented, and GitHub reported no language bytes.",
  },
  App: {
    category: "Mobile",
    stack: [],
    description: "Empty GitHub repository. There is no README and no files to describe.",
  },
  "Data-Structure-And-Algorithms-": {
    category: "Learning",
    stack: ["Java"],
    description:
      "Notes repository for data-structures practice from LeetCode and GeeksforGeeks, grouped by topic. The README names Java as the language and lists an Arrays folder among others. It states a personal goal of three problems a day. That goal is not a measured result in the repo.",
  },
  "ferrero-asset-management-backup": {
    category: "Mobile",
    stack: ["Flutter"],
    description:
      "Default Flutter starter README for a project titled ferrero_asset_management. No custom features are documented.",
  },
  "ferrero-asset-management": {
    category: "Mobile",
    stack: ["Flutter"],
    description:
      "Default Flutter starter README for a project titled ferrero_asset_management. No custom features are documented.",
  },
  "survey-system-in-java": {
    category: "Tools",
    stack: ["Java"],
    description:
      "Java survey app with a graphical interface. The README says a user can create surveys, collect multiple-choice or open answers, view results, and save data locally. It does not say whether the GUI is JavaFX or Swing.",
  },
  "Password-Generator-": {
    category: "Tools",
    stack: ["Java"],
    description:
      "Java password generator with a graphical interface. The README says it can set a length, toggle uppercase, lowercase, numbers, and symbols, and copy the result. It does not say whether the GUI is JavaFX or Swing.",
  },
  "Snake-game-in-jav": {
    category: "Games",
    stack: ["Java", "Swing"],
    description:
      "Classic snake game built with Java and Swing. Arrow keys move the snake, food spawns at random, and the score is tracked until the snake hits a wall or itself. The README includes a restart after game over.",
  },
  "Vanshika-Nimwal-Introduction": {
    category: "Learning",
    stack: [],
    description:
      "Profile-style README. It introduces Vanshika as a Java developer interested in Unity games, Flutter, React, and Blender, and mentions LeetCode practice. No application code is described. GitHub’s short description repeats the same introduction.",
  },
  myportfolio: {
    category: "Web",
    stack: ["React", "TypeScript", "HTML", "CSS", "JavaScript"],
    description:
      "Earlier personal portfolio site. The README lists an about section, a tech-stack display, a project gallery, LeetCode and GitHub stats, a contact form, and dark mode. It names React with HTML, CSS, and JavaScript, and mentions Tailwind or Bootstrap and GSAP or Framer Motion without saying which pair is the one that shipped.",
  },
  "Organ-Donation-System-frontend": {
    category: "Web",
    stack: ["TypeScript", "HTML", "JavaScript"],
    description:
      "Frontend for an organ-donation system. The repository description says it was built on ICP for a hackathon, with some AI help. The README itself is the stock Lovable guide and links a Lovable project. Screens and ICP behavior are not documented in the README.",
  },
};
