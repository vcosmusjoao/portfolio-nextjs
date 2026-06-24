import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import { Fira_Code, Inter } from "next/font/google";
import React from "react";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "João Costa · Front-end Developer",
  description: "Front-end Engineer at PicPay. Specializing in Angular, TypeScript, and Next.js.",
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
      </body>
    </html>
  );
}
