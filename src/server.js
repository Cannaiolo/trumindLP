const express = require('express');
const app = express();
const path = require('path');

// Importando o módulo database.js
require('./src/models/database'); // Adicione esta linha

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});