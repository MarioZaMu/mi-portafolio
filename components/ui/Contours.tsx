import { contourLines, contourRings, ribbon, type LinesOptions, type RingsOptions } from "@/lib/contours";

// Fondos decorativos: aria-hidden y sin eventos de puntero. Cada 5.ª curva es más gruesa,
// como las "curvas maestras" de un mapa topográfico real.

type FieldProps = {
  className?: string;
  width?: number;
  height?: number;
  opacity?: number;
};

export function ContourField({
  className = "",
  width = 800,
  height = 800,
  opacity = 0.5,
  ...rings
}: FieldProps & RingsOptions) {
  const paths = contourRings(rings);
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
    >
      <g fill="none" stroke="var(--contour)" vectorEffect="non-scaling-stroke">
        {paths.map((d, i) => (
          <path key={i} d={d} strokeWidth={i % 5 === 4 ? 1.6 : 0.8} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}

export function ContourStrata({
  className = "",
  opacity = 0.45,
  ...lines
}: Omit<FieldProps, "width" | "height"> & LinesOptions) {
  const paths = contourLines(lines);
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${lines.width} ${lines.height}`}
      preserveAspectRatio="none"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
    >
      <g fill="none" stroke="var(--contour)">
        {paths.map((d, i) => (
          <path key={i} d={d} strokeWidth={i % 5 === 4 ? 1.6 : 0.8} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}

/** Divisor entre capas: tres curvas finas que cruzan el ancho. */
export function StrataDivider({ seed = 3, className = "" }: { seed?: number; className?: string }) {
  return (
    <ContourStrata
      className={`h-10 w-full md:h-14 ${className}`}
      width={1200}
      height={60}
      count={3}
      gap={9}
      start={0.25}
      amplitude={14}
      seed={seed}
      opacity={0.7}
    />
  );
}

/** La franja diagonal de la ilustración: arena (ribbon) + rojo, con curvas finas encima. */
export function Ribbon({ className = "" }: { className?: string }) {
  const shape = { width: 1000, height: 1000, seed: 11, slope: -620, amplitude: 70, points: 12 } as const;
  const light = ribbon({ ...shape, count: 1, start: 0.78, thickness: 70 });
  const strong = ribbon({ ...shape, count: 1, start: 0.85, thickness: 120 });
  const lines = contourLines({ ...shape, count: 4, start: 0.87, gap: 22 });
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none select-none ${className}`}
    >
      <path d={light} fill="var(--ribbon)" opacity={0.8} />
      <path d={strong} fill="var(--color-marine)" opacity={0.9} />
      <g fill="none" stroke="var(--color-midnight)" strokeOpacity={0.55}>
        {lines.map((d, i) => (
          <path key={i} d={d} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}
