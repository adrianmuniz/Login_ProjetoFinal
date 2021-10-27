function efetuarLogin() {
    var url = "http://localhost:8080/login"

    var usuario = {
        "email": document.getElementById("txtEmail").value,
        "senha": document.getElementById("txtSenha").value
    };

    var request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    }

    fetch(url, request)
        .then(Response => Response.json())
        .then(Response => {
            localStorage.setItem("usuarioLogado", JSON.stringify(Response))
            window.location = "principal.html";
        })
        .catch(err => {
            window.alert("Usuário ou senha inválido")
        });
}

function carregarDadosUsuario() {

    var usuarioLogado = localStorage.getItem("usuarioLogado");
    if(usuarioLogado == null) {
        window.Location = "login.html";
    }
    else {
        var usuarioDes = JSON.parse(usuarioLogado);

        document.getElementById("foto").innerHTML = "<img width='40%' heigth='100%' src=styles/images/" + usuarioDes.foto + ">";

        document.getElementById("dados").innerHTML = "<H3>" + usuarioDes.nome + "</br>" + usuarioDes.email + "</br>" + "ID:" + usuarioDes.id + "<H3>";
    }
}

function novoUsuario() {

    var url = "http://localhost:8080/usuario"

    var usuario = {
        "nome": document.getElementById("txtNome").value,
        "foto": document.getElementById("txtFoto").value,
        "email": document.getElementById("txtEmail").value,
        "senha": document.getElementById("txtSenha").value
    };

    var request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    }

    fetch(url, request)
        .then(Response => Response.json())
        .then(Response => {
            window.alert("Usuario criado com sucesso! ID:" + Response.id);
            window.location = "login.html";
        })
        .catch(err => {
            window.alert("Algo deu errado");
        });
}

function listarUsuario(){
    
    var url = "http://localhost:8080/usuarios"

    var request = {
        method: "GET"
    }

    fetch(url, request)
        .then(Response => Response.json())
        .then(Response => montarTabelaUsuario(Response))
        .catch(err => {
            window.alert("Falha ao carregar usuários");
        });
}

function montarTabelaUsuario(usuarios) {
    var saida = 
    "<table class='table table-striped'> "
    +"<thred>"
    +"<tr scoped='col'>"
        +"<td>ID</td>"
        +"<td>Nome</td>"
        +"<td>Email</td>"
        +"<td>Foto</td>"
    +"</tr>"
    +"<tbody>"
    for(cont=0;cont<usuarios.length;cont++){
        saida += 
        "<tr scoped='row'>"
            +"<td>"+ usuarios[cont].id + "</td>"
            +"<td>"+ usuarios[cont].nome + "</td>"
            +"<td>"+ usuarios[cont].email + "</td>"
            +"<td>"+ usuarios[cont].foto + "</td>"
        +"</tr>"
    }
    +"</tbody>"
    +"</thred>"
    +"</table>";

    document.getElementById("listarUsuario").innerHTML = saida;
}