import { site } from "@/data/site";
import { highlightSkills } from "@/data/skills";
import { Icon } from "./ui/Icon";
import { Chip, Container, SectionHeading, Tile, delay } from "./ui/Primitives";

export default function About() {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-title" className="relative py-16 md:py-20">
      <Container>
        <SectionHeading id="sobre-mi-title" eyebrow="Acerca de mí" title="Un poco sobre quién soy" />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12 lg:gap-4">
          {/* Párrafo en primera persona */}
          <Tile className="reveal p-6 sm:p-10 md:col-span-6 lg:col-span-8 lg:row-span-2">
            <p className="font-display text-2xl leading-snug text-fg first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[4.25rem] first-letter:leading-[0.8] first-letter:text-accent-warm sm:text-[1.75rem]">
              {site.about}
            </p>
          </Tile>

          {/* Datos rápidos */}
          <Tile className="reveal flex flex-col justify-between gap-6 p-6 md:col-span-3 lg:col-span-4" style={delay(80)}>
            <Icon name="graduation" size={28} className="text-accent" />
            <div>
              <p className="label-mono text-muted">Semestre</p>
              <p className="text-xl font-semibold text-fg">{site.semester}</p>
              <p className="text-muted">{site.university}</p>
            </div>
          </Tile>
          <Tile className="reveal flex flex-col justify-between gap-6 p-6 md:col-span-3 lg:col-span-4" style={delay(140)}>
            <Icon name="gamepad" size={28} className="text-accent-warm" />
            <div>
              <p className="label-mono text-muted">Intereses</p>
              <p className="text-xl font-semibold text-fg">{site.interests.join(" · ")}</p>
            </div>
          </Tile>

          {/* Tecnologías */}
          <Tile className="reveal flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between md:col-span-6 lg:col-span-12" style={delay(200)}>
            <div className="min-w-0">
              <h3 className="label-mono text-accent">Tecnologías que manejo</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {highlightSkills.map((s) => (
                  <li key={s}>
                    <Chip className="px-3 py-2">{s}</Chip>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#habilidades"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline"
            >
              Ver todas por área
              <Icon name="arrowRight" size={18} />
            </a>
          </Tile>
        </div>
      </Container>
    </section>
  );
}
