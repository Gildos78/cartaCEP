CARTACEP = new Object();
CARTACEP.gestor = new Object();
CARTACEP.usuario = new Object();

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
	
	CARTACEP.gestor.verifyEmail = function(){
		var email = true
		var checkEmail = true;
		var valorBusca = $("#exampleInputEmail").val();
		var nome =  document.frmCadGes.exampleInputNome.value;
		var expRegNome = new RegExp(/[A-zÀ-ü]{3,}([ ]{1}[A-zÀ-ü]{2,})|([A-zÀ-ü]{3,})+$/);
			if (!expRegNome.test(nome)){
				Swal.fire('Preencha o campo Nome corretamente.');
				document.frmCadGes.exampleInputNome.focus();
				return false;
			}
			var sen = document.frmCadGes.exampleInputPassword.value;
			var expRegMat = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);
			
			if (!expRegMat.test(sen)){
				Swal.fire("Preencha o campo Senha com o mínimo de 6 caracteres com números e letras..");
				document.frmCadGes.exampleInputPassword.focus();
				return false;
			}	
			/*if(!document.frmCadGes.exampleInputEmail.value==""){
				if(document.frmCadGes.exampleInputEmail.value=="" 
					   || document.forms[0].exampleInputEmail.value.indexOf('@')==-1 
					     || document.forms[0].exampleInputEmail.value.indexOf('.')==-1 )
						{
					Swal.fire( "Por favor, informe um E-MAIL válido!" );
					email=false;
						  return false;
						}
				}*/
			console.log(document.frmCadGes.exampleInputPasswordRepeat.value)
		if( document.frmCadGes.exampleInputPasswordRepeat.value!==sen){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'As senhas têm que ser iguais.'
			})
		}
		if (expRegNome.test(nome)&&expRegMat.test(sen)&&email==true&&document.frmCadGes.exampleInputPasswordRepeat.value==sen){
			$.ajax({
				type: "GET",
				url: CARTACEP.PATH + "usuario/verificarEmail",
				data: "valorBusca="+valorBusca,
				success: function(listaDeEmails){
					listaDeEmails = JSON.parse(listaDeEmails);
					for(var i=0; i<listaDeEmails.length; i++){
						
						if(listaDeEmails[i].email!=valorBusca){
						}else{								
							checkEmail = false;
						}

					}
					if(checkEmail==true){
						CARTACEP.gestor.cadastrar();
					}else{
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: "Email já cadastrado",
						})
					}

				},
				error: function(info){
					Swal.fire("Erro ao consultar o usuário: "+info.status+" - "+info.statusText);
				}
			});
		}	
	}
	
	CARTACEP.gestor.cadastrar = function(){

		var passCad = document.frmCadGes.exampleInputPassword.value;
		var emBase64Cad = btoa(passCad);
		var usuario = new Object();
		usuario.nome = document.frmCadGes.exampleInputNome.value;
		usuario.senha = emBase64Cad;
		usuario.email = document.frmCadGes.exampleInputEmail.value;
				
				$.ajax({
					type: "POST",
					url: CARTACEP.PATH + "usuario/inserir",
					data:JSON.stringify(usuario),
					success:function(msg){
						  //$('#frmSignIn').trigger("reset")
						  document.getElementById("cadGes").reset();
						  CARTACEP.gestor.buscar();
						var b = msg.replace(/['"]+/g, '');
					Swal.fire(b);
					}
				});	
	};
	
	CARTACEP.gestor.buscar = function(){
		var valorBusca = "";
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "usuario/buscar",
			data: "valorBusca="+valorBusca,
			success: function(dados){

				dados = JSON.parse(dados);

				$("#listaGestores").html(CARTACEP.gestor.exibir(dados));


			},
			error: function(info){
				CARTACEP.exibirAviso("Erro ao consultar os cadastros de gestores: "+info.status+" - "+info.statusText);
			}
		});

		CARTACEP.gestor.exibir = function(listaDeGestores){
			var tabela = 
				"<table class='table align-items-center table-flush'>"+
                    "<thead class='thead-light'>"+
                      "<tr>"+
                       "<th>Nome</th>"+ 
                       "<th>Email</th>" +
                       "<th>Editar</th>"+
                       "<th>Excluir</th>"+                         
                      "</tr>"+
                    "</thead>";

			if(listaDeGestores != undefined && listaDeGestores.length >0){


				for(var i=0; i<listaDeGestores.length; i++){

					tabela+=
						"<tbody>"+
						   "<tr>"+
                        "<td>"+listaDeGestores[i].nome+"</td>"+
                        "<td>"+listaDeGestores[i].email+"</td>"+
                       "<td><a  data-toggle='modal' data-target='#exampleModal'  onclick=\"CARTACEP.gestor.exibirEdicao('"+listaDeGestores[i].id+"')\" class='btn btn-sm'>"+
                         "<i class='fas fa-edit'></i>" +
                       "</a></td>"+ 
                        "<td><a onclick=\"CARTACEP.gestor.excluir('"+listaDeGestores[i].id+"')\" class='btn btn-sm'>"+
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
	CARTACEP.gestor.buscar();
	CARTACEP.gestor.exibirEdicao = function(id){
		$.ajax({
			type:"GET",
			url: CARTACEP.PATH +"usuario/checkId",
			data: "id="+id,
			success: function(gestor){
				console.log(gestor)
					document.frmEditaGestor.idGestor.value = gestor.id;			
					document.frmEditaGestor.gestor.value = gestor.nome;
					document.frmEditaGestor.email.value = gestor.email;
			},
			error: function(info){
				Swal.fire("Erro ao buscar cadastro para edição: "+info.status+" - "+info.statusText);
			}

		});
	}
	
	CARTACEP.gestor.editar = function(){		
		var gestor = new Object();
		gestor.id = document.frmEditaGestor.idGestor.value;
		gestor.nome = document.frmEditaGestor.gestor.value;
		gestor.email = document.frmEditaGestor.email.value;
		$.ajax({
			type:"PUT",
			url: CARTACEP.PATH + "usuario/alterarPerfil",
			data:JSON.stringify(gestor),
			success: function(msg){
				var b=(msg);
				b = msg.replace(/['"]+/g, '');
				Swal.fire(b);
				CARTACEP.gestor.buscar();
				jQuery.noConflict();
				$("#exampleModal").modal('hide');
			},
			error: function(info){
				Swal.fire("Erro ao editar cadastro: "+ info.status+" - "+info.statusText);
			}
		});
	};
	
	CARTACEP.gestor.excluir = function(id){
		$.ajax({
			type:"DELETE",
			url: CARTACEP.PATH +"usuario/excluir/"+id,
			success: function(msg){
				b = msg.replace(/['"]+/g, '');
				Swal.fire(b);
				CARTACEP.gestor.buscar();
			},
			error: function(info){
				Swal.fire("Erro ao excluir gestor: " + info.status + " - " + info.statusText);
			}
		});
	};
	//Envia os arquivos para o back end
	CARTACEP.gestor.upload = function(newUpload, selectFileName) {

		//Caso o usuario escolha nao renomear o arquivo
		if (newUpload == null) {

			//Captura o nome do arquivo escolhido
			var selectFileName = $('#exampleInputFoto').val();
		};

		//Verifica se algum arquivo foi escolhido
		if (selectFileName == "") {

			$("#alertaErro").html("Você não selecionou um arquivo!");
			$("#modalErro").modal('show');

		} else {

			//Verifica se o objeto está nulo, caso sim captura os dados para upload
			if (newUpload == null) {

				//Cria um objeto para um novo upload				
				var newUpload = new FormData();

				//Adiciona o novo video no objeto
				newUpload.append('file', $('#exampleInputFoto')[0].files[0]);

			};

			$.ajax({

				url: CARTACEP.PATH + "usuario/foto",
				type: "POST",
				data: newUpload,
				contentType: false,
				processData: false,
				success: function(sucesso) {

					$("#alertaSucesso").html(sucesso);
					$("#modalSucesso").modal('show');

					//Limpa o form após o upload
					document.getElementById("exampleInputFoto").reset();

				},

				error: function(error) {

					//Limpa o form após o upload
					document.getElementById("exampleInputFoto").reset();

					$("#alertaErro").html(Object.values(error));
					$("#modalErro").modal('show');

				},
			});
		}
	}

})
	
	