CARTACEP = new Object();
CARTACEP.usuario = new Object();
CARTACEP.cadOperacao = new Object();

$(document).ready (function(){

	CARTACEP.PATH = "/CartaCEP/rest/";
	
	CARTACEP.cadOperacao.buttonEnter = function(){
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("loginBtnEnd").click();
		}
	}
	
	CARTACEP.cadOperacao.cadastrar = function(){
		var cadOperacao = new Object();
		cadOperacao.nome = document.frmAddCadOperacao.exampleInputEmail1.value;

		$.ajax({
			type: "POST",
			url: CARTACEP.PATH + "cadOperacao/inserir",
			data:JSON.stringify(cadOperacao),
			success:function(msg){
				var b=(msg);
				b = msg.replace(/['"]+/g, '');
				Swal.fire(b);
				$("#addCadOperacao").trigger("reset");
			
				CARTACEP.cadOperacao.buscar();
			},
			error:function(info){
				Swal.fire("Erro ao cadastrar uma nova operação: "+ info.status + " - "+ info.statusText);	
			}
		});	
	};
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
	CARTACEP.cadOperacao.buscar = function(){
		var valorBusca = "";
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "cadOperacao/buscar",
			data: "valorBusca="+valorBusca,
			success: function(dados){

				dados = JSON.parse(dados);

				$("#listaCadOperacoes").html(CARTACEP.cadOperacao.exibir(dados));


			},
			error: function(info){
				CARTACEP.exibirAviso("Erro ao consultar os cadastros de operação: "+info.status+" - "+info.statusText);
			}
		});

		CARTACEP.cadOperacao.exibir = function(listaDeCadOperacoes){
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

			if(listaDeCadOperacoes != undefined && listaDeCadOperacoes.length >0){


				for(var i=0; i<listaDeCadOperacoes.length; i++){

					tabela+=
						"<tbody>"+
						   "<tr>"+
                        "<td>"+(i+1)+"</td>"+
                        "<td>"+listaDeCadOperacoes[i].nome+"</td>"+
                       "<td><a  data-toggle='modal' data-target='#exampleModal'  onclick=\"CARTACEP.cadOperacao.exibirEdicao('"+listaDeCadOperacoes[i].id+"')\" class='btn btn-sm'>"+
                         "<i class='fas fa-edit'></i>" +
                       "</a></td>"+ 
                        "<td><a onclick=\"CARTACEP.cadOperacao.excluir('"+listaDeCadOperacoes[i].id+"')\" class='btn btn-sm'>"+
                         "<i class='fas fa-trash'></i>"+ 
                       "</a></td>" +
                       "</tr>"+
                       "</tbody>";

				}

			}else if (listaDeCadOperacoes == ""){
				tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
			}
			tabela +="</table>";

			return tabela;
		}
	}
	CARTACEP.cadOperacao.buscar();
	
	
	
	CARTACEP.cadOperacao.exibirEdicao = function(id){
		$.ajax({
			type:"GET",
			url: CARTACEP.PATH +"cadOperacao/checkId",
			data: "id="+id,
			success: function(cadOperacao){
				
					document.frmEditaOperacao.idOperacao.value=cadOperacao.id;			
					document.frmEditaOperacao.operacao.value = cadOperacao.nome;
			},
			error: function(info){
				Swal.fire("Erro ao buscar cadastro para edição: "+info.status+" - "+info.statusText);
			}

		});
	}
	
	CARTACEP.cadOperacao.editar = function(){		
		var cadOperacao = new Object();
		cadOperacao.id=document.frmEditaOperacao.idOperacao.value ;
		cadOperacao.nome=document.frmEditaOperacao.operacao.value;
		$.ajax({
			type:"PUT",
			url: CARTACEP.PATH + "cadOperacao/alterar",
			data:JSON.stringify(cadOperacao),
			success: function(msg){
				var b=(msg);
				b = msg.replace(/['"]+/g, '');
				Swal.fire(b);
				CARTACEP.cadOperacao.buscar();
				$("#exampleModal").modal('hide');
			},
			error: function(info){
				Swal.fire("Erro ao editar cadastro: "+ info.status+" - "+info.statusText);
			}
		});
	};
	CARTACEP.cadOperacao.excluir = function(id){
		$.ajax({
			type:"DELETE",
			url: CARTACEP.PATH +"cadOperacao/excluir/"+id,
			success: function(msg){
				b = msg.replace(/['"]+/g, '');
				Swal.fire(b);
				CARTACEP.cadOperacao.buscar();
			},
			error: function(info){
				Swal.fire("Erro ao excluir operação: " + info.status + " - " + info.statusText);
			}
		});
	};
})
