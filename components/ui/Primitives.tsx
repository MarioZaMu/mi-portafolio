import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

/** Retardo escalonado para las animaciones .rise / .reveal. */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Contenedor central: máx. 1200 px con gutter de 16/32 px. */
export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[75rem] px-4 sm:px-6 md:px-8 ${className}`}>{children}</div>;
}

type ChipProps = HTMLAttributes<HTMLSpanElement> & { tone?: "teal" | "warm" | "plain" };

/** Etiqueta mono de 12 px (tecnologías, datos rápidos). */
export function Chip({ tone = "teal", className = "", children, ...props }: ChipProps) {
  const tones = {
    teal: "border-line bg-surface-soft text-accent",
    warm: "border-crimson/60 bg-crimson/15 text-accent-warm",
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

/** Tarjeta base: superficie de la paleta y borde teal translúcido. */
export function Card({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`rounded-card border border-line bg-surface ${className}`} {...props}>
      {children}
    </div>
  );
}

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "start" | "center";
};

/** Título de sección con etiqueta superior estilo carta topográfica. */
export function SectionHeading({ id, eyebrow, title, intro, align = "start" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <header className={`reveal mb-10 max-w-3xl md:mb-12 ${centered ? "mx-auto text-center" : ""}`}>
      <p className={`label-mono flex items-center gap-3 text-accent ${centered ? "justify-center" : ""}`}>
        <span aria-hidden="true" className="inline-block h-px w-8 bg-current" />
        <span>{eyebrow}</span>
      </p>
      <h2 id={id} className="mt-4 text-4xl font-medium leading-[1.05] text-fg sm:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
    </header>
  );
}

/** Mosaico del diseño bento. `as` permite usarlo como <li>, <article>, etc. */
export function Tile({
  as: Tag = "div",
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLElement> & { as?: "div" | "li" | "article" | "section" }) {
  return (
    <Tag className={`tile ${className}`} {...props}>
      {children}
    </Tag>
  );
}
