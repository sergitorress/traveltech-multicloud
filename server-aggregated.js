/**
 * server-aggregated.js
 * 
 * Servidor único que combina:
 * - Frontend (Puerto 3000)
 * - API Favorites
 * - API Wishlist  
 * - API Comments
 * 
 * Ideal para desplegar en Render/Railway/etc con UNA SOLA APP (GRATIS)
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'frontend', 'public')));

// ═══════════════════════════════════════════════════════════════════
// DATA EN MEMORIA (Para desarrollo/demostración)
// ═══════════════════════════════════════════════════════════════════

const data = {
  favorites: [],
  wishlist: [],
  comments: []
};

// ═══════════════════════════════════════════════════════════════════
// HEALTH CHECKS
// ═══════════════════════════════════════════════════════════════════

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    services: {
      favorites: 'ok',
      wishlist: 'ok',
      comments: 'ok',
      frontend: 'ok'
    },
    timestamp: new Date().toISOString()
  });
});

// ═══════════════════════════════════════════════════════════════════
// API: FAVORITES
// ═══════════════════════════════════════════════════════════════════

app.get('/api/favorites', (req, res) => {
  res.json(data.favorites);
});

app.post('/api/favorites', (req, res) => {
  const { country } = req.body;
  if (!country) {
    return res.status(400).json({ error: 'Country is required' });
  }
  
  const favorite = {
    id: uuidv4(),
    country,
    addedAt: new Date().toISOString()
  };
  
  data.favorites.push(favorite);
  res.status(201).json(favorite);
});

app.delete('/api/favorites/:id', (req, res) => {
  const { id } = req.params;
  const index = data.favorites.findIndex(f => f.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Favorite not found' });
  }
  
  const deleted = data.favorites.splice(index, 1)[0];
  res.json({ message: 'Deleted', deleted });
});

// ═══════════════════════════════════════════════════════════════════
// API: WISHLIST
// ═══════════════════════════════════════════════════════════════════

app.get('/api/wishlist', (req, res) => {
  res.json(data.wishlist);
});

app.post('/api/wishlist', (req, res) => {
  const { country, reason } = req.body;
  if (!country) {
    return res.status(400).json({ error: 'Country is required' });
  }
  
  const wish = {
    id: uuidv4(),
    country,
    reason: reason || 'No reason provided',
    addedAt: new Date().toISOString()
  };
  
  data.wishlist.push(wish);
  res.status(201).json(wish);
});

app.delete('/api/wishlist/:id', (req, res) => {
  const { id } = req.params;
  const index = data.wishlist.findIndex(w => w.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Wishlist item not found' });
  }
  
  const deleted = data.wishlist.splice(index, 1)[0];
  res.json({ message: 'Deleted', deleted });
});

// ═══════════════════════════════════════════════════════════════════
// API: COMMENTS
// ═══════════════════════════════════════════════════════════════════

app.get('/api/comments', (req, res) => {
  res.json(data.comments);
});

app.get('/api/comments/:country', (req, res) => {
  const { country } = req.params;
  const countryComments = data.comments.filter(c => c.country.toLowerCase() === country.toLowerCase());
  res.json(countryComments);
});

app.post('/api/comments', (req, res) => {
  const { country, user, text } = req.body;
  
  if (!country || !text) {
    return res.status(400).json({ error: 'Country and text are required' });
  }
  
  const comment = {
    id: uuidv4(),
    country,
    user: user || 'Anonymous',
    text,
    timestamp: new Date().toISOString()
  };
  
  data.comments.push(comment);
  res.status(201).json(comment);
});

app.delete('/api/comments/:id', (req, res) => {
  const { id } = req.params;
  const index = data.comments.findIndex(c => c.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  
  const deleted = data.comments.splice(index, 1)[0];
  res.json({ message: 'Deleted', deleted });
});

app.get('/api/comments-stats', (req, res) => {
  const stats = {};
  data.comments.forEach(comment => {
    stats[comment.country] = (stats[comment.country] || 0) + 1;
  });
  res.json({ total: data.comments.length, byCountry: stats });
});

// ═══════════════════════════════════════════════════════════════════
// FRONTEND - RUTAS
// ═══════════════════════════════════════════════════════════════════

// Servir index.html en todas las rutas (SPA)
app.get('*', (req, res) => {
  // Si no es una ruta de API, sirve el index.html
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'frontend', 'public', 'index.html'));
  }
});

// ═══════════════════════════════════════════════════════════════════
// ERROR HANDLING
// ═══════════════════════════════════════════════════════════════════

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ═══════════════════════════════════════════════════════════════════
// INICIAR SERVIDOR
// ═══════════════════════════════════════════════════════════════════

app.listen(PORT, () => {
  console.log(`
    ╔════════════════════════════════════════════════════════════╗
    ║     🚀 TravelTech MultiCloud - Server Agregado             ║
    ║                                                            ║
    ║  Frontend:   http://localhost:${PORT}                 ║
    ║  Favorites:  http://localhost:${PORT}/api/favorites   ║
    ║  Wishlist:   http://localhost:${PORT}/api/wishlist    ║
    ║  Comments:   http://localhost:${PORT}/api/comments    ║
    ║  Health:     http://localhost:${PORT}/health          ║
    ║                                                            ║
    ║  📖 Documentación: DEPLOYMENT_FREE.md                     ║
    ╚════════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
