"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Project } from "@/data/projects";
import { badgeFor } from "@/lib/badges";
import { ButtonLink } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { Chip } from "./ui/Primitives";

// Radar del inicio: cada proyecto es un "eco". Al pasar el mouse, enfocar con el teclado
// o tocar un eco, su tarjeta se expande desde ese punto hacia el centro del radar.

const RADII = [0.7, 0.5, 0.78];
/** Duración de una vuelta del haz (s). Los ecos destellan justo cuando el haz pasa. */
const SWEEP = 6;
/** Tiempo que el mouse debe quedarse en otro eco para cambiar de tarjeta. */
const SWITCH_DELAY = 140;
const CLOSE_DELAY = 320;

/** Posición del eco i (en % del radar) y su rumbo (grados desde el norte, sentido horario). */
function blipAt(i: number, n: number) {
  const deg = -50 + (i * 360) / n;
  const angle = (deg * Math.PI) / 180;
  const r = RADII[i % RADII.length] * 50;
  return { x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle), bearing: (((deg + 90) % 360) + 360) % 360 };
}

// Marcas del bisel: cada 5°, más largas cada 30°.
const ticks = Array.from({ length: 72 }, (_, k) => {
  const a = (k * 5 * Math.PI) / 180;
  const long = k % 6 === 0;
  const r1 = long ? 88 : 91.5;
  // Redondeo a 2 decimales: el servidor y el navegador deben generar exactamente el mismo número.
  const r = (v: number) => Math.round(v * 100) / 100;
  return { x1: r(100 + r1 * Math.sin(a)), y1: r(100 - r1 * Math.cos(a)), x2: r(100 + 95 * Math.sin(a)), y2: r(100 - 95 * Math.cos(a)), long };
});

