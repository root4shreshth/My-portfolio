import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, Inter } from "next/font/google";
import { Afacad_Flux } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const afacadFlux = Afacad_Flux({
  variable: "--font-afacad-flux",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hype4shreshth.framer.website"),
  title: "Shreshth Srivastava | AI Product Engineer",
  description:
    "AI Product Engineer shipping production-grade AI products powered by LLMs, agentic systems, and real-time voice pipelines. Full 0-to-1 lifecycle across product design, backend engineering, AI integration, and deployment.",
  keywords: [
    "AI Product Engineer",
    "LLMs",
    "Agentic Systems",
    "Voice AI",
    "Product Engineer",
    "Shreshth Srivastava",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Shreshth Srivastava" }],
  openGraph: {
    title: "Shreshth Srivastava | AI Product Engineer",
    description:
      "AI Product Engineer shipping production-grade AI products powered by LLMs, agentic systems, and real-time voice pipelines.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreshth Srivastava | AI Product Engineer",
    description:
      "AI Product Engineer shipping production-grade AI products powered by LLMs, agentic systems, and real-time voice pipelines.",
    images: ["/images/og-image.png"],
    creator: "@Rootshreshth",
  },
  icons: {
    icon: "/images/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shreshth Srivastava",
  jobTitle: "AI Product Engineer",
  url: "https://hype4shreshth.framer.website",
  sameAs: [
    "https://x.com/Rootshreshth",
    "https://www.linkedin.com/in/root4shreshth/",
    "https://github.com/root4shreshth",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Agentic Systems",
    "Voice AI",
    "LLMs",
    "Product Engineering",
    "React",
    "Next.js",
    "Python",
    "TypeScript",
    "Docker",
    "Kubernetes",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "United University",
  },
  description:
    "AI Product Engineer shipping production-grade AI products powered by LLMs, agentic systems, and real-time voice pipelines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${afacadFlux.variable} ${instrumentSerif.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background antialiased">
        {/* Skip Navigation for accessibility */}
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
