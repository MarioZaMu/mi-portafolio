import About from "@/components/About";
import Activity from "@/components/Activity";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { projects } from "@/data/projects";
import { withLatestReleases } from "@/lib/releases";

// Mismo orden del mapa: Menú → Hero + CV → Acerca de mí → Proyectos → Testimonios
// → Experiencia → Contactos → Adicional (Habilidades) → Pie de página.
export default async function Home() {
  const projectsWithReleases = await withLatestReleases(projects);
  return (
    <>
      <Navbar />
      <main id="contenido" tabIndex={-1} className="focus:outline-none">
        <Hero projects={projectsWithReleases} />
        <About />
        <Projects projects={projectsWithReleases} />
        <Testimonials />
        <Experience />
        <Contact />
        <Skills />
        <Activity />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
