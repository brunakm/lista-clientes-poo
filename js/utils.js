// valida os campos
export function validarCampos(nome, email) {
    if(nome.trim() === "" || email.trim() === "") {
        return false;
    }

    return true;
}

// cria elemento cliente
export function criarElementoCliente(cliente, callbackExcluir) {
    const li = document.createElement("li");

    li.innerHTML = `
        <div>
            <strong>${cliente.nome}</strong><br>
            ${cliente.email}
        </div>

        <button class="excluir">
            Excluir
        </button>
    `;

    li.querySelector("button")
        .addEventListener("click", () => {
            callbackExcluir(cliente._id);
        });

    return li;
}