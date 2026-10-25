"use client";

import Image from "next/image";
import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import { ButtonLink, buttonClasses } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { Chip, Container, SectionHeading } from "./ui/Primitives";

const ALL = "Todos";
// Filtro por tecnología principal (primera etiqueta) para no saturar de opciones (ley de Hick).
const filters = [ALL, ...Array.from(new Set(projects.map((p) => p.tags[0])))];

function PendingLink({ label }: { label: string }) {
  return (
    <span aria-disabled="true" className={buttonClasses("secondary", "md", "border-dashed")} title="Enlace pendiente">
      <Icon name="clock" size={18} className="shrink-0" />
      <span>{label}</span>
    </span>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const titleId = `proyecto-${project.id}`;
  return (
    <li className="h-full">
      <article
        aria-labelledby={titleId}
        className="layered group flex h-full flex-col rounded-layer border border-line bg-surface transition-transform duration-300 hover:-translate-y-1 focus-within:-translate-y-1 motion-reduce:transform-none"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-layer border-b border-line">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            unoptimized={project.image.endsWith(".svg")}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none"
          />
          <span className="label-mono absolute left-4 top-4 rounded-chip bg-abyss/85 px-2 py-1 text-mist">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Cuadro interior de vidrio que se monta sobre la imagen */}
        <div className="glass relative z-10 mx-3 -mt-10 flex flex-1 flex-col rounded-card p-5 sm:mx-4 sm:p-6">
          <h3 id={titleId} className="text-2xl font-medium text-fg">
            {project.title}
          </h3>
          <p className="mt-2 text-base leading-relaxed text-muted">{project.description}</p>
          <p className="mt-3 text-sm text-fg">
            <span className="label-mono text-accent">Mi aporte · </span>
            {project.role}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Tecnologías de ${project.title}`}>
            {project.tags.map((tag) => (
              <li key={tag}>
                <Chip>{tag}</Chip>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-2 pt-6">
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
                variant="tonal"
                icon="external"
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
                aria-label={`${link.label} de ${project.title} en GitHub`}
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

export default function Projects() {
  const [filter, setFilter] = useState(ALL);
  const visible = filter === ALL ? projects : projects.filter((p) => p.tags[0] === filter);

  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          id="proyectos-title"
          index="03"
          eyebrow="Proyectos"
          title="Lo que he construido"
          intro="Apps móviles, de escritorio y web. Cada tarjeta enlaza al código en GitHub y a su demo en vivo."
        />

        <div className="reveal">
          <div role="group" aria-label="Filtrar proyectos por tecnología principal" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`min-h-11 shrink-0 rounded-full border px-4 font-mono text-xs uppercase tracking-wider transition-colors ${
                  filter === f
                    ? "border-accent bg-accent text-bg"
                    : "border-line text-muted hover:border-accent hover:text-fg"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            {visible.length === 1 ? "1 proyecto visible" : `${visible.length} proyectos visibles`}
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 pr-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} index={projects.indexOf(p)} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
