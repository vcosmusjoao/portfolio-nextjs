import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import FadeIn from "@/components/FadeIn";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FadeIn><About /></FadeIn>
      <FadeIn><Projects /></FadeIn>
      <FadeIn><Skills /></FadeIn>
      <FadeIn><Contact /></FadeIn>
    </main>
  );
}
