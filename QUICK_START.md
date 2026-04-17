# 🚀 Quick Start Guide - TravelTech MultiCloud

Guia ràpida per posar la plataforma en marxa en 5 minuts.

## 📋 Requisits previs

- ✅ Node.js 14+ instal·lat
- ✅ npm instal·lat (ve amb Node.js)
- ✅ 4 terminals o finestres del terminal (Windows: PowerShell/CMD)

## ⚡ Opció 1: Script automàtic (RECOMANAT)

### Windows
```bash
# Executar el script batch
start-all.bat
```

S'obriran 4 finestres noves amb tots els serveis.

### Mac/Linux
```bash
# Donar permissos d'execució
chmod +x start-all.sh

# Executar script
./start-all.sh
```

---

## ⚙️ Opció 2: Manual (Terminal per terminal)

### Terminal 1: Frontend
```bash
cd frontend
npm install
npm start
```
✅ Frontend actiu a `http://localhost:3000`

### Terminal 2: Favorites Service
```bash
cd service-favorites
npm install
npm start
```
✅ Favorites actiu a `http://localhost:3001`

### Terminal 3: Wishlist Service
```bash
cd service-wishlist
npm install
npm start
```
✅ Wishlist actiu a `http://localhost:3002`

### Terminal 4: Comments Service
```bash
cd service-comments
npm install
npm start
```
✅ Comments actiu a `http://localhost:3003`

---

## 🌐 Accedir a l'aplicació

1. Obrir navegador i anar a: **http://localhost:3000**
2. Cercar un país (ex: "Spain", "France", "Italy")
3. Veure informació del país
4. Provar les funcionalitats:
   - ❤️ Afegir a favorits
   - 📌 Afegir a wishlist
   - 💬 Publicar comentari

---

## 🧪 Test ràpid amb cURL

```bash
# Afegir a favorits
curl -X POST http://localhost:3001/api/favorites/Spain

# Obtenir todos els favorits
curl http://localhost:3001/api/favorites

# Afegir comentari
curl -X POST http://localhost:3003/api/comments \
  -H "Content-Type: application/json" \
  -d '{"country":"Spain","text":"Great country!"}'

# Obtenir comentaris
curl http://localhost:3003/api/comments/Spain
```

---

## 📊 Verificació de Health

Totes els serveis disposen de `/health` endpoint:

```bash
curl http://localhost:3000/health   # Frontend
curl http://localhost:3001/health   # Favorites
curl http://localhost:3002/health   # Wishlist
curl http://localhost:3003/health   # Comments
```

---

## 🆘 Solució de problemes

### "Port en ús"
```bash
# Windows - Trobar quin proces usa el port
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000
```

### "Connection refused"
- Assegurar-se que tots els serveis s'han iniciat
- Esperar 2-3 segons entre inicis

### "Module not found"
```bash
# Reinstalar dependències
npm install
```

### CORS errors
- Verificar que **tots els serveis** tinguin CORS habilitat
- Revisar URLs a `frontend/public/script.js`

---

## 📚 Recursos útils

- [README.md](README.md) - Documentació completa
- [DEPLOYMENT.md](DEPLOYMENT.md) - Guia de desplegament multi-cloud
- [TECHNICAL_NOTES.md](TECHNICAL_NOTES.md) - Memòria tècnica
- [Postman_Collection.json](Postman_Collection.json) - Colecció de requests

---

## 🔗 URLs de desenvolupament local

| Servei | URL | Port |
|--------|-----|------|
| Frontend | http://localhost:3000 | 3000 |
| Favorites | http://localhost:3001 | 3001 |
| Wishlist | http://localhost:3002 | 3002 |
| Comments | http://localhost:3003 | 3003 |

---

## 📝 Pròxims passos

1. ✅ Plataforma en marxa localment
2. 🔄 Provar funcionalitats
3. 🐛 Debuggar (F12 en navegador)
4. 📤 Desplegar a cloud (veure [DEPLOYMENT.md](DEPLOYMENT.md))
5. 🚀 Compartir URLs públiques

---

**Veure problemes?** Revisar logs en terminal - tota la informació diagnòstica apareixerà allà.
