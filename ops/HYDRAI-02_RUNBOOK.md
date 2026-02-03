# HYDRAI-02 Runbook — Lead Intake MVP (n8n Free Plan)

> 10-step click-by-click guide. No env vars required (free plan workaround).

---

## (1) What's Already DONE

| Item | Status |
|------|--------|
| `public.leads` table exists in Supabase | DONE |
| RLS policy: anon INSERT allowed | DONE |
| RLS policy: admin FULL access | DONE |
| `updated_at` trigger | DONE |
| PR #1 merged (deps + video URL) | DONE |
| PR #2 merged (audit doc) | DONE |
| CLAUDE.md in repo | DONE |
| PowerShell test scripts written | DONE |
| n8n workflow JSON exported | DONE |

## (2) What's BROKEN and WHY

| Issue | Root Cause |
|-------|------------|
| `leads` table missing 8 columns | Migration `001_leads_add_columns.sql` not yet run |
| No `dedupe_key` unique index | Same migration needed |
| n8n `{{$env.WEBHOOK_SECRET}}` doesn't resolve | Free plan has no Environment Variables feature |
| Tests return "URI no válido" | `$env:WEBHOOK_URL` was placeholder; now known but not set |
| Auth fails (401) | Secret not configured in n8n Auth Check node |
| Duplicate detection (409) won't work | PostgREST returns 409 only if unique constraint exists on `dedupe_key` |

## (3) Fix Plan — 10 Steps

### Step 1: Run SQL Migration in Supabase

1. Open Supabase Dashboard → SQL Editor
2. Paste contents of `ops/sql/001_leads_add_columns.sql`
3. Click **Run**
4. Verify: run `SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='leads' ORDER BY ordinal_position;`
5. Expected: 20 columns including `industry`, `message`, `raw`, `website`, `tier`, `dedupe_key`, `meta`, `event_id`

### Step 2: Verify Unique Index on dedupe_key

After Step 1, run in SQL Editor:
```sql
SELECT indexname FROM pg_indexes WHERE tablename = 'leads' AND indexname = 'idx_leads_dedupe_key';
```
Expected: one row with `idx_leads_dedupe_key`.

### Step 3: Import n8n Workflow

1. Open your n8n instance
2. Go to **Workflows** → **Import from File**
3. Select `ops/n8n/HYDRAI-02_Lead_Intake.json`
4. The workflow will appear with 13 nodes

### Step 4: Configure Auth Secret in n8n (NO env vars)

This is the critical step. Since free plan lacks env vars:

1. Open the **"Auth Check"** node (IF node)
2. Find the condition where `rightValue` is `__PASTE_SECRET_HERE__`
3. Replace `__PASTE_SECRET_HERE__` with your actual webhook secret
4. This stores the secret as a literal string inside the workflow definition
5. Click **Save**

> **Security note**: The secret is stored in the workflow JSON inside n8n's database. This is acceptable for MVP. For production, upgrade to a plan with credentials/env vars.

### Step 5: Configure Supabase PostgREST Headers

1. Open the **"Insert Lead (PostgREST)"** node (HTTP Request)
2. In the header parameters, replace:
   - `__PASTE_SUPABASE_ANON_KEY_HERE__` → your Supabase `anon` public key
   - `__PASTE_SUPABASE_SERVICE_ROLE_KEY_HERE__` → your Supabase `service_role` key
3. Also update the URL field: replace `={{$json._supabase_url}}` with your actual Supabase URL:
   ```
   https://tshfnwdqidyhfajzovnq.supabase.co/rest/v1/leads
   ```
4. Click **Save**

> **Why service_role?** The anon key + RLS allows INSERT, but we use service_role in the Authorization header to bypass RLS for the n8n server-side insert. This ensures the insert always works regardless of RLS changes.

### Step 6: Configure Slack Webhooks

1. Open **"Slack #leads"** node → replace `__PASTE_SLACK_WEBHOOK_LEADS_HERE__` with your `#hydrai-leads` webhook URL
2. Open **"Slack #errors"** node → replace `__PASTE_SLACK_WEBHOOK_ERRORS_HERE__` with your `#hydrai-errors` webhook URL
3. If Slack is not set up yet, you can leave these as-is; the nodes have `continueOnFail: true` so the workflow won't break

### Step 7: Set Webhook to Production Mode

1. In the **"Webhook Lead"** node, note the path: `hydrai/lead`
2. Click the **"Webhook URLs"** tab at the top of the node settings
3. Copy the **Production** URL (not Test) — this is your `WEBHOOK_URL`
4. The format will be: `https://<your-n8n>.app.n8n.cloud/webhook/hydrai/lead`

### Step 8: Activate the Workflow

1. Toggle the workflow **Active** switch (top-right) to ON
2. The production webhook is now live

### Step 9: Run Tests (PowerShell on Windows)

Open PowerShell in `G:\hydrai-ops\tests\` (or wherever you cloned the repo):

```powershell
# Set credentials (paste your real values)
$env:WEBHOOK_URL = "https://<your-n8n>.app.n8n.cloud/webhook/hydrai/lead"
$env:WEBHOOK_SECRET = "<your-secret>"

# Run all tests
.\run_all_tests.ps1
```

Expected results:
```
--- Running: Auth Failure (401) ---
PASS: Got 401 Unauthorized

--- Running: Invalid Lead (400) ---
PASS: Got 400 Bad Request

--- Running: Valid Lead (201) ---
PASS: Got 201 Created

--- Running: Duplicate Lead (409) ---
PASS: Got 409 Conflict (duplicate detected)

Results: 4 passed, 0 failed
```

### Step 10: Verify in Supabase + Slack

1. Open Supabase → Table Editor → `leads`
2. Confirm the test lead row exists with all fields populated
3. Check `#hydrai-leads` in Slack for the success notification
4. Confirm `#hydrai-errors` did NOT receive a duplicate alert

---

## (4) Copy/Paste Commands

### PowerShell — Set Vars & Run Tests

```powershell
# ONE-TIME SETUP (paste your real values)
$env:WEBHOOK_URL = "{{WEBHOOK_URL}}"
$env:WEBHOOK_SECRET = "{{WEBHOOK_SECRET}}"

# Run individual tests
.\test_auth_fail.ps1      # expect 401
.\test_invalid_lead.ps1   # expect 400
.\test_valid_lead.ps1     # expect 201
.\test_duplicate_lead.ps1 # expect 409

# Or run all at once
.\run_all_tests.ps1
```

### SQL — Verify leads table after migration

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'leads'
ORDER BY ordinal_position;
```

### SQL — Clean up test data

```sql
DELETE FROM public.leads WHERE source IN ('test-ps1', 'test-duplicate');
```

---

## (5) Validation Checklist

- [ ] SQL migration ran without errors
- [ ] `leads` table has 20 columns
- [ ] `idx_leads_dedupe_key` unique index exists
- [ ] n8n workflow imported (13 nodes)
- [ ] Auth Check node has real secret (not placeholder)
- [ ] Insert Lead node has real Supabase URL + keys
- [ ] Slack webhook URLs pasted (or nodes left as continueOnFail)
- [ ] Webhook set to Production mode
- [ ] Workflow is Active (toggle ON)
- [ ] `test_auth_fail.ps1` → 401
- [ ] `test_invalid_lead.ps1` → 400
- [ ] `test_valid_lead.ps1` → 201
- [ ] `test_duplicate_lead.ps1` → 409
- [ ] Lead visible in Supabase table
- [ ] Slack #hydrai-leads received notification
- [ ] Slack #hydrai-errors did NOT fire for duplicate
