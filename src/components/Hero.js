import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[300px] md:min-h-[420px]">

      {/* Texto do hero */}
      <div className="relative z-10 max-w-xl pt-4">
        <h1 className="font-fira-code text-highlight text-3xl md:text-4xl mb-4">
          Olá, eu sou o João.
        </h1>

        <p className="text-text text-base md:text-lg leading-relaxed">
          Front-end developer especializado em Angular.
        </p>

        <p className="text-text text-base md:text-lg leading-relaxed mt-2">
          Criando interfaces limpas, funcionais e minimalistas.
        </p>
      </div>

      {/* Avatar colado na borda */}
      <Image
        src="/images/profile/b3a4c130-2390-4dc3-95f1-2b305cf14c2e.png"
        alt="João avatar"
        width={256}
        height={256}
        className="
          fixed
          right-45
          bottom-3.5
          w-48 md:w-56 lg:w-72
          object-contain
          pointer-events-none
          select-none
         z-1
        "
      />
       <div
        aria-hidden="true"
        className="fixed right-52 bottom-4.5 w-48 md:w-56 lg:w-72 h-58 pointer-events-none z-10"
        style={{
          background: "linear-gradient(0deg, rgba(15,23,42,1) 20%, rgba(15,23,42,0.6) 50%, rgba(15,23,42,0) 100%)",
        }}
      />
    </section>
  );
}
