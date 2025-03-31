const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

// Criação da tabela "produtos", se ela não existir
db.run("CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, preco REAL)", (err) => {
    if (err) {
        console.error("Erro ao criar a tabela 'produtos':", err.message);
    } else {
        console.log("Tabela 'produtos' criada ou já existente.");
    }
});

// Rota para listar os produtos
app.get("/produtos", (req, res) => {
    db.all("SELECT * FROM produtos", (err, rows) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao buscar produtos" });
        }
        res.json(rows); // Retorna os produtos em formato JSON
    });
});

// Rota para adicionar um produto
app.post("/produtos", (req, res) => {
    const { nome, preco } = req.body;
    if (!nome || !preco) {
        return res.status(400).json({ message: "Nome e preço são obrigatórios" });
    }
    const stmt = db.prepare("INSERT INTO produtos (nome, preco) VALUES (?, ?)");
    stmt.run(nome, preco, function (err) {
        if (err) {
            return res.status(500).json({ message: "Erro ao adicionar produto" });
        }
        res.status(201).json({ id: this.lastID, nome, preco });
    });
    stmt.finalize();
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
