import { site } from "@/data/site";
import { highlightSkills } from "@/data/skills";
import { Avatar } from "./ui/Avatar";
import { Icon, type IconName } from "./ui/Icon";
import { Chip, Container, SectionHeading, delay } from "./ui/Primitives";

const facts: { icon: IconName; label: string; value: string }[] = [
  { icon: "mapPin", label: "Ubicación", value: site.location },
  { icon: "graduation", label: "Semestre", value: `${site.semester} · ${site.university}` },
  { icon: "layers", label: "Intereses", value: site.interests.join(" · ") },
];

export default function About() {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-title" className="relative isolate py-24 md:py-32">
      <Container>
        <SectionHeading id="sobre-mi-title" eyebrow="Acerca de mí" title="Un poco sobre quién soy" />

        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16">
          {/* Retrato en capas */}
          <div className="reveal layered rounded-layer border border-line bg-surface p-6 sm:p-8">
            <div className="flex justify-center">
              <Avatar size={280} className="w-[min(64vw,280px)]" />
            </div>
            <ul className="mt-6 grid gap-4 border-t border-line pt-6">
              {facts.map((f) => (
                <li key={f.label} className="flex items-start gap-3">
                  <Icon name={f.icon} className="mt-1 shrink-0 text-accent" />
                  <div>
                    <p className="label-mono text-muted">{f.label}</p>
                    <p className="text-base font-medium text-fg">{f.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal" style={delay(120)}>
            <p className="font-display text-2xl leading-snug text-fg first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[4.25rem] first-letter:leading-[0.8] first-letter:text-accent-warm sm:text-[1.75rem]">
              {site.about}
            </p>

            <h3 className="label-mono mt-12 text-accent">Tecnologías que manejo</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {highlightSkills.map((s) => (
                <li key={s}>
                  <Chip className="px-3 py-2">{s}</Chip>
                </li>
              ))}
            </ul>
            <a
              href="#habilidades"
              className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline"
            >
              Ver todas las habilidades por área
              <Icon name="arrowRight" size={18} />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
