CARTACEP = new Object;
CARTACEP.usuario = new Object;
CARTACEP.amostra = new Object;
$(document).ready (function(){
	CARTACEP.PATH = "/CartaCEP/rest/"

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



	CARTACEP.usuario.exibProfile = function(){
		var email = sessionStorage.getItem('email');
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "usuario/getProfile",
			data: "email="+email,
			success: function(usuario){

				document.frmProfile.nomePerfil.value = usuario.nome;			
				document.frmProfile.emailPerfil.value = usuario.email;
				document.frmEditaUsuario.idUsuario.value = usuario.id;

			},
			error: function(info){
				var a="Erro ao consultar os cadastros de usuário: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');
				Swal.fire(b);
			}
		})
	}
	CARTACEP.usuario.exibProfile();
	CARTACEP.usuario.editProfile = function(){
		var usuario = new Object();
		usuario.id = document.frmEditaUsuario.idUsuario.value;
		usuario.nome=document.frmProfile.nomePerfil.value;			
		usuario.email=document.frmProfile.emailPerfil.value;

		$.ajax({
			type:"PUT",
			url: CARTACEP.PATH + "usuario/alterarPerfil",
			data:JSON.stringify(usuario),
			success: function(msg){
				var b=(msg);
				b = msg.replace(/['"]+/g, '');
				Swal.fire(b);
				CARTACEP.usuario.exibProfile();

			},
			error: function(info){
				var a="Erro ao editar cadastro: "+ info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');
				Swal.fire(b);
			}
		})
	}
	CARTACEP.usuario.passwordProfile = function(){
		var usuario = new Object();
		usuario.id = document.frmEditaUsuario.idUsuario.value;
		var senha = document.frmEditaUsuario.senhaPerfil.value;
		var senhaRep = document.frmEditaUsuario.repeteSenhaPerfil.value;
		var expRegSenha = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);
		var expRegSenhaRep = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);

		if(!senha==""||!senhaRep==""){
			if(!expRegSenha.test(senha)||!expRegSenhaRep.test(senhaRep)){
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'A senha deve ter letras e números!',
				})


				document.frmProfile.senhaPerfil.focus();
				return false;
			}
		}
		if(senha==""||senhaRep==""){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Preencha todos os campos!',
			})
		}else 
			if(senha==senhaRep){
				var pass = senha;
				var emBase64 = btoa(pass);
				usuario.senha = emBase64;
				$.ajax({
					type:"PUT",
					url: CARTACEP.PATH + "usuario/alterarSenhaPerfil",
					data:JSON.stringify(usuario),
					success: function(msg){

						var b = msg.replace(/['"]+/g, '');
						Swal.fire(b);
						CARTACEP.usuario.exibProfile();
						$("#modalPassword").modal('hide');
					},
					error: function(info){
						var a="Erro ao editar cadastro: "+ info.status+" - "+info.statusText;
						var b = a.replace(/'/g, '');
						Swal.fire(b);
					}
				})

			}else{
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'A senha deve ser igual!',
				})

			}		
	}
	//Declara o objeto que vai receber o arquivo
	var newUploadRename = null;

	//****************************************************************************************

	//Inicia função que faz o nome do arquivo escolhido ser exibido após a seleção para upload
	bsCustomFileInput.init();

	//****************************************************************************************

	//Função para permitir renomear o arquivo
	CARTACEP.amostra.uploadRename = function() {

		//Verifica se algum arquivo foi selecionado
		var selectFileRename = $('#video').val();

		if (selectFileRename == "") {

			//	$("#alertaErro").html("Você não selecionou um arquivo!");

			//$("#modalErro").modal('show');

		} else {

//			//Cria o objeto para enviar o video e o nome do arquivo
			//newUploadRename = new FormData();

//			//Adiciona o arquivo ao objeto
			//newUploadRename.append('file', $('#video')[0].files[0]);

//			//Captura o nome do arquivo
			//var fileName = $('#video')[0].files[0].name;

//			//Adiciona o nome atual ao input para o usuario editar
			//document.getElementById("renameUpload").value = fileName;

			//Exibe a modal para o usuario colocar o novo nome
//			$("#modalRename").modal('show');
//			alert("show")
			//Ativa o focus no input para renomear
//			$('#modalRename').on('shown.bs.modal', function() {
			$('#renameUpload').focus();
//			})
		}
	};

	//Captura o novo nome e adiciona no objeto e chama função para enviar ao back end
	$("#loginBtn1").click(function() {

		//Cria o objeto para enviar o video e o nome do arquivo
		newUploadRename = new FormData();

		//Adiciona o arquivo ao objeto
		newUploadRename.append('file', $('#video')[0].files[0]);

		//Captura o nome do arquivo
		var fileName = $('#video')[0].files[0].name;

		//Adiciona o nome atual ao input para o usuario editar
		document.getElementById("renameUpload").value = fileName;

		//Salva o novo nome em uma variavel

		var random = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 15);
		var newFileName = random
		console.log(random)
		//Verifica se o usuário digitou um nome
		if (newFileName == "") {

			//$("#alertaErro").html("Nome inválido!");
			//$("#modalErro").modal('show');

		} else {

			//Adiciona o novo nome ao objeto
			newUploadRename.append('rename', newFileName);

			//Chama a função para enviar os dados para o banco
			CARTACEP.amostra.upload(newUploadRename, newFileName);
		}
	});

	//****************************************************************************************

	//Limpa o input quando a modal de rename é fechada
