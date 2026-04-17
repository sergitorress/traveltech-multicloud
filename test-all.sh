#!/bin/bash

# TravelTech MultiCloud - Health Check & Basic Tests
# Run automated health checks and basic functionality tests

echo "================================"
echo "TravelTech MultiCloud - Test Suite"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

FAILED=0

# Function to test endpoint
test_endpoint() {
    local name=$1
    local url=$2
    
    echo -n "Testing ${name}... "
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$response" = "200" ] || [ "$response" = "201" ]; then
        echo -e "${GREEN}✓ OK${NC} (HTTP $response)"
    else
        echo -e "${RED}✗ FAILED${NC} (HTTP $response)"
        FAILED=$((FAILED+1))
    fi
}

# Function to test POST endpoint
test_post() {
    local name=$1
    local url=$2
    local data=$3
    
    echo -n "Testing ${name}... "
    
    response=$(curl -s -X POST "$url" \
        -H "Content-Type: application/json" \
        -d "$data" \
        -o /dev/null -w "%{http_code}")
    
    if [ "$response" = "200" ] || [ "$response" = "201" ]; then
        echo -e "${GREEN}✓ OK${NC} (HTTP $response)"
    else
        echo -e "${RED}✗ FAILED${NC} (HTTP $response)"
        FAILED=$((FAILED+1))
    fi
}

echo "📍 Health Checks"
echo "==============="

test_endpoint "Frontend" "http://localhost:3000/health"
test_endpoint "Favorites" "http://localhost:3001/health"
test_endpoint "Wishlist" "http://localhost:3002/health"
test_endpoint "Comments" "http://localhost:3003/health"

echo ""
echo "📍 Favorites Service"
echo "==================="

test_post "Add Favorite" "http://localhost:3001/api/favorites/TestCountry" "{\"name\":\"TestCountry\"}"
test_endpoint "Get Favorites" "http://localhost:3001/api/favorites"

echo ""
echo "📍 Wishlist Service"
echo "=================="

test_post "Add to Wishlist" "http://localhost:3002/api/wishlist/TestCountry" "{\"name\":\"TestCountry\"}"
test_endpoint "Get Wishlist" "http://localhost:3002/api/wishlist"

echo ""
echo "📍 Comments Service"
echo "=================="

test_post "Add Comment" "http://localhost:3003/api/comments" "{\"country\":\"TestCountry\",\"text\":\"Test comment\"}"
test_endpoint "Get Comments" "http://localhost:3003/api/comments/TestCountry"
test_endpoint "Get Stats" "http://localhost:3003/api/comments-stats"

echo ""
echo "📍 REST Countries API"
echo "===================="

test_endpoint "Search Country" "https://restcountries.com/v3.1/name/Spain"

echo ""
echo "================================"
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ ALL TESTS PASSED${NC}"
else
    echo -e "${RED}✗ $FAILED TEST(S) FAILED${NC}"
fi
echo "================================"

exit $FAILED
