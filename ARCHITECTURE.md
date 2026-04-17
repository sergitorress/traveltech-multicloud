# 🏗️ Arquitectura Detallada - TravelTech MultiCloud

## 📐 Vistes arquitectòniques

### 1. Vista General del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                     TRAVELTECH PLATFORM                         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  WEB BROWSER                                             │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │ Frontend (HTML5 + CSS3 + JavaScript)              │  │  │
│  │  │ - UI Components                                   │  │  │
│  │  │ - API Client                                      │  │  │
│  │  │ - State Management                                │  │  │
│  │  └───────┬──────────────────────┬────────────────────┘  │  │
│  └──────────┼──────────────────────┼─────────────────────────┘  │
│             │                      │                            │
│      HTTP/CORS             HTTP/CORS                            │
│             │                      │                            │
│  ┌──────────▼──────────┐  ┌────────▼─────────────┐              │
│  │ MICROSERVICES       │  │ REST COUNTRIES       │              │
│  │ Node.js + Express   │  │ External API         │              │
│  │                     │  │ (HTTPS)              │              │
│  │ ┌─────────────────┐ │  │                      │              │
│  │ │ Favorites (3001)│ │  │ https://             │              │
│  │ │ - GET /favorites│ │  │ restcountries.       │              │
│  │ │ - POST          │ │  │ com/v3.1/...         │              │
│  │ │ - DELETE        │ │  │                      │              │
│  │ └─────────────────┘ │  └──────────────────────┘              │
│  │                     │                                        │
│  │ ┌─────────────────┐ │                                        │
│  │ │ Wishlist (3002) │ │                                        │
│  │ │ - GET /wishlist │ │                                        │
│  │ │ - POST          │ │                                        │
│  │ │ - DELETE        │ │                                        │
│  │ └─────────────────┘ │                                        │
│  │                     │                                        │
│  │ ┌─────────────────┐ │                                        │
│  │ │ Comments (3003) │ │                                        │
│  │ │ - GET /comments │ │                                        │
│  │ │ - POST          │ │                                        │
│  │ │ - DELETE        │ │                                        │
│  │ └─────────────────┘ │                                        │
│  │                     │                                        │
│  │ In-Memory Database  │                                        │
│  │ (Arrays/Objects)    │                                        │
│  └─────────────────────┘                                        │
└─────────────────────────────────────────────────────────────────┘
```

### 2. Data Flow - Usuari cerca país

```
┌─────────────┐
│ User Input  │
│ "Spain"     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│ Frontend JavaScript              │
│ - Validate input                 │
│ - Show autocomplete              │
└──────┬──────────────────────────┘
       │
       ├─────────────────────────────────┐
       │                                 │
       ▼                                 │
  ┌──────────────────────────┐          │
  │ REST Countries API       │          │
  │ /name/Spain              │          │
  │ Returns full data        │          │
  │ - flag, capital, etc     │          │
  └──────┬───────────────────┘          │
         │                              │
         ▼                              │
┌──────────────────────────┐            │
│ Frontend renders:        │            │
│ - Country info           │◄───────────┘
│ - Flag image             │
│ - Details table          │
└──────┬───────────────────┘
       │ User clicks "Add to Favorites"
       ▼
