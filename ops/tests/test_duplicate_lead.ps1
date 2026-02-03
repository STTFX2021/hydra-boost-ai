# test_duplicate_lead.ps1 — HYDRAI-02 Duplicate test (expects 409 on second insert)
# Usage: .\test_duplicate_lead.ps1
# Requires: $env:WEBHOOK_URL and $env:WEBHOOK_SECRET set beforehand

$ErrorActionPreference = "Stop"

if (-not $env:WEBHOOK_URL) { Write-Error "WEBHOOK_URL not set"; exit 1 }
if (-not $env:WEBHOOK_SECRET) { Write-Error "WEBHOOK_SECRET not set"; exit 1 }

# Fixed email+source so dedupe_key collides on second call
$body = @{
    name          = "Duplicate Test"
    email         = "duplicate-test@hydrai-test.dev"
    phone         = "+34600000003"
    business_name = "Duplicate Business"
    city          = "Valencia"
    source        = "test-duplicate"
    message       = "This should be rejected as duplicate on second run"
} | ConvertTo-Json -Depth 3

$headers = @{
    "Content-Type" = "application/json"
    "X-HYDR-KEY"   = $env:WEBHOOK_SECRET
}

Write-Host "=== TEST: Duplicate Lead (expect 409 on second call) ==="
Write-Host ""

# --- First insert (should succeed with 201) ---
Write-Host "--- Attempt 1: First insert ---"
try {
    $response = Invoke-WebRequest -Uri $env:WEBHOOK_URL `
        -Method POST `
        -Headers $headers `
        -Body $body `
        -UseBasicParsing

    $statusCode = $response.StatusCode
    Write-Host "Status: $statusCode"
    Write-Host "Response: $($response.Content)"

    if ($statusCode -eq 201) {
        Write-Host "OK: First insert succeeded (201)" -ForegroundColor Green
    } elseif ($statusCode -eq 409) {
        Write-Host "OK: Already exists from previous run (409) — skipping to verify" -ForegroundColor Yellow
    }
} catch {
    $statusCode = $_.Exception.Response.StatusCode.Value__
    if ($statusCode -eq 409) {
        Write-Host "OK: Already exists from previous run (409) — continuing" -ForegroundColor Yellow
    } else {
        $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
        $errorBody = $reader.ReadToEnd()
        Write-Host "FAIL: Unexpected error $statusCode — $errorBody" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Start-Sleep -Seconds 2

# --- Second insert (should fail with 409) ---
Write-Host "--- Attempt 2: Duplicate insert ---"
try {
    $response = Invoke-WebRequest -Uri $env:WEBHOOK_URL `
        -Method POST `
        -Headers $headers `
        -Body $body `
        -UseBasicParsing

    $statusCode = $response.StatusCode
    Write-Host "Status: $statusCode"
    Write-Host "Response: $($response.Content)"
    Write-Host "FAIL: Expected 409, got $statusCode" -ForegroundColor Red
    exit 1
} catch {
    $statusCode = $_.Exception.Response.StatusCode.Value__
    $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
    $errorBody = $reader.ReadToEnd()
    Write-Host "Status: $statusCode"
    Write-Host "Response: $errorBody"
    Write-Host ""

    if ($statusCode -eq 409) {
        Write-Host "PASS: Got 409 Conflict (duplicate detected)" -ForegroundColor Green
    } else {
        Write-Host "FAIL: Expected 409, got $statusCode" -ForegroundColor Red
        exit 1
    }
}
