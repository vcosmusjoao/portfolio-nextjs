import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "João Costa · Front-End Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          backgroundColor: "#0F172A",
          backgroundImage:
            "radial-gradient(circle, rgba(6,182,212,0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", color: "#06B6D4", fontSize: 30 }}>
          {"<joaovcosta.dev />"}
        </div>
        <div
          style={{
            display: "flex",
            color: "#E2E8F0",
            fontSize: 88,
            fontWeight: 700,
            marginTop: 28,
          }}
        >
          João Costa
        </div>
        <div
          style={{
            display: "flex",
            color: "#06B6D4",
            fontSize: 44,
            marginTop: 12,
          }}
        >
          Front-End Engineer
        </div>
        <div
          style={{
            display: "flex",
            color: "#94A3B8",
            fontSize: 30,
            marginTop: 28,
          }}
        >
          {"> Angular · TypeScript · React · Next.js"}
        </div>
      </div>
    ),
    { ...size }
  );
}
