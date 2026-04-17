#!/bin/bash
# Script para iniciar toda la plataforma en modo desarrollo

echo "🚀 Iniciando TravelTech MultiCloud Platform..."
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Funcion para iniciar servicio en background
start_service() {
    local name=$1
    local dir=$2
    local port=$3
    
    echo -e "${YELLOW}▶ Iniciando ${name} en puerto ${port}...${NC}"
    
    cd "$dir"
    npm install > /dev/null 2>&1
    npm start &
    LOCAL_PID=$!
    echo -e "${GREEN}✓ ${name} iniciado (PID: ${LOCAL_PID})${NC}"
    cd - > /dev/null
}

# Detener servicios al salir
trap 'echo -e "\n${RED}✗ Parando servicios...${NC}"; pkill -P $$; exit' INT

# Iniciar servicios
start_service "Frontend" "./frontend" "3000"
sleep 2
start_service "Favorites Service" "./service-favorites" "3001"
sleep 2
start_service "Wishlist Service" "./service-wishlist" "3002"
sleep 2
start_service "Comments Service" "./service-comments" "3003"

echo ""
echo -e "${GREEN}✓ Todos los servicios iniciados${NC}"
echo ""
echo "URLs:"
echo "  Frontend:  ${YELLOW}http://localhost:3000${NC}"
echo "  Favorites: ${YELLOW}http://localhost:3001${NC}"
echo "  Wishlist:  ${YELLOW}http://localhost:3002${NC}"
echo "  Comments:  ${YELLOW}http://localhost:3003${NC}"
echo ""
echo -e "${YELLOW}Presiona Ctrl+C para detener${NC}"

# Mantener el script ejecutándose
wait
