# 🧪 Testing & Integration Guide

Guia per testear tota la plataforma TravelTech.

## 🔍 Verificació manual

### 1. Health Checks (5 minuts)

Totes els serveis disposen d'endpoint `/health`:

```bash
# Frontend
curl -s http://localhost:3000/health | jq

# Favorites
curl -s http://localhost:3001/health | jq

# Wishlist
curl -s http://localhost:3002/health | jq

# Comments
curl -s http://localhost:3003/health | jq
```

**Esperit**: Tots retornen `{"status": "actiu"}`

---

## 🌐 Tests del Frontend

### Accés a la pàgina principal

1. Obrir browser: http://localhost:3000
2. Verificar que es carrega
3. Ver logo i buscador

### Test de buscador

```
Input: "Spain"
Expected:
- Suggestions dropdown amb "Spain"
- Clic en "Spain"
- Informació del país apareix
- Bandera es mostra
```

### Tests de botons

```
1. Botó "Favorits" (❤️)
   - Color canvia de gris a vermell
   - Apareix a la secció "Els meus Favorits"

2. Botó "Wishlist" (📌)
   - Color canvia a teal
   - Apareix a la secció "Wishlist"

3. Textarea commentaris
   - Afegir text
   - Clic "Publicar"
   - Comentari apareix a baix
```

---

## 💾 Tests del servei Favorites

### Operació C.R.U.D

```bash
# CREATE - Afegir favorit
curl -X POST http://localhost:3001/api/favorites/Spain \
  -H "Content-Type: application/json" \
  -d '{"name":"Spain"}'
# Expected: 201 Created

# READ - Llistar favorites
curl http://localhost:3001/api/favorites
# Expected: ["Spain"]

# UPDATE - No existe directament, es DELETE+POST
# Delete + re-create

# DELETE - Eliminar
curl -X DELETE http://localhost:3001/api/favorites/Spain
# Expected: 200 OK
```

### Tests de validació

```bash
# Duplicate - Afegir dos vegades
curl -X POST http://localhost:3001/api/favorites/Spain
curl -X POST http://localhost:3001/api/favorites/Spain
# Expected: 400 Bad Request (duplicat)

# Case insensitive
curl -X POST http://localhost:3001/api/favorites/spain
curl -X GET http://localhost:3001/api/favorites/SPAIN
# Expected: Sol·licituds treballen ambdós casos
```

---

## 🎁 Tests del servei Wishlist

Similar al Favorites:

```bash
# POST /api/wishlist/:country
curl -X POST http://localhost:3002/api/wishlist/France

# GET /api/wishlist
curl http://localhost:3002/api/wishlist

# DELETE /api/wishlist/:country
curl -X DELETE http://localhost:3002/api/wishlist/France
```

---

## 💬 Tests del servei Comments

### Afegir comentari

```bash
curl -X POST http://localhost:3003/api/comments \
  -H "Content-Type: application/json" \
  -d '{
    "country": "Spain",
    "text": "Amazing country with beautiful beaches!",
    "timestamp": "2024-01-15T10:30:00Z"
  }'
# Expected: 201 Created amb ID UUID
```

### Obtenir comentaris

```bash
curl http://localhost:3003/api/comments/Spain
# Expected: Array avec comentaris (amb id, timestamps, etc.)
```

### Estadístiques

```bash
curl http://localhost:3003/api/comments-stats
# Expected: 
# {
#   "totalComments": 5,
#   "totalCountries": 2,
#   "countries": ["Spain", "France"]
# }
```

### Validació de comentaris

```bash
# Text molt llarg (>500 chars)
curl -X POST http://localhost:3003/api/comments \
  -H "Content-Type: application/json" \
  -d '{"country":"Spain","text":"'"$(printf 'a%.0s' {1..501})"'"}'
# Expected: 400 Bad Request

# Missing fields
curl -X POST http://localhost:3003/api/comments \
  -H "Content-Type: application/json" \
  -d '{"text":"Comentari"}'
# Expected: 400 Bad Request (falta country)
```

---

## 🔗 Tests d'integració (Frontend ↔ Serveis)

### Workflow complet d'usuari

