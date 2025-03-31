const API_URL = "http://localhost:3000/produtos";

// Função para carregar os produtos da API
async function carregarProdutos() {
    const response = await fetch(API_URL);
    const produtos = await response.json();
    const lista = document.getElementById("lista-produtos");
    lista.innerHTML = "";
    produtos.forEach(produto => {
        const item = document.createElement("li");
        item.textContent = `${produto.nome} - R$ ${produto.preco}`;
        lista.appendChild(item);
    });
}

// Função para adicionar um novo produto
async function adicionarProduto() {
    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, preco })
    });

    document.getElementById("nome").value = "";
    document.getElementById("preco").value = "";

    carregarProdutos();
}

// Carregar os produtos ao iniciar
carregarProdutos();
