@echo off
setlocal enabledelayedexpansion

cls
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║        RAILWAY DEPLOY - CLI DIRECTO (SIN GUI CONFUSA)         ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Verificar si Railway CLI está instalado
railway --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Railway CLI no está instalado
    echo.
    echo Instalando Railway CLI...
    npm install -g @railway/cli
    if errorlevel 1 (
        echo ❌ No se pudo instalar Railway CLI
        exit /b 1
    )
)

echo ✅ Railway CLI detectado
echo.
echo Próximo: Abre browser en: https://railway.app
echo Copia tu AUTH TOKEN desde: https://railway.app/account/tokens
echo.
set /p token="Pega tu Railway token aquí: "

if "%token%"=="" (
    echo ❌ Token vacío
    exit /b 1
)

REM Guardar token
set RAILWAY_TOKEN=%token%

echo.
echo ════════════════════════════════════════════════════════════════
echo DESPLEGANDO SERVICE-WISHLIST...
echo ════════════════════════════════════════════════════════════════

cd service-wishlist
railway init --name service-wishlist
if errorlevel 1 (
    echo ❌ Error en railway init
    exit /b 1
)

railway up
if errorlevel 1 (
    echo ❌ Error desplegando service-wishlist
    exit /b 1
)

echo ✅ service-wishlist desplegado

REM Obtener URL
for /f "delims=" %%i in ('railway env | findstr "PORT"') do set port=%%i

cd ..

echo.
echo ════════════════════════════════════════════════════════════════
echo DESPLEGANDO SERVICE-COMMENTS...
echo ════════════════════════════════════════════════════════════════

cd service-comments
railway init --name service-comments
if errorlevel 1 (
    echo ❌ Error en railway init
    exit /b 1
)

railway up
if errorlevel 1 (
    echo ❌ Error desplegando service-comments
    exit /b 1
)

echo ✅ service-comments desplegado

cd ..

echo.
echo ════════════════════════════════════════════════════════════════
echo ✅ DEPLOYES COMPLETADOS
echo ════════════════════════════════════════════════════════════════
echo.
echo Ahora:
echo 1. Ve a: https://railway.app/dashboard
echo 2. Copia las URLs de cada servicio
echo 3. Ejecuta: node update-frontend-urls.js
echo 4. Pega las URLs cuando te lo pida
echo.
pause
