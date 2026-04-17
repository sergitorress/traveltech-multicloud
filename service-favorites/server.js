const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Base de dades en memòria
let favorites = [];

// GET - Obtenir tots els favorits
app.get('/api/favorites', (req, res) => {
    res.json(favorites);
});

// GET - Obtenir un favorit específic
app.get('/api/favorites/:country', (req, res) => {
    const country = req.params.country;
    const favorite = favorites.find(f => f.toLowerCase() === country.toLowerCase());
    
    if (favorite) {
        res.json({ exists: true, country: favorite });
    } else {
        res.status(404).json({ exists: false });
    }
});

// POST - Afegir un favorit
app.post('/api/favorites/:country', (req, res) => {
    const country = req.params.country;
    
    // Evitar duplicats
    if (!favorites.find(f => f.toLowerCase() === country.toLowerCase())) {
        favorites.push(country);
        res.status(201).json({ 
            message: 'Favorit afegit',
            country: country,
            total: favorites.length 
        });
    } else {
        res.status(400).json({ message: 'Ja és favorit' });
    }
});

// DELETE - Eliminar un favorit
app.delete('/api/favorites/:country', (req, res) => {
    const country = req.params.country;
    const initialLength = favorites.length;
    
    favorites = favorites.filter(f => f.toLowerCase() !== country.toLowerCase());
    
    if (favorites.length < initialLength) {
        res.json({ 
            message: 'Favorit eliminat',
            country: country,
            total: favorites.length 
        });
    } else {
        res.status(404).json({ message: 'Favorit no trobat' });
    }
});

// DELETE - Eliminar tots els favorits
app.delete('/api/favorites', (req, res) => {
    favorites = [];
    res.json({ message: 'Tous els favorits han estat eliminats' });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'Favorites Service actiu',
        totalFavorites: favorites.length 
    });
});

app.listen(PORT, () => {
    console.log(`⭐ Favorites Service escoltant al port ${PORT}`);
    console.log(`Base de dades: ${favorites.length} favorits`);
});
