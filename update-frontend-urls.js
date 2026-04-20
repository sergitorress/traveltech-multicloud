#!/usr/bin/env node

/**
 * update-frontend-urls.js
 * 
 * Actualiza automáticamente las URLs de los servicios en el Frontend
 * 
 * Uso: node update-frontend-urls.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise(resolve => rl.question(query, resolve));

async function main() {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║          ACTUALIZAR URLs EN FRONTEND                          ║
╚════════════════════════════════════════════════════════════════╝
  `);

  const wishlistUrl = await question('📌 URL de service-wishlist: ');
  const commentsUrl = await question('💬 URL de service-comments: ');

  if (!wishlistUrl || !commentsUrl) {
    console.log('❌ URLs vacías. Saliendo.');
    rl.close();
    return;
  }

  const scriptPath = path.join(__dirname, 'frontend', 'public', 'script.js');
  
  if (!fs.existsSync(scriptPath)) {
    console.log('❌ No encontré frontend/public/script.js');
    rl.close();
    return;
  }

  let content = fs.readFileSync(scriptPath, 'utf8');

  // Reemplazar URLs
  content = content.replace(
    /const WISHLIST_URL = ['"][^'"]*['"]/g,
    `const WISHLIST_URL = '${wishlistUrl}'`
  );
  content = content.replace(
    /const COMMENTS_URL = ['"][^'"]*['"]/g,
    `const COMMENTS_URL = '${commentsUrl}'`
  );

  fs.writeFileSync(scriptPath, content, 'utf8');

  console.log(`
✅ URLs ACTUALIZADAS:
   - Wishlist: ${wishlistUrl}
   - Comments: ${commentsUrl}

⏳ Próximos pasos:
   1. git add .
   2. git commit -m "Update service URLs for Railway deployment"
   3. git push
   
   Railway detectará los cambios y redesplegará automáticamente.
  `);

  rl.close();
}

main().catch(console.error);
