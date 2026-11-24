import { site } from "@/data/site";
import { highlightSkills } from "@/data/skills";
import { T, tx, type Tx } from "@/lib/i18n";
import { ArchPortrait } from "./ui/Avatar";
import { ButtonLink } from "./ui/Button";
import { Chip, Container, delay } from "./ui/Primitives";

const facts: { label: Tx; value: Tx }[] = [
  { label: tx("Ubicación", "Location"), value: tx(site.location, site.location) },
  { label: tx("Semestre", "Semester"), value: tx("Cuarto", "Fourth") },
  {
    label: tx("Intereses", "Interests"),
    value: tx(site.interests.map((i) => i.es).join(" · "), site.interests.map((i) => i.en).join(" · ")),
  },
];

export default function About() {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-title" data-bg="rings" className="relative isolate py-24 md:py-32">
      <Container className="grid grid-cols-1 items-center gap-16 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="reveal relative mx-auto w-full max-w-[22rem] pb-6 pr-6 md:max-w-none">
          <ArchPortrait />
          <span className="absolute -right-1 bottom-14 -rotate-6 rounded-full bg-action px-4 py-2 text-sm font-semibold text-on-action shadow-[0_12px_30px_-12px_var(--shadow-layer)]">
            <T {...tx("4.º semestre", "4th semester")} />
          </span>
        </div>

        <div className="reveal" style={delay(120)}>
          <p className="label-mono text-accent">
            02 / <T {...tx("Sobre mí", "About me")} />
          </p>
          <h2 id="sobre-mi-title" className="mt-4 text-4xl font-medium leading-[1.05] text-fg sm:text-5xl md:text-6xl">
            <T {...tx("Sobre mí", "About me")} />
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            <T {...site.about} />
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label.es} className="rounded-card border border-line bg-surface px-4 py-3">
                <dt className="label-mono text-accent">
                  <T {...f.label} />
                </dt>
                <dd className="mt-1 font-semibold text-fg">
                  <T {...f.value} />
                </dd>
              </div>
            ))}
          </dl>

          <h3 className="label-mono mt-8 text-accent"><T {...tx("Tecnologías que manejo", "Technologies I use")} />
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {highlightSkills.map((s) => (
              <li key={s}>
                <Chip className="rounded-full px-3 py-1.5">{s}</Chip>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.cv} download="CV-Mario-Zambrano.pdf" icon="download" iconPosition="start">
              <T {...tx("Descargar CV", "Download CV")} />
            </ButtonLink>
            <ButtonLink href="#contacto" variant="secondary" icon="arrowRight">
              <T {...tx("Contactarme", "Contact me")} />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
