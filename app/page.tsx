import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
      }}
    >
      <div style={{ maxWidth: 520, textAlign: "center" }}>
        <h1
          style={{
            fontSize: 42,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            margin: "0 0 12px",
            color: "#f0f0f8",
          }}
        >
          Almas Kasymzhanov
        </h1>
        <p
          style={{
            fontSize: 17,
            color: "#888",
            margin: "0 0 40px",
            lineHeight: 1.5,
          }}
        >
          Marketplace Analytics &amp; Data Products
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/tools/wb-analyzer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              borderRadius: 8,
              background: "#6c5ce7",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
          >
            WB Niche Analyzer
          </Link>
          <a
            href="https://github.com/AlmasKasymzhanov"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              borderRadius: 8,
              border: "1px solid #2a2a3a",
              color: "#ccc",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              transition: "border-color 0.15s",
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </main>
  );
}
