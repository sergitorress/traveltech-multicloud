# Cómo Usar TravelTech

## 🌐 Acceder a la Aplicación

### Opción 1: Frontend en Render (Principal)
```
https://traveltech-frontend-06xs.onrender.com/
```

1. **Buscar país**: Escribe el nombre en inglés (Spain, France, Germany, etc.)
2. **Ver información**: Aparecerá bandera, capital, población, idiomas
3. **Interactuar**: Botones para Favorites, Wishlist, Comments

---

## 🎯 Funcionalidades

### ⭐ Favoritos
- Click en ❤️ para marcar como favorito
- Los favoritos se guardan en la sesión
- Vé a "Mis Favoritos" para verlos

### 📌 Wishlist
- Click en 📌 para agregar a tu lista de viajes
- Gestiona destinaciones que quieres visitar
- Sincroniza entre sesiones

### 💬 Comentarios
- Escribe comentarios sobre países
- Lee comentarios de otros usuarios
- Incluye autor y timestamp automático

---

## 🔧 Para Verificar que Funciona

### Test en el navegador:
1. Abre: `https://traveltech-frontend-06xs.onrender.com/`
2. Busca: "Spain"
3. Deberías ver:
   - Bandera 🇪🇸
   - Capital: Madrid
   - Población: ~47M
   - Idiomas: Spanish
4. Click en botones de Favorites/Wishlist/Comments
5. Deberías ver confirmación sin errores

### Test de Health Check:
```
GET https://traveltech-frontend-06xs.onrender.com/health
→ {"status":"healthy"}
```

---

## 🚨 Si Algo No Funciona

### Problema: Errores 502/503
- **Causa**: Render/Railway durmiendo (primer acceso lento)
- **Solución**: Espera 30-60 segundos y recarga

### Problema: Favoritos/Wishlist no se guardan
- **Causa**: Microservicios en Railway no están inicializados
- **Solución**: 
  1. Verifica en Railway Dashboard que los servicios estén "Running" (verde)
  2. Si están "Crashed", reinicia desde Railway Dashboard

### Problema: Comentarios no funcionan
- **Causa**: Service-comments puede estar inactivo
- **Solución**: Igual que favoritos, verifica status en Railway

---

## 📊 URLs de los Servicios (Para Referencia)

| Servicio | URL |
|----------|-----|
| Frontend | https://traveltech-frontend-06xs.onrender.com |
| Favorites | Railway (automático desde frontend) |
| Wishlist | Railway (automático desde frontend) |
| Comments | Railway (automático desde frontend) |

---

## 🎓 Para Entrega

Toma screenshots de:
1. ✅ Página principal buscando un país
2. ✅ Resultado con información del país
3. ✅ Favorito agregado
4. ✅ Comentario escrito
5. ✅ Health check endpoint (GET /health)

Esto prueba que:
- ✅ Frontend funciona
- ✅ API externa (REST Countries) funciona  
- ✅ 3 microservicios funcionan
- ✅ CORS configurado correctamente
