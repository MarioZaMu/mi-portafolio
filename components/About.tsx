import { site } from "@/data/site";
import { highlightSkills } from "@/data/skills";
import { ArchPortrait } from "./ui/Avatar";
import { ButtonLink } from "./ui/Button";
import { Chip, Container, delay } from "./ui/Primitives";

const facts: { label: string; value: string }[] = [
  { label: "Ubicación", value: site.location },
  { label: "Semestre", value: site.semester.replace(" semestre", "") },
  { label: "Intereses", value: site.interests.join(" · ") },
];

export default function About() {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-title" data-bg="rings" className="relative isolate py-24 md:py-32">
      <Container className="grid grid-cols-1 items-center gap-16 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="reveal relative mx-auto w-full max-w-[22rem] pb-6 pr-6 md:max-w-none">
          <ArchPortrait />
          <span className="absolute -right-1 bottom-14 -rotate-6 rounded-full bg-action px-4 py-2 text-sm font-semibold text-on-action shadow-[0_12px_30px_-12px_var(--shadow-layer)]">
            4.º semestre
          </span>
        </div>

        <div className="reveal" style={delay(120)}>
          <p className="label-mono text-accent">02 / Sobre mí</p>
          <h2 id="sobre-mi-title" className="mt-4 text-4xl font-medium leading-[1.05] text-fg sm:text-5xl md:text-6xl">
            Sobre mí
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">{site.about}</p>

          <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="rounded-card border border-line bg-surface px-4 py-3">
                <dt className="label-mono text-accent">{f.label}</dt>
                <dd className="mt-1 font-semibold text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>

          <h3 className="label-mono mt-8 text-accent">Tecnologías que manejo</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {highlightSkills.map((s) => (
              <li key={s}>
                <Chip className="rounded-full px-3 py-1.5">{s}</Chip>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.cv} download="CV-Mario-Zambrano.pdf" icon="download" iconPosition="start">
              Descargar CV
            </ButtonLink>
            <ButtonLink href="#contacto" variant="secondary" icon="arrowRight">
              Contactarme
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
