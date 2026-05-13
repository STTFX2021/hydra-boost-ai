# Plan: i18n + SEO multilingüe (ES/EN/FR/DE/PT/IT)

## Por qué fases y no "todo de golpe"

- **~50 páginas** en `src/pages/` + ~30 componentes con copy. Traducir todo a 6 idiomas = miles de strings.
- **Refactor de routing con prefijo `/en/...`** afecta `App.tsx`, todos los `<Link>`, `Header`, `Footer`, `sitemap.xml`, redirects, canonicals ya indexados en Google.
- Hacerlo en un solo paso = alta probabilidad de romper formularios, navegación y SEO actual (que ya está posicionado en `hydrailabs.com/...`).

Entrego en 4 fases. Tú apruebas cada una antes de la siguiente.

---

## FASE 1 — SEO multilingüe técnico (este mensaje)

Objetivo: que Google entienda los idiomas **sin romper nada existente**.

1. **`SEOHead` extendido** con prop `alternates` que emite:
   - `<link rel="alternate" hreflang="es" href="...">` × 6 idiomas + `x-default`
   - `og:locale` y `og:locale:alternate`
2. **Hook `useLocalizedSEO()`** que dado el path actual genera los 6 alternates con prefijo `/es/`, `/en/`, etc. Mientras las rutas prefijadas no existen, los alternates apuntan al canonical actual con `?lang=xx` como fallback indexable.
3. **`sitemap.xml`** regenerado con `<xhtml:link rel="alternate" hreflang="...">` por URL.
4. **`index.html`**: cambiar `<html lang="es">` dinámicamente vía `Helmet` según idioma activo.
5. **`robots.txt`**: confirmar que no bloquea futuros prefijos `/en/`, `/fr/`, etc.

**No rompe URLs existentes.** Google empieza a entender que el sitio es multilingüe.

---

## FASE 2 — Detector de strings hardcodeados

Script `scripts/i18n-audit.ts`:
- Recorre `src/` con AST (ts-morph o regex pragmático)
- Detecta literales en JSX (`>Texto<`, `placeholder="Texto"`, `title="Texto"`, `aria-label="Texto"`) que NO estén envueltos en `t()` o no vengan de un `COPY[language]`.
- Genera `/tmp/i18n-report.md` con: archivo, línea, string, sugerencia de clave.
- Añadido a `package.json` como `npm run i18n:audit`.

Esto te da el inventario **real** de cuánto queda por traducir antes de prometer "todo traducido".

---

## FASE 3 — Refactor de routing con prefijo de idioma (decisión crítica)

Solo después de ver el reporte de Fase 2:
- Mover `App.tsx` a rutas anidadas: `<Route path="/:lang/*">` con detección/redirect desde `/`.
- Crear `useLocalizedNavigate()` y `<LocalizedLink>` que respetan el idioma activo.
- Redirects 301 desde rutas viejas a `/es/...` (preservar SEO actual).
- Actualizar `Header`, `Footer`, todos los `<Link>` (hay ~200+).
- Actualizar `sitemap.xml` con URLs prefijadas reales.

**Esta fase sola es 1-2 mensajes grandes.** Riesgo alto si se hace junto con traducciones.

---

## FASE 4 — Traducción de contenido por bloques

Página por página, en este orden de prioridad:
1. Home (componentes en `src/components/landing/*` — varios ya tienen `COPY` parcial)
2. Header / Footer / navegación
3. Servicios + sus subpáginas
4. Precios
5. Contacto
6. Casos / Portfolio
7. Blog (los posts probablemente quedan solo en ES — la traducción de artículos largos no debería ser automática)

Patrón unificado: cada componente expone un `COPY: Record<Language, {...}>` y consume `useI18n()`. Donde ya existe (ej. `GrowthSystemSection`), se reutiliza.

---

## Qué hago AHORA si apruebas

Solo **Fase 1**. Cambios contenidos, sin tocar contenido ni rutas:
- `src/components/seo/SEOHead.tsx` — soporte de alternates hreflang
- `src/components/seo/useLocalizedSEO.ts` — nuevo hook
- `src/lib/i18n.ts` — exportar `LANGUAGES` con códigos hreflang
- `public/sitemap.xml` — añadir `xhtml:link` alternates
- `src/main.tsx` o root — `<html lang>` dinámico

Tras eso, te entrego el resultado y decidimos si avanzar a Fase 2.

---

## Lo que NO voy a hacer sin aprobación explícita

- No traduciré los posts del blog automáticamente (calidad cuestionable, SEO penalizable).
- No romperé las URLs actuales (`hydrailabs.com/servicios`) — se preservan con redirects.
- No tocaré edge functions, formularios ni el sistema de leads.
