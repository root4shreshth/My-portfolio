export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
  { label: "Projects", href: "#projects" },
];

export const projects = [
  {
    title: "Enterprise Operations Platform",
    subtitle: "Next.js + SAP Business One",
    description:
      "Four modules — KYC onboarding, PO automation, card reconciliation, inventory portal — on Next.js 14 and Supabase, wired to SAP via the Service Layer REST API.",
    image: "/images/project-1.png",
    link: "",
    details: [
      "Built four production modules covering KYC onboarding, purchase order automation, card reconciliation, and inventory portal on Next.js 14 and Supabase, integrated with SAP via the Service Layer REST API.",
      "Agentic pipeline extracts contracts from procurement email, auto-fills forms, and runs compliance checks behind dual approval gates.",
    ],
    tech: ["Next.js", "Supabase", "SAP B1", "Agentic AI", "REST API", "TypeScript"],
    year: "2025 – Present",
  },
  {
    title: "SmartCap",
    subtitle: "AI Cervical Posture Predictor (IoT + Mobile)",
    description:
      "ESP32-C3 wearable with IMU and BLE that flags poor cervical posture via haptic alerts and a paired mobile app. Granted an Indian patent and published.",
    image: "/images/project-3.png",
    link: "",
    details: [
      "Built an IoT wearable with ESP32-C3, MPU-6050 IMU, and BLE for continuous cervical posture tracking with haptic vibration alerts and a companion mobile app.",
      "Gradient boosting model scores posture from live IMU data and projects a risk onset horizon; granted an Indian patent and published.",
    ],
    tech: ["ESP32-C3", "IoT", "BLE", "ML", "Mobile App", "Patent Granted"],
    year: "2026",
  },
  {
    title: "Sellixis",
    subtitle: "AI Sales Automation System",
    description:
      "24×7 agent that works leads across WhatsApp, Instagram, and Facebook; voice agent qualifies, handles objections, and books meetings.",
    image: "/images/project-2.png",
    link: "",
    details: [
      "Built a 24×7 autonomous agent that works leads across WhatsApp, Instagram, and Facebook the moment they enter the funnel.",
      "Voice agent auto-qualifies leads, handles objections, and books meetings. Cut manual sales work by 80% and runs at 60% lower cost than comparable tools.",
    ],
    tech: ["Voice AI", "LLMs", "WhatsApp API", "CRM Sync", "Twilio"],
    year: "2026",
  },
  {
    title: "Praetor",
    subtitle: "Autonomous AI Incident Commander",
    description:
      "Autonomous SRE agent that triages incidents with a typed 10-action vocabulary and picks remediations from a trained policy.",
    image: "/images/project-4.png",
    link: "",
    details: [
      "Built an autonomous SRE agent that triages incidents with a typed 10-action vocabulary and picks remediations from a trained policy.",
      "First OpenEnv-compatible DevOps environment: simulator, curriculum, training pipeline, and sim-to-real bridge.",
    ],
    tech: ["Python", "Agentic AI", "DevOps", "OpenEnv"],
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
  "Agentic AI",
  "React",
  "Next.js",
  "FastAPI",
  "SAP B1",
  "Docker",
  "Kubernetes",
  "Azure",
  "PostgreSQL",
  "Supabase",
  "Twilio",
  "REST APIs",
];

export const stats = [
  { value: 80, suffix: "%", label: "Manual Sales Work Reduced (Sellixis)" },
  { value: 60, suffix: "%", label: "Lower Cost vs Competitors (Sellixis)" },
  { value: 4, suffix: "", label: "Production Modules (SAP Platform)" },
  { value: 24, suffix: "/7", label: "AI Agent Uptime" },
];

export const experiences = [
  {
    role: "AI Generalist",
    company: "Alamir Groups (Food Industry)",
    type: "Remote, UAE — 2025",
    description:
      "Built an automation layer over the company’s SAP Business One ERP covering purchase orders, KYC onboarding, inventory, and bank reconciliation.",
    tags: ["SAP B1", "Workflow Automation", "ERP"],
    label: "Current",
  },
  {
    role: "AI Engineer Intern",
    company: "Concept2Action (C2A)",
    type: "Remote, USA — 2026",
    description:
      "Took Sellixis from architecture to production launch across WhatsApp, Instagram, Facebook, and voice. Shipped LLM features with the product team and added logging and monitoring for predictable releases.",
    tags: ["AI Engineering", "LLMs", "Full-Stack"],
  },
];

export const education = {
  institution: "United University",
  location: "Prayagraj, UP",
  degree: "B.Tech, Computer Science and Engineering",
  year: "2024 – 2028",
};

export const achievements = [
  "Winner — Hack for Impact, Australia–India Hackathon (2025) and GenAI Hackathon 2025",
  "Top 100 out of 70,000+ teams in a national-level hackathon",
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
