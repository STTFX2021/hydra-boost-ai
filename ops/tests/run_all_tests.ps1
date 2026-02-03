# run_all_tests.ps1 — Run all HYDRAI-02 tests in sequence
# Usage:
#   $env:WEBHOOK_URL = "https://your-n8n-instance.app.n8n.cloud/webhook/hydrai/lead"
#   $env:WEBHOOK_SECRET = "your-secret-here"
#   .\run_all_tests.ps1

$ErrorActionPreference = "Continue"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

if (-not $env:WEBHOOK_URL) { Write-Error "Set `$env:WEBHOOK_URL first"; exit 1 }
if (-not $env:WEBHOOK_SECRET) { Write-Error "Set `$env:WEBHOOK_SECRET first"; exit 1 }

$tests = @(
    @{ Name = "Auth Failure (401)";    Script = "test_auth_fail.ps1" }
    @{ Name = "Invalid Lead (400)";    Script = "test_invalid_lead.ps1" }
    @{ Name = "Valid Lead (201)";      Script = "test_valid_lead.ps1" }
    @{ Name = "Duplicate Lead (409)";  Script = "test_duplicate_lead.ps1" }
)

$passed = 0
$failed = 0

Write-Host "============================================"
Write-Host "  HYDRAI-02 Lead Intake — Test Suite"
Write-Host "============================================"
Write-Host ""

foreach ($test in $tests) {
    Write-Host "--- Running: $($test.Name) ---"
    $script = Join-Path $scriptDir $test.Script

    & $script
    if ($LASTEXITCODE -eq 0) {
        $passed++
    } else {
        $failed++
    }
    Write-Host ""
    Start-Sleep -Seconds 1
}

Write-Host "============================================"
Write-Host "  Results: $passed passed, $failed failed"
Write-Host "============================================"

if ($failed -gt 0) {
    exit 1
}
