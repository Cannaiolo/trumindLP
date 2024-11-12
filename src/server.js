const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analisar o corpo das requisições
app.use(bodyParser.json());
app.use(express.static('public')); // Serve arquivos estáticos da pasta public

// Conectar ao banco de dados
let db = new sqlite3.Database('./leads.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado ao banco de dados SQLite.');
});

// Endpoint para cadastrar leads
app.post('/api/leads', (req, res) => {
    const { nomeCompleto, numeroTelefone, email } = req.body;

    const sql = `INSERT INTO leads (nomeCompleto, numeroTelefone, email) VALUES (?, ?, ?)`;
    db.run(sql, [nomeCompleto, numeroTelefone, email], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, nomeCompleto, numeroTelefone, email });
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Fechar a conexão com o banco de dados ao encerrar o servidor
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Conexão com o banco de dados fechada.');
        process.exit(0);
    });
});