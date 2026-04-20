# 🆓 Guía de Despliegue GRATUITO

> **IMPORTANTE:** No gastaras dinero siguiendo esta guía. Todas las opciones son 100% gratis.

## ⚠️ Problema con Render

Render te deja crear **1 Web Service gratis**. Si quieres más de 1, tienes que pagar.

**Opciones:**
- ❌ Crear 4 servicios separados en Render → **CARO**
- ✅ Crear 1 única aplicación con TODO → **GRATIS**
- ✅ Usar Railway → **GRATIS hasta 5 servicios**
- ✅ Usar Fly.io → **GRATIS hasta 3 aplicaciones**

---

## 🚀 OPCIÓN 1: TODO en UNA SOLA APLICACIÓN (Render) - RECOMENDADO

### ¿Cómo funciona?
En lugar de 4 servicios separados, todo corre en UNA aplicación:
- Puerto 3000: Frontend + API gateway
- Internamente: Todos los microservicios

### Paso 1: Crear App Agregada

Voy a crear un archivo `server-aggregated.js` en el root que ejecute TODO:

```bash
cd d:\Archivos Usuarios\Sergi\Desktop\Clase\desplegament\micronigga\traveltech-multicloud
```

Este servidor combina:
1. Frontend (Puerto 3000) → Tu HTML/CSS/JS
2. Favorites API → localhost:3000/api/favorites
3. Wishlist API → localhost:3000/api/wishlist
4. Comments API → localhost:3000/api/comments

### Paso 2: Subir a Render (1 ÚNICA APP)

1. Ve a https://render.com
2. Haz login con GitHub
3. Click "New +" → "Web Service"
4. Selecciona: `sergitorress/traveltech-multicloud`
5. Configura:
   - **Name:** traveltech-multicloud
   - **Root Directory:** .
   - **Build:** npm install
   - **Start:** node server-aggregated.js
   - **Plan:** Free ✅
6. Click "Create Web Service"

### Paso 3: Espera ~5 minutos

Render construirá y desplegará. Verás algo como:
```
https://traveltech-multicloud.onrender.com
```

**TODO funciona en esa URL:**
- Página: https://traveltech-multicloud.onrender.com
- API Favorites: https://traveltech-multicloud.onrender.com/api/favorites
- API Wishlist: https://traveltech-multicloud.onrender.com/api/wishlist
- API Comments: https://traveltech-multicloud.onrender.com/api/comments

---

## 🚄 OPCIÓN 2: Railway (Más fácil, gratis)

### Por qué Railway?
- ✅ Gratis hasta 5 servicios
- ✅ Interfaz más fácil
- ✅ Sin límite de tiempo en plan free
- ✅ $5/mes de crédito gratis para siempre

### Paso 1: Crear cuenta
1. Ve a https://railway.app
2. Click "Start Project"
3. Selecciona "Deploy from GitHub repo"
4. Elige: `sergitorress/traveltech-multicloud`

### Paso 2: Crear 4 servicios (Railway sí permite gratis)

**Servicio 1: FRONTEND**
- Service name: frontend
- Root: /frontend
- Start command: npm start
- Port: 3000

**Servicio 2: FAVORITES**
- Service name: service-favorites
- Root: /service-favorites
- Start command: npm start
- Port: 3001

**Servicio 3: WISHLIST**
- Service name: service-wishlist
- Root: /service-wishlist
- Start command: npm start
- Port: 3002

**Servicio 4: COMMENTS**
- Service name: service-comments
- Root: /service-comments
- Start command: npm start
- Port: 3003

### Paso 3: Obtener URLs
Railway te da URLs públicas para cada servicio:
```
Frontend: https://frontend-xxx.railway.app
Favorites: https://service-favorites-xxx.railway.app
Wishlist: https://service-wishlist-xxx.railway.app
Comments: https://service-comments-xxx.railway.app
```

---

## 🪰 OPCIÓN 3: Fly.io (También gratis)

### Por qué Fly.io?
- ✅ Gratis para 3 aplicaciones
- ✅ Sin tarjeta de crédito
- ✅ Buena performance

### Paso 1: CLI de Fly.io
```bash
# Instalar CLI
choco install flyctl  # Si tienes Chocolatey
# O descargar desde: https://fly.io/docs/hands-on/install-flyctl/

# Login
flyctl auth login

# Crear apps
flyctl apps create traveltech-frontend
flyctl apps create traveltech-wishlist
flyctl apps create traveltech-comments
```

### Paso 2: Configurar cada app
Ya están listos los archivos `fly.toml` en el proyecto.

---

## 📊 COMPARATIVA RÁPIDA

| Opción | Costo | Apps Gratis | Facilidad |
|--------|-------|-----------|-----------|
| **Render 1 App** | GRATIS | 1 | ⭐⭐⭐⭐⭐ Fácil |
| **Railway** | GRATIS | Ilimitadas | ⭐⭐⭐⭐ Muy fácil |
| **Fly.io** | GRATIS | 3 | ⭐⭐⭐ Moderado |

---

## 🎯 MI RECOMENDACIÓN

**OPCIÓN 1 (Render 1 App) o OPCIÓN 2 (Railway)**

Ambas son:
- ✅ 100% gratis
- ✅ Sin tarjeta de crédito (Railway sí pide pero da crédito)
- ✅ Fácil de entender
- ✅ Perfecto para proyecto académico

**Yo elegiría Railway** porque:
1. No hay límites en servicios gratis
2. Interfaz visual más intuitiva
3. Mejor soporte

---

## ❌ ¿QUÉ NO HACER?

- ❌ No crees 4 servicios separados en Render (pagarás después)
- ❌ No uses Heroku (ya no es gratis)
- ❌ No hagas push a producción sin probar en local

---

## 🧪 PROBAR ANTES DE DESPLEGAR

Antes de subir a la nube, verifica en local:

```bash
# Terminal 1: Frontend
cd frontend
npm install
npm start
# Va en http://localhost:3000

# Terminal 2: Favorites
cd service-favorites
npm install
npm start
# Va en http://localhost:3001

# Terminal 3: Wishlist
cd service-wishlist
npm install
npm start
# Va en http://localhost:3002

# Terminal 4: Comments
cd service-comments
npm install
npm start
# Va en http://localhost:3003
```

Si los 4 terminales funcionan localmente, funcionarán en la nube.

---

## 📞 AYUDA

Si falla algo:
1. Verifica que los archivos `package.json` existan en cada carpeta
2. Verifica que el `server.js` de cada servicio esté correcto
3. En Railway/Render, mira los "Logs" para ver errores

---

**¡Éxito! No gastaras ni un euro.** 🎉
