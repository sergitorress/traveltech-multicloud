#!/usr/bin/env node

/**
 * verify-project.js
 * Script de verificación final del proyecto TravelTech MultiCloud
 * Ejecutar: node verify-project.js
 */

const fs = require('fs');
const path = require('path');

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║     ✅ VERIFICACIÓN FINAL DEL PROYECTO TRAVELTECH             ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

let allChecks = true;

// Test 1: Estructura de directorios
console.log('1️⃣  ESTRUCTURA DEL PROYECTO');
console.log('   ─────────────────────────');
const dirs = ['frontend', 'service-favorites', 'service-wishlist', 'service-comments'];
dirs.forEach(dir => {
    const exists = fs.existsSync(dir);
    console.log(`   ${exists ? '✅' : '❌'} ${dir}`);
    if (!exists) allChecks = false;
});

console.log('\n2️⃣  ARCHIVOS CLAVE');
console.log('   ────────────────');
const files = [
    'server-aggregated.js',
    'package.json',
    'frontend/server.js',
    'frontend/public/index.html',
    'service-favorites/server.js',
    'service-wishlist/server.js',
    'service-comments/server.js',
    'ENTREGA_MINIMA.md',
    'DEPLOYMENT_FREE.md',
    'Postman_Collection.json',
    'README.md'
];
files.forEach(file => {
    const exists = fs.existsSync(file);
    console.log(`   ${exists ? '✅' : '❌'} ${file}`);
    if (!exists) allChecks = false;
});

console.log('\n3️⃣  PACKAGE.JSON EN CADA SERVICIO');
console.log('   ──────────────────────────────');
['frontend', 'service-favorites', 'service-wishlist', 'service-comments'].forEach(dir => {
    const packageFile = path.join(dir, 'package.json');
    if (fs.existsSync(packageFile)) {
        const pkg = JSON.parse(fs.readFileSync(packageFile, 'utf-8'));
        console.log(`   ✅ ${dir}: ${pkg.name} v${pkg.version}`);
    } else {
        console.log(`   ❌ ${dir}: package.json NO ENCONTRADO`);
        allChecks = false;
    }
});

console.log('\n4️⃣  DEPENDENCIAS INSTALADAS');
console.log('   ───────────────────────');
if (fs.existsSync('node_modules')) {
    const count = fs.readdirSync('node_modules').length;
    console.log(`   ✅ node_modules: ${count} paquetes instalados`);
} else {
    console.log('   ❌ node_modules NO ENCONTRADO');
    allChecks = false;
}

console.log('\n5️⃣  DOCUMENTACIÓN DE ENTREGA');
console.log('   ──────────────────────────');
['ENTREGA_MINIMA.md', 'DEPLOYMENT_FREE.md', 'README.md'].forEach(doc => {
    if (fs.existsSync(doc)) {
        const size = fs.statSync(doc).size;
        console.log(`   ✅ ${doc} (${size} bytes)`);
    } else {
        console.log(`   ❌ ${doc} NO ENCONTRADO`);
        allChecks = false;
    }
});

console.log('\n6️⃣  POSTMAN COLLECTION');
console.log('   ──────────────────');
if (fs.existsSync('Postman_Collection.json')) {
    const postman = JSON.parse(fs.readFileSync('Postman_Collection.json', 'utf-8'));
    const itemCount = postman.item ? postman.item.length : 0;
    console.log(`   ✅ Postman Collection: ${itemCount} endpoints`);
} else {
    console.log('   ❌ Postman Collection NO ENCONTRADO');
    allChecks = false;
}

console.log('\n7️⃣  CONFIGURACIÓN GITHUB');
console.log('   ────────────────────');
const gitConfigFile = path.join('.git', 'config');
if (fs.existsSync(gitConfigFile)) {
    const gitConfig = fs.readFileSync(gitConfigFile, 'utf-8');
    if (gitConfig.includes('github.com/sergitorress/traveltech-multicloud')) {
        console.log('   ✅ GitHub configurado: sergitorress/traveltech-multicloud');
    } else {
        console.log('   ⚠️  GitHub configurado pero con URL diferente');
    }
} else {
    console.log('   ⚠️  No es un repositorio git');
}

console.log('\n╔════════════════════════════════════════════════════════════════╗');
if (allChecks) {
    console.log('║                   ✅ TODO VERIFICADO                          ║');
    console.log('║                  PROYECTO LISTO PARA ENTREGAR                 ║');
} else {
    console.log('║             ⚠️  ALGUNOS ARCHIVOS NO ENCONTRADOS               ║');
}
console.log('╚════════════════════════════════════════════════════════════════╝\n');

console.log('📋 PRÓXIMOS PASOS:');
console.log('   1. Lee: ENTREGA_MINIMA.md');
console.log('   2. Desplega en Railway (30 minutos)');
console.log('   3. Obtén las 4 URLs públicas');
console.log('   4. Haz screenshots del frontend y Postman');
console.log('   5. Escribe la memoria técnica (10 líneas)');
console.log('   6. ¡ENTREGA!\n');

process.exit(allChecks ? 0 : 1);
