# HydrAI Labs — Diagnóstico SEO (GSC) — 20/05/2026

## 1. Estado de Search Console (últimos 90 días)

| Métrica | Valor |
|---|---|
| Clics totales | 23 |
| Impresiones | 714 |
| CTR medio | 3,22 % |
| Clics desde España | 16 |
| Query principal | `hydrai` (6 clics / 465 impresiones / pos. 4,78 / CTR 1,29 %) |

### URLs principales

| URL | Clics | Impresiones | Diagnóstico |
|---|---|---|---|
| `/` | ~mayoría | alta | OK — concentra tráfico de marca, CTR mejorable |
| `/auditoria-gratis` | 1 | 58 | Bajo CTR — title/desc reforzados |
| `/servicios` | 0 | 51 | No indexada / sin clics — reforzada |
| `/industrias` | 0 | 65 | Sin clics — pendiente refuerzo de copy |
| `/blog` | 0 | 98 | Sin clics — falta enlazado interno |
| Resto comerciales | 0 | — | "Descubierta, sin indexar" |

## 2. Causas detectadas

1. **Sitemap inflado** con duplicados `?lang=en/de/fr/pt/it/ru` y idiomas eliminados (fr/pt/it). Google ignora o degrada URLs duplicadas → "Descubierta, sin indexar".
2. **Hreflang duplicado vía URL** en sitemap. Los `alternates` se gestionan en `<head>` (SEOHead). En sitemap basta la URL canónica.
3. **CTR de marca bajo** (1,29 % en `hydrai` pos. 4,78). Title antiguo no comunicaba bien la propuesta de valor para negocios en España.
4. **Páginas P0 sin metadatos optimizados** ni internal-linking visible desde Home.
5. **Falta de schema.org** específico (`ProfessionalService`, `FAQPage`) en la página de conversión `/auditoria-gratis`.

## 3. Acciones aplicadas (este commit)

### Sitemap
- Reescrito `public/sitemap.xml`: solo URLs canónicas en español + rutas `/ru/*`.
- Eliminados ~150 duplicados con `?lang=`.
- Añadidas todas las landings P0 que faltaban (`/auditoria-gratis`, `/auditoria-local`, `/contacto`, `/precios`, sectores y servicios).

### Title / Description / H1
Optimizados en `src/lib/i18n.ts` (`pageSEOTranslations`) para 4 idiomas:
- `/` — "HydrAI Labs | Agencia de IA y Automatización para Negocios en España".
- `/auditoria-gratis` — añadida key `auditoria` localizada (es/en/de/ru).
- `/contacto` — añadida key `contacto` localizada.
- `/servicios`, `/precios` — copy reorientado a negocios locales y CTA auditoría.

### Schema.org
- `/auditoria-gratis`: añadidos `ProfessionalServiceSchema`, `FAQSchema` (4 FAQs), además del `BreadcrumbSchema` y `WebPageSchema` ya presentes.

### Enlaces internos desde Home
- Reforzado `LocalSEOLinks` con 6 enlaces nuevos:
  `/sectores/restaurantes`, `/sectores/inmobiliarias`, `/sectores/clinicas-estetica`,
  `/servicios/chatbots-ia`, `/servicios/automatizaciones`, `/auditoria-gratis` (CTA).

### Robots
- `public/robots.txt` mantiene `Allow: /` para todos los crawlers legítimos
  (Googlebot, Bingbot, BraveBot, DuckDuckBot, Slurp, YandexBot, Applebot,
  LLM crawlers) y bloquea scrapers agresivos (Ahrefs, Semrush, MJ12, Bytespider,
  DataForSEO, etc.). Sitemap apuntado a `https://hydrailabs.com/sitemap.xml`.

## 4. Siguientes pasos en Search Console

1. **Forzar reprocesado del sitemap**: en GSC > Sitemaps, eliminar y volver a enviar `https://hydrailabs.com/sitemap.xml`.
2. **Solicitar indexación manual** para P0:
   - `/`, `/auditoria-gratis`, `/servicios`, `/precios`, `/contacto`
   - `/sectores/restaurantes`, `/sectores/inmobiliarias`, `/sectores/clinicas-estetica`
   - `/agencia-ia-malaga`, `/agencia-ia-marbella`, `/agencia-ia-estepona`
   - `/chatbot-whatsapp-restaurantes-malaga`, `/automatizacion-ia-pymes-malaga`
   - `/agentes-ia-inmobiliarias-costa-del-sol`, `/automatizacion-ia-clinicas-esteticas-malaga`
3. **Revisar el informe "Páginas"** > "Descubierta, sin indexar" tras 7-14 días.
4. **Monitorizar CTR** de la query `hydrai`: objetivo > 5 % (vs. 1,29 % actual) con el nuevo title.

## 5. Objetivo SEO 90 días

| Métrica | Hoy | Objetivo |
|---|---|---|
| Páginas indexadas | <10 | ≥ 40 |
| Clics totales / mes | ~8 | ≥ 60 |
| CTR `hydrai` | 1,29 % | ≥ 5 % |
| Clics `/auditoria-gratis` | 0,3/mes | ≥ 10/mes |
| Páginas con > 0 clics | 2 | ≥ 15 |

## 6. Tareas pendientes (no incluidas en este commit)

- Reforzar copy de `/industrias` con problema/solución por sector.
- Crear FAQ schema en `/servicios`, `/precios`, `/sectores/*`.
- Implementar `<noindex>` en `/admin/*`, `/login`, `/inversores` vía Helmet por ruta (hoy solo bloqueado por `robots.txt`).
- Configurar bloqueo de tráfico bot por país en Cloudflare/WAF (ver `docs/seo/anti-bot-filtering-plan.md`).
