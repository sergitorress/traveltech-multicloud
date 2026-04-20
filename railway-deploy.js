#!/usr/bin/env node

/**
 * RAILWAY DEPLOYMENT - ONE-LINER EXECUTOR
 * 
 * Este script ejecuta TODA la secuencia de Railway deployment
 * Sin necesidad de leer documentación
 * 
 * USO: node railway-deploy.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function prompt(question) {
    return new Promise(resolve => {
        rl.question(question, resolve);
    });
}

async function main() {
    console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║                 🚀 RAILWAY DEPLOYMENT ASSISTANT                     ║
║          Asistente interactivo para desplegar en Railway             ║
╚══════════════════════════════════════════════════════════════════════╝
`);

    console.log('Este asistente te guiará paso a paso para desplegar en Railway.\n');

    // PASO 1: Verificación
    console.log('PASO 1/5: Verificando que los servicios están listos...\n');
    try {
        execSync('node check-railway-ready.js', { stdio: 'inherit' });
    } catch (e) {
        console.log('\n❌ Los servicios NO están listos. Verifica los errores arriba.');
        process.exit(1);
    }

    // PASO 2: Instrucciones de Railway
    console.log('\n' + '='.repeat(70));
    console.log('PASO 2/5: ABRIR RAILWAY\n');
    console.log('Abre en tu navegador: https://railway.app\n');
    console.log('Una vez dentro:');
    console.log('  1. Click "New Project"');
    console.log('  2. Selecciona "Deploy from GitHub repo"');
    console.log('  3. Busca y selecciona: sergitorress/traveltech-multicloud');
    console.log('  4. DESELECCIONA: frontend');
    console.log('  5. Deja marcados: service-wishlist y service-comments');
    console.log('  6. Click "Deploy"');
    console.log('  7. ESPERA a que vea "Deployment successful"');
    console.log('='.repeat(70) + '\n');

    const railwayReady = await prompt('¿Ya completaste el deployment en Railway? (s/n): ');
    if (railwayReady.toLowerCase() !== 's') {
        console.log('Ve a https://railway.app y completa el deployment. Luego vuelve aquí.');
        process.exit(0);
    }

    // PASO 3: Obtener URLs
    console.log('\n' + '='.repeat(70));
    console.log('PASO 3/5: COPIAR URLs DE RAILWAY\n');
    console.log('En Railway, para cada servicio:');
    console.log('  1. Click en "service-wishlist"');
    console.log('  2. En la parte superior, busca "Public URL"');
    console.log('  3. COPIA esa URL (ejemplo: https://service-wishlist-abc123.railway.app)');
    console.log('='.repeat(70) + '\n');

    const wishlistUrl = await prompt('Pega la URL de Wishlist: ');
    if (!wishlistUrl.includes('railway.app')) {
        console.log('❌ URL no válida. Debe contener "railway.app"');
        process.exit(1);
    }

    const commentsUrl = await prompt('Pega la URL de Comments: ');
    if (!commentsUrl.includes('railway.app')) {
        console.log('❌ URL no válida. Debe contener "railway.app"');
        process.exit(1);
    }

    // PASO 4: Actualizar Frontend
    console.log('\n' + '='.repeat(70));
    console.log('PASO 4/5: ACTUALIZAR FRONTEND\n');
    console.log(`Actualizando URLs en el frontend...`);
    console.log(`  Wishlist: ${wishlistUrl}`);
    console.log(`  Comments: ${commentsUrl}\n`);

    try {
        execSync(`node update-railway-urls.js "${wishlistUrl}" "${commentsUrl}"`, { stdio: 'inherit' });
    } catch (e) {
        console.log('❌ Error al actualizar URLs');
        process.exit(1);
    }

    // PASO 5: Push a GitHub
    console.log('\n' + '='.repeat(70));
    console.log('PASO 5/5: PUSH A GITHUB\n');
    console.log('Enviando cambios a GitHub...\n');

    try {
        execSync('git add frontend/public/script.js', { stdio: 'pipe' });
        execSync('git commit -m "Update Railway service URLs"', { stdio: 'pipe' });
        execSync('git push', { stdio: 'inherit' });
        console.log('\n✅ Cambios enviados a GitHub');
    } catch (e) {
        console.log('❌ Error al hacer push a GitHub');
        process.exit(1);
    }

    // RESUMEN FINAL
    console.log('\n' + '='.repeat(70));
    console.log('🎉 ¡COMPLETADO!\n');
    console.log('Render detectará automáticamente el cambio en GitHub y redesplegará.');
    console.log('Esto puede tomar 3-5 minutos.\n');
    console.log('Una vez completado, verifica:');
    console.log('  1. Abre: https://traveltech-frontend-06xs.onrender.com/');
    console.log('  2. Busca un país');
    console.log('  3. Verifica que Wishlist y Comments funcionan\n');
    console.log('='.repeat(70));

    rl.close();
}

main().catch(console.error);