```
1. User accesses frontend
   X: GET http://localhost:3000
   ✓: HTML served

2. User searches "Spain"
   ✓: Frontend calls REST Countries API
   ✓: Informació del país es mostra

3. User adds to favorites
   X: Frontend POST to /api/favorites/Spain (port 3001)
   ✓: Frontend updates UI
   ✓: Favorites Service returns 201

4. User adds to wishlist
   X: Frontend POST to /api/wishlist/France (port 3002)
   ✓: Frontend updates UI
   ✓: Wishlist Service returns 201

5. User adds comment
   X: Frontend POST to /api/comments (port 3003)
   ✓: Frontend clears textarea
   ✓: Comment appears below
   ✓: Timestamp is correct

6. User reloads page
   X: Frontend fetches all favorites (GET port 3001)
   X: Frontend fetches all wishlist (GET port 3002)
   X: Frontend fetches comments (GET port 3003)
   ✓: Previous data appears on dashboard
```

### Test d'ordre de operations

```bash
# 1. Clean slate
curl -X DELETE http://localhost:3001/api/favorites
curl -X DELETE http://localhost:3002/api/wishlist
curl -X DELETE http://localhost:3003/api/comments/Spain

# 2. Add to all services
curl -X POST http://localhost:3001/api/favorites/Spain
curl -X POST http://localhost:3002/api/wishlist/Spain
curl -X POST http://localhost:3003/api/comments \
  -d '{"country":"Spain","text":"Test"}'

# 3. Verify all present
curl http://localhost:3001/api/favorites     # ["Spain"]
curl http://localhost:3002/api/wishlist      # ["Spain"]
curl http://localhost:3003/api/comments/Spain # [...]

# 4. Remove from all
curl -X DELETE http://localhost:3001/api/favorites/Spain
curl -X DELETE http://localhost:3002/api/wishlist/Spain
curl -X DELETE http://localhost:3003/api/comments/Spain/COMMENT_ID

# 5. Verify all empty
curl http://localhost:3001/api/favorites     # []
curl http://localhost:3002/api/wishlist      # []
curl http://localhost:3003/api/comments/Spain # []
```

---

## 📊 Tests de performance

### Grups de requests

```bash
# Afegir 100 favorits
for i in {1..100}; do
  curl -X POST http://localhost:3001/api/favorites/Country$i
done

# Get and time
time curl http://localhost:3001/api/favorites

# Expected: Response time < 100ms for 100 items
```

---

## 🔐 Tests de seguretat bàsica

### CORS verification

```bash
# Request amb origen diferent
curl -i -X OPTIONS http://localhost:3001/api/favorites \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST"

# Expected: 
# Access-Control-Allow-Origin: *
# (o el origen específic)
```

### XSS prevention

```bash
# Afegir comentari amb HTML
curl -X POST http://localhost:3003/api/comments \
  -d '{"country":"Spain","text":"<script>alert(1)</script>"}'

# Frontend debe escapeHTML antes de mostrar
# Verificar que el script NO s'executa
```

---

## 📝 Postman Collection

Importar `Postman_Collection.json`:

1. Obrir Postman
2. File → Import
3. Seleccionar `Postman_Collection.json`
4. Totes els requests ja configurats

---

## ✅ Checklist final

- [ ] Tots els serveis health checks passen
- [ ] Frontend carrega sense errors (F12)
- [ ] Buscador funciona (autocomplete)
- [ ] Favorits C.R.U.D. funciona
- [ ] Wishlist C.R.U.D. funciona
- [ ] Comments C.R.U.D. funciona
- [ ] Workflow complet d'usuari funciona
- [ ] Dades persista após recarregar frontend
- [ ] No hi ha CORS errors en console
- [ ] Timestamps és correcte en comentaris
- [ ] XSS prevention funciona

---

## 🐛 Debug comum

### Obrir Dev Tools (F12)

```
Network tab:
- Ver totes les requests
- Status 200, 201, 400, 404, etc.
- Request/Response payloads

Console tab:
- Errors JavaScript
- CORS errors
- Fetch requests
```

### Logs de terminal

Cada servei mostra logs en la terminal:

```
Frontend: "Express listening on port 3000"
Favorites: "Favorites Service listening on port 3001"
Wishlist: "Wishlist Service listening on port 3002"
Comments: "Comments Service listening on port 3003"
```

---

## 🚀 T test en producció

Veure [DEPLOYMENT.md](DEPLOYMENT.md#verificació-final) para verificar URLs desplegades.

```bash
# Test staging/production
curl https://your-frontend.onrender.com/health
curl https://your-wishlist.up.railway.app/health
curl https://your-comments.fly.dev/health
```
