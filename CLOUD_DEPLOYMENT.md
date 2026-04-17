# CLOUD DEPLOYMENT GUIDE - TravelTech MultiCloud

## 🚀 Despliegue en la Nube - Pasos Finales

Tu proyecto está listo para desplegarse en múltiples plataformas cloud. Sigue estas instrucciones:

### **PASO 1: Push a GitHub**

```bash
git push -u origin main
```

**Usuario recomendado:** `micronigga`  
**Repositorio:** `traveltech-multicloud`  
**URL esperada:** `https://github.com/micronigga/traveltech-multicloud`

---

## ☁️ OPCIÓN A: Despliegue Render (Recomendado - TODO INTEGRADO)

### Render Web Services - Desplegar las 3 aplicaciones

1. **Ir a:** https://render.com
2. **Conectar GitHub:** Autorizar con tu cuenta
3. **Crear 3 Web Services:**

#### Service 1: Frontend
- **Nombre:** traveltech-frontend
- **Repository:** micronigga/traveltech-multicloud
- **Branch:** main
- **Build Command:** `cd frontend && npm install`
- **Start Command:** `cd frontend && npm start`
- **Environment Variables:**
  - `NODE_ENV=production`
  - `PORT=3000`
- **Plan:** Free

#### Service 2: Wishlist
- **Nombre:** traveltech-wishlist
- **Repository:** micronigga/traveltech-multicloud
- **Branch:** main
- **Root Directory:** `service-wishlist`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variables:**
  - `NODE_ENV=production`
  - `PORT=3002`
- **Plan:** Free

#### Service 3: Comments
- **Nombre:** traveltech-comments
- **Repository:** micronigga/traveltech-multicloud
- **Branch:** main
- **Root Directory:** `service-comments`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variables:**
  - `NODE_ENV=production`
  - `PORT=3003`
- **Plan:** Free

**URLs Esperadas:**
```
Frontend:  https://traveltech-frontend.onrender.com
Wishlist:  https://traveltech-wishlist.onrender.com
Comments:  https://traveltech-comments.onrender.com
```

---

## 🚂 OPCIÓN B: Railway (Alternativa Rápida)

1. **Ir a:** https://railway.app
2. **Conectar GitHub:** Autorizar repositorio
3. **Nuevo Proyecto:** Seleccionar `traveltech-multicloud`
4. **Configurar variables de entorno:**
   - `NODE_ENV=production`
   - `PORT=3002` (para Wishlist)

---

## 🪰 OPCIÓN C: Fly.io (Para Comments Service)

```bash
# 1. Instalar flyctl
# Descargar desde: https://fly.io/docs/hands-on/install-flyctl/

# 2. Login
flyctl auth login

# 3. Desplegar
cd service-comments
flyctl launch
flyctl deploy
```

---

## 📋 Checklist de Despliegue

- [ ] Push a GitHub exitoso
- [ ] Frontend visible en nube
- [ ] Wishlist service respondiendo en `/api/wishlist`
- [ ] Comments service respondiendo en `/api/comments`
- [ ] URLs de servicios actualizadas en frontend/public/script.js
- [ ] Health checks pasando en nube
- [ ] Todos los servicios comunicándose entre sí

---

## 🔗 URLs en Producción

Una vez desplegados, actualiza `frontend/public/script.js`:

```javascript
const SERVICES = {
  FAVORITES: 'https://traveltech-favorites.onrender.com',
  WISHLIST: 'https://traveltech-wishlist.onrender.com',
  COMMENTS: 'https://traveltech-comments.onrender.com'
};
```

Luego haz push nuevamente:

```bash
git add frontend/public/script.js
git commit -m "Update production URLs"
git push
```

---

## 📊 Arquitectura Final

```
┌─────────────────────────────────────────────┐
│         Frontend (Render)                   │
│  https://traveltech-frontend.onrender.com  │
└──────────────────┬──────────────────────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
        ▼          ▼          ▼
   ┌────────┐ ┌────────┐ ┌──────────┐
   │Wishlist│ │Comments│ │Favorites │
   │Railway │ │Fly.io  │ │ Render   │
   └────────┘ └────────┘ └──────────┘
```

---

## ⚙️ Variables de Entorno Cloud

### Render
```
NODE_ENV=production
PORT=3000 (frontend), 3002 (wishlist), 3003 (comments)
```

### Railway
```
NODE_ENV=production
PORT=3002
```

### Fly.io
```
NODE_ENV=production
PORT=3003
```

---

## 🧪 Testing en Producción

Una vez desplegado, verifica con:

```bash
# Health check
curl https://traveltech-frontend.onrender.com/health

# API endpoints
curl https://traveltech-wishlist.onrender.com/api/wishlist
curl https://traveltech-comments.onrender.com/api/comments
```

---

## 📞 Soporte

- **Render Docs:** https://render.com/docs
- **Railway Docs:** https://railway.app/docs
- **Fly.io Docs:** https://fly.io/docs
- **GitHub Pages:** https://pages.github.com

---

**Estado:** ✅ Proyecto listo para producción  
**Última actualización:** $(date)  
**Versión:** 1.0.0  
