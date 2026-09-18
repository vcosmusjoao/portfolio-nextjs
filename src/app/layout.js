import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { Fira_Code, Inter } from "next/font/google";
import React from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL } from "@/lib/site";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = SITE_URL;
const description =
  "Front-End Engineer at PicPay. Building clean, functional interfaces with Angular, TypeScript, React, and Next.js.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "João Costa · Front-End Engineer",
    template: "%s · João Costa",
  },
  description,
  keywords: [
    "João Costa",
    "Front-End Engineer",
    "Frontend Developer",
    "React",
    "Next.js",
    "Angular",
    "TypeScript",
    "RxJS",
    "PicPay",
  ],
  authors: [{ name: "João Costa", url: siteUrl }],
  creator: "João Costa",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "João Costa",
    title: "João Costa · Front-End Engineer",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "João Costa · Front-End Engineer",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "João Costa",
  jobTitle: "Front-End Engineer",
  url: siteUrl,
  worksFor: {
    "@type": "Organization",
    name: "PicPay",
  },
  sameAs: [
    "https://github.com/vcosmusjoao",
    "https://www.linkedin.com/in/joaovcsantos/",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${firaCode.variable} ${inter.variable} text-fg p-4`}>
        <a href="#home" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <div
          className="
            relative
            max-w-5xl
            min-h-[calc(100vh-2rem)]
            mx-auto
            bg-surface-1
            border border-line-strong
            shadow-hard
            px-6 py-6
            rounded-sm
            overflow-x-hidden
            pl-8
            ml-0 md:ml-[15rem]
          "
        >
          <LanguageProvider>
            <Navbar />
            {children}
          </LanguageProvider>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
