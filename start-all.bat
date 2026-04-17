@echo off
REM Script para iniciar toda la plataforma en modo desarrollo (Windows)

echo.
echo ======================================
echo   TravelTech MultiCloud Platform
echo   Starting Development Environment
echo ======================================
echo.

echo [1/4] Frontend (Puerto 3000)
start "Frontend" cmd /k "cd frontend & npm install & npm start"

timeout /t 2 /nobreak

echo [2/4] Favorites Service (Puerto 3001)
start "Favorites Service" cmd /k "cd service-favorites & npm install & npm start"

timeout /t 2 /nobreak

echo [3/4] Wishlist Service (Puerto 3002)
start "Wishlist Service" cmd /k "cd service-wishlist & npm install & npm start"

timeout /t 2 /nobreak

echo [4/4] Comments Service (Puerto 3003)
start "Comments Service" cmd /k "cd service-comments & npm install & npm start"

echo.
echo ======================================
echo   Servicios iniciados:
echo   - Frontend:        http://localhost:3000
echo   - Favorites:       http://localhost:3001
echo   - Wishlist:        http://localhost:3002
echo   - Comments:        http://localhost:3003
echo ======================================
echo.
pause
