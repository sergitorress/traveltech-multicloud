const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Base de dades en memòria
let comments = {};

// GET - Obtenir comentaris d'un país
app.get('/api/comments/:country', (req, res) => {
    const country = req.params.country;
    const countryComments = comments[country] || [];
    
    res.json(countryComments);
});

// POST - Afegir comentari
app.post('/api/comments', (req, res) => {
    const { country, text, timestamp } = req.body;
    
    if (!country || !text) {
        return res.status(400).json({ message: 'País i text són obligatoris' });
    }
    
    if (text.length > 500) {
        return res.status(400).json({ message: 'Comentari massa llarg (màx 500 caràcters)' });
    }
    
    // inicialitzar array si no existeix
    if (!comments[country]) {
        comments[country] = [];
    }
    
    const newComment = {
        id: uuidv4(),
        country: country,
        text: text,
        timestamp: timestamp || new Date().toISOString(),
        likes: 0
    };
    
    comments[country].push(newComment);
    
    res.status(201).json({
        message: 'Comentari afegit',
        comment: newComment,
        totalComments: comments[country].length
    });
});

// DELETE - Eliminar comentari
app.delete('/api/comments/:country/:commentId', (req, res) => {
    const { country, commentId } = req.params;
    
    if (!comments[country]) {
        return res.status(404).json({ message: 'País no trobat' });
    }
    
    const initialLength = comments[country].length;
    comments[country] = comments[country].filter(c => c.id !== commentId);
    
    if (comments[country].length < initialLength) {
        res.json({ 
            message: 'Comentari eliminat',
            totalComments: comments[country].length 
        });
    } else {
        res.status(404).json({ message: 'Comentari no trobat' });
    }
});

// GET - Obtenir estadístiques
app.get('/api/comments-stats', (req, res) => {
    let totalComments = 0;
    let totalCountries = 0;
    
    for (const country in comments) {
        totalCountries++;
        totalComments += comments[country].length;
    }
    
    res.json({
        totalComments: totalComments,
        totalCountries: totalCountries,
        countries: Object.keys(comments)
    });
});

// DELETE - Eliminar tots els comentaris d'un país
app.delete('/api/comments/:country', (req, res) => {
    const country = req.params.country;
    
    if (comments[country]) {
        const count = comments[country].length;
        delete comments[country];
        res.json({ 
            message: `${count} comentaris del país eliminats`,
            totalComments: count 
        });
    } else {
        res.status(404).json({ message: 'País no trobat' });
    }
});

// Health check
app.get('/health', (req, res) => {
    let totalComments = 0;
    for (const country in comments) {
        totalComments += comments[country].length;
    }
    
    res.json({ 
        status: 'Comments Service actiu',
        totalComments: totalComments,
        totalCountries: Object.keys(comments).length
    });
});

app.listen(PORT, () => {
    console.log(`💬 Comments Service escoltant al port ${PORT}`);
    console.log(`Comentaris actius: 0`);
});
