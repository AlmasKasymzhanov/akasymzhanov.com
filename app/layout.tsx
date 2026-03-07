import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Almas Kasymzhanov — Marketplace Analytics & Data Products",
  description: "Personal website, blog & marketplace analytics tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#0a0a0f",
          color: "#e8e8f0",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {children}
      </body>
    </html>
  );
}
