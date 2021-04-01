$(document).ready(function() {

	CARTACEP= new Object();
	CARTACEP.amostra = new Object();
	CARTACEP.PATH = "/CartaCEP/rest/"
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
//
//			//Adiciona o arquivo ao objeto
			//newUploadRename.append('file', $('#video')[0].files[0]);
//
//			//Captura o nome do arquivo
			//var fileName = $('#video')[0].files[0].name;
//
//			//Adiciona o nome atual ao input para o usuario editar
			//document.getElementById("renameUpload").value = fileName;

			//Exibe a modal para o usuario colocar o novo nome
//			$("#modalRename").modal('show');
alert("show")
			//Ativa o focus no input para renomear
//			$('#modalRename').on('shown.bs.modal', function() {
				$('#renameUpload').focus();
//			})
		}
	};

	//Captura o novo nome e adiciona no objeto e chama função para enviar ao back end
	$("#loginBtn").click(function() {
		
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
	$('#modalRename').on('hidden.bs.modal', function() {

		document.getElementById("renomear").reset();

	});

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

			};

			$.ajax({

				url:  CARTACEP.PATH +"amostra/uploadVideo",
				type: "POST",
				data: newUpload,
				contentType: false,
				processData: false,
				success: function(sucesso) {

				//	$("#alertaSucesso").html(sucesso);
				//	$("#modalSucesso").modal('show');

					//Limpa o form após o upload
					document.getElementById("uploadVideo").reset();

				},

				error: function(error) {

					//Limpa o form após o upload
					document.getElementById("uploadVideo").reset();

				//	$("#alertaErro").html(Object.values(error));
				//	$("#modalErro").modal('show');

				},
			});
		}
	}

	//****************************************************************************************

	//Limpa o form se a modal for fechada antes de fazer upload
	$('#modalUploadVideo').on('hidden.bs.modal', function() {

		document.getElementById("uploadVideo").reset();

	});

	//****************************************************************************************
});