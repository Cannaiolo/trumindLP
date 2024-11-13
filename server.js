// src/server.js
require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para segurança
app.use(helmet());

// Middleware para analisar JSON
app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Caminho para o banco de dados
const dbPath = path.join(__dirname, process.env.DB_NAME || 'leads.db');

// Conectar ao banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Conexão com o banco de dados estabelecida.');
    }
});

// Middleware para validação de dados
function validateLead(req, res, next) {
    const { nome, email, telefone } = req.body;
    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Email inválido.' });
    }
    const telefoneRegex = /^\d+$/;
    if (telefone && !telefoneRegex.test(telefone)) {
        return res.status(400).json({ error: 'Telefone deve conter apenas números.' });
    }
    next();
}

// Endpoint para a raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint para cadastrar um lead com validação
app.post('/leads', validateLead, (req, res) => {
    console.log('Requisição recebida para cadastrar um lead:', req.body);
    const { nome, email, telefone } = req.body;

    db.run(`INSERT INTO leads_trumindLP (nome, email, telefone) VALUES (?, ?, ?)`, [nome, email, telefone], function(err) {
        if (err) {
            console.error('Erro ao inserir no banco de dados:', err.message);
            return res.status(500).json({ error: 'Erro ao cadastrar lead.' });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});