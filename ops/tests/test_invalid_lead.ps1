# test_invalid_lead.ps1 — HYDRAI-02 Validation test (expects 400)
# Usage: .\test_invalid_lead.ps1
# Requires: $env:WEBHOOK_URL and $env:WEBHOOK_SECRET set beforehand

$ErrorActionPreference = "Stop"

if (-not $env:WEBHOOK_URL) { Write-Error "WEBHOOK_URL not set"; exit 1 }
if (-not $env:WEBHOOK_SECRET) { Write-Error "WEBHOOK_SECRET not set"; exit 1 }

# Missing email + missing name = should fail validation
$body = @{
    phone = "+34600000002"
    city  = "Barcelona"
} | ConvertTo-Json -Depth 3

$headers = @{
    "Content-Type" = "application/json"
    "X-HYDR-KEY"   = $env:WEBHOOK_SECRET
}

Write-Host "=== TEST: Invalid Lead — no name/email (expect 400) ==="
Write-Host "Body: $body"
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $env:WEBHOOK_URL `
        -Method POST `
        -Headers $headers `
        -Body $body `
        -UseBasicParsing

    $statusCode = $response.StatusCode
    Write-Host "Status: $statusCode"
    Write-Host "Response: $($response.Content)"

    # If we get here with 2xx, that's a fail (validation should have rejected)
    Write-Host "FAIL: Expected 400, got $statusCode" -ForegroundColor Red
    exit 1
} catch {
    $statusCode = $_.Exception.Response.StatusCode.Value__
    $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
    $errorBody = $reader.ReadToEnd()
    Write-Host "Status: $statusCode"
    Write-Host "Response: $errorBody"
    Write-Host ""

    if ($statusCode -eq 400) {
        Write-Host "PASS: Got 400 Bad Request" -ForegroundColor Green
    } else {
        Write-Host "FAIL: Expected 400, got $statusCode" -ForegroundColor Red
        exit 1
    }
}
