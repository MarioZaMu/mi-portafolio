import { sortedExperience, type ExperienceType } from "@/data/experience";
import { T, tx, type Tx } from "@/lib/i18n";
import { Container, SectionHeading, delay } from "./ui/Primitives";

// Académica: círculo con borde. Laboral: cuadrado relleno. Forma + color (no solo color).
const types: Record<ExperienceType, { label: Tx; marker: string; card: string }> = {
  academica: {
    label: tx("Académica", "Academic"),
    marker: "h-4 w-4 rounded-full border-2 border-accent bg-bg",
    card: "border-line",
  },
  laboral: {
    label: tx("Laboral", "Work"),
    marker: "h-3.5 w-3.5 rotate-45 rounded-[3px] bg-accent",
    card: "border-accent/60",
  },
};

const legend = (
  <>
    <span id="leyenda-linea" className="sr-only">
      <T {...tx("Leyenda de la línea de tiempo", "Timeline legend")} />
    </span>
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm" aria-labelledby="leyenda-linea">
    {(Object.keys(types) as ExperienceType[]).map((k) => (
      <li key={k} className="flex items-center gap-2 font-medium text-fg">
        <span aria-hidden="true" className={`inline-block ${types[k].marker}`} />
        <T {...types[k].label} />
      </li>
    ))}
    <li className="label-mono text-accent">
      <T {...tx("Más reciente arriba", "Most recent first")} />
    </li>
    </ul>
  </>
);

export default function Experience() {
  return (
    <section id="experiencia" aria-labelledby="experiencia-title" data-bg="flow" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          id="experiencia-title"
          number={5}
          eyebrow={<T {...tx("Experiencia", "Experience")} />}
          title={<T {...tx("Mi trayectoria", "My journey")} />}
          aside={legend}
        />

        <ol className="relative">
          {/* Línea de tiempo central (a la izquierda en móvil) */}
          <span aria-hidden="true" className="absolute bottom-0 left-2 top-0 w-px bg-line md:left-1/2" />
          {sortedExperience.map((item, i) => {
            const t = types[item.type];
            // Laboral a la izquierda y académica a la derecha, como en la leyenda.
            const left = item.type === "laboral";
            return (
              <li
                key={item.title.es + item.start}
                className="reveal relative pb-10 pl-10 last:pb-0 md:grid md:grid-cols-2 md:gap-20 md:pl-0"
                style={delay(i * 80)}
              >
                <span
                  className={`absolute left-2 top-7 z-10 -translate-x-1/2 md:left-1/2 ${t.marker}`}
                  aria-hidden="true"
                />
                <article
                  className={`rounded-layer border bg-harbor p-6 shadow-[0_20px_40px_-30px_var(--shadow-layer)] light:bg-snow sm:p-7 ${t.card} ${
                    left ? "md:col-start-1 md:text-right" : "md:col-start-2"
                  }`}
                >
                  <p className="label-mono text-accent">
                    <T {...t.label} /> ·{" "}
                    <time>
                      <T {...item.date} />
                    </time>
                  </p>
                  <h3 className="mt-2 text-2xl font-medium text-fg sm:text-3xl">
                    <T {...item.title} />
                  </h3>
                  <p className="mt-1 font-semibold text-fg/90">
                    <T {...item.place} />
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    <T {...item.description} />
                  </p>
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
