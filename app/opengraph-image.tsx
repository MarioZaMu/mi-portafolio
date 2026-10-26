import { ImageResponse } from "next/og";
import { site } from "@/data/site";

// Imagen para compartir el enlace (Open Graph / redes sociales), generada en el build.
export const alt = `${site.name} · Portafolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "radial-gradient(circle at 85% 0%, #2D2F55 0%, #0F1024 60%)",
          color: "#E6E7EB",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            bottom: -260,
            width: 900,
            height: 260,
            background: "#4A4E9E",
            transform: "rotate(-24deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            bottom: -160,
            width: 900,
            height: 60,
            background: "#A9ADF0",
            transform: "rotate(-24deg)",
          }}
        />
        <div style={{ fontSize: 26, letterSpacing: 6, color: "#A9ADF0" }}>
          {`${site.coordinates} · ${site.altitude}`.toUpperCase()}
        </div>
        <div style={{ fontSize: 88, marginTop: 24, lineHeight: 1 }}>Mario Alberto</div>
        <div style={{ fontSize: 88, fontStyle: "italic", color: "#A9ADF0", lineHeight: 1.1 }}>Zambrano Muñoz</div>
        <div style={{ fontSize: 32, marginTop: 32, maxWidth: 760 }}>{site.role}</div>
      </div>
    ),
    size,
  );
}
