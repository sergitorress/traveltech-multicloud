# TravelTech MultiCloud

**Lee primero:** [DEPLOY-FINAL.txt](DEPLOY-FINAL.txt)

## Quick Start

1. **Frontend:** Ya está en Render
   - https://traveltech-frontend-06xs.onrender.com

2. **Servicios:** Sube a Railway
   - `service-wishlist/` 
   - `service-comments/`

3. **URLs:** Necesitas 2 URLs de Railway

4. **Update:** Ejecuta `node update-frontend-urls.js`

## Desarrollo Local

```bash
cd service-wishlist && npm start      # Puerto 3002
cd service-comments && npm start      # Puerto 3003
cd frontend && npm start              # Puerto 3000
```

## Estructura

```
frontend/              → Render (frontal web)
service-wishlist/      → Railway (API)
service-comments/      → Railway (API)
```
# TravelTech MultiCloud

Plataforma web de planificación de viajes con arquitectura de microservicios.

## Descripción

Aplicación que permite:
- Buscar información de países (REST Countries API)
- Gestionar favoritos
- Crear wishlists  
- Compartir comentarios

## Estructura

```
frontend/          → Render (Puerto 3000)
service-favorites/ → Local (Puerto 3001)
service-wishlist/  → Railway (Puerto 3002)
service-comments/  → Railway (Puerto 3003)
```

## Instalación Local

```bash
# Frontend
cd frontend && npm install && npm start

# Servicios (en terminales separadas)
cd service-favorites && npm install && npm start
cd service-wishlist && npm install && npm start
cd service-comments && npm install && npm start
```

Acceder a: `http://localhost:3000`

## Despliegue

### Frontend en Render
1. https://dashboard.render.com → New → Web Service
2. Deploy from GitHub: `frontend/` directory
3. Build: `npm install`
4. Start: `npm start`

### Servicios en Railway
1. https://railway.app → New Project → Deploy from GitHub
2. Selecciona `service-wishlist` y `service-comments`
3. Railway detecta automáticamente `package.json` y `Procfile`

## API Endpoints

| Servicio | Método | Endpoint |
|----------|--------|----------|
| Health | GET | `/health` |
| Favorites | GET/POST/DELETE | `/api/favorites/:country` |
| Wishlist | GET/POST/DELETE | `/api/wishlist/:country` |
| Comments | GET/POST/DELETE | `/api/comments` |

## Tecnologías

- Node.js 22+
- Express.js
- CORS
- REST Countries API
# TravelTech MultiCloud - Plataforma de Planificació de Viatges

## � ENTREGA RÁPIDA

**Solo lo mínimo para aprobar:**
- 📖 Lee: [ENTREGA_MINIMA.md](ENTREGA_MINIMA.md) 
- 🆓 Sin costo: [DEPLOYMENT_FREE.md](DEPLOYMENT_FREE.md)
- ⏱️ Tiempo: ~50 minutos para desplegar
- 🎯 Plataforma recomendada: **Railway** (gratis, 4 servicios)

---

## �📋 Descripció del projecte

TravelTech Solutions és una plataforma web moderna de planificació de viatges amb arquitectura de microserveis distribuïts en múltiples operadors cloud. Els usuaris poden cercar informació sobre paisos, gestionar favorits, crear wishlists i compartir comentaris amb la comunitat.

## 🏗️ Arquitectura

```
┌─────────────────────────────────────┐
│     Frontend Web (Express)          │
│  - Interfície responsiva            │
│  - Consumeix API externa (REST API) │
│  - Integra 3 microserveis           │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────────┬──────────────┬──────────┐
        │                 │              │          │
        ▼                 ▼              ▼          ▼
   ┌─────────────┐ ┌─────────────┐ ┌──────────┐ ┌─────────┐
   │ Favorites   │ │  Wishlist   │ │ Comments │ │ REST    │
   │ Service     │ │  Service    │ │ Service  │ │Countries│
   │ (Port 3001) │ │ (Port 3002) │ │(Port3003)│ │ API     │
   └─────────────┘ └─────────────┘ └──────────┘ └─────────┘
        Favorites      Wishlist      Comments    Externa
        (Render)       (Railway)      (Fly.io)
```

## 📁 Estructura del projet

```
traveltech-multicloud/
│
├── frontend/                    # Frontend web
│   ├── public/
│   │   ├── index.html          # Interfície
│   │   ├── style.css           # Estilos
│   │   └── script.js           # Lògica client
│   ├── server.js               # Servidor Express
│   ├── package.json
│   └── README.md
│
├── service-favorites/          # Microservei #1
│   ├── server.js
│   ├── package.json
│   └── README.md
│
├── service-wishlist/           # Microservei #2
│   ├── server.js
│   ├── package.json
│   └── README.md
│
├── service-comments/           # Microservei #3
│   ├── server.js
│   ├── package.json
│   └── README.md
│
├── .gitignore
├── README.md                   # Aquest arxiu
└── DEPLOYMENT.md              # Guia de desplegament
```

