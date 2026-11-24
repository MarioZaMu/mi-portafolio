import { site } from "@/data/site";
import { T, tx } from "@/lib/i18n";
import { ButtonLink } from "./ui/Button";
import { Container, SectionHeading } from "./ui/Primitives";

// Contribuciones de GitHub de los últimos 12 meses. Los datos se leen en el servidor y se
// refrescan solos (ISR); si el servicio no responde, la sección simplemente no aparece.
const REVALIDATE = 3600;

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Activity = { total: number; days: Day[] };

async function loadActivity(): Promise<Activity | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${site.githubUser}?y=last`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { total: { lastYear: number }; contributions: Day[] };
    if (!data.contributions?.length) return null;
    return { total: data.total.lastYear, days: data.contributions };
  } catch {
    return null;
  }
}

const MONTHS = {
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

// Más contribuciones = más intensidad del color de acento (el nivel 0 es solo la rejilla).
const LEVEL_CLASS = ["bg-line", "bg-accent/25", "bg-accent/50", "bg-accent/75", "bg-accent"] as const;

export default async function Activity() {
  const activity = await loadActivity();
  if (!activity) return null;

  // Semanas de domingo a sábado: se rellena el inicio para que la primera columna quede alineada.
  const first = new Date(`${activity.days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (Day | null)[] = [...Array<null>(first).fill(null), ...activity.days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  // Rótulo de mes sobre la semana que contiene el día 1.
  const monthAt = weeks.map((week) => {
    const firstOfMonth = week.find((d) => d && d.date.endsWith("-01"));
    return firstOfMonth ? Number(firstOfMonth.date.slice(5, 7)) - 1 : null;
  });

  const total = activity.total;

  return (
    <section id="actividad" aria-labelledby="actividad-title" data-bg="waves" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          id="actividad-title"
          number={8}
          eyebrow={<T {...tx("Actividad", "Activity")} />}
          title={<T {...tx("Mi actividad en GitHub", "My GitHub activity")} />}
          intro={
            <T
              {...tx(
                `${total.toLocaleString("es-CO")} contribuciones en los últimos 12 meses.`,
                `${total.toLocaleString("en-US")} contributions in the last 12 months.`,
              )}
            />
          }
          aside={
            <ButtonLink href={site.github} external variant="secondary" icon="github" iconPosition="start">
              <T {...tx("Ver perfil", "View profile")} />
            </ButtonLink>
          }
        />

        <div className="reveal overflow-hidden rounded-layer border border-line bg-harbor shadow-[0_24px_50px_-35px_var(--shadow-layer)] light:bg-snow">
          <div className="flex items-center gap-3 border-b border-line bg-surface-soft px-4 py-3 sm:px-5">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
            </span>
            <span className="truncate font-mono text-xs text-muted">
              git log --author={site.githubUser} --since=&quot;1 year&quot;
            </span>
          </div>

          {/* direction: rtl hace que en pantallas angostas el recorrido empiece en lo más reciente */}
          <div className="overflow-x-auto px-4 py-5 sm:px-5" style={{ direction: "rtl" }}>
            <div style={{ direction: "ltr" }} className="min-w-[44rem]">
              <div
                aria-hidden="true"
                className="grid gap-[3px] pb-2 font-mono text-[0.65rem] leading-none text-muted"
                style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
              >
                {monthAt.map((m, i) => (
                  <span key={i} className="overflow-visible whitespace-nowrap">
                    {m !== null && (
                      <>
                        <span data-l="es" lang="es">
                          {MONTHS.es[m]}
                        </span>
                        <span data-l="en" lang="en">
                          {MONTHS.en[m]}
                        </span>
                      </>
                    )}
                  </span>
                ))}
              </div>

              <div
                aria-hidden="true"
                className="grid grid-flow-col gap-[3px]"
                style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}
              >
                {weeks.flatMap((week, wi) =>
                  Array.from({ length: 7 }, (_, di) => {
                    const d = week[di];
                    return d ? (
                      <span
                        key={`${wi}-${di}`}
                        title={`${d.date}: ${d.count}`}
                        className={`aspect-square rounded-[3px] ${LEVEL_CLASS[d.level]}`}
                      />
                    ) : (
                      <span key={`${wi}-${di}`} className="aspect-square" />
                    );
                  }),
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-3 font-mono text-xs text-muted sm:px-5">
            <span className="text-accent">
              $ <T {...tx("datos en vivo desde GitHub", "live data from GitHub")} />
            </span>
            <span aria-hidden="true" className="flex items-center gap-1.5">
              <T {...tx("Menos", "Less")} />
              {LEVEL_CLASS.map((c) => (
                <span key={c} className={`h-3 w-3 rounded-[3px] ${c}`} />
              ))}
              <T {...tx("Más", "More")} />
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
