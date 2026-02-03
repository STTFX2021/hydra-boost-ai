# test_auth_fail.ps1 — HYDRAI-02 Auth failure test (expects 401)
# Usage: .\test_auth_fail.ps1
# Requires: $env:WEBHOOK_URL set beforehand (no secret needed — that's the point)

$ErrorActionPreference = "Stop"

if (-not $env:WEBHOOK_URL) { Write-Error "WEBHOOK_URL not set"; exit 1 }

$body = @{
    name  = "Auth Fail Test"
    email = "authfail@hydrai-test.dev"
} | ConvertTo-Json -Depth 3

$headers = @{
    "Content-Type" = "application/json"
    "X-HYDR-KEY"   = "wrong-secret-value"
}

Write-Host "=== TEST: Auth Failure — wrong secret (expect 401) ==="
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $env:WEBHOOK_URL `
        -Method POST `
        -Headers $headers `
        -Body $body `
        -UseBasicParsing

    $statusCode = $response.StatusCode
    Write-Host "Status: $statusCode"
    Write-Host "FAIL: Expected 401, got $statusCode" -ForegroundColor Red
    exit 1
} catch {
    $statusCode = $_.Exception.Response.StatusCode.Value__
    $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
    $errorBody = $reader.ReadToEnd()
    Write-Host "Status: $statusCode"
    Write-Host "Response: $errorBody"
    Write-Host ""

    if ($statusCode -eq 401) {
        Write-Host "PASS: Got 401 Unauthorized" -ForegroundColor Green
    } else {
        Write-Host "FAIL: Expected 401, got $statusCode" -ForegroundColor Red
        exit 1
    }
}
