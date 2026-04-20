#!/usr/bin/env node

/**
 * Script para actualizar URLs de Railway en el frontend
 * Uso: node update-railway-urls.js <wishlist-url> <comments-url>
 * 
 * Ejemplo:
 * node update-railway-urls.js https://service-wishlist-abc123.railway.app https://service-comments-xyz789.railway.app
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length < 2) {
    console.error('❌ FALTAN ARGUMENTOS');
    console.error('Uso: node update-railway-urls.js <wishlist-url> <comments-url>');
    console.error('');
    console.error('Ejemplo:');
    console.error('  node update-railway-urls.js https://service-wishlist-abc.railway.app https://service-comments-xyz.railway.app');
    process.exit(1);
}

const wishlistUrl = args[0];
const commentsUrl = args[1];

const scriptPath = path.join(__dirname, 'frontend/public/script.js');

// Verificar que el archivo existe
if (!fs.existsSync(scriptPath)) {
    console.error('❌ Archivo no encontrado:', scriptPath);
    process.exit(1);
}

try {
    // Leer el archivo
    let content = fs.readFileSync(scriptPath, 'utf8');
    
    // Reemplazar URLs
    const originalContent = content;
    
    content = content.replace(
        /WISHLIST:\s*['"].*?['"]/,
        `WISHLIST: '${wishlistUrl}'`
    );
    
    content = content.replace(
        /COMMENTS:\s*['"].*?['"]/,
        `COMMENTS: '${commentsUrl}'`
    );
    
    // Escribir el archivo
    fs.writeFileSync(scriptPath, content, 'utf8');
    
    console.log('✅ URLs ACTUALIZADAS EN frontend/public/script.js');
    console.log('');
    console.log('Cambios realizados:');
    console.log(`  • WISHLIST: ${wishlistUrl}`);
    console.log(`  • COMMENTS: ${commentsUrl}`);
    console.log('');
    console.log('Próximos pasos:');
    console.log('  1. git add frontend/public/script.js');
    console.log('  2. git commit -m "Update Railway service URLs"');
    console.log('  3. git push');
    console.log('  4. Render auto-redeploy');
    
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
