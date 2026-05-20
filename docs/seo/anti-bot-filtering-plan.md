# Plan Anti-Bot / Limpieza de Tráfico — HydrAI Labs

Última actualización: 2026-05-20

Este documento describe cómo reducir el tráfico basura / bot que está
inflando la analítica de hydrailabs.com **sin dañar el SEO** ni la
indexación en Google, Bing, Brave o LLMs (ChatGPT, Claude, Perplexity,
Gemini).

---

## 1. Diagnóstico actual

Datos observados en analytics (rango ~90 días):

- ~500 visitas únicas / ~1040 pageviews.
- País #2 por volumen: **CN (China) con ~146 visitas**, sin mercado
  comercial para HydrAI Labs (España / Costa del Sol).
- Fuente dominante: **Direct (~400)** — patrón típico de bots, scripts
  y herramientas headless que no envían `Referer`.
- Picos puntuales (ej. 2026-05-17: 122 pageviews / 6 visitas) con
  `pageviewsPerVisit = 20.33` y `sessionDuration ≈ 0`: comportamiento
  de crawler, no de humano.
- Bounce rate medio cercano al 95-100 % en muchos días con duración 0s.

**Conclusión**: una parte significativa del tráfico no es comercialmente
útil y proviene de:

1. Crawlers SEO de terceros (Ahrefs, Semrush, MJ12, DataForSEO…).
2. Scrapers desde IPs de datacenter (CN/US/RU).
3. Headless browsers / monitorización / uptime checks.
4. Bots que ignoran `robots.txt`.

---

## 2. Qué NO se debe bloquear (no romper SEO/GEO/AEO)

Estos user-agents deben mantenerse **permitidos** en todos los niveles
(robots.txt, WAF, CDN, analytics):

- **Googlebot**, `Googlebot-Image`, `Googlebot-News`
- **Bingbot**
- **BraveBot** (Brave Search)
- **DuckDuckBot**, **Slurp** (Yahoo), **YandexBot**, **Applebot**
- **OAI-SearchBot**, **GPTBot**, **ChatGPT-User**
- **ClaudeBot**, **Claude-Web**
- **Google-Extended** (Gemini / AI Overviews)
- **PerplexityBot**
- **CCBot** (Common Crawl — base de muchos LLMs)

Tampoco se debe:

- Añadir `noindex` global.
- Bloquear `/sitemap.xml` ni `/robots.txt`.
- Bloquear países completos en el frontend.
- Servir contenido distinto a bots vs humanos (cloaking penalizado por
  Google).

---

## 3. Qué se está bloqueando ahora (`public/robots.txt`)

Bloqueados vía `Disallow: /` (scrapers agresivos / SEO crawlers que no
aportan valor comercial):

`AhrefsBot`, `SemrushBot`, `SemrushBot-SA`, `MJ12bot`, `DotBot`,
`BLEXBot`, `PetalBot`, `SeznamBot`, `SerpstatBot`, `DataForSeoBot`,
`ZoominfoBot`, `Bytespider`, `ImagesiftBot`, `Amazonbot`,
`magpie-crawler`, `SiteAuditBot`, `BarkrowlerBot`.

`robots.txt` es una **señal voluntaria**. Los bots honestos lo
respetan; los maliciosos no. Por eso se necesitan capas adicionales.

---

## 4. Recomendación: Cloudflare / WAF (capa real de bloqueo)

El **único bloqueo efectivo** es a nivel de red, no en el frontend
React (que se ejecuta después de servir el HTML). Si `hydrailabs.com`
está o puede pasar por **Cloudflare**, aplicar:

### 4.1. Bot Fight Mode

`Security → Bots → Bot Fight Mode: ON` (gratis). Bloquea bots de
datacenter conocidos y verifica con JS challenge.

### 4.2. Super Bot Fight Mode (plan Pro)

- Definitely automated traffic → **Block**
- Likely automated → **Managed Challenge**
- Verified bots (Google/Bing/etc.) → **Allow**

### 4.3. WAF Custom Rules sugeridas

Aplicar **Managed Challenge** (no Block directo, para no afectar a
usuarios reales detrás de VPN) a:

```
(ip.geoip.country in {"CN" "RU" "KP" "IR"})
  and not cf.client.bot
  and not http.request.uri.path in {"/sitemap.xml" "/robots.txt"}
```

