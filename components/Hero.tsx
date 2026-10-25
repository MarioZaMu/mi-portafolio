import type { Project } from "@/data/projects";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { Avatar } from "./ui/Avatar";
import { ButtonLink } from "./ui/Button";
import { ContourField, Ribbon } from "./ui/Contours";
import { Icon } from "./ui/Icon";
import { Container, Tile, delay } from "./ui/Primitives";

const allSkills = skillGroups.flatMap((g) => g.skills.map((s) => s.name));

const dateFormat = new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long", year: "numeric" });

type HeroProps = {
  projectCount: number;
  /** Proyecto con el release más reciente (puede no haber ninguno). */
  latest?: Project & { release: NonNullable<Project["release"]> };
};

// Inicio en mosaico (bento): cada dato ocupa su propia celda para no dejar huecos.
export default function Hero({ projectCount, latest }: HeroProps) {
  const [first, ...rest] = site.name.split(" ");
  const firstLine = [first, rest[0]].join(" "); // "Mario Alberto"
  const secondLine = rest.slice(1).join(" "); // "Zambrano Muñoz"

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative pb-8 pt-24 md:pt-28">
      <Container className="grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12 lg:gap-4">
        {/* Presentación */}
        <Tile className="p-6 sm:p-10 md:col-span-6 lg:col-span-8 lg:row-span-2">
          <div aria-hidden="true" className="parallax absolute -right-1/3 -top-1/4 -z-10 h-[150%] w-[110%] opacity-70">
            <ContourField cx={420} cy={360} count={20} minRadius={30} step={22} seed={2527} className="h-full w-full" opacity={0.4} />
          </div>
          <p className="label-mono inline-flex items-center gap-2 rounded-full border border-line bg-bg/40 px-3 py-1.5 text-accent">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            {site.semester} · Ingeniería de Software
          </p>
          <h1 id="hero-title" className="mt-6 text-[clamp(2.4rem,8vw,5rem)] font-medium leading-[0.95] text-fg">
            <span className="block">{firstLine}</span>
            <span className="block italic text-accent">{secondLine}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-semibold text-fg sm:text-xl">{site.role}</p>
          <p className="mt-3 max-w-xl border-l-2 border-crimson pl-4 font-display text-xl italic leading-snug text-muted">
            {site.tagline}
          </p>
          <div className="rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={delay(120)}>
            {/* Obligatorio: descarga directa del CV */}
            <ButtonLink href={site.cv} download="CV-Mario-Zambrano.pdf" size="lg" icon="download" iconPosition="start">
              Descargar CV
            </ButtonLink>
            <ButtonLink href="#proyectos" variant="secondary" size="lg" icon="arrowRight">
              Ver proyectos
            </ButtonLink>
          </div>
        </Tile>

        {/* Retrato */}
        <Tile className="flex min-h-72 items-center justify-center p-6 md:col-span-3 lg:col-span-4 lg:row-span-2">
          <Ribbon className="absolute inset-x-0 bottom-0 -z-10 h-1/3 w-full opacity-90" />
          <Avatar size={340} priority className="w-[min(70vw,340px)]" />
        </Tile>

        {/* Ubicación */}
        <Tile className="flex flex-col justify-between gap-6 p-6 md:col-span-3 lg:col-span-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-accent">
            <Icon name="mapPin" />
          </span>
          <div>
            <p className="text-xl font-semibold text-fg">{site.location}</p>
            <p className="label-mono mt-2 text-muted">
              {site.coordinates} · {site.altitude}
            </p>
          </div>
        </Tile>

        {/* Proyectos publicados */}
        <a
          href="#proyectos"
          className="tile group flex flex-col justify-between gap-6 p-6 hover:-translate-y-0.5 hover:border-accent motion-reduce:transform-none md:col-span-3 lg:col-span-4"
        >
          <span className="flex items-start justify-between">
            <span className="font-display text-6xl font-medium leading-none text-fg">{String(projectCount).padStart(2, "0")}</span>
            <Icon name="arrowRight" className="text-accent transition-transform group-hover:translate-x-1" />
          </span>
          <span>
            <span className="block text-xl font-semibold text-fg">Apps publicadas</span>
            <span className="block text-muted">Android, escritorio y web, con código abierto en GitHub.</span>
          </span>
        </a>

        {/* Recién publicado: sale solo del último GitHub Release */}
        {latest ? (
          <a
            href={latest.release.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tile group flex flex-col justify-between gap-6 p-6 hover:-translate-y-0.5 hover:border-accent-warm motion-reduce:transform-none md:col-span-3 lg:col-span-4"
          >
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-crimson/15" />
            <span className="flex items-center justify-between">
              <span className="label-mono inline-flex items-center gap-2 text-accent-warm">
                <Icon name="rocket" size={18} />
                Recién publicado
              </span>
              <Icon name="external" size={18} className="text-accent-warm" />
            </span>
            <span>
              <span className="block text-xl font-semibold text-fg">
                {latest.title} {latest.release.tag}
              </span>
              <span className="block text-muted">
                {latest.release.label} · <time dateTime={latest.release.publishedAt}>{dateFormat.format(new Date(latest.release.publishedAt))}</time>
              </span>
            </span>
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
        ) : (
          <Tile className="flex flex-col justify-between gap-6 p-6 md:col-span-3 lg:col-span-4">
            <Icon name="gamepad" size={28} className="text-accent-warm" />
            <div>
              <p className="label-mono text-muted">Me interesa</p>
              <p className="text-xl font-semibold text-fg">{site.interests.join(" · ")}</p>
            </div>
          </Tile>
        )}

        {/* Cinta de tecnologías */}
        <Tile className="py-4 md:col-span-6 lg:col-span-12">
          <div className="marquee flex w-max gap-3 px-4">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 gap-3" {...(copy ? { "data-copy": true, "aria-hidden": true } : { "aria-label": "Tecnologías que uso" })}>
                {allSkills.map((name) => (
                  <li key={name} className="whitespace-nowrap rounded-full border border-line bg-bg/40 px-4 py-2 font-mono text-sm text-fg">
                    {name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </Tile>
      </Container>
    </section>
  );
}
