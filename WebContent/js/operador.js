/* Máscaras ER */
function mascara(o,f){
	v_obj=o
	v_fun=f
	setTimeout("execmascara()",1)
}
function execmascara(){
	v_obj.value=v_fun(v_obj.value)
}
function mtel(v){
	v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
	v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
	v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
	return v;
}
function id( el ){
	return document.getElementById( el );
}
window.onload = function(){
	id('exampleInputFone').onkeyup = function(){
		mascara( this, mtel );
	}
	id('telefone').onkeyup = function(){
		mascara( this, mtel );
	}
}
CARTACEP = new Object();
CARTACEP.usuario = new Object();
CARTACEP.operador = new Object();
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


	CARTACEP.operador.verifyMatricula = function(){
		var errorMessage = "";
		var matricula = true
		var checkMatricula = true;
		var valorBusca = $("#exampleInputMatricula").val();
		var nome =  document.frmCadOp.exampleInputNome.value;
		var expRegNome = new RegExp(/[A-zÀ-ü]{3,}([ ]{1}[A-zÀ-ü]{2,})|([A-zÀ-ü]{3,})+$/);
		if (!expRegNome.test(nome)){
			 errorMessage = "<br />Preencha o campo Nome corretamente.";
			 document.frmCadOp.exampleInputNome.focus()
			        $("#error").html(errorMessage);
		
			return false;
		}else{
			errorMessage = ""
				$("#error").html(errorMessage);
		}
		
		var mat = document.frmCadOp.exampleInputMatricula.value;
		var expRegMat = new RegExp("^[0-9]{6}$");

		if (!expRegMat.test(mat)){
			errorMessage = "<br />Preencha o campo Matricula corretamente com 6 números.";
			document.frmCadOp.exampleInputMatricula.focus()
			 $("#errorMatricula").html(errorMessage);
			return false;
		}else{
			errorMessage = ""
				$("#errorMatricula").html(errorMessage);
		}	
		var sen = document.frmCadOp.exampleInputPassword.value;
		var expRegSen = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);

		if (!expRegSen.test(sen)){
			errorMessage = "<br />Preencha o campo Senha com o mínimo de 6 caracteres com números e letras.";
			document.frmCadOp.exampleInputPassword.focus()
			$("#errorFirstPass").html(errorMessage);
			return false;
		}else{
			errorMessage = ""
				$("#errorFirstPass").html(errorMessage);
		}	
		
		if( document.frmCadOp.exampleInputPasswordRepeat.value!==sen){
			errorMessage = "<br />As senhas têm que ser iguais.";
			$("#errorFirstPass").html(errorMessage);
		}else{
			errorMessage = ""
				$("#errorFirstPass").html(errorMessage);
		}	
			$.ajax({
				type: "GET",
				url: CARTACEP.PATH + "operador/verificarMatricula",
				data: "valorBusca="+valorBusca,
				success: function(listaDeMatriculas){
					listaDeMatriculas = JSON.parse(listaDeMatriculas);
					for(var i=0; i<listaDeMatriculas.length; i++){

						if(listaDeMatriculas[i].matricula!=valorBusca){
						}else{								
							checkMatricula = false;
						}

					}
					if(checkMatricula==true){
						CARTACEP.operador.cadastrar();
					}else{
						document.frmCadOp.exampleInputMatricula.focus()

						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: "Matricula já cadastrada",
						})
					}

				},
				error: function(info){
					Swal.fire("Erro ao consultar o operador: "+info.status+" - "+info.statusText);
				}
			});
	}	

	CARTACEP.operador.cadastrar = function(){

		var passCad = document.frmCadOp.exampleInputPassword.value;
		var emBase64Cad = btoa(passCad);
		var operador = new Object();
		operador.nome = document.frmCadOp.exampleInputNome.value;
		operador.senha = emBase64Cad;
		operador.matricula = document.frmCadOp.exampleInputMatricula.value;
		operador.telefone = null;

		$.ajax({
			type: "POST",
			url: CARTACEP.PATH + "operador/inserir",
			data:JSON.stringify(operador),
			success:function(msg){
				//$('#frmCadOp').trigger("reset")
				document.getElementById("cadOp").reset();
				var b = msg.replace(/['"]+/g, '');
				Swal.fire(b);
				 document.frmCadOp.exampleInputNome.focus()
				CARTACEP.operador.buscar()	
			},
			error:function(info){
				Swal.fire(info);
			}
		});	
	};

	CARTACEP.operador.buscar = function(){
		var valorBusca = "";
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "operador/buscar",
			data: "valorBusca="+valorBusca,
			success: function(dados){

				dados = JSON.parse(dados);

				$("#listaOperadores").html(CARTACEP.operador.exibir(dados));


			},
			error: function(info){
				CARTACEP.exibirAviso("Erro ao consultar os cadastros de operadores: "+info.status+" - "+info.statusText);
			}
		});

		CARTACEP.operador.exibir = function(listaDeOperadores){
			var tabela = 
				"<table class='table align-items-center table-flush'>"+
				"<thead class='thead-light'>"+
				"<tr>"+
				"<th>Nome</th>"+ 
				"<th>Matrícula</th>" +
				
				"<th>Editar</th>"+
				"<th>Senha</th>"+
				"<th>Excluir</th>"+                         
				"</tr>"+
				"</thead>";

			if(listaDeOperadores != undefined && listaDeOperadores.length >0){


				for(var i=0; i<listaDeOperadores.length; i++){

					tabela+=
						"<tbody>"+
						"<tr>"+
						"<td>"+listaDeOperadores[i].nome+"</td>"+
						"<td>"+listaDeOperadores[i].matricula+"</td>"+
						
						"<td><a  data-toggle='modal' data-target='#exampleModal'  onclick=\"CARTACEP.operador.exibirEdicao('"+listaDeOperadores[i].id+"')\" class='btn btn-sm'>"+
						"<i class='fas fa-edit'></i>" +
						"</a></td>"+ 
						"<td><a  data-toggle='modal' data-target='#modalPassword'  onclick=\"CARTACEP.operador.exibEdition('"+listaDeOperadores[i].id+"')\" class='btn btn-sm'>"+
						"<i class='fas fa-key'></i>" +
						"</a></td>"+ 
						"<td><a onclick=\"CARTACEP.operador.excluir('"+listaDeOperadores[i].id+"')\" class='btn btn-sm'>"+
						"<i class='fas fa-trash'></i>"+ 
						"</a></td>" +
						"</tr>"+
						"</tbody>";

				}

			}else if (listaDeOperadores == ""){
				tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
			}
			tabela +="</table>";

			return tabela;
		}
	}
	CARTACEP.operador.buscar();
	
	CARTACEP.operador.buttonEnter = function(){
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("cadOpBtn").click();
		}
	}
	
	
	CARTACEP.operador.exibirEdicao = function(id){
		var errorMessage="";
		$("#errorNameModal").html(errorMessage);
		$("#errorMatriculaModal").html(errorMessage);
		$.ajax({
			type:"GET",
			url: CARTACEP.PATH +"operador/checkId",
			data: "id="+id,
			success: function(operador){
				document.frmEditaOperador.idOperador.value = operador.id;			
				document.frmEditaOperador.operador.value = operador.nome;
				document.frmEditaOperador.matricula.value = operador.matricula;
				document.frmEditaOperador.telefone.value = operador.telefone;
			},
			error: function(info){
				Swal.fire("Erro ao buscar cadastro para edição: "+info.status+" - "+info.statusText);
			}

		});
	}
	
	CARTACEP.operador.editar = function(){		
		var errorMessage="";
		var operador = new Object();
		operador.id = document.frmEditaOperador.idOperador.value;
		operador.nome = document.frmEditaOperador.operador.value;

		var nome =  document.frmEditaOperador.nome.value;
		var expRegNome = new RegExp(/[A-zÀ-ü]{3,}([ ]{1}[A-zÀ-ü]{2,})|([A-zÀ-ü]{3,})+$/);
		if (!expRegNome.test(nome)){
			errorMessage = "<br />Preencha o campo Nome corretamente.";
			 document.frmEditaOperador.nome.focus()
			        $("#errorNameModal").html(errorMessage);
			return false;
		}
		if(expRegNome.test(nome)){
			errorMessage = ""
				$("#errorNameModal").html(errorMessage);
		}
			
		
		
		var mat = document.frmEditaOperador.matricula.value;
		var expRegMat = new RegExp("^[0-9]{6}$");
		if (!expRegMat.test(mat)){
			errorMessage = "<br />Preencha o campo Matricula corretamente com 6 números.";
			        $("#errorMatriculaModal").html(errorMessage);
			

			document.frmEditaOperador.matricula.focus();
			return false;
		}	
		if(expRegMat.test(mat)){
			errorMessage = ""
				$("#errorNameModal").html(errorMessage);
		}

		operador.matricula = document.frmEditaOperador.matricula.value;
		operador.telefone = null;
		$.ajax({
			type:"PUT",
			url: CARTACEP.PATH + "operador/alterar",
			data:JSON.stringify(operador),
			success: function(msg){
				var b=(msg);
				b = msg.replace(/['"]+/g, '');
				Swal.fire(b);
				CARTACEP.operador.buscar();
				jQuery.noConflict();
				$("#exampleModal").modal('hide');
			},
			error: function(info){
				Swal.fire("Erro ao editar cadastro: "+ info.status+" - "+info.statusText);
			}
		});
	};
	CARTACEP.operador.exibEdition= function(id){
		document.frmEditaSenha.idOperador.value = id
	}
	CARTACEP.operador.alterarSenha = function(){
		console.log(document.frmEditaSenha.idOperador.value)
		var operador = new Object();
		operador.id = document.frmEditaSenha.idOperador.value;
		var senha = document.frmEditaSenha.senhaOp.value;
		var senhaRep = document.frmEditaSenha.repeteSenhaOp.value;
		var expRegSenha = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);
		var expRegSenhaRep = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);

		if(!senha==""||!senhaRep==""){
			if(!expRegSenha.test(senha)||!expRegSenhaRep.test(senhaRep)){
				errorMessage = "<br />A senha deve ter letras e números.";
		        $("#errorPassModal").html(errorMessage);

				document.frmEditaOperador.senhaOp.focus();
				return false;
			}
		}
		if(senha==""||senhaRep==""){
			errorMessage = "<br />Preencha todos os campos.";
	        $("#errorPassModal").html(errorMessage);
			
		}else 
			if(senha==senhaRep){
				var pass = senha;
				var emBase64 = btoa(pass);
				operador.senha = emBase64;
				console.log(operador)
				$.ajax({
					type:"PUT",
					url: CARTACEP.PATH + "operador/alterarSenhaOp",
					data:JSON.stringify(operador),
					success: function(msg){

						var b = msg.replace(/['"]+/g, '');
						Swal.fire(b);
						//CARTACEP.operador.buscar();
						jQuery.noConflict();
						$("#modalPassword").modal('hide');
					},
					error: function(info){
						var a="Erro ao editar cadastro: "+ info.status+" - "+info.statusText;
						var b = a.replace(/'/g, '');
						Swal.fire(b);
					}
				})

			}else{
				errorMessage = "<br />A senha deve ser igual!";
		        $("#errorPassModal").html(errorMessage);

			}		
	}
	CARTACEP.operador.excluir = function(id){
		$.ajax({
			type:"DELETE",
			url: CARTACEP.PATH +"operador/excluir/"+id,
			success: function(msg){
				b = msg.replace(/['"]+/g, '');
				Swal.fire(b);
				CARTACEP.operador.buscar();
			},
			error: function(info){
				Swal.fire("Erro ao excluir operador: " + info.status + " - " + info.statusText);
			}
		});
	};

})

