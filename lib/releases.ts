import type { Project } from "@/data/projects";

// Lee el último release de GitHub de cada proyecto para que el botón de descarga
// aparezca (o cambie de versión) solo, sin editar data/projects.ts.
// La página se regenera como máximo cada REVALIDATE segundos (ISR).
const REVALIDATE = 300;

type Release = { tag: string; url: string; label: string };

type GitHubRelease = {
  tag_name: string;
  html_url: string;
  draft: boolean;
  assets: { name: string }[];
};

function labelFor(assets: { name: string }[]): string {
  const names = assets.map((a) => a.name.toLowerCase());
  if (names.some((n) => n.endsWith(".apk"))) return "Descargar APK";
  if (names.some((n) => /\.(exe|msi|dmg|appimage|deb)$/.test(n))) return "Descargar app";
  return "Ver release";
}

async function latestRelease(repo: string): Promise<Release | null> {
  try {
    // GITHUB_TOKEN es opcional (solo sube el límite de la API); vive en Vercel, nunca en el repo.
    const token = process.env.GITHUB_TOKEN;
    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: REVALIDATE },
    });
    // 404 = el repositorio todavía no tiene releases publicados.
    if (!res.ok) return null;
    const data = (await res.json()) as GitHubRelease;
    if (data.draft) return null;
    return { tag: data.tag_name, url: data.html_url, label: labelFor(data.assets) };
  } catch {
    return null;
  }
}

/**
 * Completa cada proyecto con su último release:
 * - sin demo web → el release pasa a ser el botón principal («Descargar APK · v1.0.0»);
 * - con demo web → el release se agrega como enlace extra.
 * Si GitHub no responde, se queda con lo que diga data/projects.ts.
 */
export async function withLatestReleases(list: Project[]): Promise<Project[]> {
  return Promise.all(
    list.map(async (project) => {
      if (!project.releaseRepo) return project;
      const release = await latestRelease(project.releaseRepo);
      if (!release) return project;
      const label = `${release.label} · ${release.tag}`;
      if (!project.demoUrl) return { ...project, demoUrl: release.url, demoLabel: label };
      return { ...project, extraLinks: [...(project.extraLinks ?? []), { label, href: release.url }] };
    }),
  );
}
