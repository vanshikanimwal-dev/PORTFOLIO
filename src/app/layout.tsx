import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Pixelify_Sans, Press_Start_2P, VT323 } from "next/font/google";
import { Chrome } from "@/components/Chrome";
import { profile } from "@/data/profile";
import { getSiteUrl } from "@/lib/utils";
import "./globals.css";

const press = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press",
});

const vt = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt",
});

const body = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vanshika Nimwal — Software Developer",
    template: "%s — Vanshika Nimwal",
  },
  description: profile.tagline,
  applicationName: "Vanshika Nimwal",
  authors: [{ name: profile.name, url: profile.links.github }],
  keywords: ["Vanshika Nimwal", "Software Developer", "Flutter", "Java", "Spring Boot", "Unity"],
  alternates: {
    canonical: siteUrl,
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Vanshika Nimwal — Software Developer",
    description: profile.tagline,
    locale: "en_IN",
    siteName: "Vanshika Nimwal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanshika Nimwal — Software Developer",
    description: profile.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070312",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.headline,
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
    <html
      lang="en"
      className={`${press.variable} ${vt.variable} ${body.variable}`}
    >
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
