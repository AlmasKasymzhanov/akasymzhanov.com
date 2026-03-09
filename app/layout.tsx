import type { Metadata } from "next";
import { Manrope, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-heading",
});
const ibmPlex = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["cyrillic", "latin"],
  variable: "--font-body",
});
const jetbrains = JetBrains_Mono({
  subsets: ["cyrillic", "latin"],
  variable: "--font-mono",
});

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
    <html lang="ru" className={`${manrope.variable} ${ibmPlex.variable} ${jetbrains.variable}`}>
      <body className="font-body">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
