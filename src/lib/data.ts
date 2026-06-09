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
      "Autonomous 24×7 AI Sales OS that automates end-to-end sales pipelines with near-zero human intervention, engaging leads instantly across WhatsApp, Instagram, and Facebook.",
    image: "/images/project-1.png",
    link: "",
    details: [
      "Designed an AI voice calling agent that auto-qualifies leads, handles objections, and books meetings and appointments directly into business calendars, reducing manual sales work by 80%.",
      "Architected a unified multichannel orchestration layer with LLMs, real-time speech pipelines, and CRM integrations, delivering full sales automation at 60% lower cost than competing solutions.",
    ],
    tech: ["Voice AI", "LLMs", "WhatsApp API", "CRM Sync", "Twilio", "Real-time Speech"],
    year: "2025 – Present",
  },
  {
    title: "Praetor",
    subtitle: "Autonomous AI Incident Commander",
    description:
      "Autonomous SRE / DevOps agent that investigates incidents, decides remediations via a trained policy, executes through a Backend Protocol, and escalates to code-level investigation when runtime ops are insufficient.",
    image: "/images/project-2.png",
    link: "",
    details: [
      "Built an autonomous agent with a typed 10-action vocabulary that investigates incidents, decides remediations, executes fixes, verifies recovery, and escalates to tier-2 code investigation when needed.",
      "Shipped the first OpenEnv-compatible environment for SRE / DevOps — simulator, curriculum, training pipeline, sim-to-real bridge, tier-2 code escalation, autonomous webhook ingestion, and post-mortem writer.",
      "Designed strict JSON action contracts, retries, and full audit logging across the agent loop for reproducible, observable, and production-safe autonomous remediation.",
    ],
    tech: ["Python", "Agentic AI", "JSON Contracts", "DevOps", "OpenEnv"],
    year: "2025",
  },
  {
    title: "SmartCap",
    subtitle: "AI Cervical Posture Predictor (IoT + Mobile App)",
    description:
      "IoT wearable integrating ESP32-C3, MPU-6050 IMU, and BLE that continuously tracks cervical posture and alerts the user through haptic vibration and a companion mobile app.",
    image: "/images/project-3.png",
    link: "",
    details: [
      "Built a wearable device with ESP32-C3, MPU-6050 IMU, and BLE for continuous cervical posture tracking with haptic vibration alerts and a companion mobile app.",
      "Trained a gradient boosting classifier on real-time IMU data to predict posture quality and forecast potential cervical health risks, including likely body issues and estimated onset timeline.",
      "Filed an Indian patent for the device and delivered the full product package including research documentation, system architecture, and an investor-ready pitch deck.",
    ],
    tech: ["ESP32-C3", "IoT", "BLE", "ML", "Mobile App", "Patent Filed"],
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
  "TypeScript",
  "Node.js",
  "LLMs",
  "Voice AI",
  "React",
  "Next.js",
  "Tailwind CSS",
  "FastAPI",
  "Docker",
  "Kubernetes",
  "Azure",
  "PostgreSQL",
  "Supabase",
  "Twilio",
  "Prompt Engineering",
  "REST APIs",
];

export const stats = [
  { value: 80, suffix: "%", label: "Manual Sales Work Reduced (Sellixis)" },
  { value: 60, suffix: "%", label: "Lower Cost vs Competitors (Sellixis)" },
  { value: 80, suffix: "%", label: "Manual Handoffs Cut (Vernika)" },
  { value: 24, suffix: "/7", label: "AI Agent Uptime" },
];

export const experiences = [
  {
    role: "Product Engineer",
    company: "Concept2Action (C2A)",
    type: "Remote, USA — 2026",
    description:
      "Designing and shipping production-grade AI products end-to-end, owning concept, architecture, implementation, and deployment for live systems. Built and scaled Sellixis, an AI Sales Operating System automating end-to-end sales across WhatsApp, Instagram, Facebook, and AI voice channels.",
    tags: ["Product Engineering", "AI Products", "Full-Stack"],
    label: "Current",
  },
  {
    role: "AI Automation Engineer Intern",
    company: "Pitch X",
    type: "Remote — 2025",
    description:
      "Cut manual handoffs by 80% by building Vernika, a production voice-calling SaaS with Twilio + LLM-driven IVR. Engineered low-latency streaming speech pipelines (Whisper/Groq) with API orchestration, monitoring, and confidence scoring.",
    tags: ["Voice AI", "Twilio", "LLMs"],
  },
];

export const education = {
  institution: "United University",
  location: "Prayagraj, UP",
  degree: "B.Tech, Computer Science and Engineering",
  year: "2024 – 2028",
};

export const achievements = [
  "Top 100 out of 70,000+ teams in a national-level hackathon",
  "Won GenAI Hackathon 2025",
  "Microsoft Certified: Azure AI Fundamentals (AI-900)",
  "Google Cloud Fundamentals: AI Automation Learning (Coursera)",
  "AI Automation Intern — Pitch X (2025)",
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
