import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Og() {
  const img = await readFile(join(process.cwd(), "public", "headshot.png"));
  const src = `data:image/png;base64,${img.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#09090b",
          color: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            bottom: -260,
            width: 820,
            height: 820,
            borderRadius: 820,
            background: "radial-gradient(circle, rgba(255,59,47,0.6) 0%, rgba(255,59,47,0.15) 40%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 60,
            fontSize: 210,
            letterSpacing: 4,
            color: "#ff3b2f",
            opacity: 0.28,
          }}
        >
          {site.word}
        </div>
        <img src={src} alt="" width={440} height={550} style={{ position: "absolute", right: 90, bottom: -10 }} />
        <div style={{ position: "absolute", left: 60, bottom: 64, display: "flex", flexDirection: "column", width: 640 }}>
          <div style={{ display: "flex", width: 56, height: 6, background: "#ff3b2f", marginBottom: 28 }} />
          <div style={{ fontSize: 54, fontWeight: 700, lineHeight: 1.1, whiteSpace: "nowrap" }}>{site.name}</div>
          <div style={{ marginTop: 18, fontSize: 24, lineHeight: 1.35, color: "#d4d4d8" }}>{site.role}</div>
          <div style={{ marginTop: 10, fontSize: 22, color: "#ff3b2f" }}>{site.where}</div>
        </div>
      </div>
    ),
    size,
  );
}
