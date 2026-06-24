const skills = [
  {
    category: "Expert",
    items: ["Angular", "TypeScript", "RxJS", "JavaScript", "HTML/CSS"],
  },
  {
    category: "Learning",
    items: ["React", "Next.js"],
  },
  {
    category: "Testing & Tooling",
    items: ["Jest", "Nx", "Git", "Tailwind CSS"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 max-w-2xl">
      <h2 className="font-fira-code text-highlight text-2xl md:text-3xl mb-8">
        .skills()
      </h2>

      <div className="space-y-8">
        {skills.map(({ category, items }) => (
          <div key={category}>
            <p className="font-fira-code text-text/60 text-sm mb-3">
              {'// '}{category}
            </p>
            <div className="flex flex-wrap gap-3">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="font-fira-code text-sm text-highlight border border-highlight/40 px-3 py-1.5 rounded-md hover:bg-highlight/10 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
