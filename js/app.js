import { Cliente } from "./classes.js";

import {
    validarCampos,
    criarElementoCliente
} from "./utils.js";

const apiUrl = "https://crudcrud.com/api/5ffed88e0f944654a7b8a826a20e0277/clientes";

const form = document.getElementById("cliente-form");

const listaClientes = document.getElementById("lista-clientes");

// carrega clientes
async function carregarClientes() {
    listaClientes.innerHTML = "";

    try {

        const resposta = await fetch(apiUrl);

        const clientes = await resposta.json();

        // map()
        clientes.map(cliente => {

            const elemento = criarElementoCliente(
                cliente,
                excluirCliente
            );

            listaClientes.appendChild(elemento);
        });

        // reduce()
        const totalClientes = clientes.reduce(
            (total) => total + 1,
            0
        );

        console.log("Total de clientes:", totalClientes);

    } catch (erro) {
        console.log("Erro ao carregar clientes", erro);
    }
}

// cadastra cliente
form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value;

    const email = document.getElementById("email").value;

    // validação
    if(!validarCampos(nome, email)) {
        alert("Preencha todos os campos");
        return;
    }

    const novoCliente = new Cliente(nome, email);

    try {
        await fetch(apiUrl, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(novoCliente)

        });

        form.reset();

        carregarClientes();

    } catch (erro) {

        console.log("Erro ao cadastrar cliente", erro);
    }
});

// exclui clientes
async function excluirCliente(id) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        });

        carregarClientes();

    } catch (erro) {

        console.log("Erro ao excluir cliente", erro);
    }
}

// find()
async function buscarClientePorNome(nomeBusca) {
    const resposta = await fetch(apiUrl);

    const clientes = await resposta.json();

    const clienteEncontrado = clientes.find(cliente =>
        cliente.nome === nomeBusca
    );

    console.log(clienteEncontrado);
}

carregarClientes();