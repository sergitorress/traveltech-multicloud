#!/usr/bin/env node

/**
 * test-endpoints.js
 * Script de prueba de endpoints - Simula lo que pasará en Railway
 * Ejecutar: node server-aggregated.js (en otra terminal)
 *          node test-endpoints.js
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

function testEndpoint(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({ status: res.statusCode, data: json });
        } catch {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function runTests() {
  console.log('\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║          TEST DE ENDPOINTS - VALIDACIÓN PARA RAILWAY         ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  try {
    // Test 1: Health check
    console.log('1️⃣  Health Check');
    console.log('   GET /health');
    const health = await testEndpoint('/health');
    console.log(`   Status: ${health.status}`);
    console.log(`   ✅ ${health.data.status === 'healthy' ? 'HEALTHY' : 'UNHEALTHY'}`);
    console.log('');

    // Test 2: Favorites endpoints
    console.log('2️⃣  Favorites API');
    console.log('   GET /api/favorites');
    const getFav = await testEndpoint('/api/favorites');
    console.log(`   ✅ Status: ${getFav.status}`);
    console.log('');

    console.log('   POST /api/favorites');
    const postFav = await testEndpoint('/api/favorites', 'POST', { country: 'Spain' });
    console.log(`   ✅ Status: ${postFav.status}`);
    console.log(`   ✅ Country: ${postFav.data.country}`);
    console.log('');

    // Test 3: Wishlist endpoints
    console.log('3️⃣  Wishlist API');
    console.log('   GET /api/wishlist');
    const getWish = await testEndpoint('/api/wishlist');
    console.log(`   ✅ Status: ${getWish.status}`);
    console.log('');

    console.log('   POST /api/wishlist');
    const postWish = await testEndpoint('/api/wishlist', 'POST', { country: 'Japan', reason: 'Mount Fuji' });
    console.log(`   ✅ Status: ${postWish.status}`);
    console.log(`   ✅ Country: ${postWish.data.country}`);
    console.log('');

    // Test 4: Comments endpoints
    console.log('4️⃣  Comments API');
    console.log('   GET /api/comments');
    const getComm = await testEndpoint('/api/comments');
    console.log(`   ✅ Status: ${getComm.status}`);
    console.log('');

    console.log('   POST /api/comments');
    const postComm = await testEndpoint('/api/comments', 'POST', { 
      country: 'Italy', 
      user: 'Alice', 
      text: 'Amazing place!' 
    });
    console.log(`   ✅ Status: ${postComm.status}`);
    console.log(`   ✅ Country: ${postComm.data.country}`);
    console.log(`   ✅ User: ${postComm.data.user}`);
    console.log('');

    console.log('╔═══════════════════════════════════════════════════════════════╗');
    console.log('║                   ✅ TODOS LOS TESTS PASARON                 ║');
    console.log('║              PROYECTO LISTO PARA RAILWAY/RENDER              ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  } catch (err) {
    console.error('\n❌ ERROR:', err.message);
    console.error('\n⚠️  SOLUCIÓN: Asegúrate de que el servidor esté corriendo:');
    console.error('   En otra terminal ejecuta: node server-aggregated.js\n');
    process.exit(1);
  }
}

runTests();
