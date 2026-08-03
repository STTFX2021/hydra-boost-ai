/**
 * Genera un resumen markdown de los reportes de Lighthouse CI (.lighthouseci)
 * para publicarlo como comentario en el PR y en el step summary.
 */
const fs = require("fs");
const path = require("path");

const DIR = process.env.LHCI_DIR || ".lighthouseci";
const TARGETS = {
  performance: 0.9,
  accessibility: 0.9,
  "best-practices": 0.9,
  seo: 0.95,
};

function latestReport() {
  if (!fs.existsSync(DIR)) return null;
  const files = fs
    .readdirSync(DIR)
    .filter((f) => f.startsWith("lhr-") && f.endsWith(".json"))
    .map((f) => path.join(DIR, f))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return files[0] || null;
}

const file = latestReport();
if (!file) {
  console.log("## 🔦 Lighthouse\n\nNo se encontraron reportes en `.lighthouseci`.");
  process.exit(0);
}

const lhr = JSON.parse(fs.readFileSync(file, "utf8"));
const lines = [
  "## 🔦 Lighthouse CI",
  "",
  `URL analizada: \`${lhr.finalUrl || lhr.requestedUrl}\``,
  "",
  "| Categoría | Score | Objetivo | Estado |",
  "| --- | --- | --- | --- |",
];

let below = false;
for (const [key, target] of Object.entries(TARGETS)) {
  const cat = lhr.categories[key];
  if (!cat) continue;
  const score = cat.score ?? 0;
  const ok = score >= target;
  if (!ok) below = true;
  lines.push(
    `| ${cat.title} | ${Math.round(score * 100)} | ${Math.round(target * 100)} | ${ok ? "✅" : "⚠️"} |`
  );
}

const metrics = ["largest-contentful-paint", "cumulative-layout-shift", "total-blocking-time", "speed-index"];
lines.push("", "| Métrica | Valor |", "| --- | --- |");
for (const id of metrics) {
  const audit = lhr.audits[id];
  if (audit) lines.push(`| ${audit.title} | ${audit.displayValue || "-"} |`);
}

lines.push(
  "",
  below
    ? "⚠️ Alguna categoría está por debajo del objetivo. Reportes completos en el artefacto `lighthouse-reports`."
    : "✅ Todas las categorías cumplen el objetivo."
);

console.log(lines.join("\n"));
