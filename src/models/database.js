const sqlite3 = require('sqlite3').verbose();

// Cria ou abre um banco de dados
let db = new sqlite3.Database('./leads.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado ao banco de dados SQLite.');
});

// Cria uma tabela para armazenar leads
db.run(`CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nomeCompleto TEXT NOT NULL,
    numeroTelefone TEXT NOT NULL,
    email TEXT NOT NULL
)`, (err) => {
    if (err) {
        console.error(err.message);
    }
});

// Fecha a conexão com o banco de dados
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conexão com o banco de dados fechada.');
});