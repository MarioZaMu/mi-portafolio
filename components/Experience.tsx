import { sortedExperience, type ExperienceType } from "@/data/experience";
import { Icon } from "./ui/Icon";
import { Container, SectionHeading, delay } from "./ui/Primitives";

const types: Record<ExperienceType, { label: string; icon: "graduation" | "briefcase"; marker: string; text: string }> = {
  academica: { label: "Académica", icon: "graduation", marker: "bg-deep text-mist border-teal-300 rounded-full", text: "text-accent" },
  laboral: { label: "Laboral", icon: "briefcase", marker: "bg-crimson text-mist border-crimson-300 rounded-lg", text: "text-accent-warm" },
};

export default function Experience() {
  return (
    <section id="experiencia" aria-labelledby="experiencia-title" className="relative py-16 md:py-20">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="experiencia-title"
            eyebrow="Experiencia"
            title="Trayectoria académica y laboral"
            intro="De la más reciente a la más antigua."
          />
          {/* Leyenda */}
          <ul className="reveal mb-10 flex flex-wrap gap-5 md:mb-12" aria-label="Leyenda de la línea de tiempo">
            {(Object.keys(types) as ExperienceType[]).map((k) => (
              <li key={k} className="flex items-center gap-2">
                <span className={`flex h-8 w-8 items-center justify-center border-2 ${types[k].marker}`} aria-hidden="true">
                  <Icon name={types[k].icon} size={16} />
                </span>
                <span className="font-medium text-fg">{types[k].label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Línea de tiempo: fecha | marcador | tarjeta a todo el ancho, sin columnas vacías */}
        <ol className="relative grid gap-3 lg:gap-4">
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[1.375rem] top-0 w-0.5 bg-[repeating-linear-gradient(to_bottom,var(--line)_0_10px,transparent_10px_16px)] md:left-[12.375rem]"
          />
          {sortedExperience.map((item, i) => {
            const t = types[item.type];
            return (
              <li
                key={item.title + item.start}
                className="reveal relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 md:grid-cols-[10rem_2.75rem_minmax(0,1fr)] md:gap-x-6"
                style={delay(i * 80)}
              >
                <p className={`label-mono col-start-2 pb-2 md:col-start-1 md:row-start-1 md:pt-7 md:pb-0 md:text-right ${t.text}`}>
                  <time>{item.date}</time>
                </p>
                <span
                  className={`relative z-10 col-start-1 row-start-1 row-span-2 mt-5 flex h-11 w-11 items-center justify-center border-2 md:col-start-2 md:row-span-1 ${t.marker}`}
                >
                  <Icon name={t.icon} size={20} />
                  <span className="sr-only">Experiencia {t.label.toLowerCase()}</span>
                </span>
                <article className="tile col-start-2 p-6 hover:border-accent md:col-start-3 md:row-start-1 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-8">
                  <div>
                    <h3 className="text-2xl font-medium text-fg">{item.title}</h3>
                    <p className="mt-1 font-semibold text-muted">{item.place}</p>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-muted sm:mt-0">{item.description}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