## 🚀 Instal·lació local

### Requisits
- Node.js 14+
- npm o yarn

### Passos

1. **Clonar repositori**
```bash
git clone [URL-repositori]
cd traveltech-multicloud
```

2. **Instal·lar dependències**
```bash
# Frontend
cd frontend
npm install
cd ..

# Favorites Service
cd service-favorites
npm install
cd ..

# Wishlist Service
cd service-wishlist
npm install
cd ..

# Comments Service
cd service-comments
npm install
cd ..
```

3. **Executar en mode développament**

Obrir 4 terminals separades:

```bash
# Terminal 1: Frontend
cd frontend
npm start
# http://localhost:3000

# Terminal 2: Favorites
cd service-favorites
npm start
# http://localhost:3001

# Terminal 3: Wishlist
cd service-wishlist
npm start
# http://localhost:3002

# Terminal 4: Comments
cd service-comments
npm start
# http://localhost:3003
```

## 💻 Funcionament local

1. Accedir a http://localhost:3000
2. Cercar un país (ex: "España", "Franca", "Italia")
3. Veure informació del país (bandera, capital, popolazione, etc.)
4. Interactuar amb els microserveis:
   - **Favorites**: Marcar com favorit
   - **Wishlist**: Afegir a la llista de desitjos
   - **Comments**: Deixar comentaris

## 🌐 Endpoints de l'API

### Frontend
- `GET /` - Pàgina principal
- `GET /health` - Health check

### Favorites Service (Port 3001)
- `GET /api/favorites` - Obtenir tots els favorits
- `POST /api/favorites/:country` - Afegir favorit
- `DELETE /api/favorites/:country` - Eliminar favorit
- `GET /health` - Health check

### Wishlist Service (Port 3002)
- `GET /api/wishlist` - Obtenir wishlist
- `POST /api/wishlist/:country` - Afegir a wishlist
- `DELETE /api/wishlist/:country` - Eliminar de wishlist
- `GET /health` - Health check

### Comments Service (Port 3003)
- `GET /api/comments/:country` - Obtenir comentaris
- `POST /api/comments` - Afegir comentari
- `DELETE /api/comments/:country/:id` - Eliminar comentari
- `GET /api/comments-stats` - Estadístiques
- `GET /health` - Health check

## ☁️ Desplegament Multi-Cloud

Veure arxiu [DEPLOYMENT.md](DEPLOYMENT.md) per a instruccions completes de desplegament a:
- **Frontend**: Render / Railway
- **Favorites**: Railway / Fly.io
- **Wishlist**: Render / Heroku
- **Comments**: Fly.io / Koyeb

## 📊 Funcionalitats principals

### Frontend
- 🔍 Cerca integrada de paisos
- 🌍 Integració amb REST Countries API
- 🎨 Interfície responsiva i moderna
- ❤️ Sistema de favorits persistent
- 📌 Gestió de wishlist
- 💬 Comentaris comunitaris en temps real

### Microserveis
- ⭐ **Favorites**: Gestió de paisos favorits
- 📌 **Wishlist**: Gestió de destinacions a visitar
- 💬 **Comments**: Sistema de comentaris comunitari

## 🔧 Tecnologies utilitzades

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **API Externa**: REST Countries API
- **CORS**: Habilitat per a comunicació multi-cloud
- **Storage**: En memòria (local), pot escalar a BD

## 📝 Convencions de codi

- JavaScript vanilla (sense frameworks complexos)
- Noms en català per a variables i funcions
- Comentaris en català
- REST API amb JSON
- Errors retornats amb codi HTTP apropiat

## 🧪 Proving Endpoints amb Postman

### 1. Afegir Favorit
```
POST http://localhost:3001/api/favorites/España
Headers: Content-Type: application/json
```

### 2. Obtenir Favorits
```
GET http://localhost:3001/api/favorites
```

### 3. Afegir a Wishlist
```
POST http://localhost:3002/api/wishlist/Franca
```

### 4. Afegir Comentari
```
POST http://localhost:3003/api/comments
Body JSON:
{
  "country": "España",
  "text": "País molt bonic amb una cuina increïble!"
}
```

## 🤝 Contribució

Per a contribucions:
1. Fer fork del repositori
2. Crear una branca (`feature/nova-funcionalitat`)
3. Commit dels canvis
4. Push a la branca
5. Obrir Pull Request

## 📄 llicència

Projecte educatiu - MIT License

## 👥 Autor

Alumne de Cicle Superior de Desenvolupament d'Aplicacions Web

## 📞 Suport

Per a problemes o preguntes, crear un issue al repositori GitHub.

---

**Última actualització**: 2024
