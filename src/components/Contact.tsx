import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Contact() {
  return (
    <section id="contact" className="py-20 max-w-2xl">
      <h2 className="font-fira-code text-highlight text-2xl md:text-3xl mb-8">
        .contact()
      </h2>

      <p className="text-text text-base md:text-lg leading-relaxed mb-8 opacity-80">
        Always curious about interesting problems and the people solving them.
        If you want to talk tech, collaboration, or what&apos;s next, reach out.
      </p>

      <div className="flex flex-col gap-4">
        <a
          href="mailto:joaodevcosta@gmail.com"
          className="flex items-center gap-3 text-text hover:text-highlight transition-colors group"
        >
          <MdEmail className="text-xl text-highlight shrink-0" />
          <span className="font-fira-code text-sm md:text-base group-hover:underline">
            joaodevcosta@gmail.com
          </span>
        </a>

        <a
          href="https://github.com/vcosmusjoao"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 text-text hover:text-highlight transition-colors group"
        >
          <FaGithub className="text-xl text-highlight shrink-0" />
          <span className="font-fira-code text-sm md:text-base group-hover:underline">
            github.com/vcosmusjoao
          </span>
        </a>

        <a
          href="https://www.linkedin.com/in/joaovcsantos/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 text-text hover:text-highlight transition-colors group"
        >
          <FaLinkedin className="text-xl text-highlight shrink-0" />
          <span className="font-fira-code text-sm md:text-base group-hover:underline">
            linkedin.com/in/joaovcsantos
          </span>
        </a>
      </div>
    </section>
  );
}
