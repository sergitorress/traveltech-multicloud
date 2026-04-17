# Favorites Service

Microservei per a la gestió de países favorits.

## Funcionalitat

- Afegir un país a la llista de favorits
- Consultar tots els favorits
- Verificar si un país és favorit
- Eliminar un favorit
- Limpiar tota la llista de favorits

## API Endpoints

### GET /api/favorites
Obtenir tota la llista de favorits.

```bash
curl http://localhost:3001/api/favorites
```

### GET /api/favorites/:country
Verificar si un país és favorit.

```bash
curl http://localhost:3001/api/favorites/España
```

### POST /api/favorites/:country
Afegir un país a favorits.

```bash
curl -X POST http://localhost:3001/api/favorites/España
```

### DELETE /api/favorites/:country
Eliminar un país de favorits.

```bash
curl -X DELETE http://localhost:3001/api/favorites/España
```

### DELETE /api/favorites
Eliminar tota la llista.

```bash
curl -X DELETE http://localhost:3001/api/favorites
```

## Instal·lació i execució

```bash
npm install
npm start
```

S'executa al port 3001.

## Desplegament

- **Render**: Railway
- **Vercel**: No (backend)
- **Fly.io**: Sí
