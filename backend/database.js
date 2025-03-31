const sqlite3 = require("sqlite3").verbose();

// Conectar ao banco de dados (ou criar se não existir)
const db = new sqlite3.Database("./produtos.db");

// Criar a tabela de produtos, se não existir
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            preco REAL NOT NULL
        )
    `);
});

module.exports = db;
