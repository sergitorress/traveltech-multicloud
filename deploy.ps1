#!/usr/bin/env pwsh
<#
.SYNOPSIS
    TravelTech MultiCloud - Deployment Helper Script
    
.DESCRIPTION
    Este script ayuda a subir el código a GitHub de forma interactiva
    
.NOTES
    Ejecutar desde: PowerShell (como admin o usuario normal)
    Ubicación: carpeta raíz del proyecto
#>

Write-Host "`n╔═══════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║          TravelTech MultiCloud - Deployment Helper                 ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Paso 1: Verificar Git
Write-Host "✓ PASO 1: Verificando Git..." -ForegroundColor Yellow
git --version | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Git está instalado`n" -ForegroundColor Green
} else {
    Write-Host "❌ Git no está instalado. Descárgalo de: https://git-scm.com`n" -ForegroundColor Red
    exit
}

# Paso 2: Verificar estado del repositorio
Write-Host "✓ PASO 2: Verificando estado del repositorio..." -ForegroundColor Yellow
$status = git status 2>&1
if ($status -match "nothing to commit") {
    Write-Host "✅ Repositorio limpio (sin cambios sin hacer commit)`n" -ForegroundColor Green
} else {
    Write-Host "⚠️  Hay cambios sin hacer commit:`n" -ForegroundColor Yellow
    git status
    Write-Host ""
}

# Paso 3: Configurar Git (opcional)
Write-Host "✓ PASO 3: Configuración de Git" -ForegroundColor Yellow
$name = git config user.name
$email = git config user.email

if ($name) {
    Write-Host "✅ Nombre ya configurado: $name" -ForegroundColor Green
} else {
    Write-Host "❌ Nombre NO configurado" -ForegroundColor Yellow
    $name = Read-Host "Ingresa tu nombre"
    git config user.name "$name"
    Write-Host "✅ Nombre configurado: $name`n" -ForegroundColor Green
}

if ($email) {
    Write-Host "✅ Email ya configurado: $email`n" -ForegroundColor Green
} else {
    Write-Host "❌ Email NO configurado" -ForegroundColor Yellow
    $email = Read-Host "Ingresa tu email"
    git config user.email "$email"
    Write-Host "✅ Email configurado: $email`n" -ForegroundColor Green
}

# Paso 4: Verificar GitHub remote
Write-Host "✓ PASO 4: Verificando GitHub remote..." -ForegroundColor Yellow
$remoteUrl = git config --get remote.origin.url
if ($remoteUrl) {
    Write-Host "✅ Remote configurado: $remoteUrl`n" -ForegroundColor Green
} else {
    Write-Host "⚠️  Remote NO configurado`n" -ForegroundColor Yellow
    $githubUrl = Read-Host "Ingresa tu URL de GitHub (ej: https://github.com/usuario/traveltech-multicloud.git)"
    git remote add origin "$githubUrl"
    Write-Host "✅ Remote agregado`n" -ForegroundColor Green
}

# Paso 5: Hacer push
Write-Host "✓ PASO 5: Preparado para hacer PUSH a GitHub" -ForegroundColor Yellow
Write-Host "`n📊 Resumen antes de hacer push:" -ForegroundColor Cyan
Write-Host "   Usuario: $name" -ForegroundColor White
Write-Host "   Email: $email" -ForegroundColor White
Write-Host "   Remote: $remoteUrl" -ForegroundColor White
Write-Host "   Rama: main" -ForegroundColor White

$confirm = Read-Host "`n¿Hacer push a GitHub? (s/n)"

if ($confirm -eq "s" -or $confirm -eq "S") {
    Write-Host "`n⏳ Haciendo push..." -ForegroundColor Yellow
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ ¡PUSH EXITOSO!" -ForegroundColor Green
        Write-Host "Tu código está en GitHub: $remoteUrl`n" -ForegroundColor Green
        
        $usuario = $remoteUrl -replace '.*/' -replace '.git' -replace 'traveltech.*'
        $usuario = Read-Host "¿Cuál es tu usuario de GitHub? (ej: micronigga)"
        Write-Host "`n📌 SIGUIENTE PASO: Desplegar en Render" -ForegroundColor Cyan
        Write-Host "   1. Abre: https://render.com/signup" -ForegroundColor White
        Write-Host "   2. Selecciona 'Continue with GitHub'" -ForegroundColor White
        Write-Host "   3. Conecta tu repositorio: https://github.com/$usuario/traveltech-multicloud" -ForegroundColor White
        Write-Host "   4. Crea 3 Web Services (sigue DEPLOYMENT_SIMPLE.txt)" -ForegroundColor White
        Write-Host "`n" -ForegroundColor White
    } else {
        Write-Host "`n❌ Error en el push" -ForegroundColor Red
        Write-Host "Soluciones:" -ForegroundColor Yellow
        Write-Host "1. Verifica que el repositorio existe en GitHub" -ForegroundColor White
        Write-Host "2. Verifica tu autenticación (token o SSH)" -ForegroundColor White
        Write-Host "3. Intenta generar un token: https://github.com/settings/tokens" -ForegroundColor White
    }
} else {
    Write-Host "❌ Cancelado" -ForegroundColor Yellow
}

Write-Host "`n" -ForegroundColor White
