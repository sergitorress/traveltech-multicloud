#!/usr/bin/env node

/**
 * PRE-RAILWAY VERIFICATION
 * Verifica que TODOS los servicios están listos para desplegar en Railway
 * 
 * Este script confirma que NO HAY PROBLEMAS antes de que el usuario 
 * haga el deploy en Railway.app
 */

const fs = require('fs');
const path = require('path');

const services = [
    'service-wishlist',
    'service-comments'
];

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║          PRE-RAILWAY DEPLOYMENT VERIFICATION               ║');
console.log('║  Verifica que TODO está listo para desplegar en Railway   ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

let allGood = true;

// 1. Verificar que cada servicio tiene package.json y server.js
console.log('1️⃣  VERIFICANDO ESTRUCTURA DE SERVICIOS:\n');
services.forEach(service => {
    const packageJsonPath = path.join(service, 'package.json');
    const serverJsPath = path.join(service, 'server.js');
    
    const hasPackageJson = fs.existsSync(packageJsonPath);
    const hasServerJs = fs.existsSync(serverJsPath);
    
    if (hasPackageJson && hasServerJs) {
        console.log(`   ✅ ${service}`);
    } else {
        console.log(`   ❌ ${service} - FALTAN ARCHIVOS`);
        allGood = false;
    }
});

// 2. Verificar que package.json tiene "start" script
console.log('\n2️⃣  VERIFICANDO SCRIPTS DE INICIO:\n');
services.forEach(service => {
    try {
        const packageJson = JSON.parse(
            fs.readFileSync(path.join(service, 'package.json'), 'utf8')
        );
        
        if (packageJson.scripts && packageJson.scripts.start) {
            console.log(`   ✅ ${service}: ${packageJson.scripts.start}`);
        } else {
            console.log(`   ⚠️  ${service}: NO tiene script "start"`);
            allGood = false;
        }
    } catch (e) {
        console.log(`   ❌ ${service}: Error leyendo package.json`);
        allGood = false;
    }
});

// 3. Verificar que los archivos server.js tienen PORT configurado
console.log('\n3️⃣  VERIFICANDO CONFIGURACIÓN DE PUERTO:\n');
services.forEach(service => {
    try {
        const serverJs = fs.readFileSync(path.join(service, 'server.js'), 'utf8');
        
        const hasPortConfig = serverJs.includes('process.env.PORT') || 
                             serverJs.includes('PORT =') ||
                             serverJs.includes('port =');
        
        if (hasPortConfig) {
            console.log(`   ✅ ${service}: Tiene configuración de PORT`);
        } else {
            console.log(`   ⚠️  ${service}: Verifica configuración de PORT`);
        }
    } catch (e) {
        console.log(`   ❌ ${service}: Error leyendo server.js`);
        allGood = false;
    }
});

// 4. Verificar que express está instalado
console.log('\n4️⃣  VERIFICANDO DEPENDENCIAS:\n');
services.forEach(service => {
    try {
        const packageJson = JSON.parse(
            fs.readFileSync(path.join(service, 'package.json'), 'utf8')
        );
        
        const hasExpress = packageJson.dependencies && packageJson.dependencies.express;
        const hasCors = packageJson.dependencies && packageJson.dependencies.cors;
        
        if (hasExpress && hasCors) {
            console.log(`   ✅ ${service}: Express + CORS configurado`);
        } else {
            console.log(`   ⚠️  ${service}: Falta Express o CORS`);
        }
    } catch (e) {
        console.log(`   ❌ ${service}: Error`);
    }
});

// 5. Verificar que hay Procfile o Railway config
console.log('\n5️⃣  VERIFICANDO CONFIGURACIÓN DE RAILWAY:\n');
const hasRailwayJson = fs.existsSync('railway.json');
const hasProcfile = fs.existsSync('Procfile');

if (hasRailwayJson) {
    console.log('   ✅ railway.json presente');
} else if (hasProcfile) {
    console.log('   ✅ Procfile presente');
} else {
    console.log('   ℹ️  Railway detectará automáticamente los servicios');
}

// 6. Verificar GitHub
console.log('\n6️⃣  VERIFICANDO GITHUB:\n');
try {
    const gitConfig = fs.readFileSync('.git/config', 'utf8');
    if (gitConfig.includes('sergitorress/traveltech-multicloud')) {
        console.log('   ✅ GitHub repository: sergitorress/traveltech-multicloud');
    } else {
        console.log('   ⚠️  GitHub repository no es el esperado');
    }
} catch (e) {
    console.log('   ⚠️  No hay repositorio git');
}

// 7. Verificar sintaxis JavaScript
console.log('\n7️⃣  VERIFICANDO SINTAXIS JAVASCRIPT:\n');
services.forEach(service => {
    const serverJsPath = path.join(service, 'server.js');
    try {
        require(serverJsPath);
        console.log(`   ✅ ${service}/server.js: Sintaxis válida`);
    } catch (e) {
        // node -c no lanza error, lo mostramos
        const { execSync } = require('child_process');
        try {
            execSync(`node -c ${serverJsPath}`, { stdio: 'pipe' });
            console.log(`   ✅ ${service}/server.js: Sintaxis válida`);
        } catch (err) {
            console.log(`   ❌ ${service}/server.js: ERROR DE SINTAXIS`);
            allGood = false;
        }
    }
});

// RESUMEN FINAL
console.log('\n╔════════════════════════════════════════════════════════════╗');
if (allGood) {
    console.log('║  ✅ LISTO PARA RAILWAY                                   ║');
    console.log('║  Todos los servicios están correctamente configurados    ║');
    console.log('║                                                          ║');
    console.log('║  PRÓXIMO PASO:                                          ║');
    console.log('║  1. Ve a https://railway.app                            ║');
    console.log('║  2. Click "New Project" → "Deploy from GitHub"          ║');
    console.log('║  3. Selecciona: sergitorress/traveltech-multicloud      ║');
    console.log('║  4. DESELECCIONA: frontend                              ║');
    console.log('║  5. Despliega 🚀                                         ║');
} else {
    console.log('║  ⚠️  HAY PROBLEMAS A REVISAR                             ║');
    console.log('║  Revisa los errores arriba antes de desplegar            ║');
}
console.log('╚════════════════════════════════════════════════════════════╝\n');

process.exit(allGood ? 0 : 1);
