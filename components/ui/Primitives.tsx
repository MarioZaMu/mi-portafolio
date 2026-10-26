import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

/** Retardo escalonado para las animaciones .rise / .reveal. */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Contenedor central: máx. 1200 px con gutter de 16/32 px. */
export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[75rem] px-4 sm:px-6 md:px-8 ${className}`}>{children}</div>;
}

type ChipProps = HTMLAttributes<HTMLSpanElement> & { tone?: "periwinkle" | "warm" | "plain" };

/** Etiqueta mono de 12 px (tecnologías, datos rápidos). */
export function Chip({ tone = "periwinkle", className = "", children, ...props }: ChipProps) {
  const tones = {
    periwinkle: "border-line bg-surface-soft text-accent",
    warm: "border-periwinkle/50 bg-periwinkle/10 text-accent-warm",
    plain: "border-line bg-transparent text-muted",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-chip border px-2.5 py-1 font-mono text-xs leading-none ${tones[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

/** Tarjeta base: superficie de la paleta y borde periwinkle translúcido. */
export function Card({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`rounded-card border border-line bg-surface ${className}`} {...props}>
      {children}
    </div>
  );
}

type SectionHeadingProps = {
  id: string;
  /** Número de la sección en el recorrido («02 / Sobre mí»). */
  number?: number;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "start" | "center";
  /** Contenido a la derecha del título en escritorio (filtros, leyenda, insignias). */
  aside?: ReactNode;
};

/** Título de sección con etiqueta numerada estilo índice. */
export function SectionHeading({ id, number, eyebrow, title, intro, align = "start", aside }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <header
      className={`reveal mb-12 md:mb-14 ${centered ? "mx-auto max-w-3xl text-center" : ""} ${
        aside ? "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" : ""
      }`}
    >
      <div className="max-w-3xl">
        <p className={`label-mono text-accent ${centered ? "text-center" : ""}`}>
          {number !== undefined && <span>{String(number).padStart(2, "0")} / </span>}
          <span>{eyebrow}</span>
        </p>
        <h2 id={id} className="mt-4 text-4xl font-medium leading-[1.05] text-fg sm:text-5xl md:text-6xl">
          {title}
        </h2>
        {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </header>
  );
}
