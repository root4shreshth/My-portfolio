import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { themeInitScript } from "@/lib/theme";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import { capabilities, contact } from "@/lib/content";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Shreshth Srivastava",
    "AI Engineer",
    "AI Engineer India",
    "LLM engineer",
    "AI agents developer",
    "Voice AI engineer",
    "Agentic AI",
    "SAP Business One automation",
    "Workflow automation",
    "Next.js developer",
    "Python FastAPI",
    "Sellixis",
    "SmartCap patent",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    firstName: "Shreshth",
    lastName: "Srivastava",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@Rootshreshth",
  },
  icons: { icon: "/images/favicon.png", apple: "/images/favicon.png" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark light",
};

const personId = `${SITE_URL}/#person`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: SITE_NAME,
      givenName: "Shreshth",
      familyName: "Srivastava",
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      jobTitle: "AI Engineer",
      description: SITE_DESCRIPTION,
      email: `mailto:${contact.email}`,
      address: { "@type": "PostalAddress", addressCountry: "IN" },
      worksFor: { "@type": "Organization", name: "Alamir Groups" },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "United University",
        address: { "@type": "PostalAddress", addressLocality: "Prayagraj", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
      },
      award: [
        "Winner — Hack for Impact, Australia–India Hackathon (2025)",
        "Winner — GenAI Hackathon 2025",
        "Top 100 of 70,000+ teams in a national-level hackathon",
        "Indian patent granted — SmartCap cervical posture predictor",
      ],
      knowsAbout: capabilities.flatMap((c) => c.items),
      sameAs: contact.links.map((l) => l.href),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: SITE_TITLE,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": personId },
      dateModified: new Date().toISOString().slice(0, 10),
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
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
