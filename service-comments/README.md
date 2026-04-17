# Comments Service

Microservei per a la gestió de comentaris comunitaris sobre paisos.

## Funcionalitat

- Afegir comentaris a un país
- Consultar comentaris d'un país
- Eliminar comentaris específics
- Estadístiques de comentaris
- Validació de longitud de comentaris

## API Endpoints

### GET /api/comments/:country
Obtenir tots els comentaris d'un país.

```bash
curl http://localhost:3003/api/comments/España
```

### POST /api/comments
Afegir un comentari nou.

```bash
curl -X POST http://localhost:3003/api/comments \
  -H "Content-Type: application/json" \
  -d '{
    "country": "España",
    "text": "País molt bonic!",
    "timestamp": "2024-01-15T10:30:00Z"
  }'
```

### DELETE /api/comments/:country/:commentId
Eliminar un comentari específic.

```bash
curl -X DELETE http://localhost:3003/api/comments/España/uuid-aqui
```

### DELETE /api/comments/:country
Eliminar tots els comentaris d'un país.

```bash
curl -X DELETE http://localhost:3003/api/comments/España
```

### GET /api/comments-stats
Obtenir estadístiques de comentaris.

```bash
curl http://localhost:3003/api/comments-stats
```

## Instal·lació i execució

```bash
npm install
npm start
```

S'executa al port 3003.

## Desplegament

- **Render**: Supported
- **Railway**: Supported
- **Koyeb**: Supported
