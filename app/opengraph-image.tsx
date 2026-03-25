import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Almas Kasymzhanov — Founder of Redstat & 10b.kz";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0a0a0a",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "50%",
              background: "#222",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              color: "#ededed",
              fontWeight: 700,
            }}
          >
            AK
          </div>

          <div
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#ededed",
              letterSpacing: "-0.02em",
            }}
          >
            Almas Kasymzhanov
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "#888888",
              display: "flex",
              gap: "16px",
              alignItems: "center",
            }}
          >
            <span>Redstat</span>
            <span style={{ color: "#444" }}>·</span>
            <span>10b.kz</span>
            <span style={{ color: "#444" }}>·</span>
            <span>Marketplace Analytics</span>
          </div>

          <div
            style={{
              fontSize: "16px",
              color: "#555",
              marginTop: "8px",
            }}
          >
            akasymzhanov.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
