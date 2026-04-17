# Guia de Desplegament Multi-Cloud

## 📋 Taula de continguts

1. [Preparació inicial](#preparació-inicial)
2. [Render (Frontend)](#render-frontend)
3. [Railway (Wishlist)](#railway-wishlist)
4. [Fly.io (Comments)](#flyio-comments)
5. [GitHub Setup](#github-setup)
6. [Verificació final](#verificació-final)

## 🔧 Preparació inicial

### 1. Crear compte a GitHub

1. Anar a https://github.com
2. Registrar-se o iniciar sessió
3. Crear un repositori privat: `traveltech-multicloud`
4. Clonar a local i afegir els fitxers

### 2. Crear comptes en operadors cloud

- [Render.com](https://render.com) - Frontend
- [Railway.app](https://railway.app) - Wishlist
- [Fly.io](https://fly.io) - Comments
- (Opcional) [Koyeb.com](https://koyeb.com) - Favorites

## 🎨 Render - Frontend

### Passos de desplegament

1. **Connectar GitHub a Render**
   - Anar a https://dashboard.render.com
   - Clic a "New +" → "Web Service"
   - Seleccionar "Connect a repository"
   - Autenticar amb GitHub
   - Seleccionar repositori `traveltech-multicloud`

2. **Configurar servei**
   - **Name**: `traveltech-frontend`
   - **Root Directory**: `frontend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (o pagar)
   - **Environment Variables**:
     ```
     PORT=3000
     NODE_ENV=production
     ```

3. **URLs dels serveis (actualitzar a producció)**
   - Editarne manualmente els URLs a `frontend/public/script.js`:
   ```javascript
   const SERVICES = {
       FAVORITES: 'https://traveltech-favorites-railway.up.railway.app',
       WISHLIST: 'https://your-wishlist-railway.up.railway.app',
       COMMENTS: 'https://your-comments-fly.herokuapp.com',
       RESTCOUNTRIES: 'https://restcountries.com/v3.1'
   };
   ```

4. **Deploy**
   - Render desplegarà automàticament quan es faci push a GitHub
   - URL: `https://traveltech-frontend.onrender.com`

---

## 🚉 Railway - Wishlist Service

### Passos de desplegament

1. **Conectar a Railway**
   - Anar a https://railway.app
   - Clic a "Start a New Project"
   - Seleccionar "Deploy from GitHub"
   - Seleccionar repositori i donar permisos

2. **Crear servici** és per a Wishlist
   - Clic a "Add service" en el proyecto
   - Seleccionar "GitHub repo"
   - Escolll `traveltech-multicloud`
   - **Service name**: `wishlist-service`
   - **Root directory**: `service-wishlist`

3. **Configurar variables**
   - Anar a "Variables"
   - Afegir:
     ```
     PORT=3002
     NODE_ENV=production
     ```

4. **Deploy automàtic**
   - Railway detecta `package.json` i Start comando
   - `npm install` i `npm start`
   - URL: `https://wishlist-service-railway.up.railway.app`

---

## ✈️ Fly.io - Comments Service

### Passos de desplegament

1. **Instal·lar CLI de Fly.io**
   ```bash
   # Windows (PowerShell)
   iwr https://fly.io/install.ps1 -useb | iex
   
   # O descarregar de https://fly.io/docs/getting-started/installing-flyctl/
   ```

2. **Autenticar**
   ```bash
   flyctl auth login
   ```

3. **Crear app a Fly.io**
   ```bash
   cd service-comments
   flyctl launch
   
   # Respon les preguntes:
   # - App name: comments-service
   # - Region: ams (Amsterdam, Europa)
   # - Tweak settings? No
   ```

4. **Deploy**
   ```bash
   flyctl deploy
   ```

5. **Verificar**
   ```bash
   flyctl status
   flyctl logs
   ```
   - URL: `https://comments-service.fly.dev`

---

## 🎯 GitHub Setup

### 1. Crear repositori

```bash
# Inicialitzar repositori local
cd traveltech-multicloud
git init
git add .
git commit -m "Initial commit: TravelTech MultiCloud Architecture"
git branch -M main
```

### 2. Crear repositori a GitHub

- Anar a https://github.com/new
- **Repository name**: `traveltech-multicloud`
- **Description**: "Multi-cloud travel planning platform with microservices"
- **Public/Private**: Public (per a mostrar el projecte)
- Clic "Create repository"

### 3. Push al repositori

```bash
git remote add origin https://github.com/[USERNAME]/traveltech-multicloud.git
git push -u origin main
```

### 4. Estructura de branques (opcional)

```bash
# Per a més organització
git checkout -b develop
git checkout -b feature/frontend
# ... etc
```

---

## 🧪 Verificació Final

### Checklist de desplegament

- [ ] Frontend desplegat a Render
- [ ] Wishlist desplegat a Railway
- [ ] Comments desplegat a Fly.io
- [ ] URLs públiques funcionals

### Test endpoints en producció

```bash
# Favorites (local o cloud)
curl https://your-favorites-url/health

# Wishlist
curl https://your-wishlist-url/health

# Comments
curl https://your-comments-url/health

# Frontend (accedir al navegador)
https://traveltech-frontend.onrender.com/
```

### Actualitzar URLs en frontend

1. Clonar i editar `frontend/public/script.js`:
```javascript
const SERVICES = {
    FAVORITES: 'https://your-favorites-url',
    WISHLIST: 'https://your-wishlist-url',
    COMMENTS: 'https://your-comments-url',
    RESTCOUNTRIES: 'https://restcountries.com/v3.1'
};
```

2. Commit i push:
```bash
git add frontend/public/script.js
git commit -m "Update production URLs"
git push origin main
```

3. Render redesplegará automàticament

---

## 🔐 Variables d'entorn per producció

### Frontend (.env en Render)
```
PORT=3000
NODE_ENV=production
CORS_ORIGIN=*
```

### Wishlist (.env en Railway)
```
PORT=3002
NODE_ENV=production
CORS_ORIGIN=*
```

### Comments (.env en Fly.io)
```
PORT=3003
NODE_ENV=production
CORS_ORIGIN=*
```

---

## 📊 Monitorització

### Render
- Dashboard: https://dashboard.render.com/
- Logs: Disponibles en "Logs"

### Railway
- Dashboard: https://railway.app/dashboard
- Logs: "View Logs" en la secció del servei

### Fly.io
```bash
flyctl logs
flyctl status
flyctl scale count 1
```

---

## 🚨 Resolució de problemes

### CORS errors
- Assegurar-se que tots els serveis tinguin CORS habilitat
- Verificar URLs en `script.js`

### 502 Bad Gateway
- Verificar que el servei està corrent
- Revisar logs

### Cant find module
- Assegurar `package.json` és correcte
- Reinstalar dependències: `npm install`

### Environment variables no es carreguen
- Fer re-deploy del servei
- Reiniciar la aplicació

---

## 📚 Recursos útils

- [Render Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Fly.io Docs](https://fly.io/docs)
- [GitHub Actions for CI/CD](https://docs.github.com/en/actions)

---

**Nota**: Els URLs exactes dependran dels noms escolts. Actualitzar totes les refèrencies.
