import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Almas Kasymzhanov — Founder of Redstat & 10b.kz";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const avatarBase64 = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/avatar/almas.png")).toString("base64")}`;

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
          <img
            src={avatarBase64}
            width="120"
            height="120"
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />

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
