import { useLayoutEffect } from "react";
import Navbar from "./components/Navbar";
import LenisSmoothScroll from "./components/LenisSmoothScroll";
import ScrollReveal from "./components/ScrollReveal";
import Hero from "./sections/Hero";
import Work from "./sections/Work";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import End from "./sections/End";

export default function App() {
  useLayoutEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    if (navigation?.type !== "reload") return undefined;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    if (window.location.hash) {
      window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}`);
    }
    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return (
    <LenisSmoothScroll>
      <Navbar />

      <main className="relative min-h-screen">
        <Hero />
        <ScrollReveal className="portfolio-section-reveal" direction="left" distance={22} amount={0.035} margin="0px 0px 0px 0px">
          <About />
        </ScrollReveal>
        <ScrollReveal className="portfolio-section-reveal" direction="right" distance={22} amount={0.035} margin="0px 0px 0px 0px">
          <Skills />
        </ScrollReveal>
        <Work />
        <ScrollReveal className="portfolio-section-reveal" direction="up" distance={22} amount={0.035} margin="0px 0px 0px 0px">
          <Experience />
        </ScrollReveal>
        <ScrollReveal className="portfolio-section-reveal" direction="left" distance={22} amount={0.035} margin="0px 0px 0px 0px">
          <Education />
        </ScrollReveal>
        <ScrollReveal className="portfolio-section-reveal" direction="right" distance={22} amount={0.035} margin="0px 0px 0px 0px">
          <Contact />
        </ScrollReveal>
        <ScrollReveal className="portfolio-section-reveal" direction="up" distance={22} amount={0.035} margin="0px 0px 0px 0px">
          <End />
        </ScrollReveal>
      </main>
    </LenisSmoothScroll>
  );
}
