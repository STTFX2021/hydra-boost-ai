# HydrAI — LeadOps Boundaries (Fronteras)

## Principio
- Webhooks SOLO para entradas externas necesarias.
- Errores internos -> Departamento de mantenimiento (sin Slack al CEO).

## F1 — /hydrai/lead (Inbound Form)
- Entrada: formulario web/landing
- Salida: public.leads
- Auth: Header key (X-HYDR-KEY) o mecanismo equivalente
- Status codes:
  - 201 insert ok
  - 400 email missing/invalid
  - 401 auth fail
  - 409 duplicate (dedupe_key unique)
  - 500 db/unknown error

## F2 — /hydrai/message (Inbound Messages)
- Entrada: web chat / Discord (si aplica)
- Salida: public.leads (source=message) o cola interna (si luego creamos tabla tickets)
- Auth: token/firma del canal
- Status codes: mismos que F1 (201/400/401/409/500)

## F3 — Outbound Lead Sourcing (NO webhook)
- Trigger: CRON interno (por territorios/horarios)
- Salida: public.leads (source=outbound_*)
- Reglas:
  - No spam: rate limits + dedupe
  - No notificaciones externas por fallos internos
