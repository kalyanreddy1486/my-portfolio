export const site = {
  name: "Kambala Kalyan Reddy",
  short: "Kalyan Reddy",
  word: "PORTFOLIO",
  greet: "hi, i'm Kalyan",
  role: "B.Tech in Artificial Intelligence and Machine Learning",
  where: "Jain (Deemed-to-be University) · Bengaluru, India",
  title: "Kambala Kalyan Reddy · Portfolio",
  desc: "B.Tech student in Artificial Intelligence and Machine Learning at Jain (Deemed-to-be University), Bengaluru. Projects in real-time computer vision, multi-modal journey planning and multi-tenant SaaS.",
  cta: { work: "See the work" },
};

export const nav = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "record", label: "Record" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const heads = {
  work: { no: "01", label: "Work", title: "Things I've built" },
  stack: { no: "02", label: "Stack", title: "Tools I reach for" },
  record: { no: "03", label: "Record", title: "Track record" },
  about: { no: "04", label: "About", title: "About me" },
  contact: { no: "05", label: "Contact" },
};

export const exp = {
  label: "Experience",
  role: "AI Intern",
  org: "Viswam AI",
  when: "Summer 2025",
  pts: [
    "Curated multilingual corpora for LLM training pipelines, contributing across the model lifecycle from dataset preparation through fine-tuning and evaluation.",
    "Contributed to Lingulink, an LLM-based multilingual communication project, supporting model evaluation and quality benchmarking workflows.",
  ],
};

const gh = "https://github.com/kalyanreddy1486";

type Proj = {
  name: string;
  sub: string;
  viz: string;
  shot?: string;
  shotAlt?: string;
  when: string;
  stack: string[];
  stats: { v: string; l: string }[];
  story: { problem: string; built: string; result: string };
  links: { live?: string; code?: string };
};

export const projects: Proj[] = [
  {
    name: "HostelOS",
    sub: "Multi-tenant hostel operations platform",
    viz: "rooms",
    shot: "/shots/hostelos.webp",
    shotAlt: "HostelOS sign-in screen with its feature list: live revenue pulse, billing on autopilot, secure by default",
    when: "Apr 2026",
    stack: ["Next.js 14", "TypeScript", "Supabase", "Tailwind", "Sentry", "Vercel"],
    stats: [{ v: "<1s", l: "page loads" }, { v: "RLS", l: "row-level security" }],
    story: {
      problem: "Indian PG and hostel managers running 100 to 1,000 residents per property juggle spreadsheets and WhatsApp threads.",
      built: "A multi-tenant SaaS for members, rooms, billing, payments and maintenance on a row-level-secured Postgres schema, with automated email and WhatsApp reminders carrying one-tap UPI links, monthly invoices and overdue tracking on cron jobs.",
      result: "Live in production on Vercel Mumbai with subsecond page loads.",
    },
    links: { live: "https://hostel-os-zeta.vercel.app", code: `${gh}/Hostel-OS` },
  },
  {
    name: "Sign-Bridge ASL",
    sub: "Two-way American Sign Language translator",
    viz: "hand",
    when: "Nov 2025",
    stack: ["Python", "MediaPipe", "TensorFlow/Keras", "Flask", "Socket.IO", "React"],
    stats: [{ v: "~95%", l: "accuracy" }, { v: "21", l: "hand landmarks" }],
    story: {
      problem: "Most open-source ASL tools only go one way: live detection or a static dictionary.",
      built: "Webcam frames stream over Socket.IO to a Flask server running MediaPipe Hands and a Keras classifier for A to Z, and a stability window turns held letters into sentences. A second mode plays typed text back as letter-by-letter sign clips.",
      result: "~95% accuracy on normalized hand-landmark features under varying lighting and backgrounds.",
    },
    links: { code: `${gh}/Sign-Bridge_asl` },
  },
  {
    name: "MetroNear",
    sub: "Indian metro journey planner",
    viz: "metro",
    when: "Dec 2025",
    stack: ["TypeScript", "React", "Vite", "Node.js", "MapLibre GL", "Google Maps API"],
    stats: [{ v: "12", l: "metro cities" }, { v: "751", l: "stations" }],
    story: {
      problem: "Crossing an Indian city means stitching walking, autos and metro lines together by hand.",
      built: "A TypeScript A* engine over a multi-modal graph composes walk, auto and metro legs into one optimal route, with real-time Google Directions data for traffic-aware last-mile estimates on an interactive MapLibre map.",
      result: "One planner across 12 Indian metro cities and 751 stations, with animated metro line flows.",
    },
    links: {},
  },
  {
    name: "Real-Time Streaming Analytics",
    sub: "Smart-meter anomaly detection pipeline",
    viz: "stream",
    when: "Nov 2026",
    stack: ["Python", "Apache Kafka", "scikit-learn", "MySQL", "Streamlit", "Plotly", "Pytest"],
    stats: [{ v: "6", l: "pipeline layers" }, { v: "2s", l: "dashboard refresh" }],
    story: {
      problem: "Abnormal power spikes in smart-meter data need catching as readings arrive, not after the fact.",
      built: "A Kafka producer streams UCI household readings at five per second into a Python processor that keeps sliding-window metrics, scores every reading with an Isolation Forest, writes to MySQL and feeds a live Streamlit and Plotly dashboard.",
      result: "Six layers from source to dashboard, covered by unit and end-to-end Pytest suites.",
    },
    links: { code: `${gh}/Data-Streaming-Analysis` },
  },
];

