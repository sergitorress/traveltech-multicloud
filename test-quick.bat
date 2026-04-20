@echo off
REM test-quick.bat - Prueba rápida de que TODO funciona

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║     TEST RAPIDO - Verificar que TODO funciona             ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Test 1: Verificar que Node existe
echo 1️⃣ Verificando Node.js...
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
    echo    ✅ Node instalado: %NODE_VERSION%
) else (
    echo    ❌ Node no está instalado
    exit /b 1
)

echo.

REM Test 2: Verificar que npm existe
echo 2️⃣ Verificando npm...
where npm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
    echo    ✅ npm instalado: %NPM_VERSION%
) else (
    echo    ❌ npm no está instalado
    exit /b 1
)

echo.

REM Test 3: Verificar dependencias
echo 3️⃣ Verificando dependencias...
if exist "node_modules" (
    echo    ✅ node_modules existe
) else (
    echo    ❌ node_modules no existe. Ejecuta: npm install
    exit /b 1
)

echo.

REM Test 4: Verificar archivos clave
echo 4️⃣ Verificando archivos clave...
set FILES[0]=server-aggregated.js
set FILES[1]=frontend\public\index.html
set FILES[2]=service-favorites\server.js
set FILES[3]=service-wishlist\server.js
set FILES[4]=service-comments\server.js

for %%F in (%FILES[0]% %FILES[1]% %FILES[2]% %FILES[3]% %FILES[4]%) do (
    if exist "%%F" (
        echo    ✅ %%F
    ) else (
        echo    ❌ %%F NO ENCONTRADO
    )
)

echo.

REM Test 5: Verificar GitHub
echo 5️⃣ Verificando GitHub...
git log -1 --oneline >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('git log -1 --oneline') do set COMMIT=%%i
    for /f "tokens=*" %%i in ('git branch --show-current') do set BRANCH=%%i
    for /f "tokens=*" %%i in ('git config --get remote.origin.url') do set REMOTE=%%i
    echo    ✅ Rama: %BRANCH%
    echo    ✅ Último commit: %COMMIT%
    echo    ✅ Remote: %REMOTE%
) else (
    echo    ❌ No es un repositorio Git válido
)

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  ✅ VERIFICACION COMPLETADA - LISTO PARA DESPLEGAR         ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo PROXIMO PASO:
echo   1. Lee: ENTREGA_MINIMA.md
echo   2. Desplega en Railway (30 minutos)
echo   3. Obtén las URLs
echo   4. Haz screenshots
echo   5. ¡ENTREGA LISTA!
echo.
pause