export function HeroRadar({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeTimer = useRef(0);
  const switchTimer = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const blipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = projects.length;
  const blips = projects.map((_, i) => blipAt(i, n));

  const clearTimers = () => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(switchTimer.current);
  };
  const show = (i: number) => {
    clearTimers();
    setOpen(i);
  };
  // Con una tarjeta abierta, pasar de largo por otro eco no la cambia: hay que detenerse en él.
  const hoverBlip = (i: number) => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(switchTimer.current);
    if (open === null || open === i) setOpen(i);
    else switchTimer.current = window.setTimeout(() => setOpen(i), SWITCH_DELAY);
  };
  const leaveBlip = () => window.clearTimeout(switchTimer.current);
  const hideSoon = () => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpen(null), CLOSE_DELAY);
  };
  const close = (focusBlip = false) => {
    clearTimers();
    if (focusBlip && open !== null) blipRefs.current[open]?.focus();
    setOpen(null);
  };

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        blipRefs.current[open]?.focus();
        setOpen(null);
      }
    };
    // En pantallas táctiles, tocar fuera del radar cierra la tarjeta.
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  useEffect(() => () => clearTimers(), []);

  const active = open !== null ? blips[open] : null;

  return (
    <div className="w-full max-w-[32rem]">
      <div
        ref={rootRef}
        className="relative aspect-square w-full"
        onMouseEnter={() => window.clearTimeout(closeTimer.current)}
        onMouseLeave={hideSoon}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hideSoon();
        }}
      >
        {/* Disco, bisel con marcas, anillos y cruz: decorativos */}
        <div aria-hidden="true" className="radar-disc absolute inset-[2.5%] rounded-full border border-line" />
        <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-0 h-full w-full overflow-visible">
          <g stroke="var(--line)" fill="none">
            {ticks.map((t, k) => (
              <line key={k} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth={t.long ? 0.8 : 0.45} />
            ))}
            <circle cx="100" cy="100" r="64" strokeWidth="0.5" strokeDasharray="1.5 2.5" />
            <circle cx="100" cy="100" r="32" strokeWidth="0.5" strokeDasharray="1.5 2.5" />
            <path d="M14 100H186M100 14V186" strokeWidth="0.4" />
          </g>
          <g className="fill-muted font-mono" fontSize="5" textAnchor="middle" dominantBaseline="middle">
            <text x="100" y="5">000</text>
            <text x="196" y="100">090</text>
            <text x="100" y="196">180</text>
            <text x="4" y="100">270</text>
          </g>
          {/* Fijación: línea del centro al eco elegido */}
          {active && (
            <g className="radar-lock">
              <line x1="100" y1="100" x2={active.x * 2} y2={active.y * 2} stroke="var(--accent)" strokeWidth="0.6" strokeDasharray="2 2" />
              <circle cx={active.x * 2} cy={active.y * 2} r="7" fill="none" stroke="var(--accent)" strokeWidth="0.7" />
            </g>
          )}
          <circle cx="100" cy="100" r="2" fill="var(--accent)" />
        </svg>
        <div aria-hidden="true" className="radar-sweep pointer-events-none absolute inset-[2.5%] rounded-full" style={{ "--sweep": `${SWEEP}s` } as CSSProperties} />

        {projects.map((p, i) => {
          const { x, y, bearing } = blips[i];
          const right = x > 50; // El eco está a la derecha: la etiqueta mira hacia el centro
          const isOpen = open === i;
          const dimmed = open !== null && !isOpen;
          return (
            <div key={p.id} className="absolute z-20" style={{ left: `${x}%`, top: `${y}%` }}>
              <button
                ref={(el) => {
                  blipRefs.current[i] = el;
                }}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`eco-${p.id}`}
                onMouseEnter={() => hoverBlip(i)}
                onMouseLeave={leaveBlip}
                onFocus={() => show(i)}
                onClick={() => (isOpen ? close() : show(i))}
                className={`group absolute top-0 flex min-h-11 -translate-y-1/2 items-center gap-2 rounded-full px-1 transition-opacity duration-200 ${
                  right ? "right-0 translate-x-[1.125rem] flex-row-reverse" : "left-0 -translate-x-[1.125rem]"
                } ${dimmed ? "opacity-45 hover:opacity-100 focus-visible:opacity-100" : ""}`}
              >
                <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="radar-flash absolute inset-0 rounded-full bg-accent/50"
                    style={{ "--sweep": `${SWEEP}s`, animationDelay: `${(bearing / 360) * SWEEP}s` } as CSSProperties}
                  />
                  <span aria-hidden="true" className="relative h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
                </span>
                <span
                  className={`flex items-center gap-2 whitespace-nowrap rounded-full border py-1 pl-1.5 pr-3 text-sm font-semibold transition-colors ${
                    isOpen ? "border-accent bg-action text-on-action" : "border-line bg-bg/85 text-fg backdrop-blur-sm group-hover:border-accent"
                  }`}
                >
                  <span className={`rounded-full px-1.5 font-mono text-[0.7rem] ${isOpen ? "bg-on-action/20" : "bg-surface-soft text-accent"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {p.title}
                </span>
              </button>
            </div>
          );
        })}

        {/* Tarjeta: se expande desde el eco hacia el centro. Va por encima de los ecos para que
            nada debajo la cambie mientras el mouse va hacia sus botones. */}
        {projects.map((p, i) => {
          const { x, y } = blips[i];
          const right = x > 50;
          const below = y > 50;
          const badge = badgeFor(p);
          return (
            <div
              key={p.id}
              id={`eco-${p.id}`}
              role="region"
              aria-label={p.title}
              hidden={open !== i}
              onMouseEnter={() => window.clearTimeout(switchTimer.current)}
              className="radar-card absolute z-30 w-[min(19rem,100%)] overflow-hidden rounded-layer border border-accent/50 bg-harbor shadow-[0_30px_70px_-25px_var(--shadow-layer)] light:bg-snow"
              style={{
                // Nunca se sale del ancho del radar.
                left: `clamp(0px, calc(${x}% ${right ? "- min(19rem, 100%) + 0.5rem" : "- 0.5rem"}), calc(100% - min(19rem, 100%)))`,
                ...(below ? { bottom: `calc(${100 - y}% + 1.6rem)` } : { top: `calc(${y}% + 1.6rem)` }),
                transformOrigin: `${right ? "right" : "left"} ${below ? "bottom" : "top"}`,
              }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-soft px-5 py-2.5">
                <p className="label-mono text-accent">
                  Eco {String(i + 1).padStart(2, "0")} · {p.platforms.join(" · ")}
                </p>
                {badge && (
                  <span className="rounded-full bg-action px-2.5 py-1 text-[0.7rem] font-semibold leading-none text-on-action">{badge}</span>
                )}
              </div>
              <div className="p-5">
                <p className="font-display text-3xl font-medium tracking-[-0.02em] text-fg">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tecnologías">
                  {p.tags.slice(0, 3).map((t) => (
                    <li key={t}>
                      <Chip tone="plain" className="rounded-full">
                        {t}
                      </Chip>
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
              </div>
              <button
                type="button"
                onClick={() => close(true)}
                aria-label={`Cerrar ${p.title}`}
                className="absolute right-1 top-0.5 hidden h-9 w-9 items-center justify-center rounded-full text-muted hover:text-fg [@media(hover:none)]:inline-flex"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Lectura del radar */}
      <div className="label-mono mt-5 flex items-center justify-between gap-4 border-t border-line pt-3 text-muted">
        <span>{String(n).padStart(2, "0")} ecos detectados</span>
        <span aria-live="polite" className={open !== null ? "text-accent" : ""}>
          {open !== null
            ? `${projects[open].title} · rumbo ${String(Math.round(blips[open].bearing)).padStart(3, "0")}°`
            : "Pasa el mouse o toca un eco"}
        </span>
      </div>
    </div>
  );
}