┌──────────────────────────┐
│ Frontend sends POST:     │
│ /api/favorites/Spain     │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Favorites Service        │
│ - Add to array           │
│ - Prevent duplicates     │
│ - Return 201 Created     │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Frontend updates:        │
│ - Button color changes   │
│ - Dashboard updates      │
│ - Show notification      │
└──────────────────────────┘
```

### 3. Deployment Architecture - Production

```
                          ┌───────────────────────────────────┐
                          │   DEVELOPERS (GitHub)             │
                          │   - Code changes                  │
                          │   - Pull requests                 │
                          └───────────────┬───────────────────┘
                                          │
                                    ┌─────▼─────┐
                                    │ GitHub    │
                                    │ Repository│
                                    └─────┬─────┘
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    │                     │                     │
                    ▼                     ▼                     ▼
        ┌──────────────────────┐ ┌──────────────────────┐ ┌────────────┐
        │ RENDER               │ │ RAILWAY              │ │ FLY.IO     │
        │ (Frontend)           │ │ (Wishlist Service)   │ │ (Comments) │
        │                      │ │                      │ │            │
        │ ┌────────────────┐   │ │ ┌────────────────┐   │ │┌────────┐  │
        │ │ Node.js 14+    │   │ │ │ Node.js 14+    │   │ ││Node.js │  │
        │ │ Express Static │   │ │ │ Express API    │   │ ││Express │  │
        │ │ auto-deploy    │   │ │ │ auto-deploy    │   │ ││API     │  │
        │ └────────────────┘   │ │ └────────────────┘   │ │└────────┘  │
        │                      │ │                      │ │            │
        │ URL:                 │ │ URL:                 │ │ URL:       │
        │ frontend.onrender.   │ │ wishlist.railway.    │ │ comments   │
        │ com                  │ │ up.railway.app       │ │ .fly.dev   │
        └──────────────────────┘ └──────────────────────┘ └────────────┘
                    │                     │                     │
                    └─────────────────────┼─────────────────────┘
                                          │
                          ┌───────────────▼──────────────┐
                          │   REST COUNTRIES API         │
                          │   https://restcountries...   │
                          └────────────────────────────┘
```

---

## 🔄 Flujo de dades completo

### Scenario: Afegir comentari a "Spain"

```
1. USER ACTION
   └─ Escriu: "Hermoso país!"
   └─ Clic: "Publicar comentari"

2. FRONTEND (Client-side)
   └─ javascript event listener encaixes click
   └─ document.getElementById("commentText").value captura text
   └─ fetch POST /api/comments amb JSON:
      {
        "country": "Spain",
        "text": "Hermoso país!",
        "timestamp": "2024-01-15T10:30:00Z"
      }

3. HTTP REQUEST
   └─ POST http://localhost:3003/api/comments
   └─ Headers: Content-Type: application/json
   └─ Body: JSON string

4. COMMENTS SERVICE (Backend)
   └─ Express middleware: cors() permiteix request
   └─ express.json() parseja el body
   └─ POST handler:
      - Valida country i text no buits
      - Valida text < 500 chars
      - Si no existeix comments[country] → crear []
      - Crea newComment object:
        {
          id: uuid v4,
          country: "Spain",
          text: "Hermoso país!",
          timestamp: ISO string,
          likes: 0
        }
      - Afegeix a comments["Spain"] array
      - Retorna 201 Created + comment

5. FRONTEND (Response handler)
   └─ .then() rep resposta 201
   └─ Limpia textarea
   └─ Mostra notificació "Comentari publicat!"
   └─ reload comments via fetch GET /api/comments/Spain

6. FRONTEND (GET Comments)
   └─ Comments Service retorna array de comentaris
   └─ displayComments() function:
      - Itera cada comentari
      - Crea HTML elements
      - Mostra text, hora, nom (anònim)
      - Afegeix a DOM

7. USER SEES
   └─ Textarea buida
   └─ Notificació surt per 3 seg
   └─ Comentari nou apareix a la llista
