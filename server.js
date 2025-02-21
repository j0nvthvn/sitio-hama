const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/api/templates', (req, res) => {
    const templatesDir = path.join(__dirname, 'public/templates');
    fs.readdir(templatesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer la carpeta' });
        }
        const templates = files.map(file => ({
            name: file.split('.')[0],
            category: file.includes('animal') ? 'animales' : 
                    file.includes('personaje') ? 'personajes' : 'objetos',
            src: `/templates/${file}`
        }));
        res.json(templates);
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});