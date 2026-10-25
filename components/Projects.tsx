"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/projects";
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

function ProjectCard({ project, index, featured }: { project: Project; index: number; featured: boolean }) {
  const titleId = `proyecto-${project.id}`;
  return (
    <li className={`h-full ${featured ? "md:col-span-2" : ""}`}>
      <article
        aria-labelledby={titleId}
        className={`tile group flex h-full flex-col hover:-translate-y-1 hover:border-accent focus-within:-translate-y-1 motion-reduce:transform-none ${
          featured ? "lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]" : ""
        }`}
      >
        <div
          className={`relative aspect-[16/10] overflow-hidden border-line ${
            featured ? "border-b lg:aspect-auto lg:min-h-[26rem] lg:border-b-0 lg:border-r" : "border-b"
          }`}
        >
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes={featured ? "(min-width: 1024px) 680px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
            unoptimized={project.image.endsWith(".svg")}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none"
          />
          <span className="label-mono absolute left-4 top-4 rounded-chip bg-abyss/85 px-2 py-1 text-mist">
            {String(index + 1).padStart(2, "0")}
          </span>
          {featured && project.release && (
            <span className="label-mono absolute right-4 top-4 rounded-chip bg-crimson px-2 py-1 text-mist">
              {project.release.tag}
            </span>
          )}
        </div>

        <div className={`flex flex-1 flex-col p-6 ${featured ? "sm:p-8 lg:justify-center" : ""}`}>
          <h3 id={titleId} className={`font-medium text-fg ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
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

          <div className={`flex flex-wrap gap-2 pt-6 ${featured ? "lg:mt-4" : "mt-auto"}`}>
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

// Recibe los proyectos ya completados con sus releases desde app/page.tsx (servidor).
export default function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState(ALL);
  // Filtro por tecnología principal (primera etiqueta) para no saturar de opciones (ley de Hick).
  const filters = [ALL, ...Array.from(new Set(projects.map((p) => p.tags[0])))];
  const visible = filter === ALL ? projects : projects.filter((p) => p.tags[0] === filter);

  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="relative py-16 md:py-20">
      <Container>
        <SectionHeading
          id="proyectos-title"
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

          {/* Bento: el primero ocupa todo el ancho; si el último queda solo, también se estira. */}
          <ul className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
            {visible.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={projects.indexOf(p)}
                featured={i === 0 || (i === visible.length - 1 && i % 2 === 1)}
              />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
