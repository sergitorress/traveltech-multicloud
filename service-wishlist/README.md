# Wishlist Service

Microservei per a la gestió de wishlist (destinacions pendents de visitar).

## Funcionalitat

- Afegir un país a la wishlist
- Consultar tota la wishlist
- Verificar si un país està a la wishlist
- Eliminar un país
- Limpiar tota la wishlist

## API Endpoints

### GET /api/wishlist
Obtenir tota la wishlist.

```bash
curl http://localhost:3002/api/wishlist
```

### GET /api/wishlist/:country
Verificar si un país està a la wishlist.

```bash
curl http://localhost:3002/api/wishlist/Franca
```

### POST /api/wishlist/:country
Afegir un país a la wishlist.

```bash
curl -X POST http://localhost:3002/api/wishlist/Franca
```

### DELETE /api/wishlist/:country
Eliminar un país de la wishlist.

```bash
curl -X DELETE http://localhost:3002/api/wishlist/Franca
```

### DELETE /api/wishlist
Limpiar la wishlist.

```bash
curl -X DELETE http://localhost:3002/api/wishlist
```

## Instal·lació i execució

```bash
npm install
npm start
```

S'executa al port 3002.

## Desplegament

- **Render**: Supported
- **Railway**: Supported
- **Fly.io**: Supported
