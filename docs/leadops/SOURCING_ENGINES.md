# HydrAI — Sourcing Engines (Motores de Captación)

## Objetivo
Generar leads globales por territorios y verticales, con rotación por horas/días.

## M1 — Directorios/Maps (negocios locales)
- Qué busca: listados de negocios por zona/sector
- Inputs: territorio, ciudad, keywords, radio
- Outputs: business_name, website, phone, city, vertical, meta
- Límites: cuotas, rate limit, anti-spam
- Coste: TBD (según proveedor / API)

## M2 — SERP (Google/Bing)
- Qué busca: webs y listados nuevos por keywords
- Inputs: query templates por vertical + ciudad + intent ("book", "prices", "clinic", etc.)
- Outputs: website, business_name, city, meta.serp_rank, meta.query
- Límites: cuotas/coste por búsqueda
- Coste: TBD

## M3 — B2B Database (Apollo / similares)
- Qué busca: contactos decisores + empresa
- Inputs: industry, headcount, geo, role, tech stack
- Outputs: email (si existe), linkedin, company, website, meta
- Límites: plan/creditos
- Coste: TBD

## M4 — Enrichment / Validation
- Qué hace: normaliza, valida email/web, completa campos, scoring
- Inputs: website/email/company
- Outputs: score, tier, tags, dedupe_key
- Límites: compliance + coste
- Coste: TBD

## Política 80/20
- Empezamos con 2 motores activos (M1 + M2).
- M3/M4 se activan cuando el pipeline básico esté estable y midiendo ROI.
