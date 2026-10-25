import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { ContourField } from "./ui/Contours";
import { Container, SectionHeading, Tile, delay } from "./ui/Primitives";

const projectTitle = new Map(projects.map((p) => [p.id, p.title]));

// Sección adicional: habilidades agrupadas por área.
export default function Skills() {
  return (
    <section id="habilidades" aria-labelledby="habilidades-title" className="relative isolate overflow-hidden py-16 md:py-20">
      <ContourField
        className="absolute -left-1/4 top-0 -z-10 h-full w-[120%] md:-left-[10%] md:w-[70%]"
        cx={300}
        cy={420}
        count={16}
        minRadius={40}
        step={26}
        seed={77}
        opacity={0.22}
      />
      <Container>
        <SectionHeading
          id="habilidades-title"
          eyebrow="Habilidades"
          title="Herramientas y tecnologías"
          intro="Agrupadas por área y conectadas con los proyectos donde las usé."
        />

        {/* Bento: los dos grupos más grandes arriba (mitad y mitad) y tres abajo (un tercio cada uno) */}
        <ol className="grid grid-cols-1 gap-3 md:grid-cols-6 lg:gap-4">
          {skillGroups.map((group, i) => (
            <Tile
              as="li"
              key={group.id}
              className={`reveal flex flex-col gap-5 p-6 hover:border-accent sm:p-8 ${i < 2 ? "md:col-span-3" : "md:col-span-2"}`}
              style={delay(i * 70)}
            >
              <div>
                <h3 className="text-2xl font-medium text-fg">{group.title}</h3>
                <p className="mt-2 text-base text-muted">{group.summary}</p>
              </div>
              <ul className="flex flex-wrap content-start gap-2">
                {group.skills.map((skill) => {
                  const used = skill.usedIn?.map((id) => projectTitle.get(id)).filter(Boolean).join(", ");
                  return (
                    <li
                      key={skill.name}
                      className="flex min-h-11 flex-col justify-center rounded-card border border-line bg-surface-soft px-4 py-2"
                    >
                      <span className="font-semibold text-fg">{skill.name}</span>
                      {used && <span className="font-mono text-xs text-muted">en {used}</span>}
                    </li>
                  );
                })}
              </ul>
            </Tile>
          ))}
        </ol>
      </Container>
    </section>
  );
}
