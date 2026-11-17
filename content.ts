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

export const projects = [
  {
    name: "HostelOS",
    sub: "Multi-Tenant Hostel Operations Platform",
    viz: "rooms",
    when: "Apr 2026",
    stack: ["TypeScript", "Next.js 14", "React 18", "Supabase", "Tailwind", "Vercel"],
    stats: [{ v: "<1s", l: "page loads" }, { v: "RLS", l: "row-level security" }],
    pts: [
      "Built an end-to-end SaaS for managing members, rooms, billing, payments, and maintenance across multiple hostels on a row-level-secured Postgres schema, deployed to Vercel Mumbai with subsecond page loads.",
      "Integrated automated email and WhatsApp payment reminders, monthly invoice generation, and overdue tracking via scheduled cron jobs.",
    ],
  },
  {
    name: "MetroNear",
    sub: "Indian Metro Journey Planner",
    viz: "metro",
    when: "Dec 2025",
    stack: ["TypeScript", "React", "Vite", "Node.js", "MapLibre GL", "Google Maps API", "OpenStreetMap"],
    stats: [{ v: "12", l: "metro cities" }, { v: "751", l: "stations" }],
    pts: [
      "Built a journey planner spanning 12 Indian metro cities (751 stations) that composes walk, auto, and metro legs into a single optimal route using a TypeScript A* engine over a multi-modal graph.",
      "Integrated real-time Google Directions data for traffic-aware last-mile estimates and visualized live routes on an interactive MapLibre map with animated metro line flows.",
    ],
  },
  {
    name: "Real-Time Hand Gesture Acquisition and Processing",
    sub: "ASL alphabet recognition with MediaPipe Hands",
    viz: "hand",
    when: "Nov 2025",
    stack: ["Python", "MediaPipe", "OpenCV", "NumPy", "Pandas", "scikit-learn", "TensorFlow/Keras"],
    stats: [{ v: "~95%", l: "accuracy" }, { v: "21", l: "hand landmarks" }],
    pts: [
      "Developed a real-time ASL alphabet recognition system using MediaPipe Hands (21-point landmark extraction) from live webcam input.",
      "Trained an ML-based classifier on normalized hand landmark features, achieving ~95% accuracy under varying lighting and background conditions.",
    ],
  },
];

export const skills = [
  { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java"] },
  { label: "Frameworks", items: ["React", "Next.js", "FastAPI", "TensorFlow", "PyTorch", "OpenCV", "MediaPipe"] },
  { label: "Databases and Tools", items: ["PostgreSQL", "Supabase", "Git", "Vercel", "Render"] },
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
      { k: "Latest build", v: `${projects[0].name}, ${projects[0].sub}`, d: projects[0].when },
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
  { v: String(projects.length), l: "projects" },
  { v: String(certs.items.length), l: "certifications" },
  { v: "1", l: "AI internship" },
];

export const clock = { city: "Bengaluru", tz: "IST", zone: "Asia/Kolkata" };

export const viz = {
  rooms: { tag: "dashboard", side: ["members", "rooms", "billing", "payments", "maintenance"], due: "overdue" },
  metro: { tag: "route · A*", legs: ["walk", "metro", "auto"] },
  hand: { tag: "landmarks · 21", box: "hand" },
};

const mail = "reddykalyan0624@gmail.com";

export const contact = {
  big: "Let's talk",
  line: "Reach me by email, or find my code on GitHub.",
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
