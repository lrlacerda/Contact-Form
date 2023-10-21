document.addEventListener("DOMContentLoaded", function () {
    const cepInput = document.getElementById("cep");

    cepInput.addEventListener("input", async function () {
        const cepValue = cepInput.value.replace(/\D/g, "");

        try {
            const response = await fetch(
                `https://viacep.com.br/ws/${cepValue}/json/`
            );
            const data = await response.json();

            document.getElementById("rua").value = data.logradouro || "";
            document.getElementById("bairro").value = data.bairro || "";
            document.getElementById("cidade").value = data.localidade || "";
            document.getElementById("UF").value = data.uf || "";
        } catch (error) {
            console.error("Error:", error);
        }
    });

    const btnCadastrar = document.querySelector(".cadastrar");
    const form = document.querySelector(".formulario-contato");

    btnCadastrar.addEventListener("click", async function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const sobrenome = document.getElementById("sobrenome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const cep = document.getElementById("cep").value;
        const rua = document.getElementById("rua").value;
        const numero = document.getElementById("numero").value;
        const complemento = document.getElementById("complemento").value;
        const bairro = document.getElementById("bairro").value;
        const cidade = document.getElementById("cidade").value;
        const UF = document.getElementById("UF").value;
        const anotacoes = document.querySelector(".anotacoes").value;

        const data = {
            nome,
            sobrenome,
            email,
            telefone,
            endereco: {
                cep,
                rua,
                numero,
                complemento,
                bairro,
                cidade,
                UF,
            },
            anotacoes,
        };

        try {
            const response = await fetch("http://localhost:3000/contatos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error("Error:", error);
        }

        form.reset(); // Limpa o formulário após enviar os dados
    });
});
