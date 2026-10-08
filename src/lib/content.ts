export const profile = {
  name: "Shreshth Srivastava",
  first: "Shreshth",
  last: "Srivastava",
  role: "AI Engineer",
  lede: "Takes systems from prototype to production.",
  summary:
    "AI Engineer who takes systems from prototype to production: backend architecture, LLM and agent design, deployment, and the monitoring that keeps them running. Experienced across enterprise workflow automation, real-time voice AI, and autonomous agents, with work live in production for international clients.",
  location: "IN",
  timezone: "UTC+05:30",
  availability: "Open to full-time & contract roles",
  resume: "/Shreshth-Srivastava-Resume.pdf",
};

export const contact = {
  email: "hype4shreshth@gmail.com",
  phone: "+91 9335963562",
  whatsapp: "https://wa.me/919335963562",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/root4shreshth/" },
    { label: "GitHub", href: "https://github.com/root4shreshth" },
    { label: "X / Twitter", href: "https://x.com/Rootshreshth" },
  ],
};

export const sections = [
  { id: "top", index: "01", label: "Sensor" },
  { id: "identity", index: "02", label: "Identity" },
  { id: "work", index: "03", label: "Work" },
  { id: "system", index: "04", label: "System" },
  { id: "lab", index: "05", label: "Lab" },
  { id: "journey", index: "06", label: "Journey" },
  { id: "contact", index: "07", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const pipeline = [
  { step: "01", title: "Backend architecture", note: "APIs, data models, integrations" },
  { step: "02", title: "LLM & agent design", note: "Agents, voice, orchestration" },
  { step: "03", title: "Deployment", note: "Containers, infra, release" },
  { step: "04", title: "Monitoring", note: "Logging, observability, uptime" },
];

export const facts = [
  { value: "01", label: "Indian patent granted", detail: "SmartCap" },
  { value: "02", label: "Hackathons won", detail: "Hack for Impact · GenAI 2025" },
  { value: "100", label: "Top teams of 70,000+", detail: "National-level hackathon" },
  { value: "02", label: "International clients live", detail: "UAE · USA" },
];

export type Plate = "enterprise" | "smartcap" | "praetor" | "screenshot";

export interface Work {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  year: string;
  status: string;
  context: string;
  stack: string[];
  summary: string;
  plate: Plate;
  image?: string;
  caseStudy: { label: string; body: string }[];
  links?: { label: string; href: string }[];
}

export const work: Work[] = [
  {
    id: "enterprise",
    index: "W/01",
    title: "Enterprise Operations Platform",
    subtitle: "Next.js + SAP Business One",
    year: "2025 — Present",
    status: "Live",
    context: "Alamir Groups · Food industry · UAE",
    stack: ["Next.js 14", "Supabase", "SAP Service Layer", "Agentic AI", "TypeScript"],
    summary:
      "Four production modules — KYC onboarding, PO automation, card reconciliation, inventory portal — wired to SAP Business One through the Service Layer REST API.",
    plate: "enterprise",
    caseStudy: [
      {
        label: "Context",
        body: "A food-industry company running its operations on SAP Business One ERP, with purchase orders, KYC onboarding, inventory and bank reconciliation to automate.",
      },
      {
        label: "Role",
        body: "AI Generalist — built the automation layer over the ERP end to end.",
      },
      {
        label: "System",
        body: "Four modules on Next.js 14 and Supabase, integrated with SAP through the Service Layer REST API.",
      },
      {
        label: "Decisions",
        body: "An agentic pipeline extracts contracts from procurement email and auto-fills forms, but every action runs compliance checks behind dual approval gates — automation with a human in the loop.",
      },
    ],
  },
  {
    id: "sellixis",
    index: "W/02",
    title: "Sellixis",
    subtitle: "AI sales automation system",
    year: "2026",
    status: "Live video",
    context: "Concept2Action (C2A) · USA",
    stack: ["Voice agents", "LLMs", "WhatsApp", "Instagram", "Facebook", "Twilio"],
    summary:
      "A 24×7 agent that works leads across WhatsApp, Instagram and Facebook; a voice agent qualifies, handles objections and books meetings.",
    plate: "screenshot",
    image: "/images/project-1.png",
    caseStudy: [
      {
        label: "Role",
        body: "AI Engineer Intern — took Sellixis from architecture to production launch across WhatsApp, Instagram, Facebook and voice.",
      },
      {
        label: "System",
        body: "Multichannel messaging agents plus a voice agent that qualifies leads, handles objections and books meetings.",
      },
      {
        label: "Decisions",
        body: "Shipped LLM features with the product team and added logging and monitoring so releases stayed predictable.",
      },
      {
        label: "Result",
        body: "Cut manual sales work by 80% and runs at 60% lower cost than comparable tools.",
      },
    ],
  },
  {
    id: "smartcap",
    index: "W/03",
    title: "SmartCap",
    subtitle: "AI cervical posture predictor",
    year: "2026",
    status: "Patent granted",
    context: "IoT wearable + mobile app",
    stack: ["ESP32-C3", "IMU", "BLE", "Gradient boosting", "Mobile"],
    summary:
      "An ESP32-C3 wearable with IMU and BLE that flags poor cervical posture through haptic alerts and a paired mobile app.",
    plate: "smartcap",
    caseStudy: [
      {
        label: "System",
        body: "ESP32-C3 wearable reads live IMU data and streams over BLE to a paired mobile app; haptic alerts fire on poor posture.",
      },
      {
        label: "Model",
        body: "A gradient boosting model scores posture from live IMU data and projects a risk-onset horizon.",
      },
      {
        label: "Result",
        body: "Granted an Indian patent and published.",
      },
    ],
  },
  {
    id: "praetor",
    index: "W/04",
    title: "Praetor",
    subtitle: "Autonomous AI incident commander",
    year: "2025",
    status: "Live demo",
    context: "SRE / DevOps agent",
    stack: ["Python", "Agentic AI", "Policy learning", "OpenEnv"],
    summary:
      "An autonomous SRE agent that triages incidents with a typed 10-action vocabulary and picks remediations from a trained policy.",
    plate: "praetor",
    caseStudy: [
      {
        label: "System",
        body: "Incidents are triaged through a typed 10-action vocabulary; remediations are chosen by a trained policy.",
      },
      {
        label: "Environment",
        body: "The first OpenEnv-compatible DevOps environment: simulator, curriculum, training pipeline and sim-to-real bridge.",
      },
    ],
    links: [{ label: "GitHub", href: "https://github.com/root4shreshth" }],
  },
];

export const capabilities = [
  {
    id: "core",
    label: "Core AI & Backend",
    items: ["Python", "FastAPI", "PostgreSQL", "REST APIs", "Webhooks", "Docker", "Kubernetes", "Azure"],
  },
  {
    id: "voice",
    label: "AI & Voice",
    items: ["LLMs", "Agentic AI", "Prompt engineering", "Real-time speech", "Voice agents", "Whisper", "Groq", "Twilio"],
  },
  {
    id: "erp",
    label: "Enterprise & ERP",
    items: ["SAP Business One", "SAP Service Layer API", "Workflow automation", "OAuth integrations"],
  },
  {
    id: "web",
    label: "Web & Tooling",
    items: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "Supabase", "Git", "CI/CD", "PM2", "Cloudflare Tunnel"],
  },
];

export interface ArchiveEntry {
  id: string;
  name: string;
  year: string;
  type: string;
  status: string;
  note: string;
  image?: string;
  href?: string;
}

export const archive: ArchiveEntry[] = [
  {
    id: "A-01",
    name: "Vernika",
    year: "2025",
    type: "Voice SaaS · Pitch X",
    status: "Shipped",
    note: "Production voice-calling SaaS with Twilio and LLM-driven IVR for lead qualification and routing. Cut manual handoffs by 80%; streaming speech pipelines on Whisper / Groq.",
  },
  {
    id: "A-02",
    name: "CARA",
    year: "2025",
    type: "Clinical intake agents",
    status: "Prototype",
    note: "ADK-style agents for voice intake, symptom reasoning, document OCR, triage and care plans, with strict JSON contracts and audit logging. Cut mock intake-to-plan time by 70%.",
    image: "/images/project-2.png",
  },
  {
    id: "A-03",
    name: "PaySense AI",
    year: "2025",
    type: "Voice-first fintech",
    status: "Hackathon",
    note: "Voice-first cash-flow intelligence for merchants in Hindi and English: Prophet-based forecasts, WhatsApp nudges and a transparent cash-flow score, shipped as a PWA.",
    image: "/images/project-3.png",
  },
  {
    id: "A-04",
    name: "Heisyn",
    year: "2025",
    type: "Agency site + automation",
    status: "Live",
    note: "Branding & automation agency site with lead capture, demo scheduling and form leads synced to CRM through serverless APIs and n8n / Zapier hooks.",
    image: "/images/project-4.png",
    href: "https://heisyn.com",
  },
  {
    id: "A-05",
    name: "Live Data Tracker",
    year: "—",
    type: "Tool",
    status: "Built",
    note: "Real-time data tracking tool.",
  },
  {
    id: "A-06",
    name: "Lead Scraper Tool",
    year: "—",
    type: "Tool",
    status: "Built",
    note: "Lead collection and scraping utility.",
  },
  {
    id: "A-07",
    name: "Auto Workflow Maker",
    year: "—",
    type: "Tool",
    status: "Built",
    note: "Generates automation workflows.",
  },
  {
    id: "OBJ-01",
    name: "Optical tracker",
    year: "2026",
    type: "WebGL · R3F",
    status: "Running",
    note: "The eye on this page: a GLB model on React Three Fiber that tracks your cursor, docks to layout anchors as you scroll, and falls back to SVG on low-power devices.",
  },
];

export const journey = [
  { year: "2024", title: "B.Tech, Computer Science", org: "United University, Prayagraj", note: "2024 — 2028" },
  { year: "2025", title: "AI Automation Intern", org: "Pitch X · Remote", note: "Built Vernika, voice-calling SaaS" },
  { year: "2025", title: "Hackathon winner ×2", org: "Hack for Impact (Australia–India) · GenAI Hackathon", note: "Plus Top 100 of 70,000+ teams" },
  { year: "2025", title: "AI Generalist", org: "Alamir Groups · Remote, UAE", note: "SAP Business One automation layer", current: true },
  { year: "2026", title: "AI Engineer Intern", org: "Concept2Action · Remote, USA", note: "Sellixis to production launch" },
  { year: "2026", title: "Patent granted", org: "SmartCap · India", note: "Granted and published" },
];
