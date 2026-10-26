import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { ContourField } from "./ui/Contours";
import { Container, SectionHeading, delay } from "./ui/Primitives";

const projectTitle = new Map(projects.map((p) => [p.id, p.title]));

// Sección adicional: habilidades agrupadas por área.
export default function Skills() {
  return (
    <section id="habilidades" aria-labelledby="habilidades-title" className="relative isolate overflow-hidden py-24 md:py-32">
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

        <ol className="grid gap-4">
          {skillGroups.map((group, i) => (
            <li
              key={group.id}
              className="reveal grid gap-4 rounded-layer border border-line bg-surface/80 p-6 backdrop-blur-sm transition-colors hover:border-accent md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10 md:p-8"
              style={{ ...delay(i * 70), marginLeft: `min(${i * 1.5}rem, ${i * 3}vw)` }}
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
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
