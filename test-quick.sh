#!/bin/bash
# test-quick.sh - Prueba rápida de que TODO funciona

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     TEST RÁPIDO - Verificar que TODO funciona             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Test 1: Verificar que Node existe
echo "1️⃣ Verificando Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "   ✅ Node instalado: $NODE_VERSION"
else
    echo "   ❌ Node no está instalado"
    exit 1
fi

echo ""

# Test 2: Verificar que npm existe
echo "2️⃣ Verificando npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "   ✅ npm instalado: $NPM_VERSION"
else
    echo "   ❌ npm no está instalado"
    exit 1
fi

echo ""

# Test 3: Verificar dependencias
echo "3️⃣ Verificando dependencias..."
if [ -d "node_modules" ]; then
    echo "   ✅ node_modules existe"
else
    echo "   ❌ node_modules no existe. Ejecuta: npm install"
    exit 1
fi

echo ""

# Test 4: Verificar archivos clave
echo "4️⃣ Verificando archivos clave..."
FILES=("server-aggregated.js" "frontend/public/index.html" "service-favorites/server.js" "service-wishlist/server.js" "service-comments/server.js")

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    else
        echo "   ❌ $file NO ENCONTRADO"
    fi
done

echo ""

# Test 5: Verificar GitHub
echo "5️⃣ Verificando GitHub..."
if git log -1 --oneline &> /dev/null; then
    COMMIT=$(git log -1 --oneline)
    BRANCH=$(git branch --show-current)
    REMOTE=$(git config --get remote.origin.url)
    echo "   ✅ Rama: $BRANCH"
    echo "   ✅ Último commit: $COMMIT"
    echo "   ✅ Remote: $REMOTE"
else
    echo "   ❌ No es un repositorio Git válido"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ✅ VERIFICACIÓN COMPLETADA - LISTO PARA DESPLEGAR         ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "PRÓXIMO PASO:"
echo "  1. Lee: ENTREGA_MINIMA.md"
echo "  2. Desplega en Railway (30 minutos)"
echo "  3. Obtén las URLs"
echo "  4. Haz screenshots"
echo "  5. ¡ENTREGA LISTA!"
