export default function About() {
  return (
    <section id="about" className="py-20 max-w-2xl">
      <h2 className="font-fira-code text-highlight text-2xl md:text-3xl mb-8">
        .about()
      </h2>

      <div className="space-y-4 text-text text-base md:text-lg leading-relaxed">
        <p>
          I&apos;m a Front-end Engineer at{" "}
          <span className="text-highlight">PicPay</span>, one of Brazil&apos;s
          largest digital banks with over 60 million users, where I build
          scalable interfaces using Angular, TypeScript, and RxJS.
        </p>
        <p>
          I&apos;m currently expanding my stack into{" "}
          <span className="text-highlight">React and Next.js</span>. This
          portfolio is the living proof of that journey.
        </p>
        <p>
          Outside of work, I freelance and build personal projects. The ones
          that push me the most are the ones built for real people with real
          problems.
        </p>
      </div>
    </section>
  );
}
