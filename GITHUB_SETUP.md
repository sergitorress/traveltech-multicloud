# GitHub Setup & Deployment Instructions

## 🔧 Configuración Inicial en GitHub

### 1. Crear Repositorio en GitHub

Desde tu cuenta GitHub (https://github.com/new):

```
Nombre: traveltech-multicloud
Descripción: Multi-cloud travel platform with microservices (Frontend + 3 services)
Visibilidad: Public (para proyecto de clase)
README: No initializar (ya tenemos uno)
.gitignore: No (ya lo tenemos)
License: MIT (opcional)
```

### 2. Añadir SSH Key (Alternativa segura a HTTPS)

```bash
# Generar key (si no tienes)
ssh-keygen -t ed25519 -C "tu@email.com"

# Copiar public key
cat ~/.ssh/id_ed25519.pub

# Ir a GitHub Settings > SSH and GPG keys > New SSH key
# Pegar contenido
```

### 3. Push Inicial

```bash
cd traveltech-multicloud
git remote add origin git@github.com:micronigga/traveltech-multicloud.git
git branch -M main
git push -u origin main
```

---

## 🤖 GitHub Actions - CI/CD Automático

Tu workflow está en `.github/workflows/deploy.yml`

**Lo que hace automáticamente:**
- ✅ Instala dependencias
- ✅ Ejecuta pruebas en Node 14.x y 16.x
- ✅ Valida todas las 4 aplicaciones
- ✅ Notifica estado

**Ver estado:** GitHub > Actions

---

## 🚀 Conectar con Plataformas Cloud

### Render (Frontend + Servicios)

1. Login en https://render.com
2. Dashboard > New > Web Service
3. Conectar tu repositorio GitHub
4. Configurar:
   - **Root Directory:** `frontend/` (para frontend)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node

### Railway

1. Login en https://railway.app
2. New Project > GitHub Repo
3. Seleccionar `traveltech-multicloud`
4. Configurar servicios

### Fly.io

```bash
# Instalar CLI
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Desplegar
cd service-comments
fly launch
fly deploy
```

---

## 📊 Estado de Despliegue

| Componente | Plataforma | Estado | URL |
|-----------|-----------|--------|-----|
| Frontend | Render | ⏳ Pendiente | https://traveltech-frontend.onrender.com |
| Wishlist | Railway | ⏳ Pendiente | https://traveltech-wishlist.railway.app |
| Comments | Fly.io | ⏳ Pendiente | https://traveltech-comments.fly.dev |
| Favorites | Render | ⏳ Pendiente | https://traveltech-favorites.onrender.com |

---

## 🔍 Verificar Estado

```bash
# Ver remotes
git remote -v

# Ver commits
git log --oneline

# Ver ramas
git branch -a

# Estado actual
git status
```

---

## 📝 Notas Importantes

1. **Primeros despliegues pueden tardar 5-10 minutos**
2. **Free tier puede entrar en sleep si no tiene tráfico**
3. **Health checks cada 5 minutos** (mantienen despiertas las apps)
4. **Límite de 500MB** en free tier de Render
5. **Todas las apps funcionan OK en free tier**

---

## 🆘 Troubleshooting

### Error: "Permission denied (publickey)"
```bash
# Usar HTTPS en vez de SSH
git remote set-url origin https://github.com/micronigga/traveltech-multicloud.git
git push -u origin main
```

### Error: "failed to push"
```bash
# Hacer pull primero
git pull origin main
git push origin main
```

### Servicios no se comunican
- Verificar que URLs en `script.js` sean correctas
- Verificar CORS habilitado en servicios
- Verificar health checks pasando

---

**Última actualización:** $(date)  
**Usuario:** micronigga  
**Repositorio:** https://github.com/micronigga/traveltech-multicloud  
