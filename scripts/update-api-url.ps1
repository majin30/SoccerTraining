$ErrorActionPreference = 'Stop'

$currentScript = $MyInvocation.MyCommand.Path
$scriptDir = Split-Path -Parent $currentScript
$projectRoot = Split-Path -Parent $scriptDir
$apiConfigPath = Join-Path $projectRoot 'src/config/api-generated.json'

function Get-LocalIp {
    $candidates = Get-NetIPAddress -AddressFamily IPv4 `
        | Where-Object {
            $_.IPAddress -notmatch '^169\.254' -and
            $_.IPAddress -ne '127.0.0.1' -and
            $_.InterfaceAlias -notmatch 'Virtual' -and
            $_.InterfaceAlias -notmatch 'Loopback'
        } `
        | Sort-Object -Property SkipAsSource,PrefixOrigin

    if (-not $candidates) {
        throw 'No se encontró una IPv4 válida. ¿Estás conectado a la red?'
    }

    return $candidates[0].IPAddress
}

$ip = Get-LocalIp

$json = @{ ip = $ip } | ConvertTo-Json -Depth 2

Set-Content -Path $apiConfigPath -Value $json -Encoding UTF8

Write-Host "API_URL actualizado a http://$ip:5000/api" -ForegroundColor Green

