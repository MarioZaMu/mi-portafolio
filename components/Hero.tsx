import { site } from "@/data/site";
import { Avatar } from "./ui/Avatar";
import { ButtonLink } from "./ui/Button";
import { Ribbon } from "./ui/Contours";
import { Container, delay } from "./ui/Primitives";

export default function Hero() {
  const [first, ...rest] = site.name.split(" ");
  const firstLine = [first, rest[0]].join(" "); // "Mario Alberto"
  const secondLine = rest.slice(1).join(" "); // "Zambrano Muñoz"

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-48 pt-28 md:pb-56"
    >
      {/* Franja en la base del inicio */}
      <Ribbon className="absolute inset-x-0 bottom-0 -z-10 h-[28%] w-full md:h-[34%]" />

      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div>
          <p className="rise label-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-accent" style={delay(0)}>
            <span>{site.coordinates}</span>
            <span aria-hidden="true">·</span>
            <span>{site.altitude}</span>
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.5rem,10.5vw,5.75rem)] font-medium leading-[0.95] text-fg"
          >
            <span className="block">{firstLine}</span>
            <span className="block italic text-accent">{secondLine}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg font-semibold text-fg sm:text-xl">
            {site.role}
          </p>

          <p
            className="mt-4 max-w-xl border-l-2 border-marine pl-4 font-display text-xl italic leading-snug text-muted sm:text-2xl"
          >
            {site.tagline}
          </p>

          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={delay(120)}>
            {/* Obligatorio: descarga directa del CV */}
            <ButtonLink href={site.cv} download="CV-Mario-Zambrano.pdf" size="lg" icon="download" iconPosition="start">
              Descargar CV
            </ButtonLink>
            <ButtonLink href="#proyectos" variant="secondary" size="lg" icon="arrowRight">
              Ver proyectos
            </ButtonLink>
          </div>

          <ul
            className="rise label-mono mt-10 flex flex-wrap gap-x-6 gap-y-2 text-muted"
            style={delay(180)}
            aria-label="Datos rápidos"
          >
            <li>{site.location}</li>
            <li>{site.semester}</li>
            <li>{site.university}</li>
          </ul>
        </div>

        <div className="rise flex justify-center lg:justify-end" style={delay(60)}>
          <Avatar size={420} priority className="w-[min(78vw,420px)]" />
        </div>
      </Container>
    </section>
  );
}
