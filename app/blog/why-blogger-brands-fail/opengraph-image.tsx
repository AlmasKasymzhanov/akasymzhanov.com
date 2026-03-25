import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Блеск и нищета Lick Beauty — Almas Kasymzhanov";
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
          padding: "80px",
          background: "#0a0a0a",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#f87171",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Анатомия провала блогерского бренда
          </div>

          <div
            style={{
              fontSize: "52px",
              fontWeight: 700,
              color: "#ededed",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            Блеск и нищета Lick Beauty
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "#888888",
              lineHeight: 1.5,
            }}
          >
            43 млн в первый месяц → 3.3 млн через полгода
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            <img
              src={avatarBase64}
              width="44"
              height="44"
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "16px", color: "#ededed", fontWeight: 600 }}>
                Almas Kasymzhanov
              </span>
              <span style={{ fontSize: "14px", color: "#555" }}>
                akasymzhanov.com
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