```

---

## 🗄️ Estructura de bases de dades (en memòria)

### Favorites Service
```javascript
let favorites = [
  "Spain",
  "France",
  "Italy"
];
```

### Wishlist Service
```javascript
let wishlist = [
  "Japan",
  "Australia",
  "New Zealand"
];
```

### Comments Service
```javascript
let comments = {
  "Spain": [
    {
      id: "uuid-123",
      country: "Spain",
      text: "Amazing country!",
      timestamp: "2024-01-15T10:30:00Z",
      likes: 0
    },
    {
      id: "uuid-456",
      country: "Spain",
      text: "Great food!",
      timestamp: "2024-01-15T10:35:00Z",
      likes: 0
    }
  ],
  "France": [
    {
      id: "uuid-789",
      country: "France",
      text: "Love Paris!",
      timestamp: "2024-01-15T10:40:00Z",
      likes: 0
    }
  ]
};
```

---

## 🔌 API Endpoints Map

### Frontend (Port 3000)
```
GET  /              -> Serve index.html
GET  /health        -> {"status": "Frontend actiu"}
```

### Favorites Service (Port 3001)
```
GET  /api/favorites                    -> []
GET  /api/favorites/:country           -> {exists, country}
POST /api/favorites/:country           -> {message, country, total}
DEL  /api/favorites/:country           -> {message, country, total}
DEL  /api/favorites                    -> {message}
GET  /health                           -> {status, totalFavorites}
```

### Wishlist Service (Port 3002)
```
GET  /api/wishlist                     -> []
GET  /api/wishlist/:country            -> {exists, country}
POST /api/wishlist/:country            -> {message, country, totalItems}
DEL  /api/wishlist/:country            -> {message, country, totalItems}
DEL  /api/wishlist                     -> {message}
GET  /health                           -> {status, totalItems}
```

### Comments Service (Port 3003)
```
GET  /api/comments/:country            -> [{id, country, text, timestamp, likes}]
POST /api/comments                     -> {message, comment, totalComments}
DEL  /api/comments/:country/:commentId -> {message, totalComments}
GET  /api/comments-stats               -> {totalComments, totalCountries, countries}
DEL  /api/comments/:country            -> {message, totalComments}
GET  /health                           -> {status, totalComments, totalCountries}
```

---

## 🛡️ Security Architecture

### CORS Configuration
```javascript
app.use(cors()); // Allow all origins (Development)
// Production: cors({ origin: "https://frontend.com" })
```

### Input Validation
- Comments: Max 500 chars
- Countries: Trim espacios
- JSON: Middleware express.json() parseja

### XSS Prevention
```javascript
// Frontend escapes HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
```

---

## 📊 Performance Considerations

### Local (In-Memory)
- ✅ Instant response (< 10ms)
- ⚠️ Data lost on restart
- ⚠️ No persistence
- ⚠️ Single instance only

### Production (Upgrades)
- 🔄 Add MongoDB/PostgreSQL
- 🔄 Implement caching (Redis)
- 🔄 Load balancing
- 🔄 Horizontal scaling

### Scaling Strategy
```
Local Dev:
  Frontend + 3 Microservices = 1 machine

Cloud Staging:
  Frontend (Render) 
  Services A (Railway)
  Services B (Fly.io)
  Services C (Koyeb)

Cloud Production:
  Load Balancer (CloudFlare/Nginx)
  Frontend replicas x3 (Render)
  Service replicas x2 each (Railway/Fly.io)
  Shared Database (PostgreSQL)
  Cache layer (Redis)
  CDN (CloudFlare)
```

---

## 🔄 Deployment Pipeline

```
DEV BRANCH          DEVELOP BRANCH       MAIN BRANCH
   │                    │                    │
   ├─ Feature work    ├─ Integration      ├─ PRODUCTION
   │                   │                    │
   └─▶ PR to dev      └─▶ PR to main      └─▶ Deploy to:
       │                 │                   - Render
       └─▶ Tests pass  └─▶ Tests pass       - Railway
           │               │                  - Fly.io
           └─▶ Merge   └─▶ Merge
```

---

## 💾 Data Persistence (Future)

### Option 1: MongoDB
```javascript
// Favorites
db.favorites.insertOne({
  _id: ObjectId(),
  userId: "user-123",
  country: "Spain",
  addedAt: ISODate()
})
```

### Option 2: PostgreSQL
```sql
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  country VARCHAR(100) NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Option 3: DynamoDB (AWS)
```
Table: Favorites
  PK: userId
  SK: country
  addedAt: timestamp
```

---

## 📈 Monitoring & Observability

### Health Checks
```
Every service: GET /health
Frequency: Every 30 seconds
Expected: HTTP 200 + status JSON
```

### Logging
```
Frontend: Browser Console (F12)
Services: Terminal stdout
Production: Papertrail/CloudWatch/Datadog
```

### Metrics
```
- Response times
- Error rates
- Request volume
- Active users
- Comment count
- Favorites count
```

---

**Aquesta arquitectura assegura**:
✅ Separació clara de concerns
✅ Escalabilitat independent
✅ Facilitat de testing
✅ Preparació per a producció
✅ Millora futura sense refactor major
