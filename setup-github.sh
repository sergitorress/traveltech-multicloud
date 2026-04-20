#!/bin/bash
# Script para crear repositorio en GitHub automáticamente
# Este script ayuda a configurar el repositorio remoto

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         Configurador de Repositorio GitHub                   ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "❌ El repositorio NO existe en GitHub"
echo ""
echo "SOLUCIÓN RÁPIDA:"
echo "1. Abre: https://github.com/new"
echo "2. Nombre: traveltech-multicloud"
echo "3. Selecciona: PUBLIC"
echo "4. Clic: Create repository"
echo "5. Vuelve y ejecuta: git push -u origin main"
echo ""
echo "─────────────────────────────────────────────────────────────"
echo ""
echo "¿YA creaste el repositorio en GitHub? (s/n)"
read -r answer

if [ "$answer" = "s" ] || [ "$answer" = "S" ]; then
    echo ""
    echo "Intenta hacer push ahora:"
    git push -u origin main
else
    echo ""
    echo "Por favor crea el repositorio primero en: https://github.com/new"
fi
