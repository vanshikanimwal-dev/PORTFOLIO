import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Caveat, Pixelify_Sans, Poppins } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { profile } from "@/data/profile";
import { getSiteUrl } from "@/lib/utils";
import "./globals.css";

const sans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const pixel = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-pixel",
});

const hand = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-hand",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vanshika Nimwal — CSE Student",
    template: "%s — Vanshika Nimwal",
  },
  description:
    "Final year B.Tech CSE student at Sharda University. Flutter, Java, Unity, and AR/VR. Building the future, one line at a time.",
  applicationName: "Vanshika Nimwal",
  authors: [{ name: profile.name, url: profile.links.github }],
  keywords: ["Vanshika Nimwal", "CSE Student", "Flutter", "Java", "Unity", "AR/VR"],
  alternates: {
    canonical: siteUrl,
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Vanshika Nimwal — CSE Student",
    description:
      "Final year B.Tech CSE student at Sharda University. Flutter, Java, Unity, and AR/VR.",
    locale: "en_IN",
    siteName: "Vanshika Nimwal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanshika Nimwal — CSE Student",
    description:
      "Final year B.Tech CSE student at Sharda University. Flutter, Java, Unity, and AR/VR.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060A1C",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "CSE Student",
  email: profile.email,
  telephone: profile.phone,
  url: siteUrl,
  image: profile.github.avatar,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Greater Noida",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Sharda University",
  },
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.leetcode],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${pixel.variable} ${hand.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
