function criarProvedora() {
    var url = "http://localhost:8080/novaprovedora";

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

function filtrarProvedora() {
    var url = "http://localhost:8080/provedoras/search";

    var nome = document.getElementById("txtNome").value;
    var dataInicio = document.getElementById("txtDataFundacaoInicio").value;
    var dataFim = document.getElementById("txtDataFundacaoFim").value;

    if(nome == ""){
        var filtroProvedora = {
            "dataInicio": dataInicio,
            "dataFim": dataFim
        }
        
        var request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filtroProvedora)
        }

        fetch(url, request)
            .then(Response => Response.json())
            .then(Response => montarTabelaProvedora(Response))
            .catch(err => {
                window.alert("Algo deu errado");
        });
    }
    else{
        var filtroProvedora = {
            "dataInicio": dataInicio,
            "dataFim": dataFim,
            "nome": nome
        }
        
        var request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filtroProvedora)
        }

        fetch(url, request)
            .then(Response => Response.json())
            .then(Response => montarTabelaProvedora(Response))
            .catch(err => {
                window.alert("Algo deu errado");
        });
    }
}

function montarTabelaProvedora(provedoras) {
    var saida = 
    "<table class='table table-striped'> "
    +"<thred>"
    +"<tr scoped='col'>"
        +"<td>ID</td>"
        +"<td>Nome</td>"
        +"<td>Site</td>"
        +"<td>Fundacao</td>"
    +"</tr>"
    +"<tbody>"
    for(cont=0;cont<provedoras.length;cont++){
        saida += 
        "<tr scoped='row'>"
            +"<td>"+ provedoras[cont].id + "</td>"
            +"<td>"+ provedoras[cont].nome + "</td>"
            +"<td>"+ provedoras[cont].site + "</td>"
            +"<td>"+ provedoras[cont].fundacao + "</td>"
        +"</tr>"
    }
    +"</tbody>"
    +"</thred>"
    +"</table>";

    document.getElementById("listarprovedoras").innerHTML = saida;
}