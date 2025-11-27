import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Fira_Code, Inter } from "next/font/google";
import Head from "next/head";
import React from "react";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Fundo geral da página */}
      <div className={`${firaCode.variable} ${inter.variable} bg-bg text-text  p-4`}>
        {/* Moldura centralizada */}
        <div
          className="
      max-w-5xl
      h-[calc(100vh-2rem)]
      mx-auto
      border-2 border-text/40
      shadow-[4px_4px_0_0_var(--color-highlight)]
      px-6 py-6
      rounded-sm
      overflow-hidden
       pl-8
      ml-[15rem]
      
          "
        >
          <Navbar />
          <Hero />
          {/* Conteúdo da página */}
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}
