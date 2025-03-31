const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

// Rota para listar todos os produtos
app.get("/produtos", (req, res) => {
    db.all("SELECT * FROM produtos", [], (err, rows) => {
        if (err) {
            res.status(500).json({ erro: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rota para adicionar um novo produto
app.post("/produtos", (req, res) => {
    const { nome, preco } = req.body;
    db.run("INSERT INTO produtos (nome, preco) VALUES (?, ?)", [nome, preco], function(err) {
        if (err) {
            res.status(500).json({ erro: err.message });
            return;
        }
        res.json({ id: this.lastID, nome, preco });
    });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
