"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";
import { badgeFor } from "@/lib/badges";
import { ButtonLink } from "./ui/Button";
import { Chip } from "./ui/Primitives";

// Posiciones del abanico: [atrás, medio, frente]. Todas comparten la misma celda de la
// cuadrícula y solo cambia el transform, así la altura del bloque nunca salta.
const slots = [
  "z-10 -rotate-[4deg] translate-x-0 translate-y-0 opacity-90",
  "z-20 -rotate-[1.5deg] translate-x-[9%] translate-y-11",
  "z-30 rotate-[1deg] translate-x-[18%] translate-y-22 shadow-[0_30px_60px_-25px_var(--shadow-layer)]",
];

export function HeroCards({ projects }: { projects: Project[] }) {
  const [front, setFront] = useState(0);
  const count = projects.length;
  // Orden de pintado: el elegido al frente y el resto detrás, en orden.
  const order = projects.map((_, i) => (i - front + count) % count);

  return (
    <div className="relative grid w-full max-w-[34rem] pb-24 pl-2 pr-[2%] sm:pl-0">
      {projects.map((p, i) => {
        const depth = order[i]; // 0 = frente
        const slot = slots[Math.max(0, slots.length - 1 - depth)];
        const isFront = depth === 0;
        const badge = badgeFor(p);
        const number = String(i + 1).padStart(2, "0");
        return (
          <article
            key={p.id}
            aria-label={`Proyecto ${number}: ${p.title}`}
            className={`relative w-[80%] self-start rounded-[1.5rem] border border-line bg-harbor p-5 transition-[transform,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] [grid-area:1/1] light:bg-snow sm:p-6 ${slot}`}
          >
            <div inert={!isFront} className={isFront ? "" : "select-none"}>
              <div className="flex items-center justify-between gap-3">
                <p className="label-mono text-accent">
                  {number} / Proyecto
                </p>
                {badge && (
                  <span className="rounded-full bg-action px-2.5 py-1 text-[0.7rem] font-semibold leading-none text-on-action">
                    {badge}
                  </span>
                )}
              </div>
              <p className="mt-3 font-display text-3xl font-medium tracking-[-0.02em] text-fg sm:text-4xl">{p.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tecnologías">
                {p.tags.slice(0, 3).map((t) => (
                  <li key={t}>
                    <Chip tone="plain">{t}</Chip>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <ButtonLink href={p.githubUrl} external variant="tonal" icon="github" iconPosition="start" className="px-4! py-2!">
                  GitHub
                </ButtonLink>
                {p.demoUrl ? (
                  <ButtonLink href={p.demoUrl} external icon={p.demoLabel ? "download" : "external"} className="px-4! py-2!">
                    {p.demoLabel ?? "Abrir proyecto"}
                  </ButtonLink>
                ) : (
                  <ButtonLink href="#proyectos" icon="arrowRight" className="px-4! py-2!">
                    Ver detalles
                  </ButtonLink>
                )}
              </div>
            </div>

            {/* Las tarjetas de atrás se traen al frente con un clic */}
            {!isFront && (
              <button
                type="button"
                onClick={() => setFront(i)}
                className="absolute inset-0 rounded-[inherit] transition-colors hover:bg-periwinkle/5"
              >
                <span className="sr-only">Mostrar {p.title} al frente</span>
              </button>
            )}
          </article>
        );
      })}
    </div>
  );
}
