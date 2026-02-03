# Connectivity & Permissions Audit

**Date:** 2026-02-03
**Branch:** `claude/audit-access-permissions-PE1ar`
**Repo:** STTFX2021/hydra-boost-ai

---

## 1. Environment Summary

| Property         | Value                                      |
|------------------|--------------------------------------------|
| OS               | Linux 4.4.0 x86_64 (sandboxed container)   |
| User             | root                                       |
| Working Dir      | /home/user/hydra-boost-ai                  |
| Git              | 2.43.0                                     |
| gh CLI           | **NOT INSTALLED**                           |
| Node.js          | v22.22.0                                   |
| Python           | 3.11.14                                    |
| npm / npx        | Available                                  |
| curl / wget      | Available                                  |
| Outbound HTTPS   | Working (tested against example.com)        |
| Git Remote       | Proxied via local_proxy@127.0.0.1:41084    |

---

## 2. Tool Availability Table

| Tool / Service     | Available? | Authenticated?           | Can Read?  | Can Write? |
|--------------------|------------|--------------------------|------------|------------|
| **Git (local)**    | YES        | YES (proxy token)        | YES        | YES        |
| **GitHub (push)**  | YES        | YES (dry-run succeeded)  | YES        | YES        |
| **gh CLI**         | NO         | N/A                      | N/A        | N/A        |
| **Supabase (anon)**| YES        | YES (.env publishable key)| YES (RLS) | YES (RLS)  |
| **Supabase (service role)** | NO | NO (env var is empty)   | NO         | NO         |
| **n8n Cloud**      | NO         | NO (env var is empty)    | NO         | NO         |
| **Slack Webhook**  | NO         | NO (env var is empty)    | N/A        | NO         |
| **Netlify API**    | NO         | NO (401 - token empty)   | NO         | NO         |
| **Lovable API**    | NO         | NO (env var is empty)    | NO         | NO         |
| **Node.js/npm**    | YES        | N/A                      | N/A        | N/A        |
| **Python**         | YES        | N/A                      | N/A        | N/A        |

---

## 3. GitHub Checks Output

### 3.1 Repository Access
```
Remote: http://local_proxy@127.0.0.1:41084/git/STTFX2021/hydra-boost-ai
Current branch: claude/audit-access-permissions-PE1ar
Status: clean working tree
Push dry-run: SUCCESS (can push to current branch)
```

### 3.2 Branch of Interest
```
Branch: claude/fix-todo-ml43bo9ylir1epnh-SEUBr
Fetch: SUCCESS
Recent commits:
  f1ba3cd Revert package-lock.json changes
  85554ec Update package-lock.json
  9260f62 Hide VideoDemo component when video URL is a placeholder

Files changed vs main:
  src/components/pricing/VideoDemo.tsx
  src/lib/constants.ts
```

### 3.3 Local Branch Operations
```
Create branch: SUCCESS (audit/test-branch created and deleted)
Checkout: SUCCESS
Delete: SUCCESS
```

### 3.4 gh CLI
```
gh CLI: NOT INSTALLED in this runtime
Cannot run: gh auth status, gh repo view, gh pr list, gh pr diff
Workaround: git operations work directly via proxy
```

---

## 4. Environment Variables Status

| Variable                        | Status  | Length |
|---------------------------------|---------|--------|
| SUPABASE_URL                    | EMPTY   | 0      |
| SUPABASE_SERVICE_ROLE_KEY       | EMPTY   | 0      |
| SUPABASE_ANON_KEY               | EMPTY   | 0      |
| WEBHOOK_SECRET                  | EMPTY   | 0      |
| SLACK_WEBHOOK_URL               | EMPTY   | 0      |
| SLACK_WEBHOOK_SECRET            | EMPTY   | 0      |
| N8N_WEBHOOK_URL                 | EMPTY   | 0      |
| NETLIFY_AUTH_TOKEN              | EMPTY   | 0      |
| NETLIFY_SITE_ID                 | EMPTY   | 0      |
| LOVABLE_API_KEY                 | EMPTY   | 0      |
| VITE_SUPABASE_URL              | SET     | via .env |
| VITE_SUPABASE_PUBLISHABLE_KEY  | SET     | via .env |
| VITE_SUPABASE_PROJECT_ID       | SET     | via .env |

**Note:** Shell env vars exist but are empty (length 0). Only the `.env` file contains actual Supabase publishable (anon) credentials. These are public/client-side keys by design.

---

## 5. Supabase Schema Discovery (via anon key)

The Supabase REST API returned a full OpenAPI spec. Discovered tables:
- `contact_submissions` (id, name, email, phone, message, created_at)
- Additional tables visible in the schema

Access level: **anon role** (subject to Row Level Security policies).

---

