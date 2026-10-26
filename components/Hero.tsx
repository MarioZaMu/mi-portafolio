import type { Project } from "@/data/projects";
import { site } from "@/data/site";
import { HeroCards } from "./HeroCards";
import { ButtonLink } from "./ui/Button";
import { Container, delay } from "./ui/Primitives";

export default function Hero({ projects }: { projects: Project[] }) {
  const [first, ...rest] = site.name.split(" ");
  const firstLine = [first, rest[0]].join(" "); // "Mario Alberto"
  const secondLine = rest.slice(1).join(" "); // "Zambrano Muñoz"

  // Datos reales (todos salen de data/): proyectos, semestre, sede y plataformas.
  const stats = [
    { value: String(projects.length).padStart(2, "0"), label: "Proyectos" },
    { value: "4.º", label: "Semestre" },
    { value: "UCC", label: "Campus Pasto" },
    { value: "Full", label: "Móvil · Web · Escritorio" },
  ];

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      data-bg="waves"
      className="relative isolate flex min-h-[100svh] flex-col justify-center pt-28"
    >
      <Container className="grid flex-1 grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div>
          <p className="rise label-mono text-accent" style={delay(0)}>
            Ingeniería de Software · Pasto, Colombia
          </p>

          <h1
            id="hero-title"
            className="rise mt-6 text-[clamp(2.6rem,9vw,5.25rem)] font-medium leading-[0.98] text-fg"
            style={delay(40)}
          >
            <span className="block">{firstLine}</span>
            <span className="text-outline block">{secondLine}</span>
          </h1>

          <p className="rise mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={delay(80)}>
            <span className="font-semibold text-fg">{site.role}.</span> {site.tagline}
          </p>

          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={delay(120)}>
            {/* Obligatorio: descarga directa del CV */}
            <ButtonLink href={site.cv} download="CV-Mario-Zambrano.pdf" size="lg" icon="download" iconPosition="start">
              Descargar CV
            </ButtonLink>
            <ButtonLink href="#proyectos" variant="secondary" size="lg" icon="arrowRight">
              Ver proyectos
            </ButtonLink>
          </div>
        </div>

        <div className="rise flex justify-center lg:justify-end" style={delay(160)}>
          <HeroCards projects={projects} />
        </div>
      </Container>

      <Container className="rise mt-16" >
        <dl className="grid grid-cols-2 border-t border-line md:grid-cols-4" style={delay(220)}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse gap-1 py-6 pr-4 md:py-8 ${i % 2 === 1 ? "border-l border-line pl-5" : ""} ${
                i > 0 ? "md:border-l md:border-line md:pl-6" : ""
              } ${i >= 2 ? "border-t border-line md:border-t-0" : ""}`}
            >
              <dt className="label-mono text-accent">{s.label}</dt>
              <dd className="font-display text-4xl font-medium leading-none text-fg sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
