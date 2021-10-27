function criarSerie() {
    var url = "http://localhost:8080/novaserie";

    var serie = {
        "titulo": document.getElementById("txtTitulo").value,
        "genero": document.getElementById("txtGenero").value,
        "sinopse": document.getElementById("txtSinopse").value,
        "lancamento": document.getElementById("chkLancamento").checked,
        "provedora": {
            "id": document.getElementById("ddlProvedora").value
        }
    };

    var request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(serie)
    }

    fetch(url, request)
        .then(Response => Response.json())
        .then(Response => {
            window.alert("Serie criada com sucesso! ID:" + Response.id);
            window.location = "principal.html";
        })
        .catch(err => {
            window.alert("Algo deu errado");
        });
}

function popularComboProvedora(){
    var url = "http://localhost:8080/provedoras";

    var request = {
        method: "GET"
    }

    fetch(url, request)
        .then(Response => Response.json())
        .then(Response => montarComboProvedora(Response))
        .catch(err => {
            window.alert("Falha ao carregar provedoras");
        });
}

function montarComboProvedora(provedoras){
    var saida = "";

    for(cont =0; cont < provedoras.length; cont++){
        saida += "<option value='" + provedoras[cont].id + "'>" +
            provedoras[cont].nome + " || " +
            provedoras[cont].site +
            "</option>";
    }

    document.getElementById("ddlProvedora").innerHTML = saida;
}

function listarSeries(){
    var url = "http://localhost:8080/series";


    var request = {
        method: "GET"
    }

    fetch(url, request)
        .then(response => response.json())
        .then(response => montarTabelaSeries(response))
        .catch(err => {
            window.alert("Falha ao carregar series");
        });
}

function montarTabelaSeries(series){
    var saida = 
    "<table class='table table-striped'> " 
    + "<thred>"
    + "<tr scoped='col'>"
        + "<td>Título</td>"
        + "<td>Genero</td>"
        + "<td>Lancamento</td>"
        + "<td>Ação</td>"
    + "</tr>"
    + "<tbody>"
    for(cont=0;cont<series.length;cont++){
        saida += 
        "<tr scoped='row'>"
            + "<td>" + series[cont].titulo + "</td>"
            + "<td>" + series[cont].genero + "</td>"
            + "<td>" + series[cont].lancamento + "</td>"
            + "<td>" + "<button type='button' class='btn btn-danger'"  
                     + "onclick='excluirSerie(" +  series[cont].id + ")')>" 
                     + "Excluir"
                     + "</button>" + "</td>"
        + "</tr>"
    }
    + "</tbody>"
    + "</thred>"
    +"</table>";

    document.getElementById("listarserie").innerHTML = saida;
}

function excluirSerie(id){

    var resposta = window.confirm("Deseja mesmo excluir a série ?");

    if(resposta == false){
        return;
    }
    
    var url = "http://localhost:8080/serie/" + id;
    var request = {
        method: "DELETE"
    }

    fetch(url, request)
        .then(response => response.json())
        .then(response => 
            listarSeries()
        )
        .catch(err => {
            window.alert("Falha ao excluir série");
        });
}