## 6. Missing Items List

### 6.1 Missing Tools
1. **gh CLI** - Not installed in runtime; needed for PR management, issue triage, and check status queries.

### 6.2 Missing Credentials (all empty in runtime env)
1. **SUPABASE_SERVICE_ROLE_KEY** - Needed for admin-level DB operations (bypasses RLS).
2. **N8N_WEBHOOK_URL** - Needed to trigger n8n automation workflows.
3. **SLACK_WEBHOOK_URL** - Needed for Slack notifications from CI/automation.
4. **NETLIFY_AUTH_TOKEN** - Needed for deploy status checks and site management.
5. **NETLIFY_SITE_ID** - Needed to target the correct Netlify site.
6. **LOVABLE_API_KEY** - Needed for Lovable platform integration.
7. **WEBHOOK_SECRET** - Needed for verifying inbound webhook signatures.

### 6.3 Credential Placement Recommendations

| Credential                   | Where It Should Live                        |
|------------------------------|---------------------------------------------|
| SUPABASE_SERVICE_ROLE_KEY    | GitHub Secrets + n8n env vars (NEVER in code)|
| SUPABASE_URL                 | GitHub Secrets + n8n env vars               |
| SUPABASE_ANON_KEY            | .env file (public, client-side)             |
| N8N_WEBHOOK_URL              | GitHub Secrets (for CI triggers)            |
| N8N_WEBHOOK_SECRET           | n8n env vars + GitHub Secrets (both sides)  |
| SLACK_WEBHOOK_URL            | n8n env vars + GitHub Secrets               |
| NETLIFY_AUTH_TOKEN           | GitHub Secrets (for deploy previews in CI)  |
| NETLIFY_SITE_ID              | GitHub Secrets or repo .env (non-secret)    |
| LOVABLE_API_KEY              | Lovable Secrets + GitHub Secrets if needed  |
| WEBHOOK_SECRET               | GitHub Secrets + n8n env vars               |

---

## 7. Autonomous Loop Recommendation

### Flow: GitHub Issue -> Code -> PR -> CI -> Deploy

```
[1] GitHub Issue created (label: "auto" or "claude")
        |
        v
[2] n8n webhook receives issue event (GitHub -> n8n)
        |
        v
[3] n8n triggers Claude Code agent via API
    - Agent reads issue, creates branch, writes code
    - Agent commits and pushes to claude/* branch
    - Agent creates PR via git/API
        |
        v
[4] GitHub Actions CI runs on PR
    - Lint, type-check, build, test
    - Netlify deploy preview generated
        |
        v
[5] n8n posts PR summary + deploy preview link to Slack
        |
        v
[6] **HUMAN GATE**: Team reviews PR + deploy preview
    - Approve or request changes
        |
        v
[7] On merge to main:
    - Netlify auto-deploys production
    - n8n sends deploy notification to Slack
    - Supabase migrations run if present
```

### Key Principles
- **Human gate on merge**: No auto-merge to main. All PRs require human approval.
- **Secrets never in code**: All credentials live in GitHub Secrets, n8n env vars, or platform-native secret stores.
- **Anon key is public**: `VITE_SUPABASE_PUBLISHABLE_KEY` is designed to be in client code (protected by RLS).
- **Service role key is admin**: Never expose in frontend or logs.

---

## 8. Recommended Next Actions (Strict Order)

1. **Install gh CLI in CI/dev environments** - Enables PR management, issue queries, and check status from automation.
2. **Populate GitHub Secrets** - Add `SUPABASE_SERVICE_ROLE_KEY`, `N8N_WEBHOOK_URL`, `SLACK_WEBHOOK_URL`, `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID` to the repo's GitHub Secrets.
3. **Configure n8n webhook trigger** - Create a GitHub webhook pointing to n8n Cloud for issue/PR events.
4. **Set up GitHub Actions CI** - Create `.github/workflows/ci.yml` with lint, type-check, build steps.
5. **Add Netlify deploy preview to CI** - Use `NETLIFY_AUTH_TOKEN` + `NETLIFY_SITE_ID` to generate preview URLs on PRs.
6. **Configure Slack notifications in n8n** - Wire n8n workflow to post PR summaries and deploy status to Slack channel.
7. **Audit Supabase RLS policies** - Verify that anon-key access is properly restricted by Row Level Security on all tables.
8. **Create n8n workflow for autonomous loop** - Build the issue-to-PR pipeline described in Section 7.
9. **Add WEBHOOK_SECRET verification** - Ensure all inbound webhooks (GitHub -> n8n) verify signatures.
10. **Document the ops runbook** - Record all credential locations, rotation schedules, and escalation paths.

---

*Generated by Claude Code audit agent. No secrets were printed or stored in this document.*
