export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
  { label: "Projects", href: "#projects" },
];

export const projects = [
  {
    title: "Sellixis",
    subtitle: "AI Sales Operating System",
    description:
      "AI-powered sales OS that talks, qualifies, and follows up with every lead — 24/7, across every channel. Zero missed leads, zero cold follow-ups.",
    image: "/images/project-1.png",
    link: "",
    details: [
      "Multi-channel AI agents deployed on website chat, WhatsApp, Instagram, and phone — handling unlimited concurrent conversations with auto voice calling for high-intent leads.",
      "BANT scoring, intent analysis, and sentiment detection identify high-value prospects automatically. Cross-channel memory ensures seamless continuity across touchpoints.",
      "0s response time, 3x more qualified leads reaching closers, 70% less manual follow-up through automated multi-channel workflows.",
    ],
    tech: ["Voice AI", "LLMs", "WhatsApp API", "BANT Scoring", "CRM Sync", "Twilio"],
    year: "2025",
  },
  {
    title: "CARA",
    subtitle: "AI Clinical Intake & Triage System",
    description:
      "Clinical intake pipeline using an ADK-style agent architecture to turn patient voice and documents into structured symptoms, triage decisions, and care-plan actions.",
    image: "/images/project-2.png",
    link: "",
    details: [
      "Built agents for voice intake, symptom reasoning, document OCR, triage, and care-plan generation with strict JSON contracts, retries, and full audit logging.",
      "Cut mock intake-to-plan time by 70% vs manual workflows while producing consistent summaries, instructions, and system actions.",
    ],
    tech: ["Python", "ADK Agents", "OCR", "LLMs", "JSON Contracts"],
    year: "2025",
  },
  {
    title: "Heisyn",
    subtitle: "Branding & Automation Agency Website",
    description:
      "Responsive agency site for heisyn.com showcasing branding and automation-driven services for SMBs.",
    image: "/images/project-3.png",
    link: "https://heisyn.com",
    details: [
      "Implemented lead capture, case studies, demo scheduling, and automated contact flows; synced form leads to CRM via serverless API and n8n/Zapier hooks.",
      "Included tracking, form validation, and automated campaign triggers for end-to-end marketing automation.",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "n8n", "Zapier", "Serverless"],
    year: "2025",
  },
  {
    title: "SourceSync",
    subtitle: "Multisource News Collector",
    description:
      "Browser extension + web app that pulls the same story from multiple outlets, merges key points, and generates a unified summary.",
    image: "/images/project-4.png",
    link: "",
    details: [
      "Added offline save (IndexedDB), page history, per-page personalized chatbot (RAG + embeddings), and a bias indicator highlighting political or ideological skew across sources.",
      "Built with Node.js, Next.js, PDFKit, and lightweight ML classifiers; designed to reduce tab-clutter and speed research for students, analysts, and developers.",
    ],
    tech: ["Node.js", "Next.js", "RAG", "Embeddings", "PDFKit", "IndexedDB"],
    year: "2025",
  },
];

export const otherProjects = [
  "Live Data Tracker",
  "Lead Scraper Tool",
  "Auto Workflow Maker",
];

export const skillTags = [
  "Python",
  "Node.js",
  "LLMs",
  "RAG Pipelines",
  "React",
  "Next.js",
  "Tailwind CSS",
  "FastAPI",
  "Docker",
  "n8n",
  "Zapier",
  "Prompt Engineering",
  "Workflow Orchestration",
  "REST APIs",
  "Twilio",
];

export const stats = [
  { value: 78, suffix: "%", label: "Leads Convert to First Responder" },
  { value: 70, suffix: "%", label: "Intake Time Cut (CARA)" },
  { value: 3, suffix: "x", label: "More Qualified Leads (Sellixis)" },
  { value: 24, suffix: "/7", label: "AI Agent Uptime" },
];

export const experiences = [
  {
    role: "Product Engineer Intern",
    company: "Concept2Action (C2A)",
    type: "Remote, USA \u2014 2026",
    description:
      "Building and shipping production-level products from concept to deployment, contributing directly to live systems. Collaborating with product, design, and engineering teams to implement features, improve system reliability, and maintain clean, scalable codebases across the full development lifecycle.",
    tags: ["Product Engineering", "Full-Stack"],
    label: "Current",
  },
  {
    role: "AI Automation Intern",
    company: "Pitch X",
    type: "Remote \u2014 2025",
    description:
      "Cut manual handoffs by 80% by building Vernika, a production voice-calling SaaS with Twilio + LLM-driven IVR. Engineered low-latency streaming speech pipelines (Whisper/Groq) with API orchestration, monitoring, and confidence scoring.",
    tags: ["Voice AI", "Twilio", "LLMs"],
    label: "Guide",
  },
];

export const education = {
  institution: "United University",
  location: "Prayagraj, UP",
  degree: "B.Tech, Computer Science and Engineering",
  year: "2024",
};

export const achievements = [
  "Won GenAI Hackathon 2025 \u2014 Secured 3rd Position",
  "Microsoft Certified: Azure AI Fundamentals (AI-900)",
  "Google Cloud Fundamentals: AI Automation Learning (Coursera)",
  "Internship Certification \u2014 AI Automation Intern at Pitch X",
];

export const socialLinks = [
  { label: "Twitter (X)", href: "https://x.com/Rootshreshth" },
  { label: "Linkedin", href: "https://www.linkedin.com/in/root4shreshth/" },
  { label: "GitHub", href: "https://github.com/root4shreshth" },
];

export const contactInfo = {
  phone: "+91 9335963562",
  email: "hype4shreshth@gmail.com",
  whatsapp: "https://Wa.me/+919335963562",
};
