import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import { Fira_Code, Inter } from "next/font/google";
import React from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = "https://joaovcosta.dev";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${firaCode.variable} ${inter.variable} bg-bg text-text p-4`}>
        <div
          className="
            relative
            max-w-5xl
            min-h-[calc(100vh-2rem)]
            mx-auto
            border-2 border-text/40
            shadow-[4px_4px_0_0_var(--color-highlight)]
            px-6 py-6
            rounded-sm
            overflow-x-hidden
            pl-8
            ml-0 md:ml-[15rem]
          "
        >
          <Navbar />
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
