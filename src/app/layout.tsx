import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const description =
  "AI Engineer who takes systems from prototype to production — backend architecture, LLM and agent design, deployment and monitoring. Enterprise automation, real-time voice AI and autonomous agents.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hype4shreshth.framer.website"),
  title: "Shreshth Srivastava — AI Engineer",
  description,
  keywords: [
    "Shreshth Srivastava",
    "AI Engineer",
    "LLM agents",
    "Voice AI",
    "SAP Business One automation",
    "Next.js",
    "Python",
  ],
  authors: [{ name: "Shreshth Srivastava" }],
  openGraph: {
    title: "Shreshth Srivastava — AI Engineer",
    description,
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreshth Srivastava — AI Engineer",
    description,
    images: ["/images/og-image.png"],
    creator: "@Rootshreshth",
  },
  icons: { icon: "/images/favicon.png" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shreshth Srivastava",
  jobTitle: "AI Engineer",
  url: "https://hype4shreshth.framer.website",
  sameAs: [
    "https://x.com/Rootshreshth",
    "https://www.linkedin.com/in/root4shreshth/",
    "https://github.com/root4shreshth",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "LLM agents",
    "Voice AI",
    "SAP Business One",
    "Workflow automation",
    "Next.js",
    "Python",
    "TypeScript",
  ],
  alumniOf: { "@type": "CollegeOrUniversity", name: "United University" },
  description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-nav">
          Skip to content
        </a>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