```
(http.user_agent contains "AhrefsBot")
or (http.user_agent contains "SemrushBot")
or (http.user_agent contains "MJ12bot")
or (http.user_agent contains "DotBot")
or (http.user_agent contains "Bytespider")
```
→ Action: **Block**

```
(cf.threat_score gt 14) and not cf.client.bot
```
→ Action: **Managed Challenge**

### 4.4. Rate limiting

`Security → WAF → Rate limiting rules`: limitar a 60 req/min por IP en
rutas de marketing (`/`, `/servicios*`, `/sectores*`, `/blog*`).

### 4.5. Si no hay Cloudflare

Alternativas: AWS WAF, Vercel Firewall, Fastly Bot Management, o
configurar reglas equivalentes en el proveedor de hosting actual.

---

## 5. Filtrado en analytics

El frontend **no debe** decidir quién es bot y quién no (riesgo de
ocultar conversiones reales). Pero sí podemos:

### 5.1. Plataforma de analytics

Si la plataforma soporta exclusión de bots conocidos (Plausible, GA4,
Fathom, Umami…):

- Activar la opción **"Exclude known bots"** / **"Filter spam"**.
- Configurar **filtros por país** en vistas/informes (excluir CN/RU
  por defecto si no es mercado objetivo) — pero mantener una vista sin
  filtro como respaldo.
- Excluir IPs internas (oficina, dev, QA).

### 5.2. Heurísticas suaves (solo medición, nunca bloqueo)

Marcar como "suspicious" en analytics, no eliminar:

- `navigator.webdriver === true`
- `sessionDuration < 1s` + `pagesPerVisit === 1` + `referrer === ""`
- User-Agent que contenga `HeadlessChrome`, `PhantomJS`, `python-requests`,
  `curl`, `wget`, `Go-http-client`, `Java/`.

Estas señales se pueden enviar como un evento extra (`bot_signal: true`)
para segmentar en informes, **sin afectar al tracking de conversiones**.

### 5.3. Lo que NO se debe tocar

- Formularios de contacto / auditoría / lead-intake.
- Edge function `lead-intake` y su tracking.
- Eventos de conversión (envío de formulario, click en WhatsApp,
  apertura de Discord).
- Schema.org / JSON-LD.
- Hreflang / canonical / sitemap.

---

## 6. Nota operativa (importante)

> El bloqueo **fuerte por país, ASN o reputación de IP** debe hacerse
> en **Cloudflare / WAF / DNS**, nunca dentro del frontend React.
>
> El frontend solo puede:
> - Enviar señales para marcar tráfico como sospechoso en analytics.
> - Servir `robots.txt` con reglas para crawlers que lo respeten.
>
> Cualquier intento de bloquear tráfico desde JS (redirecciones,
> pantallas en blanco para ciertos países, etc.) es:
> 1. Inseguro (se ejecuta después de servir el HTML, el bot ya contó).
> 2. Peligroso para SEO (Google puede penalizar cloaking).
> 3. Frágil (cualquiera deshabilita JS y lo salta).

---

## 7. Checklist de implementación

- [x] `public/robots.txt` actualizado con allow-list de buscadores y
      block-list de scrapers agresivos.
- [x] Documento `docs/seo/anti-bot-filtering-plan.md` creado.
- [ ] Activar Cloudflare Bot Fight Mode (operativo, fuera del repo).
- [ ] Añadir WAF rules de país + scrapers (operativo).
- [ ] Activar "Exclude bots" en la plataforma de analytics.
- [ ] Revisar analytics 14 días después de aplicar reglas WAF.

---

## 8. Validación post-cambio

Después de aplicar los cambios de robots.txt:

1. Google Search Console → **Probador de robots.txt**: comprobar que
   Googlebot sigue con acceso a `/`, `/sitemap.xml` y todas las rutas
   indexables.
2. Bing Webmaster Tools → mismo test.
3. `curl -A "Googlebot" https://hydrailabs.com/robots.txt` para
   verificar el archivo servido.
4. Re-scan SEO desde Lovable y revisar que no aparecen findings
   nuevos de indexación.
5. Monitorizar `pageviews` por país durante 14 días: el tráfico de CN
   debería caer significativamente solo cuando se aplique la capa WAF
   (robots.txt por sí solo no lo detendrá).