export const more = {
  label: "More on GitHub",
  all: { label: "All repositories", href: `${gh}?tab=repositories` },
  items: [
    { name: "API Rate Limit Tracker", what: "Dashboard and Chrome extension that tracks API usage, alerts at 70% and 90%, and stores keys AES-256 encrypted.", stack: "Node.js · PostgreSQL · Prisma", year: "2026", href: `${gh}/API-Rate-Limit-Tracker` },
    { name: "AI Resume Analyzer", what: "Scores a résumé 0 to 100 against a target role, lists missing skills and builds a week-by-week learning roadmap.", stack: "Python · Streamlit · PyPDF2", year: "2026", href: `${gh}/Ai-resume-analyzer` },
    { name: "Customer Churn Prediction", what: "End-to-end ML pipeline with feature engineering, a gradient-boosted classifier and a dashboard.", stack: "Python · scikit-learn · TypeScript", year: "2026", href: `${gh}/Customer-churn-prediction` },
    { name: "Revenue Pulse", what: "Sales analysis and revenue prediction pipeline with a Next.js dashboard and a Tableau-ready export.", stack: "Python · Next.js · Recharts", year: "2026", href: `${gh}/Revenue-Pulse` },
    { name: "CodeBuddy AI", what: "Explains code line by line with the Gemini API.", stack: "React · Express · Gemini", year: "2026", href: `${gh}/CodeBuddy-AI` },
    { name: "Indian Stock Trading Bot", what: "Intraday and long-term NSE signals from RSI, VWAP, EMA crossovers and MACD.", stack: "TypeScript", year: "2025", href: `${gh}/indian-stock-trading-bot` },
  ],
};

export const story = { problem: "Problem", built: "Built", result: "Result", live: "Live site", code: "Code" };

