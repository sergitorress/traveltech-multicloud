# TravelTech Frontend

Interfície web principal de la plataforma de planificació de viatges.

## Característiques

- 🔍 Cerca de países per nom
- 🌍 Integració amb API REST Countries
- ❤️ Gestió de favorits
- 📌 Wishlist de destinacions
- 💬 Sistema de comentaris comunitaris
- 📊 Dashboard amb historial i llistats

## Instalació local

```bash
npm install
npm start
```

El frontend s'executa al port 3000.

## Variables d'entorn

Crear arxiu `.env`:

```
PORT=3000
```

## Endpoints dels microserveis

El frontend es connecta amb:
- **Favorites**: http://localhost:3001
- **Wishlist**: http://localhost:3002
- **Comments**: http://localhost:3003
- **REST Countries API**: https://restcountries.com/v3.1
