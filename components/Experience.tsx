import { sortedExperience, type ExperienceType } from "@/data/experience";
import { Icon } from "./ui/Icon";
import { Container, SectionHeading, delay } from "./ui/Primitives";

const types: Record<ExperienceType, { label: string; icon: "graduation" | "briefcase"; marker: string; text: string }> = {
  academica: { label: "Académica", icon: "graduation", marker: "bg-harbor text-pearl border-periwinkle rounded-full", text: "text-accent" },
  laboral: { label: "Laboral", icon: "briefcase", marker: "bg-periwinkle text-midnight border-periwinkle rounded-lg", text: "text-accent-warm" },
};

export default function Experience() {
  return (
    <section id="experiencia" aria-labelledby="experiencia-title" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          id="experiencia-title"
          eyebrow="Experiencia"
          title="Trayectoria académica y laboral"
          intro="De la más reciente a la más antigua."
        />

        {/* Leyenda */}
        <ul className="reveal mb-12 flex flex-wrap gap-6 md:justify-center" aria-label="Leyenda de la línea de tiempo">
          {(Object.keys(types) as ExperienceType[]).map((k) => (
            <li key={k} className="flex items-center gap-3">
              <span className={`flex h-9 w-9 items-center justify-center border-2 ${types[k].marker}`} aria-hidden="true">
                <Icon name={types[k].icon} size={18} />
              </span>
              <span className="font-medium text-fg">{types[k].label}</span>
              <span className="hidden text-sm text-muted md:inline">{k === "academica" ? "(izquierda)" : "(derecha)"}</span>
            </li>
          ))}
        </ul>

        <ol className="relative mx-auto max-w-5xl">
          {/* Línea de tiempo con trazo de curva de nivel */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[1.375rem] top-0 w-0.5 bg-[repeating-linear-gradient(to_bottom,var(--line)_0_10px,transparent_10px_16px)] md:left-1/2 md:-translate-x-1/2"
          />
          {sortedExperience.map((item, i) => {
            const t = types[item.type];
            const left = item.type === "academica";
            return (
              <li key={item.title + item.start} className="reveal relative pb-12 pl-16 last:pb-0 md:grid md:grid-cols-2 md:gap-16 md:pl-0" style={delay(i * 80)}>
                <span
                  className={`absolute left-0 top-1 z-10 flex h-11 w-11 items-center justify-center border-2 md:left-1/2 md:-translate-x-1/2 ${t.marker}`}
                >
                  <Icon name={t.icon} size={20} />
                  <span className="sr-only">Experiencia {t.label.toLowerCase()}</span>
                </span>
                <article
                  className={`rounded-card border border-line bg-surface p-6 shadow-[0_20px_40px_-30px_var(--shadow-layer)] ${
                    left ? "md:col-start-1 md:text-right" : "md:col-start-2"
                  }`}
                >
                  <p className={`label-mono ${t.text}`}>
                    <time>{item.date}</time>
                  </p>
                  <h3 className="mt-2 text-2xl font-medium text-fg">{item.title}</h3>
                  <p className="mt-1 font-semibold text-muted">{item.place}</p>
                  <p className="mt-3 text-base leading-relaxed text-muted">{item.description}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
