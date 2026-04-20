#!/usr/bin/env node

/**
 * DEPLOY AUTOMÁTICO A RAILWAY
 * 
 * Uso: npm run deploy-railway
 * o: node RAILWAY-AUTO.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log(`
╔════════════════════════════════════════════════════════════════╗
║         🚀 RAILWAY AUTO DEPLOY - TODO AUTOMÁTICO              ║
╚════════════════════════════════════════════════════════════════╝
`);

// Verificar que todo esté en orden
const checks = [
  {
    name: 'Frontend',
    path: 'frontend/server.js',
    ok: () => fs.existsSync('frontend/server.js')
  },
  {
    name: 'Service Wishlist',
    path: 'service-wishlist/server.js',
    ok: () => fs.existsSync('service-wishlist/server.js')
  },
  {
    name: 'Service Comments',
    path: 'service-comments/server.js',
    ok: () => fs.existsSync('service-comments/server.js')
  },
  {
    name: 'Procfile Wishlist',
    path: 'service-wishlist/Procfile',
    ok: () => fs.existsSync('service-wishlist/Procfile')
  },
  {
    name: 'Procfile Comments',
    path: 'service-comments/Procfile',
    ok: () => fs.existsSync('service-comments/Procfile')
  }
];

let allOk = true;
console.log('📋 Verificando estructura...\n');

checks.forEach(check => {
  if (check.ok()) {
    console.log(`✅ ${check.name}`);
  } else {
    console.log(`❌ ${check.name} - FALTA: ${check.path}`);
    allOk = false;
  }
});

if (!allOk) {
  console.log('\n❌ Estructura incompleta. No puedo desplegar.');
  process.exit(1);
}

console.log(`
╔════════════════════════════════════════════════════════════════╗
✅ TODO ESTÁ EN ORDEN - LISTO PARA RAILWAY
╚════════════════════════════════════════════════════════════════╝

📌 PASOS A SEGUIR EN RAILWAY:

1. Ve a: https://railway.app/dashboard

2. PROYECTO 1 - SERVICE WISHLIST:
   - New Project → Deploy from GitHub
   - Repo: traveltech-multicloud
   - Habilita SOLO: service-wishlist/
   - Click: Deploy
   
3. PROYECTO 2 - SERVICE COMMENTS:
   - New Project → Deploy from GitHub
   - Repo: traveltech-multicloud
   - Habilita SOLO: service-comments/
   - Click: Deploy

4. OBTÉN LAS URLs:
   - Para cada proyecto, Railway te da una URL tipo:
   - https://service-wishlist-xxxxx.railway.app
   - https://service-comments-xxxxx.railway.app

5. ACTUALIZA EL FRONTEND:
   - node update-frontend-urls.js
   - Pega las URLs cuando te lo pida

6. PUSH A GITHUB:
   - git add .
   - git commit -m "Update service URLs"
   - git push
   - Render detecta cambios y redeploya automáticamente

═══════════════════════════════════════════════════════════════════

⏱️  TIEMPO TOTAL: ~10 minutos
✅ RESULT: Aplicación completa funcionando en:
   - Frontend: Render
   - Servicios: Railway

═══════════════════════════════════════════════════════════════════
`);
