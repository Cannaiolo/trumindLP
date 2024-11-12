// src/server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para analisar JSON
app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para a raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Altere 'index.html' para o seu arquivo principal
});

// Conectar ao banco de dados
const dbPath = path.join(__dirname, 'leads.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Conexão com o banco de dados estabelecida.');
    }
});

// Endpoint para cadastrar um lead
app.post('/leads', (req, res) => {
    const { nome, email, telefone } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
    }

    db.run(`INSERT INTO leads_trumindLP (nome, email, telefone) VALUES (?, ?, ?)`, [nome, email, telefone], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});