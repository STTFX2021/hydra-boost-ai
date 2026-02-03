# HYDRAI-02 Failure Matrix

Quick-reference for diagnosing test failures.

---

## 401 — Unauthorized

| Check | Where | What to look for |
|-------|-------|-----------------|
| Header name | Test script / client | Must send `X-HYDR-KEY` (exact case) |
| Header value | Test script `$env:WEBHOOK_SECRET` | Must match the literal in the Auth Check node |
| Auth Check node | n8n → "Auth Check" IF node | `rightValue` must be your actual secret, not `__PASTE_SECRET_HERE__` |
| Expression path | n8n → "Auth Check" IF node | Left value must be `{{ $json.headers['x-hydr-key'] }}` (lowercase — n8n normalizes headers to lowercase) |
| Webhook mode | n8n → "Webhook Lead" node | Test URL and Production URL are different; make sure you're hitting the right one |

**Fix**: Open Auth Check node → verify the `rightValue` matches the secret you're sending in `X-HYDR-KEY`.

---

## 400 — Bad Request (Validation)

| Check | Where | What to look for |
|-------|-------|-----------------|
| Missing `name` | Request body | `name` field must be present and non-empty |
| Missing `email` | Request body | `email` field must be present and non-empty |
| Invalid email | Request body | Must match `.+@.+\..+` pattern |
| Validate Fields node | n8n → "Validate Fields" IF node | 3 conditions: email not empty, email regex, name not empty |

**Fix**: Ensure your request body includes both `name` and `email` with valid values.

---

## 409 — Conflict (Duplicate)

| Check | Where | What to look for |
|-------|-------|-----------------|
| `dedupe_key` column | Supabase `leads` table | Column must exist (run SQL migration) |
| Unique index | Supabase | `idx_leads_dedupe_key` must exist |
| PostgREST response | n8n execution log | Supabase returns 409 when unique constraint violated |
| Dedupe logic | n8n "Normalize Data" Code node | `dedupe_key = email::source` (lowercase) |
| "Is Duplicate?" node | n8n | Checks if `statusCode === 409` |

**How dedupe works**:
1. "Normalize Data" builds `dedupe_key` as `email::source` (both lowercased)
2. PostgREST INSERT hits the unique partial index on `dedupe_key`
3. Postgres returns 409 (conflict)
4. "Insert OK?" routes to "Is Duplicate?" branch
5. "Is Duplicate?" confirms 409 → responds 409 (no Slack #errors alert)

**Fix if 409 not working**:
```sql
-- Check if index exists
SELECT indexname FROM pg_indexes WHERE tablename = 'leads' AND indexname = 'idx_leads_dedupe_key';

-- If missing, create it
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_dedupe_key
  ON public.leads (dedupe_key) WHERE dedupe_key IS NOT NULL;
```

**Fix if duplicates should alert differently**: The current design intentionally does NOT send duplicates to `#hydrai-errors`. Duplicates get a clean 409 response. Only real DB errors (non-409) go to `#hydrai-errors`.

---

## 500 — Server Error

| Check | Where | What to look for |
|-------|-------|-----------------|
| Supabase URL | n8n "Insert Lead" node | Must be `https://tshfnwdqidyhfajzovnq.supabase.co/rest/v1/leads` |
| API key header | n8n "Insert Lead" node | `apikey` header must have valid Supabase anon key |
| Auth header | n8n "Insert Lead" node | `Authorization: Bearer <service_role_key>` must be valid |
| Column mismatch | Supabase | If migration wasn't run, insert will fail on missing columns |
| RLS blocking | Supabase | If using anon key (not service_role), RLS INSERT policy must allow |
| Response body | n8n execution log → "Insert Lead" output | PostgREST error message explains the exact issue |

**Common 500 causes**:

1. **"Could not find column"** → SQL migration not run. Run `ops/sql/001_leads_add_columns.sql`.
2. **"permission denied"** → Using anon key without INSERT RLS policy, or service_role key is wrong.
3. **"invalid input syntax for type"** → Type mismatch (e.g., sending string for `score` which expects int).
4. **Network timeout** → Supabase project paused (free tier) or n8n can't reach Supabase.

**Fix**: Check n8n execution log for the exact PostgREST error. The response body from Supabase always includes a `message` and `hint`.

---

## Slack Not Firing

| Check | Where | What to look for |
|-------|-------|-----------------|
| Webhook URL | n8n Slack nodes | Must be valid Slack incoming webhook URL |
| Slack app | Slack workspace | Incoming webhook must be configured for the correct channel |
| continueOnFail | n8n Slack nodes | Both Slack nodes have `continueOnFail: true` — they won't break the flow, but won't alert either |
| Channel routing | n8n workflow | Success → `#hydrai-leads`, Real errors → `#hydrai-errors`, Duplicates → neither |

**Fix**: Test webhook independently:
```powershell
$slackUrl = "{{SLACK_WEBHOOK_LEADS}}"
$body = '{"text":"Test from PowerShell"}'
Invoke-WebRequest -Uri $slackUrl -Method POST -Body $body -ContentType "application/json"
```

---

## n8n Webhook Returns 404

| Check | Where | What to look for |
|-------|-------|-----------------|
| Workflow active | n8n UI | Toggle must be ON (green) |
| URL type | n8n Webhook node | You must use Production URL, not Test URL |
| Path | n8n Webhook node | Path must be `hydrai/lead` |
| Method | Request | Must be POST |

**Fix**: Activate workflow, copy Production URL from Webhook node settings.

---

## Quick Diagnostic Commands

```powershell
# Test if webhook is reachable at all (expect 401, not 404)
Invoke-WebRequest -Uri $env:WEBHOOK_URL -Method POST -Body '{}' -ContentType "application/json"

# Check Supabase API directly (expect 200 with empty array or data)
$headers = @{ "apikey" = "{{SUPABASE_ANON_KEY}}"; "Authorization" = "Bearer {{SUPABASE_ANON_KEY}}" }
Invoke-WebRequest -Uri "{{SUPABASE_URL}}/rest/v1/leads?select=id&limit=1" -Headers $headers
```
