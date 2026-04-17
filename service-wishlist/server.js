const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Base de dades en memòria
let wishlist = [];

// GET - Obtenir tota la wishlist
app.get('/api/wishlist', (req, res) => {
    res.json(wishlist);
});

// GET - Obtenir una entrada específica
app.get('/api/wishlist/:country', (req, res) => {
    const country = req.params.country;
    const item = wishlist.find(w => w.toLowerCase() === country.toLowerCase());
    
    if (item) {
        res.json({ exists: true, country: item });
    } else {
        res.status(404).json({ exists: false });
    }
});

// POST - Afegir a la wishlist
app.post('/api/wishlist/:country', (req, res) => {
    const country = req.params.country;
    
    // Evitar duplicats
    if (!wishlist.find(w => w.toLowerCase() === country.toLowerCase())) {
        wishlist.push(country);
        res.status(201).json({ 
            message: 'Afegit a Wishlist',
            country: country,
            totalItems: wishlist.length 
        });
    } else {
        res.status(400).json({ message: 'Ja està en la Wishlist' });
    }
});

// DELETE - Eliminar de la wishlist
app.delete('/api/wishlist/:country', (req, res) => {
    const country = req.params.country;
    const initialLength = wishlist.length;
    
    wishlist = wishlist.filter(w => w.toLowerCase() !== country.toLowerCase());
    
    if (wishlist.length < initialLength) {
        res.json({ 
            message: 'Eliminat de Wishlist',
            country: country,
            totalItems: wishlist.length 
        });
    } else {
        res.status(404).json({ message: 'Entrada no trobada en Wishlist' });
    }
});

// DELETE - Limpiar tota la wishlist
app.delete('/api/wishlist', (req, res) => {
    wishlist = [];
    res.json({ message: 'Wishlist buida' });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'Wishlist Service actiu',
        totalItems: wishlist.length 
    });
});

app.listen(PORT, () => {
    console.log(`📌 Wishlist Service escoltant al port ${PORT}`);
    console.log(`Base de dades: ${wishlist.length} entrades`);
});
