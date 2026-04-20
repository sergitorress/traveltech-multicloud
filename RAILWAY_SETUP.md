# Railway Setup - Wishlist + Comments

## Frontend en Render
- URL: https://traveltech-frontend-06xs.onrender.com/

## Servicios en Railway (POR HACER)

### Paso 1: Deploy en Railway
1. https://railway.app → "New Project"
2. "Deploy from GitHub repo"
3. Selecciona: `sergitorress/traveltech-multicloud`
4. DESELECCIONA: `frontend`
5. ACTIVA: `service-wishlist` y `service-comments`
6. Deploy

### Paso 2: Obtén URLs
Una vez deployed, Railway te da:
- WISHLIST_URL = `https://service-wishlist-XXXXX.railway.app`
- COMMENTS_URL = `https://service-comments-XXXXX.railway.app`

### Paso 3: Actualiza Frontend
En `frontend/public/script.js`, busca:
```javascript
const WISHLIST_URL = 'http://localhost:3002';
const COMMENTS_URL = 'http://localhost:3003';
```

Reemplaza con URLs de Railway:
```javascript
const WISHLIST_URL = 'https://service-wishlist-XXXXX.railway.app';
const COMMENTS_URL = 'https://service-comments-XXXXX.railway.app';
```

### Paso 4: Push a GitHub
```bash
git add frontend/public/script.js
git commit -m "Update service URLs for Railway"
git push
```

Render auto-redeploy → ¡Listo!

---

## Estado Actual
- ✅ Frontend: Render (https://traveltech-frontend-06xs.onrender.com/)
- ⏳ Wishlist: Esperando URL de Railway
- ⏳ Comments: Esperando URL de Railway
