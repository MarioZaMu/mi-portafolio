import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { projects } from "@/data/projects";
import { newestRelease, withLatestReleases } from "@/lib/releases";

// Testimonios ocultos por ahora (components/Testimonials.tsx sigue listo para cuando haya reales).
// Mismo orden del mapa: Menú → Hero + CV → Acerca de mí → Proyectos → (Testimonios)
// → Experiencia → Contactos → Adicional (Habilidades) → Pie de página.
export default async function Home() {
  const projectsWithReleases = await withLatestReleases(projects);
  return (
    <>
      <Navbar />
      <main id="contenido" tabIndex={-1} className="focus:outline-none">
        <Hero projectCount={projects.length} latest={newestRelease(projectsWithReleases)} />
        <About />
        <Projects projects={projectsWithReleases} />
        <Experience />
        <Contact />
        <Skills />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
