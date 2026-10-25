import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import { StrataDivider } from "@/components/ui/Contours";
import { RevealObserver } from "@/components/ui/RevealObserver";

// Mismo orden del mapa: Menú → Hero + CV → Acerca de mí → Proyectos → Testimonios
// → Experiencia → Contactos → Adicional (Habilidades) → Pie de página.
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenido" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <About />
        <StrataDivider seed={21} />
        <Projects />
        <StrataDivider seed={34} />
        <Testimonials />
        <Experience />
        <StrataDivider seed={55} />
        <Contact />
        <Skills />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
