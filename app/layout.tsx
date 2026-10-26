import type { Metadata, Viewport } from "next";
import { Fraunces, JetBrains_Mono, Manrope } from "next/font/google";
import { WaveField } from "@/components/ui/WaveField";
import { site } from "@/data/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const description = `${site.role} en ${site.location}. Proyectos móviles, web y de escritorio con Kotlin, TypeScript y React.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Portafolio`,
    template: `%s · ${site.shortName}`,
  },
  description,
  applicationName: `Portafolio de ${site.shortName}`,
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  keywords: ["portafolio", "desarrollador de software", "ingeniería de software", "Pasto", "Kotlin", "Next.js", "UI/UX"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: `Portafolio de ${site.shortName}`,
    title: `${site.name} · Portafolio`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · Portafolio`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f1024" },
    { media: "(prefers-color-scheme: light)", color: "#e6e7eb" },
  ],
  colorScheme: "dark light",
};

// Corre antes del primer pintado: aplica el tema guardado o el del sistema y marca que hay JS.
const themeScript = `(function(){try{var d=document.documentElement;d.classList.add("js");var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-theme="dark"
      suppressHydrationWarning
      className={`${fraunces.variable} ${manrope.variable} ${jetbrains.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        {/* Fondo: resplandor suave + líneas onduladas, fijos detrás de todo el contenido */}
        <div aria-hidden="true" className="aurora pointer-events-none fixed inset-0 -z-50" />
        <WaveField />
        <a
          href="#contenido"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-card bg-action px-5 py-3 font-semibold text-on-action shadow-lg transition-transform focus-visible:translate-y-0"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