export const skills = [
  { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java"] },
  { label: "Frameworks", items: ["React", "Next.js", "FastAPI", "Flask", "TensorFlow", "PyTorch", "OpenCV", "MediaPipe", "Streamlit"] },
  { label: "Databases and Tools", items: ["PostgreSQL", "MySQL", "Supabase", "Apache Kafka", "Git", "Vercel", "Render"] },
  { label: "Data Visualization", items: ["Matplotlib", "Seaborn"] },
];

export const edu = {
  label: "Education",
  items: [
    { school: "Jain (Deemed-to-be University)", what: "B.Tech in Artificial Intelligence and Machine Learning", score: "CGPA 9.00", when: "July 2023 – July 2027", city: "Bengaluru, India" },
    { school: "Srikara Junior College", what: "Intermediate", score: "83.4%", when: "June 2021 – June 2023", city: "Hyderabad, India" },
    { school: "Ravindra Bharathi High School", what: "", score: "10/10 points", when: "April 2021", city: "Hyderabad, India" },
  ],
};

export const certs = {
  label: "Certifications",
  items: [
    { name: "Java", by: "E & ICT Academy, IIT Kanpur" },
    { name: "Dynamic Programming, Greedy Algorithms", by: "Coursera" },
    { name: "Introduction to DevOps", by: "IBM · Coursera" },
    { name: "Generative AI", by: "University of Glasgow" },
    { name: "Deep Learning, Machine Learning", by: "Coursera" },
  ],
};

export const about = {
  paras: [
    "I work on both sides of applied AI: the data and models, and the software that puts them in front of people.",
    "At Viswam AI I curated multilingual corpora for LLM training and supported fine-tuning, evaluation and quality benchmarking. In my own projects I've trained a hand-landmark classifier in Python with scikit-learn and TensorFlow, and shipped full-stack apps in TypeScript with Next.js, React, Supabase and Vercel.",
  ],
  now: {
    label: "Now",
    rows: [
      { k: "Studying", v: "B.Tech in Artificial Intelligence and Machine Learning", d: "July 2023 – July 2027" },
      { k: "Based in", v: "Bengaluru, India", d: "" },
      { k: "Last role", v: "AI Intern, Viswam AI", d: "Summer 2025" },
      { k: "Latest build", v: `${projects[3].name}, ${projects[3].sub.toLowerCase()}`, d: projects[3].when },
      { k: "Live in production", v: `${projects[0].name}`, d: projects[0].links.live?.replace("https://", "") ?? "" },
    ],
  },
};

export const hero = {
  tag: "AI & ML · B.Tech 2023–2027 · Bengaluru",
  hint: "move your cursor · you are the light",
  scroll: "Scroll",
};

export const manifesto = [
  { t: "I turn machine learning into products people can use: models that read" },
  { t: "hand signs in real time,", hl: true },
  { t: "a planner that routes across" },
  { t: "12 Indian metro networks,", hl: true },
  { t: "and software that runs" },
  { t: "hostels end to end.", hl: true },
];

export const numbers = [
  { v: "9.00", l: "CGPA" },
  { v: String(projects.length + more.items.length), l: "projects" },
  { v: String(certs.items.length), l: "certifications" },
  { v: "1", l: "AI internship" },
];

export const clock = { city: "Bengaluru", tz: "IST", zone: "Asia/Kolkata" };

export const viz = {
  rooms: { tag: "dashboard", side: ["members", "rooms", "billing", "payments", "maintenance"], due: "overdue" },
  metro: { tag: "route · A*", legs: ["walk", "metro", "auto"] },
  hand: { tag: "landmarks · 21", box: "hand" },
  stream: { tag: "pipeline · 6 layers", nodes: ["meter", "kafka", "window", "forest", "mysql", "dash"], spike: "anomaly" },
};

const mail = "reddykalyan0624@gmail.com";

export const contact = {
  big: "Let's talk",
  line: "Open to AI/ML and full-stack internships. Reach me by email, or find my code on GitHub.",
  links: [
    { k: "mail", label: "Email", value: mail, href: `mailto:${mail}` },
    { k: "github", label: "GitHub", value: "github.com/kalyanreddy1486", href: "https://github.com/kalyanreddy1486" },
    { k: "linkedin", label: "LinkedIn", value: "linkedin.com/in/kalyan-reddy-kambala-9942092a4", href: "https://www.linkedin.com/in/kalyan-reddy-kambala-9942092a4" },
  ],
  top: "Back to top",
  copy: "Copy email",
  copied: "Copied",
  email: mail,
};

export const agents = {
  names: [
    "Scout", "Layout", "Typeset", "Motion", "QA", "Deploy", "Copy", "Lint", "Index", "Render", "Palette", "Review",
    "Grid", "Kern", "Spacing", "Contrast", "Cache", "Bundle", "Audit", "Format", "Trace", "Test", "Ship", "Polish",
  ],
  boot: "booting agents",
  ready: "online",
};

export const dock = {
  pause: "Pause",
  resume: "Resume",
  on: "Agents on",
  off: "Agents off",
  tour: "Tour",
  stop: "Stop",
  label: "Build controls",
};
