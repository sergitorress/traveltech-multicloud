@echo off
REM Script para configurar GitHub automáticamente

cls
echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║         Arreglador de Repositorio GitHub                     ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
echo ❌ El repositorio NO existe en GitHub
echo.
echo SOLUCIÓN RÁPIDA:
echo ───────────────
echo 1. Abre: https://github.com/new
echo 2. Usuario: micronigga
echo 3. Nombre: traveltech-multicloud
echo 4. Selecciona: PUBLIC
echo 5. Clic: Create repository
echo 6. Vuelve aquí y presiona cualquier tecla
echo.
pause

echo.
echo Verificando conexión con GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ ¡ÉXITO! Tu código está en GitHub
    echo.
    echo Tu repositorio: https://github.com/micronigga/traveltech-multicloud
    echo.
) else (
    echo.
    echo ❌ Aún hay problemas. 
    echo.
    echo Soluciones:
    echo 1. Verifica que creaste el repositorio en GitHub
    echo 2. Verifica tu usuario (debe ser: micronigga)
    echo 3. Si usas autenticación, ve a: https://github.com/settings/tokens
    echo    y genera un nuevo token
    echo.
)

pause
