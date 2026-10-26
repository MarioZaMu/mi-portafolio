"use client";

import Image from "next/image";
import { useState } from "react";
import type { Platform, Project, Shot } from "@/data/projects";
import { site } from "@/data/site";
import { badgeFor } from "@/lib/badges";
import { ButtonLink, buttonClasses } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { Chip, Container, SectionHeading } from "./ui/Primitives";

const ALL = "Todos";

function PendingLink({ label }: { label: string }) {
  return (
    <span aria-disabled="true" className={buttonClasses("secondary", "md", "border-dashed")} title="Enlace pendiente">
      <Icon name="clock" size={18} className="shrink-0" />
      <span>{label}</span>
    </span>
  );
}

const sizes = "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw";

/** Imagen que cambia con el tema: la versión clara solo se ve con data-theme="light". */
function ThemedImage({ shot, className, sizes }: { shot: Shot; className: string; sizes: string }) {
  return (
    <>
      <Image src={shot.src} alt={shot.alt} fill sizes={sizes} className={`${className} ${shot.srcLight ? "light:hidden" : ""}`} />
      {shot.srcLight && (
        <Image src={shot.srcLight} alt={shot.alt} fill sizes={sizes} className={`${className} hidden light:block`} />
      )}
    </>
  );
}

/** Capturas de la tarjeta: celulares lado a lado, o pantallas una a la vez con puntos para cambiar. */
function Shots({ project }: { project: Project }) {
  const [current, setCurrent] = useState(0);
  const zoom = "transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none";

  if (project.shotLayout === "phone") {
    return (
      <div className="absolute inset-0 flex items-end justify-center gap-3 px-4 pt-8">
        {project.shots.map((shot, i) => (
          <div
            key={shot.src}
            className={`relative h-full w-auto aspect-[3/4] overflow-hidden rounded-t-2xl border-x border-t border-line shadow-[0_-10px_30px_-18px_var(--shadow-layer)] transition-transform duration-500 motion-reduce:transform-none ${
              i % 2 ? "group-hover:-translate-y-1.5" : "group-hover:-translate-y-3"
            }`}
          >
            <ThemedImage shot={shot} sizes="200px" className="object-cover object-top" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {project.shots.map((shot, i) => (
        <div
          key={shot.src}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-500 ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <ThemedImage shot={shot} sizes={sizes} className={`object-cover object-top ${zoom}`} />
        </div>
      ))}
      {project.shots.length > 1 && (
        <div
          className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 rounded-full bg-midnight/70 px-1 backdrop-blur-sm"
          role="group"
          aria-label={`Capturas de ${project.title}`}
        >
          {project.shots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Ver captura ${i + 1} de ${project.shots.length}`}
              aria-pressed={i === current}
              className="group/dot inline-flex h-8 w-7 items-center justify-center"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-5 bg-snow" : "w-2 bg-snow/60 group-hover/dot:bg-snow"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const titleId = `proyecto-${project.id}`;
  const badge = badgeFor(project);
  return (
    <li className="h-full">
      <article
        aria-labelledby={titleId}
        className="group flex h-full flex-col overflow-hidden rounded-layer border border-line bg-harbor shadow-[0_24px_50px_-35px_var(--shadow-layer)] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent focus-within:-translate-y-1 motion-reduce:transform-none light:bg-snow"
      >
        <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-bg">
          <Shots project={project} />
          <span className="label-mono absolute left-3 top-3 rounded-full bg-midnight/85 px-3 py-1 text-pearl">
            {String(index + 1).padStart(2, "0")} / {project.platforms[0]}
          </span>
          {badge && (
            <span className="absolute right-3 top-3 rounded-full bg-action px-3 py-1 text-xs font-semibold text-on-action">
              {badge}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 id={titleId} className="text-2xl font-medium text-fg sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 text-base leading-relaxed text-muted">{project.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Tecnologías de ${project.title}`}>
            {project.tags.map((tag) => (
              <li key={tag}>
                <Chip className="rounded-full">{tag}</Chip>
              </li>
            ))}
          </ul>

          <details className="group/more mt-4">
            <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1 text-sm font-semibold text-accent underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden">
              <span className="group-open/more:hidden">Ver más</span>
              <span className="hidden group-open/more:inline">Ver menos</span>
              <Icon name="chevronRight" size={16} className="transition-transform group-open/more:rotate-90" />
            </summary>
            <p className="mt-1 text-sm leading-relaxed text-muted">{project.description}</p>
            <p className="mt-3 text-sm text-fg">
              <span className="label-mono text-accent">Mi aporte · </span>
              {project.role}
            </p>
          </details>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
            <ButtonLink
              href={project.githubUrl}
              external
              variant="secondary"
              icon="github"
              iconPosition="start"
              aria-label={`Código de ${project.title} en GitHub`}
            >
              GitHub
            </ButtonLink>
            {project.demoUrl ? (
              <ButtonLink
                href={project.demoUrl}
                external
                icon={project.demoLabel ? "download" : "external"}
                aria-label={`${project.demoLabel ?? "Demo en vivo"} de ${project.title}`}
              >
                {project.demoLabel ?? "Demo en vivo"}
              </ButtonLink>
            ) : (
              <PendingLink label="Demo pendiente" />
            )}
            {project.extraLinks?.map((link) => (
              <ButtonLink
                key={link.href}
                href={link.href}
                external
                variant="ghost"
                icon="external"
                aria-label={`${link.label} de ${project.title} (GitHub)`}
              >
                {link.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </article>
    </li>
  );
}

/** Celda que llena el hueco de la cuadrícula y lleva al resto del trabajo. */
function MoreOnGitHub() {
  return (
    <li className="h-full">
      <a
        href={site.github}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full min-h-56 flex-col items-center justify-center gap-3 rounded-layer border border-dashed border-line p-8 text-center transition-colors hover:border-accent hover:bg-periwinkle/5"
      >
        <Icon name="github" size={28} className="text-accent" />
        <span className="font-display text-2xl text-fg sm:text-3xl">Hay más en GitHub</span>
        <span className="label-mono text-accent group-hover:underline">github.com/{site.githubUser}</span>
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      </a>
    </li>
  );
}

// Recibe los proyectos ya completados con sus releases desde app/page.tsx (servidor).
export default function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Platform | typeof ALL>(ALL);
  // Filtro por plataforma, solo con las que existen (ley de Hick: pocas opciones claras).
  const order: Platform[] = ["Móvil", "Web", "Escritorio"];
  const filters: (Platform | typeof ALL)[] = [ALL, ...order.filter((pl) => projects.some((p) => p.platforms.includes(pl)))];
  const visible = filter === ALL ? projects : projects.filter((p) => p.platforms.includes(filter));

  return (
    <section id="proyectos" aria-labelledby="proyectos-title" data-bg="topo" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          id="proyectos-title"
          number={3}
          eyebrow="Proyectos"
          title="Proyectos"
          intro="Lo que he construido: cada uno enlaza a su código en GitHub y a su demo o descarga."
          aside={
            <div role="group" aria-label="Filtrar proyectos por plataforma" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors ${
                    filter === f
                      ? "border-action bg-action text-on-action"
                      : "border-line text-muted hover:border-accent hover:text-fg"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        />

        <div className="reveal">
          <p className="sr-only" aria-live="polite">
            {visible.length === 1 ? "1 proyecto visible" : `${visible.length} proyectos visibles`}
          </p>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} index={projects.indexOf(p)} />
            ))}
            {visible.length % 3 !== 0 && <MoreOnGitHub />}
          </ul>
        </div>
      </Container>
    </section>
  );
}
