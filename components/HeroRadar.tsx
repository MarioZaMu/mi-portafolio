"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { badgeFor } from "@/lib/badges";
import { ButtonLink } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { Chip } from "./ui/Primitives";

// Radar del inicio: cada proyecto es un "eco". Al pasar el mouse, enfocar con el teclado
// o tocar un eco, su tarjeta se expande desde ese punto hacia el centro del radar.

const RADII = [0.7, 0.5, 0.78];

/** Posición del eco i (en % del radar). Determinista: no cambia entre recargas. */
function blipAt(i: number, n: number) {
  const angle = ((-50 + (i * 360) / n) * Math.PI) / 180;
  const r = RADII[i % RADII.length] * 50;
  return { x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle) };
}

export function HeroRadar({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeTimer = useRef<number>(0);
  const blipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = projects.length;

  const show = (i: number) => {
    window.clearTimeout(closeTimer.current);
    setOpen(i);
  };
  // Pequeño retraso al salir: deja pasar el mouse del eco a su tarjeta sin que se cierre.
  const hideSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 180);
  };

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        blipRefs.current[open]?.focus();
        setOpen(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <div className="w-full max-w-[32rem]">
      <div
        className="relative aspect-square w-full"
        onMouseLeave={hideSoon}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hideSoon();
        }}
      >
        {/* Anillos, cruz y barrido: decorativos */}
        <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-0 h-full w-full overflow-visible">
          <g fill="none" stroke="var(--line)" strokeWidth="0.6">
            <circle cx="100" cy="100" r="99" />
            <circle cx="100" cy="100" r="66" />
            <circle cx="100" cy="100" r="33" />
            <path d="M1 100H199M100 1V199" strokeDasharray="2 3" />
          </g>
          <circle cx="100" cy="100" r="2.2" fill="var(--accent)" />
        </svg>
        <div aria-hidden="true" className="radar-sweep pointer-events-none absolute inset-0 rounded-full" />

        {projects.map((p, i) => {
          const { x, y } = blipAt(i, n);
          const right = x > 50; // El eco está a la derecha: la tarjeta crece hacia la izquierda
          const below = y > 50;
          const isOpen = open === i;
          const badge = badgeFor(p);
          const cardId = `eco-${p.id}`;
          return (
            <Fragment key={p.id}>
            <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
              <button
                ref={(el) => {
                  blipRefs.current[i] = el;
                }}
                type="button"
                aria-expanded={isOpen}
                aria-controls={cardId}
                onMouseEnter={() => show(i)}
                onFocus={() => show(i)}
                onClick={() => (isOpen ? setOpen(null) : show(i))}
                className={`group absolute top-0 z-30 flex min-h-11 -translate-y-1/2 items-center gap-2 rounded-full px-1 ${
                  right ? "right-0 translate-x-[1.125rem] flex-row-reverse" : "left-0 -translate-x-[1.125rem]"
                }`}
              >
                <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
                  <span aria-hidden="true" className="absolute inset-1 animate-ping rounded-full bg-accent/40 motion-reduce:hidden" />
                  <span
                    aria-hidden="true"
                    className={`relative h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-accent/25 transition-opacity ${
                      open !== null && !isOpen ? "opacity-40 group-hover:opacity-100" : ""
                    }`}
                  />
                </span>
                <span
                  className={`label-mono whitespace-nowrap rounded-full border px-2.5 py-1 transition-[opacity,background-color,border-color] ${
                    isOpen ? "border-accent bg-action text-on-action" : "border-line bg-bg/85 text-fg group-hover:border-accent"
                  } ${open !== null && !isOpen ? "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" : ""}`}
                >
                  {p.title} · {p.platforms[0]}
                </span>
              </button>
            </div>

              {/* Tarjeta que se expande desde el eco hacia el centro. Los ecos quedan por
                  encima (z-30) para poder pasar de un proyecto a otro sin cerrarla. */}
              <div
                id={cardId}
                role="region"
                aria-label={p.title}
                hidden={!isOpen}
                onMouseEnter={() => show(i)}
                className="radar-card absolute z-20 w-[min(18.5rem,100%)] rounded-layer border border-accent/60 bg-harbor p-5 shadow-[0_30px_60px_-25px_var(--shadow-layer)] light:bg-snow"
                style={{
                  // Crece desde el eco hacia el centro, pero nunca se sale del ancho del radar.
                  left: `clamp(0px, calc(${x}% ${right ? "- min(18.5rem, 100%) - 0.75rem" : "+ 0.75rem"}), calc(100% - min(18.5rem, 100%)))`,
                  ...(below ? { bottom: `calc(${100 - y}% + 1.5rem)` } : { top: `calc(${y}% + 1.5rem)` }),
                  transformOrigin: `${right ? "right" : "left"} ${below ? "bottom" : "top"}`,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="label-mono text-accent">
                    {String(i + 1).padStart(2, "0")} / {p.platforms.join(" · ")}
                  </p>
                  {badge && (
                    <span className="rounded-full bg-action px-2.5 py-1 text-[0.7rem] font-semibold leading-none text-on-action">
                      {badge}
                    </span>
                  )}
                </div>
                <p className="mt-2 font-display text-3xl font-medium tracking-[-0.02em] text-fg">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tecnologías">
                  {p.tags.slice(0, 3).map((t) => (
                    <li key={t}>
                      <Chip tone="plain">{t}</Chip>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <ButtonLink href={p.githubUrl} external variant="secondary" icon="github" iconPosition="start" className="px-4! py-2!">
                    GitHub
                  </ButtonLink>
                  {p.demoUrl ? (
                    <ButtonLink href={p.demoUrl} external icon={p.demoLabel ? "download" : "external"} className="px-4! py-2!">
                      {p.demoLabel ? "Descargar" : "Abrir"}
                    </ButtonLink>
                  ) : (
                    <ButtonLink href="#proyectos" icon="arrowRight" className="px-4! py-2!">
                      Ver detalles
                    </ButtonLink>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    blipRefs.current[i]?.focus();
                    setOpen(null);
                  }}
                  aria-label={`Cerrar ${p.title}`}
                  className="absolute right-2 top-2 hidden h-9 w-9 items-center justify-center rounded-full text-muted hover:text-fg [@media(hover:none)]:inline-flex"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>
            </Fragment>
          );
        })}
      </div>
      <p className="label-mono mt-5 text-center text-muted">
        {String(n).padStart(2, "0")} ecos detectados · pasa el mouse o toca uno
      </p>
    </div>
  );
}
