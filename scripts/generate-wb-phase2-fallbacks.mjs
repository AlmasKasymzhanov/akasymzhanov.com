import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "public", "blog", "wb-dual-use", "charts");

const themes = {
  light: { bg: "#ffffff", text: "#171717", dim: "#666666", border: "#e5e5e5", accent: "#a90d8e" },
  dark: { bg: "#171717", text: "#ededed", dim: "#999999", border: "#343434", accent: "#e360c9" },
};

const growthRows = [
  ["Маскировочные костюмы", 75, "41,6 млн → 3,15 млрд ₽", "продажи ≈×37"],
  ["Разгрузочные пояса", 48, "10,2 млн → 497,0 млн ₽", "продажи ≈×31"],
  ["Разгрузочные жилеты", 38, "32,0 млн → 1,20 млрд ₽", "продажи ≈×22"],
  ["Маскировочные сети", 22, "36,8 млн → 818,2 млн ₽", "продажи почти ×20"],
];

const anniversary = [
  ["До", 1, "10,2 млн ₽"],
  ["1-й год", 8.232827, "84,8 млн ₽"],
  ["2-й год", 35.357831, "364,2 млн ₽"],
  ["3-й год", 49.102352, "507,1 млн ₽"],
  ["4-й год", 45.09005, "464,4 млн ₽"],
];

const esc = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const line = (x1, y1, x2, y2, attrs = "") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${attrs}/>`;
const text = (x, y, value, attrs = "") => `<text x="${x}" y="${y}" ${attrs}>${esc(value)}</text>`;

function svgFrame(width, height, theme, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="100%" height="100%" fill="${theme.bg}"/>
    <style>
      text{font-family:Arial,'Segoe UI',sans-serif;fill:${theme.text}}
      .mono{font-family:Consolas,'Courier New',monospace;fill:${theme.dim}}
      .bold{font-weight:700}.value{font-size:26px;font-weight:700}.label{font-size:18px;font-weight:700}.small{font-size:14px}.tiny{font-size:12px}
    </style>
    ${body}
  </svg>`;
}

function growthSvg(width, mobile, theme) {
  const height = mobile ? 840 : 610;
  const left = mobile ? 34 : 44;
  const right = mobile ? 34 : 44;
  const valueWidth = mobile ? 86 : 110;
  const plotLeft = left;
  const plotRight = width - right - valueWidth;
  const rowStep = mobile ? 190 : 132;
  const startY = mobile ? 55 : 48;
  let body = text(left, 25, "Среднедневной индекс GMV · шкала 0-80", 'class="mono small"');
  growthRows.forEach(([name, value, transition, sales], index) => {
    const y = startY + index * rowStep;
    const barY = y + 56;
    body += text(left, y, name, 'class="label"');
    body += text(left, y + 25, transition, 'class="mono small"');
    [0,20,40,60,80].forEach((tick) => {
      const x = plotLeft + tick / 80 * (plotRight - plotLeft);
      body += line(x, barY, x, barY + 40, `stroke="${theme.border}"`);
    });
    body += `<rect x="${plotLeft}" y="${barY + 8}" width="${value / 80 * (plotRight - plotLeft)}" height="24" rx="2" fill="${theme.accent}"/>`;
    body += text(plotRight + 16, barY + 30, `≈×${value}`, `class="value" style="fill:${theme.accent}"`);
    body += text(left, barY + 62, sales, 'class="mono small"');
  });
  [0,20,40,60,80].forEach((tick) => {
    const x = plotLeft + tick / 80 * (plotRight - plotLeft);
    body += text(x, height - 20, tick === 0 ? "0" : `×${tick}`, `class="mono tiny" ${tick === 80 ? 'text-anchor="end"' : ''}`);
  });
  return svgFrame(width, height, theme, body);
}

function anniversarySvg(width, mobile, theme) {
  const height = mobile ? 760 : 620;
  const left = mobile ? 62 : 82;
  const right = mobile ? 30 : 50;
  const top = mobile ? 72 : 78;
  const bottom = height - (mobile ? 92 : 88);
  const plotWidth = width - left - right;
  const plotHeight = bottom - top;
  let body = text(32, 28, "Разгрузочные пояса: один устойчивый ряд", 'class="label"');
  body += text(32, 53, "4-й год: 464,4 млн ₽ · 110 796 продаж", 'class="mono small"');
  [0,20,40,60,80].forEach((tick) => {
    const y = bottom - tick / 80 * plotHeight;
    body += line(left, y, width - right, y, `stroke="${theme.border}"`);
    body += text(left - 10, y + 4, tick === 0 ? "0" : `×${tick}`, 'class="mono tiny" text-anchor="end"');
  });
  const slot = plotWidth / anniversary.length;
  anniversary.forEach(([label, value, amount], index) => {
    const barWidth = mobile ? 58 : 86;
    const x = left + index * slot + (slot - barWidth) / 2;
    const barHeight = Math.max(5, value / 80 * plotHeight);
    const y = bottom - barHeight;
    body += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="2" fill="${theme.accent}"/>`;
    body += text(x + barWidth / 2, y - 12, index === 0 ? "База" : `≈×${Math.round(value)}`, `class="bold small" text-anchor="middle" style="fill:${theme.accent}"`);
    body += text(x + barWidth / 2, bottom + 27, label, 'class="mono tiny" text-anchor="middle"');
    body += text(x + barWidth / 2, bottom + 50, amount, 'class="mono tiny" text-anchor="middle"');
  });
  return svgFrame(width, height, theme, body);
}

async function writePng(name, svg, width) {
  await sharp(Buffer.from(svg)).resize({ width: width * 2 }).png({ compressionLevel: 9 }).toFile(path.join(outputDir, name));
}

await fs.mkdir(outputDir, { recursive: true });
for (const [themeName, theme] of Object.entries(themes)) {
  await writePng(`phase2-scale-${themeName}.png`, growthSvg(1120, false, theme), 1120);
  await writePng(`phase2-scale-mobile-${themeName}.png`, growthSvg(680, true, theme), 680);
  await writePng(`phase2-anniversary-${themeName}.png`, anniversarySvg(1120, false, theme), 1120);
  await writePng(`phase2-anniversary-mobile-${themeName}.png`, anniversarySvg(680, true, theme), 680);
}

console.log("Generated 8 Phase 2 PNG fallbacks at 2× density.");
