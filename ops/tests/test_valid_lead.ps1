# test_valid_lead.ps1 — HYDRAI-02 Happy-path test (expects 201)
# Usage: .\test_valid_lead.ps1
# Requires: $env:WEBHOOK_URL and $env:WEBHOOK_SECRET set beforehand

$ErrorActionPreference = "Stop"

if (-not $env:WEBHOOK_URL) { Write-Error "WEBHOOK_URL not set"; exit 1 }
if (-not $env:WEBHOOK_SECRET) { Write-Error "WEBHOOK_SECRET not set"; exit 1 }

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$body = @{
    name          = "Test Lead $timestamp"
    email         = "test_$timestamp@hydrai-test.dev"
    phone         = "+34600000001"
    business_name = "Test Business"
    city          = "Madrid"
    industry      = "restaurantes"
    vertical      = "hosteleria"
    message       = "Test lead from PowerShell"
    website       = "https://test.example.com"
    tier          = "pro"
    source        = "test-ps1"
    score         = 50
    tags          = @("test", "automated")
    event_id      = "evt_test_$timestamp"
} | ConvertTo-Json -Depth 3

$headers = @{
    "Content-Type" = "application/json"
    "X-HYDR-KEY"   = $env:WEBHOOK_SECRET
}

Write-Host "=== TEST: Valid Lead (expect 201) ==="
Write-Host "URL: $env:WEBHOOK_URL"
Write-Host "Body: $body"
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $env:WEBHOOK_URL `
        -Method POST `
        -Headers $headers `
        -Body $body `
        -UseBasicParsing

    $statusCode = $response.StatusCode
    $responseBody = $response.Content

    Write-Host "Status: $statusCode"
    Write-Host "Response: $responseBody"
    Write-Host ""

    if ($statusCode -eq 201) {
        Write-Host "PASS: Got 201 Created" -ForegroundColor Green
    } else {
        Write-Host "FAIL: Expected 201, got $statusCode" -ForegroundColor Red
        exit 1
    }
} catch {
    $statusCode = $_.Exception.Response.StatusCode.Value__
    $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
    $errorBody = $reader.ReadToEnd()
    Write-Host "FAIL: HTTP $statusCode — $errorBody" -ForegroundColor Red
    exit 1
}
