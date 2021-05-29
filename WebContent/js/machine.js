CARTACEP = new Object();
CARTACEP.usuario = new Object;
CARTACEP.cadMaquina = new Object();

$(document).ready (function(){

	CARTACEP.PATH = "/CartaCEP/rest/";
	CARTACEP.usuario.getProfile = function(){
		var email = sessionStorage.getItem('email');
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "usuario/checkEmail",
			data: "email="+email,
			success: function(usuario){
				$("#idProfile").html(usuario.nome);
				var nome = usuario.nome
				if(usuario.imagemNome==undefined){
					var intials =nome.charAt(0);
					$('#profileImage').text(intials);	
				}else{
					$('#profileImage').html("<img src='../imgs/"+usuario.imagemNome+".png' alt='Avatar' class='avatarImagePro'>");
				}

			},
			error: function(info){
				var a="Erro ao consultar os cadastros de usuário: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');
				Swal.fire(b);
			}
		})
	}
	window.setTimeout('CARTACEP.usuario.getProfile()', 300);

	CARTACEP.cadMaquina.cadastrar = function(){
		var cadMaquina = new Object();
		cadMaquina.nome = document.frmAddCadOperacao.maquina.value;

		$.ajax({
			type: "POST",
			url: CARTACEP.PATH + "cadMaquina/inserir",
			data:JSON.stringify(cadMaquina),
			success:function(msg){
				var b=(msg);
				b = msg.replace(/['"]+/g, '');
				Swal.fire(b);
				$("#addCadMaquina").trigger("reset");
				CARTACEP.cadMaquina.buscar();
			},
			error:function(info){
				Swal.fire("Erro ao cadastrar uma nova maquina: "+ info.status + " - "+ info.statusText);	
			}
		});	
	}
	
	CARTACEP.cadMaquina.buscar = function(){
		var valorBusca = "";
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "cadMaquina/buscar",
			data: "valorBusca="+valorBusca,
			success: function(dados){

				dados = JSON.parse(dados);

				$("#listaCadMaquinas").html(CARTACEP.cadMaquina.exibir(dados));


			},
			error: function(info){
				CARTACEP.exibirAviso("Erro ao consultar os cadastros de operação: "+info.status+" - "+info.statusText);
			}
		});

		CARTACEP.cadMaquina.exibir = function(listaDeCadMaquinas){
			var tabela = 
				"<table class='table align-items-center table-flush'>"+
                    "<thead class='thead-light'>"+
                      "<tr>"+
                       "<th>#</th>"+ 
                       "<th>Nome</th>" +
                        "<th>Editar</th>"+
                       "<th>Excluir</th>"+                         
                      "</tr>"+
                    "</thead>";

			if(listaDeCadMaquinas != undefined && listaDeCadMaquinas.length >0){


				for(var i=0; i<listaDeCadMaquinas.length; i++){

					tabela+=
						"<tbody>"+
						   "<tr>"+
                        "<td>"+(i+1)+"</td>"+
                        "<td>"+listaDeCadMaquinas[i].nome+"</td>"+
                       "<td><a  data-toggle='modal' data-target='#exampleModal'  onclick=\"CARTACEP.cadMaquina.exibirEdicao('"+listaDeCadMaquinas[i].id+"')\" class='btn btn-sm'>"+
                         "<i class='fas fa-edit'></i>" +
                       "</a></td>"+ 
                        "<td><a onclick=\"CARTACEP.cadMaquina.excluir('"+listaDeCadMaquinas[i].id+"')\" class='btn btn-sm'>"+
                         "<i class='fas fa-trash'></i>"+ 
                       "</a></td>" +
                       "</tr>"+
                       "</tbody>";

				}

			}else if (listaDeCadMaquinas == ""){
				tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
			}
			tabela +="</table>";

			return tabela;
		}
	}
	CARTACEP.cadMaquina.buscar();
	
	CARTACEP.cadMaquina.buttonEnter = function(){
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("loginBtnEnd").click();
		}
	}
	CARTACEP.cadMaquina.exibirEdicao = function(id){
		$.ajax({
			type:"GET",
			url: CARTACEP.PATH +"cadMaquina/checkId",
			data: "id="+id,
			success: function(cadMaquina){
				console.log(cadMaquina)
					document.frmEditaMaquina.idMaquina.value=cadMaquina.id;			
					document.frmEditaMaquina.maquina.value = cadMaquina.nome;
			},
			error: function(info){
				Swal.fire("Erro ao buscar cadastro para edição: "+info.status+" - "+info.statusText);
			}

		});
	}
	
	CARTACEP.cadMaquina.editar = function(){		
		var cadMaquina = new Object();
		cadMaquina.id=document.frmEditaMaquina.idMaquina.value ;
		cadMaquina.nome=document.frmEditaMaquina.maquina.value;
		$.ajax({
			type:"PUT",
			url: CARTACEP.PATH + "cadMaquina/alterar",
			data:JSON.stringify(cadMaquina),
			success: function(msg){
				var b=(msg);
				b = msg.replace(/['"]+/g, '');
				Swal.fire(b);
				CARTACEP.cadMaquina.buscar();
				$("#exampleModal").modal('hide');
			},
			error: function(info){
				Swal.fire("Erro ao editar cadastro: "+ info.status+" - "+info.statusText);
			}
		});
	};
	CARTACEP.cadMaquina.excluir = function(id){
		$.ajax({
			type:"DELETE",
			url: CARTACEP.PATH +"cadMaquina/excluir/"+id,
			success: function(msg){
				b = msg.replace(/['"]+/g, '');
				Swal.fire(b);
				CARTACEP.cadMaquina.buscar();
			},
			error: function(info){
				Swal.fire("Erro ao excluir operação: " + info.status + " - " + info.statusText);
			}
		});
	};
})