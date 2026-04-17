# Documentació tècnica - TravelTech MultiCloud

## Memòria tècnica breu (5-10 línies expandides)

### Descripció general
TravelTech MultiCloud és una plataforma moderna de planificació de viatges amb arquitectura de microserveis distribuïts en múltiples operadors cloud. Implementa separació clara de responsabilitats i facilita la escalabilitat independent de cada component.

### Serveis desenvolupats

#### 1. **Favorites Service** (Reutilitzat i adaptat)
- Funcionalitat: Gestió de paisos marcats com favorits
- Endpoints: GET, POST, DELETE `/api/favorites`
- Característiques: Llista persistent, évita duplicats
- Cloud: Railway
- Port: 3001 (local)

#### 2. **Wishlist Service** (Nou - Microservei específic)
- Funcionalitat: Gestió de destinacions pendents de visitar
- Endpoints: GET, POST, DELETE `/api/wishlist`
- Característiques: CRUD complet, validació d'entrades
- Cloud: Render
- Port: 3002 (local)

#### 3. **Comments Service** (Nou - Microservei específic)
- Funcionalitat: Sistema de comentaris comunitaris per país
- Endpoints: GET, POST, DELETE `/api/comments` + estadístiques
- Característiques: IDs únics (UUID), validació de longitud, timestamps
- Cloud: Fly.io
- Port: 3003 (local)

### Frontend
- Tecnologia: HTML5 + CSS3 + JavaScript vanilla (sense frameworks)
- Consumeix: API externa (REST Countries), 3 microserveis propis
- Interfície responsiva amb diseño modern
- Integració seamless de totes les funcionalitats

### Arquitectura tecnològica

```
┌─────────────────────────────┐          NIVEL PRESENTACIÓ
│   Frontend Web (UI)         │
│   - HTML5, CSS3, JS         │
└──────────────┬──────────────┘
               │ FETCH API + CORS
   ┌───────────┼──────────────────┬─────────────────┐
   │           │                  │                 │
   ▼           ▼                  ▼                 ▼
FAVORITES   WISHLIST          COMMENTS        REST COUNTRIES
NODE.js     NODE.js           NODE.js          API EXTERNA
±3001       ±3002             ±3003            (https)
```

### Desplegament multi-cloud

| Component | Cloud | Motiu |
|-----------|-------|-------|
| Frontend | Render | Node.js support, fàcil integració GitHub |
| Wishlist | Railway | Interfície intuïtiva, buen soporte |
| Comments | Fly.io | Performance globals, escalabilitat |
| Favorites | Local/Optional | Pot desplegar-se a Koyeb o Railway |

### Diferènciació de serveis

**Separació clara**:
- Cada servei té `package.json` propi
- Ports independents (local) i URLs únics (cloud)
- Sense dependències entre serveis (desacoplats)
- Cada servei disposa de `/health` endpoint

**Frontend desacoblat**:
- No cap lògica de negoci en servidor (apenas un express static)
- Tota la lògica en client-side (script.js)
- Consumeix serveis via HTTP/CORS
- Pot funcionar independentment si serveis cauen

### Stack tecnològic

- **Llenguatge**: Node.js 14+, JavaScript (ES6+)
- **Framework**: Express.js (minimal)
- **Midleware**: CORS, JSON body parser
- **API Externa**: REST Countries (gratis, sense auth)
- **Storage**: En memòria (expandible a BD)
- **Cloud**: Render, Railway, Fly.io
- **VCS**: GitHub

### Dificultats encontradas i solucions

| Dificultad | Solució |
|-----------|---------|
| CORS errors | Habilitar CORS en tots els serveis amb `cors()` middleware |
| URLs endpoints | Crear constant SERVICES als script.js, actualitzar en producció |
| Port conflicts locals | Assignar ports únics (3000, 3001, 3002, 3003) |
| Session management | Usar `sessionStorage` navegador per historial |
| Scalabilitat | Arquitectura de microserveis permet creixement independent |

### Funcionalitats implementades

✅ Cercar paisos per nom (API externa)
✅ Veure informació detallada (capital, flag, economia)  
✅ Afegir/eliminar favorits (Favorites Service)
✅ Gestionar wishlist (Wishlist Service)
✅ Afegir comentaris comunitaris (Comments Service)
✅ Historial de cerques (sessionStorage)
✅ Dashboard integrat amb les 3 llistes
✅ CORS habilitada per multi-cloud
✅ Health checks per monitoring
✅ Interfície responsiva i moderna

### Requisits complits

| Requisit | Estat | Detalls |
|----------|-------|---------|
| Frontend funcional | ✅ | Interfície HTML5 + JS |
| API externa | ✅ | REST Countries integrada |
| 3+ microserveis | ✅ | Favorites, Wishlist, Comments |
| Multi-cloud | ✅ | Render + Railway + Fly.io |
| GitHub | ✅ | Repositori públic |
| Microservei nou | ✅ | Wishlist i Comments (2 nous) |
| Documentació | ✅ | README + DEPLOYMENT + eslabón |

---

**Data**: 2024
**Desenvolupador**: Alumne
**Durada aproximada**: 12-15 hores de desenvolupament
