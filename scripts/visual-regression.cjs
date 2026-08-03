/**
 * Pruebas de regresión visual: favicon, logos y estados del header.
 *
 * Uso:
 *   npm run test:visual              # captura contra http://localhost:8080
 *   BASE_URL=https://hydrailabs.com npm run test:visual
 *
 * Genera capturas en /tmp/visual-regression y falla si:
 *  - algún icono/manifest devuelve != 200
 *  - el logo del header no está visible o tiene tamaño 0
 *  - hay errores de consola en la ruta
 */
const fs = require("fs");
const path = require("path");

const BASE_URL = process.env.BASE_URL || "http://localhost:8080";
const OUT_DIR = process.env.VISUAL_OUT || "/tmp/visual-regression";

const ROUTES = [
  "/",
  "/servicios",
  "/precios",
  "/blog",
  "/contacto",
  "/auditoria-gratis",
  "/agentes-ia",
  "/casos",
];

const ASSETS = [
  "/favicon.ico",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/apple-touch-icon.png",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/maskable-icon-192x192.png",
  "/maskable-icon-512x512.png",
  "/brand/hydrai/hydrai-logo.webp",
  "/site.webmanifest",
];

const failures = [];

async function main() {
  const { chromium } = require("playwright");
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();

  // 1. Assets estáticos
  const ctx = await browser.newContext();
  for (const asset of ASSETS) {
    const res = await ctx.request.get(`${BASE_URL}${asset}`);
    if (res.status() !== 200) failures.push(`${asset} -> HTTP ${res.status()}`);
    else console.log(`ok  ${asset}`);
  }

  // 2. Rutas en desktop y móvil, estados normal + scroll (header compacto)
  const viewports = [
    { name: "desktop", width: 1280, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

    for (const route of ROUTES) {
      const slug = route === "/" ? "home" : route.replace(/\//g, "-").slice(1);
      await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });

      const logo = page.locator('header img[alt*="HydrAI" i]').first();
      const visible = await logo.isVisible().catch(() => false);
      if (!visible) {
        failures.push(`${vp.name}${route}: logo del header no visible`);
      } else {
        const box = await logo.boundingBox();
        if (!box || box.width < 8 || box.height < 8) {
          failures.push(`${vp.name}${route}: logo con tamaño inválido`);
        }
      }

      await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}-${slug}-top.png`) });

      // Estado scroll / navegación compacta
      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}-${slug}-scrolled.png`) });
    }

    if (errors.length) failures.push(`${vp.name}: errores de consola -> ${errors.slice(0, 3).join(" | ")}`);
    await context.close();
  }

  await browser.close();

  console.log(`\nCapturas en ${OUT_DIR}`);
  if (failures.length) {
    console.error("\nFALLOS:");
    failures.forEach((f) => console.error(` - ${f}`));
    process.exit(1);
  }
  console.log("Regresión visual OK");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