//	$('#modalRename').on('hidden.bs.modal', function() {

//	document.getElementById("renomear").reset();

//	});

	//****************************************************************************************

	//Envia os arquivos para o back end
	CARTACEP.amostra.upload = function(newUpload, selectFileName) {
		//Caso o usuario escolha nao renomear o arquivo
		if (newUpload == null) {

			//Captura o nome do arquivo escolhido
			var selectFileName = $('#video').val();
		};

		//Verifica se algum arquivo foi escolhido
		if (selectFileName == "") {

			$("#alertaErro").html("Você não selecionou um arquivo!");
			//$("#modalErro").modal('show');

		} else {

			//Verifica se o objeto está nulo, caso sim captura os dados para upload
			if (newUpload == null) {

				//Cria um objeto para um novo upload				
				var newUpload = new FormData();

				//Adiciona o novo video no objeto
				newUpload.append('file', $('#video')[0].files[0]);

			}

			$.ajax({

				url:  CARTACEP.PATH +"amostra/uploadVideo",
				type: "POST",
				data: newUpload,
				contentType: false,
				processData: false,
				success: function(sucesso) {

					CARTACEP.usuario.updatePic(selectFileName)
					//	$("#alertaSucesso").html(sucesso);
					//	$("#modalSucesso").modal('show');

					//Limpa o form após o upload
					document.getElementById("frmEsp").reset();
					$("#modalPicture").modal('hide');
				},

				error: function(error) {

					//Limpa o form após o upload
					document.getElementById("frmEsp").reset();

					//	$("#alertaErro").html(Object.values(error));
					//	$("#modalErro").modal('show');

				},
			});


		}
	}

	//****************************************************************************************

	//Limpa o form se a modal for fechada antes de fazer upload
//	$('#modalUploadVideo').on('hidden.bs.modal', function() {

//	document.getElementById("addProducao").reset();

//	});

	//****************************************************************************************

	CARTACEP.usuario.updatePic = function(selectFileName){
		var usuario = new Object();
		usuario.id = document.frmEditaUsuario.idUsuario.value;
		usuario.imagemNome=selectFileName	
		$.ajax({
			type:"PUT",
			url: CARTACEP.PATH + "usuario/updatePic",
			data:JSON.stringify(usuario),
			success: function(msg){
				var b=(msg);
				b = msg.replace(/['"]+/g, '');
				Swal.fire(b);
				window.location.href = "perfil.html"

			},
			error: function(info){
				var a="Erro ao editar cadastro: "+ info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');
				Swal.fire(b);
			}
		})
	}

})