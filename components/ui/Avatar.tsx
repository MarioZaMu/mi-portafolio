import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { site } from "@/data/site";
import { contourRings } from "@/lib/contours";

// Se evalúa en el build: si existe public/images/profile.jpg se muestra la foto real.
const hasPhoto = existsSync(path.join(process.cwd(), "public", site.photo));

type AvatarProps = {
  size: number;
  priority?: boolean;
  className?: string;
};

/** Foto o monograma "MZ" rodeado de curvas de nivel (tratamiento propio del Hero). */
export function Avatar({ size, priority = false, className = "" }: AvatarProps) {
  const rings = contourRings({ cx: 200, cy: 200, count: 9, minRadius: 128, step: 9, seed: 7, wobble: 0.05 });
  return (
    <div className={`relative isolate aspect-square ${className}`} style={{ maxWidth: "100%" }}>
      <svg aria-hidden="true" viewBox="0 0 400 400" className="absolute inset-0 -z-10 h-full w-full overflow-visible">
        <g fill="none" stroke="var(--contour)">
          {rings.map((d, i) => (
            <path key={i} d={d} strokeWidth={i === 4 ? 1.6 : 0.8} opacity={1 - i * 0.08} />
          ))}
        </g>
      </svg>
      <div className="absolute inset-[18%] overflow-hidden rounded-full border border-line bg-deep shadow-[0_30px_60px_-30px_var(--shadow-layer)]">
        {hasPhoto ? (
          <Image
            src={site.photo}
            alt={`Retrato de ${site.name}`}
            fill
            sizes={`${Math.round(size * 0.64)}px`}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={`Avatar con las iniciales de ${site.name}`}
            className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_25%,var(--color-teal),var(--color-deep)_55%,var(--color-abyss))]"
          >
            <span
              aria-hidden="true"
              className="font-display font-medium italic text-mist"
              style={{ fontSize: size * 0.2 }}
            >
              {site.initials}
            </span>
          </div>
        )}
      </div>
      {/* Marca de cima: el "punto más alto" del mapa */}
      <span
        aria-hidden="true"
        className="absolute right-[13%] top-[14%] h-3 w-3 rotate-45 border-2 border-mist bg-crimson"
      />
    </div>
  );
}
