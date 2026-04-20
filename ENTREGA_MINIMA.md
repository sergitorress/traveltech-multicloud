# 📋 ENTREGA MÍNIMA PARA APROBAR

> Solo lo que necesitas. Nada más.

## ✅ QUÉ YA TIENES HECHO

- ✅ Frontend funcional
- ✅ 3 microservicios (favorites, wishlist, comments)
- ✅ API externa (REST Countries)
- ✅ GitHub configurado
- ✅ Documentación
- ✅ Postman Collection

## ⏳ QUÉ TE FALTA PARA APROBAR

1. **URLs públicas** - Desplegar en cloud (30 minutos)
2. **Captura del frontend** - Screenshot (2 minutos)
3. **Captura de Postman** - Pruebas funcionando (5 minutos)
4. **Memoria técnica** - 10 líneas explicando (10 minutos)

**TOTAL: ~50 minutos**

---

## 🚀 PASO 1: DESPLEGAR EN RAILWAY (LA MÁS FÁCIL)

### Por qué Railway?
- Gratis hasta 5 servicios
- No pide tarjeta al principio
- 10 minutos y listo

### Instrucciones (COPIAR Y PEGAR):

**1. Accede a Railway:**
```
https://railway.app
```

**2. Click "Start Project" → "Deploy from GitHub repo"**

**3. Elige: `sergitorress/traveltech-multicloud`**

**4. Railway detecta 4 servicios automáticamente. ESPERA.**

**5. Obtén las URLs (aparecen en Railway):**
```
Frontend:   https://frontend-XXXX.railway.app
Favorites:  https://service-favorites-XXXX.railway.app
Wishlist:   https://service-wishlist-XXXX.railway.app
Comments:   https://service-comments-XXXX.railway.app
```

**LISTO. Ya está desplegado.**

---

## 📸 PASO 2: CAPTURA DEL FRONTEND

1. Abre la URL del frontend
2. Haz screenshot (Windows: Imp Pant)
3. Guarda en `screenshots/` 

**Mínimo:** 1 screenshot mostrando:
- Página cargada
- Búsqueda funcionando
- Un país mostrado

---

## 🧪 PASO 3: CAPTURA DE POSTMAN

1. Abre Postman
2. Importa: `Postman_Collection.json`
3. Cambia las URLs a las de Railway (las que obtuviste arriba)
4. Ejecuta 3 endpoints:
   - GET /health
   - GET /api/favorites
   - POST /api/comments
5. Haz screenshot mostrando que funcionan

---

## 📝 PASO 4: MEMORIA TÉCNICA

Crea archivo `MEMORIA_TECNICA.txt` (10-15 líneas):

```
ARQUITECTURA TRAVELTECH MULTICLOUD
==================================

SERVICIOS CREADOS:
- Favorites Service: Guardar países favoritos (reutilizado)
- Wishlist Service: Wishlist de países (nuevo)
- Comments Service: Comentarios por país (nuevo)

TECNOLOGÍA:
- Frontend: HTML5 + Vanilla JavaScript + REST Countries API
- Microservicios: Express.js + Node.js
- Cloud: Railway (frontend, favorites, wishlist, comments)

DIFICULTADES:
- CORS: Resuelto configurando middleware en cada servicio
- Render gratuito limitado: Usamos Railway en su lugar
- URLs cambiantes: Documentadas en README.md

GITHUB:
- Repositorio: https://github.com/sergitorress/traveltech-multicloud
- 7 commits con documentación clara
- Estructura: un repo con 4 carpetas (frontend + 3 servicios)

URLS PÚBLICAS:
- Frontend: [URL de Railway aquí]
- Favorites: [URL de Railway aquí]
- Wishlist: [URL de Railway aquí]
- Comments: [URL de Railway aquí]
```

---

## 📦 LISTA DE ENTREGA

Necesitas entregar **4 cosas**:

```
1. ENLACE GITHUB
   https://github.com/sergitorress/traveltech-multicloud

2. URLS PÚBLICAS
   Frontend: https://frontend-XXXX.railway.app
   Favorites: https://service-favorites-XXXX.railway.app
   Wishlist: https://service-wishlist-XXXX.railway.app
   Comments: https://service-comments-XXXX.railway.app

3. EVIDENCIAS
   - Screenshot frontend funcionando
   - Screenshot Postman con 3 endpoints OK

4. MEMORIA TÉCNICA
   - Archivo MEMORIA_TECNICA.txt
   - 10-15 líneas
```

---

## ✔️ VERIFICACIÓN FINAL

Antes de entregar, verifica:

- [ ] Las 4 URLs de Railway responden (entra en cada una)
- [ ] Frontend muestra un país cuando buscas
- [ ] Postman hace un GET a /health y funciona
- [ ] GitHub tiene 7+ commits
- [ ] Memoria técnica está en el repo

**Si todo funciona → APROBADO**

---

## 🆘 SI ALGO FALLA

**"La app dice que está construyendo"**
→ Espera 5 minutos, Railway sigue trabajando

**"Una URL da error 502"**
→ Abre el Log en Railway, probablemente falta `npm install`
→ La solución: abre el archivo que falla y verifica que está bien

**"CORS error en el navegador"**
→ Ya está solucionado en el código
→ Si persiste: asegúrate que Frontend y APIs tienen CORS habilitado

---

## 💡 TIPS FINALES

- No compliques. Railway hace casi todo automático.
- Si Render no funciona, usa Railway (es más fácil).
- No necesitas base de datos para aprobar.
- El frontend ya tiene TODO integrado.
- Postman ya tiene los endpoints listos.

---

**¡Eso es TODO lo que necesitas!**
