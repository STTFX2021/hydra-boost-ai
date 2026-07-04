# Plan de optimización HydrAI Labs — Leads + AI SEO

Trabajo grande. Lo divido en 4 fases entregables para validar tras cada una. Confírmame por dónde empezar (o "todo en orden") y arranco.

---

## Fase 1 — Conversión (rápido, alto impacto)

**Página `/auditoria-gratis`**
- Auditar `LocalBusinessForm` y `lead-intake` edge function: validación Zod visible, estados error/éxito, mensaje de éxito con tarjeta "Te contactaremos en menos de 24h".
- Disparar evento `lead_auditoria_gratis_submit` (dataLayer / gtag si existen, fallback a `window.dispatchEvent`).
- Añadir tracking en `ExitIntentPopup` y `LeadFormMultiStep` para consistencia.

**Home (`HeroWorld`)**
- Cambiar headline a copy concreto: *"Automatización IA para negocios locales que pierden clientes por no responder a tiempo"*.
- Subtítulo y bloque promesa según brief.
- CTA principal: "Recibe un diagnóstico gratis en 24h" → `/auditoria-gratis`.
- CTA secundario: "Ver ejemplos para mi sector" → `/sectores/restaurantes` (o ancla a `SectorDemos`).

**CTA sticky móvil**
- `MobileStickyCTA` ya existe — actualizar copy a "Solicitar auditoría gratuita" y forzar destino `/auditoria-gratis`.

**Bloque diferenciación**
- Nueva sección en home antes del FAQ: *"HydrAI Labs no vende páginas web genéricas..."*.

---

## Fase 2 — Prueba social y FAQ

**Sección "Qué revisamos en tu negocio"** (nuevo componente, insertar antes del formulario en `/auditoria-gratis` y opcional en home):
6 cards: Atención al cliente · WhatsApp/llamadas perdidas · Captación de leads · Reservas/citas · Seguimiento comercial · Automatización (n8n/Supabase/Vapi/agentes).

**Sección "Especialistas en Costa del Sol"**
Chips de sectores enlazando a páginas sectoriales/locales.

**FAQ estructurada con JSON-LD `FAQPage`**
- Extender `FAQ.tsx` con las 8 preguntas del brief.
- Añadir `FAQPageSchema` que serialice las Q&A para Google y AI crawlers.
- Reutilizar el componente FAQ en páginas de servicios.

---

## Fase 3 — AI Discoverability + ficheros públicos

**`public/llms.txt`** — ya existe; lo actualizo a la versión del brief con secciones y links recomendados (mantengo info de localización Costa del Sol).

**`public/robots.txt`** — ya existe; añado bloques explícitos para `OAI-SearchBot` y mantengo GPTBot/ChatGPT-User/Perplexity/Claude/Google-Extended.

**`public/sitemap.xml`** — actualizo con todas las rutas nuevas de la Fase 4.

**Nueva página `/ai-discoverability`**
- Página densa en texto, optimizada para extracción por LLMs.
- Secciones: Qué es HydrAI · A quién ayudamos · Servicios · Zonas · Casos de uso · Diferenciadores · Stack · Contacto · Resumen ejecutivo.
- Schema `Organization` + `Service` + `FAQPage`.
- Linkada desde footer.

---

## Fase 4 — Landings AI SEO / GEO (10 páginas)

Crear rutas:
- `/automatizacion-ia-restaurantes-costa-del-sol`
- `/automatizacion-ia-clinicas-costa-del-sol`
- `/automatizacion-ia-inmobiliarias-costa-del-sol`
- `/chatbots-whatsapp-negocios-locales`
- `/agentes-ia-voz-restaurantes`
- `/n8n-automatizaciones-empresas`
- `/automatizacion-ia-estepona` (alias de `AIAutomationEstepona` existente con copy reforzado)
- `/automatizacion-ia-marbella` (alias)
- `/automatizacion-ia-malaga` (alias)
- `/automatizacion-ia-fuengirola` (alias)

**Estrategia técnica**: crear un componente reutilizable `VerticalSEOLanding` (o ampliar `VerticalLandingPage` existente) parametrizado por data en `src/data/seoLandings.ts`. Cada página incluye:
- H1 único, problema, beneficios medibles, casos de uso, FAQ (4-6 preguntas), CTA a `/auditoria-gratis`.
- `LocalBusinessSchema` + `ServiceSchema` + `FAQPageSchema`.
- `SEOHead` con title/description únicos (multilingüe via `pageSEOTranslations`).
- Linkadas desde footer en sección "Soluciones por sector" y "Ciudades".

**Routing**: añadir las 10 rutas en `App.tsx`. Las 4 de ciudad reusan los componentes `AIAutomation*` con redirect/alias.

---

## Aspectos técnicos clave

- Tracking: usar `window.dataLayer.push({event: 'lead_auditoria_gratis_submit', ...})` con fallback silencioso.
- Schemas: extender `SchemaOrg.tsx` con `FAQPageSchema` y `ServiceSchema` reusables.
- i18n: las landings nuevas se crean primero en ES (SEO-ES como dicta la memoria de proyecto) y se añaden metas multilingües al `pageSEOTranslations`.
- No tocar: branding, lead-intake webhook, integraciones n8n/Discord.
- Sitemap: regenerar manualmente (no hay script generator activo).

---

## Orden propuesto y entrega

1. **Fase 1** (conversión + copy home) — 1 vuelta
2. **Fase 2** (prueba social + FAQ + JSON-LD) — 1 vuelta
3. **Fase 3** (llms.txt + robots + sitemap + /ai-discoverability) — 1 vuelta
4. **Fase 4** (10 landings GEO) — 1-2 vueltas (mucho contenido)

¿Arranco con Fase 1 o prefieres otro orden / hacer todo seguido?
