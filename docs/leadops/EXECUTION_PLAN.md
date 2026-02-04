# Execution Plan: n8n LeadGen Workflows

> **Ref**: `docs/n8n/N8N_WORKFLOW_SPEC.json` (PR #4, merged)
> **Fecha**: 2026-02-04
> **Errores**: n8n execution data + GitHub Issue auto. **SIN Slack. SIN `event_logs`.**

---

## 1. Inventario de workflows

| # | Nombre                          | Tipo         | Trigger                         | Nodos |
|---|---------------------------------|--------------|---------------------------------|-------|
| 1 | `HYDRAI_LeadGen_MAIN`           | sub-workflow | `Execute Workflow Trigger`      | 15    |
| 2 | `HYDRAI_LeadGen_CRON_EU_Core`   | cron wrapper | Schedule `*/30 7-10 * * *` CET | 4     |
| 3 | `HYDRAI_LeadGen_CRON_UK_IE`     | cron wrapper | Schedule `*/30 8-11 * * *` GMT | 4     |
| 4 | `HYDRAI_LeadGen_CRON_APAC`      | cron wrapper | Schedule `*/30 0-3 * * *` SGT  | 4     |

---

## 2. Manejo de errores (aplica a los 4 workflows)

**Regla absoluta**: no se usa Slack, no se usa `event_logs`, no se crean tablas nuevas.

| Capa               | Mecanismo                                                                                             |
|---------------------|-------------------------------------------------------------------------------------------------------|
| **n8n built-in**    | `Settings > Error Workflow` de cada workflow apunta a si mismo con `Error Trigger` node. n8n almacena el error completo en su propia execution data (visible en UI). |
| **GitHub Issue**    | Un nodo `HTTP Request` al final del error branch hace `POST /repos/{owner}/{repo}/issues` via GitHub API para crear un issue con labels `bug` + `n8n-pipeline`. |
| **Retry**           | Los nodos HTTP (scraping) tienen `retry on fail = true`, `max retries = 2`, `wait between = 5000ms`. |
| **DRY_RUN safety**  | Si `DRY_RUN=true`, se ejecuta todo el pipeline pero el INSERT a `public.leads` se salta. Sirve para validar sin side-effects. |

Estructura del nodo error en cada workflow:

```
Error Trigger → Build_ErrorPayload (Code) → Create_GitHub_Issue (HTTP Request)
```

El `Build_ErrorPayload` construye:

```json
{
  "title": "[n8n] HYDRAI_LeadGen_MAIN failed — EU_Core/restaurantes/gmaps",
  "body": "## Error\n\n- **Workflow**: HYDRAI_LeadGen_MAIN\n- **Run ID**: EU_Core_restaurantes_gmaps_0700_even_1738627200000\n- **Node**: Scrape_GMaps\n- **Error**: Request timeout after 60000ms\n- **Timestamp**: 2026-02-04T09:00:12.345Z\n\n## Context\n\n```json\n{\"territory\":\"EU_Core\",\"sector\":\"restaurantes\",\"engine\":\"gmaps\",\"slot\":\"07:00\",\"dayParity\":\"even\"}\n```",
  "labels": ["bug", "n8n-pipeline"]
}
```

---

## 3. Variables y credenciales (configurar en n8n Settings)

### 3.1 Credenciales (n8n Credentials store)

| Nombre                    | Tipo              | Usado por                        |
|---------------------------|-------------------|----------------------------------|
| `Supabase_ServiceRole`    | Header Auth       | Nodos Supabase (insert leads)    |
| `ScrapeAPI_Key`           | Header Auth       | Nodos HTTP scraping (N05a-N05e)  |
| `GitHub_PAT`              | Header Auth       | Nodo Create_GitHub_Issue         |

### 3.2 Variables de workflow (n8n Variables)

| Variable               | Tipo    | Default | Descripcion                                     |
|------------------------|---------|---------|-------------------------------------------------|
| `SUPABASE_URL`         | string  | —       | URL del proyecto Supabase                        |
| `SCRAPE_API_BASE`      | string  | —       | Base URL del servicio de scraping                |
| `GITHUB_OWNER`         | string  | —       | Owner del repo para issues (`STTFX2021`)         |
| `GITHUB_REPO`          | string  | —       | Nombre del repo (`hydra-boost-ai`)               |
| `MAX_RESULTS_PER_RUN`  | number  | `50`    | Limite de resultados por engine call             |
| `SCORE_THRESHOLD_HOT`  | number  | `80`    | Score >= hot                                     |
| `SCORE_THRESHOLD_WARM` | number  | `50`    | Score >= warm                                    |
| `DRY_RUN`              | boolean | `false` | Si true, no inserta en DB                        |
| `MAIN_WORKFLOW_ID`     | string  | —       | ID del workflow MAIN (para Execute Workflow)      |

### 3.3 Inputs de ejecucion (pasados por CRON → MAIN)

| Input       | Tipo   | Enum                                                                                          |
|-------------|--------|-----------------------------------------------------------------------------------------------|
| `territory` | string | `EU_Core` \| `UK_IE` \| `APAC`                                                               |
| `sector`    | string | `restaurantes` \| `clinicas` \| `inmobiliarias` \| `talleres` \| `peluquerias` \| `hosteleria` \| `servicios_domicilio` |
| `engine`    | string | `gmaps` \| `yelp` \| `tripadvisor` \| `paginas_amarillas` \| `bing_places`                   |
| `slot`      | string | `HH:MM` (bloques de 30 min, ej. `07:00`, `07:30`)                                            |
| `dayParity` | string | `even` \| `odd` (segun `new Date().getUTCDate() % 2`)                                        |

---

## 4. Workflow MAIN — `HYDRAI_LeadGen_MAIN`

### 4.1 Diagrama de nodos

```
N01 Trigger
 │
N02 Validate_Inputs
 │
N03 Build_SearchQuery
 │
N04 Router_Engine ─────┬─────────┬──────────┬─────────────┬────────────┐
 │                     │         │          │             │            │
N05a Scrape_GMaps  N05b Yelp  N05c TA  N05d PagAm    N05e Bing
 │                     │         │          │             │            │
 └─────────────────────┴─────────┴──────────┴─────────────┘
                              │
                        N06 Normalize_Records
                              │
                        N07 Generate_DedupeKeys
                              │
                        N08 Dedupe_CheckDB
                              │
                        N09 Score_Leads
                              │
                        N10 Format_LeadInsertPayload
                              │
                        N11 Check_DryRun
                           /      \
                     (false)      (true)
                        │            │
                  N12 Insert_Leads   │
                        │            │
                        └─────┬──────┘
                              │
                        N13 Build_RunSummary
                              │
                            [END]


Error branch (global):

  Error Trigger → N_ERR Build_ErrorPayload → N_GH Create_GitHub_Issue
```

### 4.2 Nodos — detalle

#### N01 · `Trigger_ExecuteWorkflow`

| Campo     | Valor                                          |
|-----------|------------------------------------------------|
| Tipo n8n  | `n8n-nodes-base.executeWorkflowTrigger`        |
| Proposito | Entry point. Recibe inputs del CRON wrapper.   |
| Input     | (ninguno — es el trigger)                      |
| Output    | `{ territory, sector, engine, slot, dayParity }` |

---

#### N02 · `Validate_Inputs`

| Campo     | Valor                                            |
|-----------|--------------------------------------------------|
| Tipo n8n  | `n8n-nodes-base.code` (JavaScript)               |
| Proposito | Valida que los 5 inputs sean valores permitidos. |
| Input     | `{ territory, sector, engine, slot, dayParity }` |
| Output    | Mismos inputs (pass-through si validos)          |
| On error  | `throw new Error('INVALID_INPUT: ...')`          |

Logica:
```javascript
const VALID = {
  territory: ['EU_Core', 'UK_IE', 'APAC'],
  sector:    ['restaurantes','clinicas','inmobiliarias','talleres',
              'peluquerias','hosteleria','servicios_domicilio'],
  engine:    ['gmaps','yelp','tripadvisor','paginas_amarillas','bing_places'],
  dayParity: ['even', 'odd']
};
for (const [key, allowed] of Object.entries(VALID)) {
  if (!allowed.includes($input.first().json[key])) {
    throw new Error(`INVALID_INPUT: ${key}="${$input.first().json[key]}"`);
  }
}
if (!/^([01]\d|2[0-3]):(00|30)$/.test($input.first().json.slot)) {
  throw new Error(`INVALID_INPUT: slot="${$input.first().json.slot}"`);
}
return $input.all();
```

---

#### N03 · `Build_SearchQuery`

| Campo     | Valor                                                      |
|-----------|------------------------------------------------------------|
| Tipo n8n  | `n8n-nodes-base.code`                                      |
| Proposito | Mapea sector→keywords, territory→ciudades. Genera run_id.  |
| Input     | 5 inputs validados                                         |
| Output    | `{ ...inputs, run_id, search_params: { query, location, radius_km, language, country_code, max_results } }` |

Mapas internos:

```javascript
const SECTOR_KEYWORDS = {
  restaurantes:        'restaurante bar cafeteria food restaurant',
  clinicas:            'clinica dental fisioterapia clinic health',
  inmobiliarias:       'inmobiliaria real estate agencia pisos',
  talleres:            'taller mecanico auto repair garage',
  peluquerias:         'peluqueria barberia salon beauty hair',
  hosteleria:          'hotel hostal alojamiento accommodation',
  servicios_domicilio: 'limpieza fontanero electricista cleaning plumber'
};

const TERRITORY_CITIES = {
  EU_Core: ['Madrid','Barcelona','Lisboa','Paris','Roma','Berlin','Valencia','Sevilla'],
  UK_IE:   ['London','Manchester','Birmingham','Dublin','Edinburgh','Bristol','Leeds'],
  APAC:    ['Singapore','Sydney','Melbourne','Auckland','Hong Kong','Tokyo','Osaka']
};

const TERRITORY_LANG = {
  EU_Core: 'es', UK_IE: 'en', APAC: 'en'
};

const TERRITORY_COUNTRY = {
  EU_Core: 'ES', UK_IE: 'GB', APAC: 'SG'
};
```

`run_id` = `${territory}_${sector}_${engine}_${slot.replace(':','')}_${dayParity}_${Date.now()}`

---

#### N04 · `Router_Engine`

| Campo     | Valor                                            |
|-----------|--------------------------------------------------|
| Tipo n8n  | `n8n-nodes-base.switch`                          |
| Proposito | Enruta a 1 de 5 nodos scrape segun `engine`.    |
| Input     | Stage 2 payload (con search_params)              |
| Output    | Mismos datos a la rama correspondiente           |

| Regla | `engine` valor     | Salida |
|-------|--------------------|--------|
| 0     | `gmaps`            | N05a   |
| 1     | `yelp`             | N05b   |
| 2     | `tripadvisor`      | N05c   |
| 3     | `paginas_amarillas` | N05d  |
| 4     | `bing_places`      | N05e   |

---

#### N05a-e · `Scrape_{Engine}`

| Campo           | Valor (comun a los 5)                                    |
|-----------------|----------------------------------------------------------|
| Tipo n8n        | `n8n-nodes-base.httpRequest`                             |
| Proposito       | Llama al API/scraper del engine con search_params.       |
| Input           | `search_params` del stage 2                              |
| Output          | `{ items: RawResult[], _context: { run_id, territory, sector, engine } }` |
| Method          | `POST`                                                   |
| URL             | `{{ $vars.SCRAPE_API_BASE }}/{engine}`                   |
| Body            | `{{ $json.search_params }}`                              |
| Timeout         | 60000 ms                                                 |
| Retry on fail   | `true`                                                   |
| Max retries     | `2`                                                      |
| Wait between    | `5000` ms                                                |
| Authentication  | `ScrapeAPI_Key` credential                               |

Cada engine devuelve estructura distinta. El siguiente nodo normaliza.

---

#### N06 · `Normalize_Records`

| Campo     | Valor                                                            |
|-----------|------------------------------------------------------------------|
| Tipo n8n  | `n8n-nodes-base.code`                                            |
| Proposito | Transforma raw results del engine al schema uniforme.            |
| Input     | `{ items: RawResult[], _context }`                               |
| Output    | `{ items: NormalizedRecord[], _context }`                        |

Transformacion por cada item:

```javascript
{
  business_name:    trim(raw.name || raw.business_name || raw.title),
  name:             raw.contact_name || raw.owner || business_name,
  email:            lowercase(trim(raw.email || raw.contact_email || '')),
  phone:            normalizePhone(raw.phone || raw.telephone || ''),  // → E.164
  city:             raw.city || raw.locality || extractCity(raw.address),
  vertical:         _context.sector,
  source_engine:    _context.engine,
  source_url:       raw.url || raw.place_url || '',
  raw_rating:       parseFloat(raw.rating || 0),
  raw_review_count: parseInt(raw.review_count || raw.reviews || 0)
}
```

**Filtro**: descarta items que no tengan ni email ni phone (al menos 1 requerido).

---

#### N07 · `Generate_DedupeKeys`

| Campo     | Valor                                                           |
|-----------|-----------------------------------------------------------------|
| Tipo n8n  | `n8n-nodes-base.code`                                           |
| Proposito | Calcula SHA-256 deterministico por record.                      |
| Input     | `{ items: NormalizedRecord[], _context }`                       |
| Output    | `{ items: NormalizedRecord[] + dedupe_key, _context }`          |

Algoritmo:

```javascript
const crypto = require('crypto');

function norm(s) {
  return (s || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

// Por cada item:
const seed = [
  norm(_context.territory),
  norm(_context.sector),
  norm(_context.engine),
  norm(item.business_name),
  norm(item.email || item.phone)
].join('|');

item.dedupe_key = crypto.createHash('sha256').update(seed).digest('hex');
```

Resultado: string hex de 64 chars. Deterministico: mismos inputs → mismo hash siempre.

---

#### N08 · `Dedupe_CheckDB`

| Campo     | Valor                                                                |
|-----------|----------------------------------------------------------------------|
| Tipo n8n  | `n8n-nodes-base.code` (con fetch a Supabase REST)                    |
| Proposito | Consulta `public.leads` para descartar dedupe_keys que ya existen.   |
| Input     | Items con dedupe_key                                                 |
| Output    | Solo items nuevos + `_dedup_stats: { total_checked, duplicates_found, new_items }` |

Logica:

```javascript
// 1. Extraer todos los dedupe_keys del batch
const keys = items.map(i => `dk:${i.dedupe_key}`);

// 2. Query: SELECT id, tags FROM leads WHERE tags && ARRAY[keys]
//    (operador overlap && para batch check)

// 3. existing_keys = Set de dk:xxx encontrados en DB

// 4. Filtrar: pasar solo items cuyo dk:xxx NO este en existing_keys
```

Usa `{{ $vars.SUPABASE_URL }}/rest/v1/leads` con header `apikey` y `Authorization: Bearer` de la credential.

---

#### N09 · `Score_Leads`

| Campo     | Valor                                              |
|-----------|----------------------------------------------------|
| Tipo n8n  | `n8n-nodes-base.code`                              |
| Proposito | Puntua 0-100 cada lead, asigna priority.           |
| Input     | Items deduplicados                                 |
| Output    | Items + `score` (number) + `priority` (string)     |

Rubrica:

| Criterio                           | Puntos |
|------------------------------------|--------|
| Tiene email valido                 | +25    |
| Tiene telefono valido              | +15    |
| `raw_rating` >= 3.5 (proporcional) | +20   |
| `raw_review_count` >= 10 (proporcional) | +15 |
| Tiene ciudad/direccion             | +10    |
| `business_name` no generico        | +10    |
| Tiene source_url/website           | +5     |
| **Max**                            | **100** |

Priority:
- `score >= 80` → `high`
- `score >= 50` → `medium`
- `score < 50` → `low`

---

#### N10 · `Format_LeadInsertPayload`

| Campo     | Valor                                                     |
|-----------|-----------------------------------------------------------|
| Tipo n8n  | `n8n-nodes-base.code`                                     |
| Proposito | Mapea cada item al schema exacto de `public.leads` INSERT. |
| Input     | Items puntuados                                           |
| Output    | Items INSERT-ready                                        |

Schema de salida (1 item):

```json
{
  "name":          "Restaurante La Plaza",
  "email":         "info@laplaza.es",
  "phone":         "+34612345678",
  "business_name": "Restaurante La Plaza",
  "city":          "Madrid",
  "score":         85,
  "source":        "n8n:gmaps:EU_Core",
  "status":        "new",
  "vertical":      "restaurantes",
  "tags":          ["dk:7f3a...c9e1", "t:EU_Core", "e:gmaps", "s:restaurantes", "p:high"],
  "created_at":    "2026-02-04T09:00:00.000Z",
  "updated_at":    "2026-02-04T09:00:00.000Z"
}
```

- `id` omitido (generado por `gen_random_uuid()` server-side)
- `status` siempre `"new"` (enum: `new|contacted|qualified|proposal|won|lost`)
- `tags[]` codifica metadata: `dk:` dedupe key, `t:` territory, `e:` engine, `s:` sector, `p:` priority

---

#### N11 · `Check_DryRun`

| Campo     | Valor                                                    |
|-----------|----------------------------------------------------------|
| Tipo n8n  | `n8n-nodes-base.if`                                      |
| Proposito | Bifurca: si DRY_RUN=true salta el insert.                |
| Input     | Items INSERT-ready                                       |
| Output    | Rama `false` → N12 (insert), Rama `true` → N13 (skip)   |
| Condicion | `{{ $vars.DRY_RUN }}` equals `true`                      |

---

#### N12 · `Insert_Leads_Supabase`

| Campo          | Valor                                                              |
|----------------|--------------------------------------------------------------------|
| Tipo n8n       | `n8n-nodes-base.httpRequest`                                       |
| Proposito      | Upsert batch en `public.leads` via Supabase REST API.              |
| Input          | Array de LeadInsertPayload                                         |
| Output         | Response de Supabase (items insertados/actualizados)               |
| Method         | `POST`                                                             |
| URL            | `{{ $vars.SUPABASE_URL }}/rest/v1/leads`                           |
| Headers        | `Prefer: resolution=merge-duplicates`, `apikey`, `Authorization`   |
| On conflict    | `email` — actualiza `updated_at`, `score = GREATEST(old, new)`, merge `tags` |
| Authentication | `Supabase_ServiceRole` credential                                  |

---

#### N13 · `Build_RunSummary`

| Campo     | Valor                                                  |
|-----------|--------------------------------------------------------|
| Tipo n8n  | `n8n-nodes-base.code`                                  |
| Proposito | Construye resumen final del run. Se retorna al CRON.   |
| Input     | Resultado del insert (o bypass si DRY_RUN)             |
| Output    | `RunSummary` object                                    |

```json
{
  "run_id":    "EU_Core_restaurantes_gmaps_0700_even_1738627200000",
  "territory": "EU_Core",
  "sector":    "restaurantes",
  "engine":    "gmaps",
  "slot":      "07:00",
  "dayParity": "even",
  "ts_start":  "2026-02-04T07:00:00.000Z",
  "ts_end":    "2026-02-04T07:00:42.123Z",
  "counts": {
    "raw_scraped":        47,
    "after_normalize":    38,
    "duplicates_skipped": 12,
    "scored_hot":         8,
    "scored_warm":        14,
    "scored_cold":        4,
    "inserted":           26,
    "errors":             0
  },
  "dry_run": false,
  "status":  "ok"
}
```

Este objeto queda registrado en n8n execution data (visible en la UI de n8n) y se retorna al CRON wrapper que lo invoco.

---

#### N_ERR · `Build_ErrorPayload` (Error branch)

| Campo     | Valor                                             |
|-----------|---------------------------------------------------|
| Tipo n8n  | `n8n-nodes-base.code`                             |
| Trigger   | `Error Trigger` (n8n built-in error workflow)     |
| Proposito | Formatea error para GitHub Issue.                 |
| Input     | n8n error object (`$json.error`)                  |
| Output    | GitHub Issue payload (title, body, labels)        |

```javascript
const err = $input.first().json;
const ctx = err.execution?.lastNodeExecuted || 'unknown';
const runData = err.execution?.data?.resultData?.runData || {};

return [{
  json: {
    title: `[n8n] ${err.workflow?.name || 'MAIN'} failed — ${ctx}`,
    body: [
      '## Error automático de pipeline n8n\n',
      `- **Workflow**: ${err.workflow?.name}`,
      `- **Execution ID**: ${err.execution?.id}`,
      `- **Nodo fallido**: ${ctx}`,
      `- **Mensaje**: ${err.message || 'Unknown error'}`,
      `- **Timestamp**: ${new Date().toISOString()}`,
      '\n## Execution data\n',
      '```json',
      JSON.stringify(runData, null, 2).slice(0, 3000),
      '```'
    ].join('\n'),
    labels: ['bug', 'n8n-pipeline']
  }
}];
```

---

#### N_GH · `Create_GitHub_Issue` (Error branch)

| Campo          | Valor                                                        |
|----------------|--------------------------------------------------------------|
| Tipo n8n       | `n8n-nodes-base.httpRequest`                                 |
| Proposito      | Crea issue en GitHub con el error.                           |
| Method         | `POST`                                                       |
| URL            | `https://api.github.com/repos/{{ $vars.GITHUB_OWNER }}/{{ $vars.GITHUB_REPO }}/issues` |
| Headers        | `Authorization: Bearer {{ $credentials.GitHub_PAT }}`, `Accept: application/vnd.github+json` |
| Body           | `{{ $json }}` (title, body, labels)                          |
| Retry on fail  | `true`                                                       |
| Max retries    | `1`                                                          |

---

## 5. CRON Wrappers

Los 3 wrappers comparten estructura identica de 4 nodos. Solo varia la matriz de rotacion y la ventana horaria.

### 5.1 Estructura comun (4 nodos)

```
C01 Schedule_Trigger → C02 Resolve_SlotMatrix → C03 Execute_MAIN → C04 NoOp_End
                                                       │ (error)
                                                 Error Trigger → Build_ErrorPayload → Create_GitHub_Issue
```

| Nodo | Nombre              | Tipo                           | Proposito                                        |
|------|---------------------|--------------------------------|--------------------------------------------------|
| C01  | `Schedule_Trigger`  | `scheduleTrigger`              | Dispara cada 30 min dentro de la ventana UTC     |
| C02  | `Resolve_SlotMatrix`| `code`                         | Calcula dayParity + resuelve (sector, engine)    |
| C03  | `Execute_MAIN`      | `executeWorkflow`              | Llama a MAIN con los 5 inputs resueltos          |
| C04  | `NoOp_End`          | `n8n-nodes-base.noOp`         | Fin. El RunSummary queda en execution data.      |

El error branch es el mismo pattern que MAIN: `Error Trigger → Build_ErrorPayload → Create_GitHub_Issue`.

---

### 5.2 CRON EU_Core — `HYDRAI_LeadGen_CRON_EU_Core`

**Schedule**: `*/30 7-10 * * *` (Europe/Madrid) → 8 slots/dia

**C02 — Matriz de rotacion**:

| Slot    | dayParity=`even`                       | dayParity=`odd`                             |
|---------|----------------------------------------|---------------------------------------------|
| `07:00` | restaurantes / gmaps                   | hosteleria / gmaps                          |
| `07:30` | restaurantes / yelp                    | hosteleria / yelp                           |
| `08:00` | clinicas / gmaps                       | servicios_domicilio / gmaps                 |
| `08:30` | clinicas / paginas_amarillas           | servicios_domicilio / paginas_amarillas     |
| `09:00` | inmobiliarias / gmaps                  | restaurantes / paginas_amarillas            |
| `09:30` | inmobiliarias / paginas_amarillas      | talleres / paginas_amarillas                |
| `10:00` | talleres / gmaps                       | peluquerias / paginas_amarillas             |
| `10:30` | peluquerias / gmaps                    | clinicas / yelp                             |

**Cobertura EU_Core**: 7 sectores x 3 engines = 16 combos unicos en 2 dias.

---

### 5.3 CRON UK_IE — `HYDRAI_LeadGen_CRON_UK_IE`

**Schedule**: `*/30 8-11 * * *` (Europe/London) → 8 slots/dia

**C02 — Matriz de rotacion**:

| Slot    | dayParity=`even`                       | dayParity=`odd`                             |
|---------|----------------------------------------|---------------------------------------------|
| `08:00` | restaurantes / gmaps                   | hosteleria / gmaps                          |
| `08:30` | restaurantes / yelp                    | hosteleria / yelp                           |
| `09:00` | clinicas / gmaps                       | servicios_domicilio / gmaps                 |
| `09:30` | clinicas / bing_places                 | servicios_domicilio / bing_places           |
| `10:00` | inmobiliarias / gmaps                  | restaurantes / bing_places                  |
| `10:30` | inmobiliarias / yelp                   | talleres / yelp                             |
| `11:00` | peluquerias / gmaps                    | peluquerias / yelp                          |
| `11:30` | talleres / gmaps                       | clinicas / yelp                             |

**Cobertura UK_IE**: 7 sectores x 3 engines = 16 combos unicos en 2 dias.

---

### 5.4 CRON APAC — `HYDRAI_LeadGen_CRON_APAC`

**Schedule**: `*/30 0-3 * * *` (Asia/Singapore) → 8 slots/dia

**C02 — Matriz de rotacion**:

| Slot    | dayParity=`even`                       | dayParity=`odd`                             |
|---------|----------------------------------------|---------------------------------------------|
| `00:00` | restaurantes / gmaps                   | peluquerias / gmaps                         |
| `00:30` | restaurantes / tripadvisor             | peluquerias / yelp                          |
| `01:00` | clinicas / gmaps                       | talleres / gmaps                            |
| `01:30` | clinicas / yelp                        | talleres / yelp                             |
| `02:00` | inmobiliarias / gmaps                  | servicios_domicilio / gmaps                 |
| `02:30` | inmobiliarias / yelp                   | servicios_domicilio / yelp                  |
| `03:00` | hosteleria / gmaps                     | restaurantes / yelp                         |
| `03:30` | hosteleria / tripadvisor               | clinicas / tripadvisor                      |

**Cobertura APAC**: 7 sectores x 3 engines = 16 combos unicos en 2 dias.

---

## 6. Payload estandar entre nodos (MAIN)

El payload se enriquece progresivamente a traves del pipeline:

```
Stage 1 (N01→N02)  Inputs crudos
  │  + run_id, search_params
Stage 2 (N03→N04)  Search query construida
  │  + items[] raw del engine
Stage 3 (N05→N06)  Raw results
  │  + normalizacion de campos
Stage 4 (N06→N07)  Normalized records
  │  + dedupe_key por item
Stage 5 (N07→N08)  With dedupe keys
  │  - items duplicados
Stage 6 (N08→N09)  Deduped (solo nuevos)
  │  + score, priority
Stage 7 (N09→N10)  Scored
  │  + mapeo a schema leads
Stage 8 (N10→N12)  INSERT-ready payload
  │  + resultado del insert
Stage 9 (N13)      RunSummary
```

### Payload completo stage 8 (INSERT-ready)

```typescript
interface LeadInsertPayload {
  name:          string;          // REQUIRED — contacto o nombre del negocio
  email:         string;          // REQUIRED — lowercase, trimmed
  phone:         string | null;   // E.164 format o null
  business_name: string | null;   // nombre comercial
  city:          string | null;   // ciudad extraida
  score:         number | null;   // 0-100
  source:        string | null;   // "n8n:{engine}:{territory}"
  status:        'new';           // siempre "new" (enum lead_status)
  vertical:      string | null;   // = sector input
  tags:          string[];        // ["dk:{hash}", "t:{territory}", "e:{engine}", "s:{sector}", "p:{priority}"]
  created_at:    string;          // ISO 8601
  updated_at:    string;          // ISO 8601
  // id: omitido — gen_random_uuid() server-side
}
```

---

## 7. Checklist de validacion (smoke test 1-run)

Test minimo: **1 territorio, 1 sector, 1 engine**.

### 7.1 Pre-requisitos

- [ ] n8n instance operativa con acceso a internet
- [ ] Credential `Supabase_ServiceRole` configurada y verificada
- [ ] Credential `ScrapeAPI_Key` configurada (o mock endpoint)
- [ ] Credential `GitHub_PAT` configurada con scope `repo`
- [ ] Variable `SUPABASE_URL` apunta a proyecto correcto
- [ ] Variable `SCRAPE_API_BASE` apunta a servicio operativo (o mock)
- [ ] Variable `GITHUB_OWNER` = `STTFX2021`
- [ ] Variable `GITHUB_REPO` = `hydra-boost-ai`
- [ ] Variable `DRY_RUN` = `true` (primera ejecucion)
- [ ] Variable `MAX_RESULTS_PER_RUN` = `5` (limitado para test)
- [ ] Workflow `HYDRAI_LeadGen_MAIN` importado y activo
- [ ] Variable `MAIN_WORKFLOW_ID` contiene el ID correcto

### 7.2 Test DRY_RUN (sin INSERT)

```
Parametros: territory=EU_Core, sector=restaurantes, engine=gmaps, slot=09:00, dayParity=even
DRY_RUN=true, MAX_RESULTS_PER_RUN=5
```

- [ ] Ejecutar MAIN manualmente con los parametros de arriba
- [ ] **N02**: No lanza error de validacion
- [ ] **N03**: `run_id` generado contiene `EU_Core_restaurantes_gmaps_0900_even_`
- [ ] **N03**: `search_params.query` contiene keywords de restaurantes
- [ ] **N03**: `search_params.location` contiene ciudad de EU_Core
- [ ] **N04**: Enruta correctamente a N05a (gmaps)
- [ ] **N05a**: HTTP 200, devuelve array de items (o mock)
- [ ] **N06**: Items normalizados tienen `business_name`, `email` o `phone`
- [ ] **N07**: Cada item tiene `dedupe_key` de 64 chars hex
- [ ] **N07**: Mismo item ejecutado 2x produce mismo `dedupe_key`
- [ ] **N08**: Query a Supabase no falla (puede retornar 0 duplicados)
- [ ] **N09**: Todos los items tienen `score` (0-100) y `priority`
- [ ] **N10**: Items tienen el schema exacto de `public.leads`
- [ ] **N10**: `source` = `n8n:gmaps:EU_Core`
- [ ] **N10**: `status` = `new`
- [ ] **N10**: `tags` contiene `dk:`, `t:EU_Core`, `e:gmaps`, `s:restaurantes`
- [ ] **N11**: DRY_RUN=true → salta N12
- [ ] **N13**: RunSummary tiene `inserted: 0` y `dry_run: true`
- [ ] **N13**: RunSummary.status = `ok`
- [ ] Execution data visible en n8n UI con todos los stages

### 7.3 Test INSERT real

```
DRY_RUN=false, MAX_RESULTS_PER_RUN=5
```

- [ ] Cambiar `DRY_RUN` a `false`
- [ ] Ejecutar MAIN con mismos parametros
- [ ] **N12**: Supabase responde 201 (insert) o 200 (upsert)
- [ ] Verificar en Supabase dashboard: nuevos rows en `public.leads`
- [ ] Verificar que `tags` contiene el `dk:` correcto
- [ ] **Re-ejecutar mismo run**: los mismos items ahora son filtrados en N08 (duplicados)
- [ ] RunSummary muestra `duplicates_skipped` > 0

### 7.4 Test error → GitHub Issue

- [ ] Forzar error: configurar `SCRAPE_API_BASE` a URL invalida
- [ ] Ejecutar MAIN
- [ ] n8n muestra execution como `error` en UI
- [ ] Verificar que se creo un Issue en `STTFX2021/hydra-boost-ai` con label `n8n-pipeline`
- [ ] El issue contiene: nombre del workflow, nodo fallido, mensaje de error
- [ ] Restaurar `SCRAPE_API_BASE` al valor correcto

### 7.5 Test CRON wrapper (EU_Core)

- [ ] Activar `HYDRAI_LeadGen_CRON_EU_Core`
- [ ] Esperar a que dispare en el proximo slot de 30 min
- [ ] Verificar que `Resolve_SlotMatrix` calcula dayParity y slot correctamente
- [ ] Verificar que `Execute_MAIN` se invoca con los 5 inputs
- [ ] RunSummary del MAIN visible en execution data del CRON
- [ ] Desactivar CRON despues del test

### 7.6 Criterios de PASS

| Criterio                              | Requerido |
|---------------------------------------|-----------|
| DRY_RUN completo sin errores          | SI        |
| INSERT real crea rows en `leads`      | SI        |
| Dedupe descarta duplicados en 2o run  | SI        |
| Error crea GitHub Issue               | SI        |
| CRON dispara y llama a MAIN           | SI        |
| No se escribe a `event_logs`          | SI        |
| No hay notificacion Slack             | SI        |
| `dedupe_key` es deterministico        | SI        |
| `score` esta entre 0-100             | SI        |
| `status` siempre es `new`            | SI        |

---

## 8. Resumen de nodos por workflow

### MAIN (15 nodos)

| #  | ID     | Nombre                     | Tipo n8n                       |
|----|--------|----------------------------|--------------------------------|
| 1  | N01    | Trigger_ExecuteWorkflow    | executeWorkflowTrigger         |
| 2  | N02    | Validate_Inputs            | code                           |
| 3  | N03    | Build_SearchQuery          | code                           |
| 4  | N04    | Router_Engine              | switch                         |
| 5  | N05a   | Scrape_GMaps               | httpRequest                    |
| 6  | N05b   | Scrape_Yelp                | httpRequest                    |
| 7  | N05c   | Scrape_TripAdvisor         | httpRequest                    |
| 8  | N05d   | Scrape_PaginasAmarillas    | httpRequest                    |
| 9  | N05e   | Scrape_BingPlaces          | httpRequest                    |
| 10 | N06    | Normalize_Records          | code                           |
| 11 | N07    | Generate_DedupeKeys        | code                           |
| 12 | N08    | Dedupe_CheckDB             | code (HTTP to Supabase REST)   |
| 13 | N09    | Score_Leads                | code                           |
| 14 | N10    | Format_LeadInsertPayload   | code                           |
| 15 | N11    | Check_DryRun               | if                             |
| 16 | N12    | Insert_Leads_Supabase      | httpRequest                    |
| 17 | N13    | Build_RunSummary           | code                           |
| —  | N_ERR  | Build_ErrorPayload         | code (Error Trigger branch)    |
| —  | N_GH   | Create_GitHub_Issue        | httpRequest (Error branch)     |

### Cada CRON wrapper (4 nodos + 2 error)

| #  | ID     | Nombre                     | Tipo n8n                       |
|----|--------|----------------------------|--------------------------------|
| 1  | C01    | Schedule_Trigger           | scheduleTrigger                |
| 2  | C02    | Resolve_SlotMatrix         | code                           |
| 3  | C03    | Execute_MAIN               | executeWorkflow                |
| 4  | C04    | NoOp_End                   | noOp                           |
| —  | C_ERR  | Build_ErrorPayload         | code (Error Trigger branch)    |
| —  | C_GH   | Create_GitHub_Issue        | httpRequest (Error branch)     |
