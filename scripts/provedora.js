function criarProvedora() {
    var url = "http://localhost:8080/provedora";

    var provedora = {
        "nome": document.getElementById("txtNome").value,
        "site": document.getElementById("txtSite").value,
        "fundacao": document.getElementById("txtDataFundacao").value
    };

    var request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(provedora)
    }

    fetch(url, request)
        .then(Response => Response.json())
        .then(Response => {
            window.alert("Provedora criada com sucesso! ID:" + Response.id);
            window.location = "principal.html";
        })
        .catch(err => {
            window.alert("Algo deu errado");
        });
}