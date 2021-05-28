CARTACEP= new Object();
CARTACEP.producao = new Object();
CARTACEP.usuario = new Object();
CARTACEP.amostra = new Object();
var idPes
var codigoP
$(document).ready(function(){

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

	CARTACEP.producao.formatDate = function(input) {
		var datePart = input.match(/\d+/g),
		ano = datePart[0].substring(0), //0 = 4 digitos e 2 = 2 digitos
		mes = datePart[1], 
		dia = datePart[2], 
		hora = datePart[3], 
		minuto = datePart[4]
		segundo = datePart[5];

		return dia+'/'+mes+'/'+ano+' '+hora+':'+minuto+':'+segundo;
	}

	CARTACEP.producao.carregaMaquina = function(id){

		if(id!=undefined){
			selectM = "#selMaquinaEdicao";
		}else{
			selectM = "#selMaquina";
		}

		$.ajax({
			type:"GET",
			url: CARTACEP.PATH + "cadMaquina/buscarSelM",
			success:function(maquinas){

				if(maquinas!=""){
					$(selectM).html("");
					var option = document.createElement("option");
					option.setAttribute ("value","");
					option.innerHTML = ("Escolha");
					$(selectM).append(option);

					for (var i=0;i<maquinas.length;i++){
						var option = document.createElement("option");
						option.setAttribute ("value",maquinas[i].id);

						if((id!=undefined)&&(id==maquinas[i].id))
							option.setAttribute ("selected", "selected");

						option.innerHTML = (maquinas[i].nome);
						$(selectM).append(option);

					}
				}else{

					$(selectM).html("");
					var option = document.createElement("option");
					option.setAttribute ("value","");
					$(selectM).append(option);
					$(selectM).addClass("aviso");

				}


			},
			error:function(info){
				Swal.fire("Erro ao buscar as maquinas: "+info.status+" - "+info.statusText);
				$(selectM).html(".");
				var option = document.createElement("option");
				option.setAttribute ("value","");
				option.innerHTML = ("Erro ao carregar maquinas!");
				$(selectM).append(option);
				$(selectM).addClass("aviso");
			}
		});
	}
	CARTACEP.producao.carregaMaquina();
	CARTACEP.producao.carregaOperacao = function(id){

		if(id!=undefined){
			select = "#selOperacao";
		}else{
			select = "#selOperacao";
		}

		$.ajax({
			type:"GET",
			url: CARTACEP.PATH + "cadOperacao/buscarSel",
			success:function(operacoes){

				if(operacoes!=""){
					$(select).html("");
					var option = document.createElement("option");
					option.setAttribute ("value","");
					option.innerHTML = ("Escolha");
					$(select).append(option);

					for (var i=0;i<operacoes.length;i++){
						var option = document.createElement("option");
						option.setAttribute ("value",operacoes[i].id);

						if((id!=undefined)&&(id==operacoes[i].id))
							option.setAttribute ("selected", "selected");

						option.innerHTML = (operacoes[i].nome);
						$(select).append(option);

					}
				}else{

					$(select).html("");
					var option = document.createElement("option");
					option.setAttribute ("value","");
					$(select).append(option);
					$(select).addClass("aviso");

				}


			},
			error:function(info){
				Swal.fire("Erro ao buscar as operacoes: "+info.status+" - "+info.statusText);
				$(select).html("");
				var option = document.createElement("option");
				option.setAttribute ("value","");
				option.innerHTML = ("Erro ao carregar operacoes!");
				$(select).append(option);
				$(select).addClass("aviso");
			}
		});
	}
	CARTACEP.producao.carregaOperacao();

	CARTACEP.producao.oP = function(){
		var numAl = Math.floor(Math.random() * 1000000);
		document.getElementById('ordemP').value = numAl;
		document.getElementById('codeProd').value = numAl;
	}
	CARTACEP.producao.oP();
	CARTACEP.producao.carregaOperador = function(id){

		if(id!=undefined){
			selectOperador = "#selOperadorEdicao";
		}else{
			selectOperador = "#selOperador";
		}

		$.ajax({
			type:"GET",
			url: CARTACEP.PATH + "operador/buscarSelOperador",
			success:function(maquinas){

				if(maquinas!=""){
					$(selectOperador).html("");
					var option = document.createElement("option");
					option.setAttribute ("value","");
					option.innerHTML = ("Escolha");
					$(selectOperador).append(option);

					for (var i=0;i<maquinas.length;i++){
						var option = document.createElement("option");
						option.setAttribute ("value",maquinas[i].id);

						if((id!=undefined)&&(id==maquinas[i].id))
							option.setAttribute ("selected", "selected");

						option.innerHTML = (maquinas[i].nome);
						$(selectOperador).append(option);

					}
				}else{

					$(selectOperador).html("");
					var option = document.createElement("option");
					option.setAttribute ("value","");
					$(selectOperador).append(option);
					$(selectOperador).addClass("aviso");

				}


			},
			error:function(info){
				Swal.fire("Erro ao buscar as maquinas: "+info.status+" - "+info.statusText);
				$(selectOperador).html(".");
				var option = document.createElement("option");
				option.setAttribute ("value","");
				option.innerHTML = ("Erro ao carregar maquinas!");
				$(selectOperador).append(option);
				$(selectOperador).addClass("aviso");
			}
		});
	}
	CARTACEP.producao.carregaOperador();

	CARTACEP.producao.getTotalEsp = function(){
		var code =	document.frmEspecificacoes.codeProd.value;
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "producao/getTotalEsp",
			data: "code="+code,
			success: function(data){
				console.log(data.totalEsp)
				if(data.totalEsp==0){
					Swal.fire({
						icon: 'error',
						title: 'Atenção',
						text: 'Cadastro incompleto.'
					})	
				}else{
					CARTACEP.producao.cadastrarOrdem(data)

				}
			},
			error: function(info){
				var a="Erro ao consultar os cadastros de producao: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');
				Swal.fire(b);
			}
		});

	}


	CARTACEP.producao.adicionar = function(selectFileName){

		var especificacao = new Object();
		especificacao.codeProd = document.frmEspecificacoes.codeProd.value;
		especificacao.descricao =document.frmEspecificacoes.descricaoEsp.value
		especificacao.espMin = document.frmEspecificacoes.espMin.value
		especificacao.espMax = document.frmEspecificacoes.espMax.value
		especificacao.imagemNome = selectFileName

		$.ajax({
			type: "POST",
			url: CARTACEP.PATH + "especificacao/inserir",
			data:JSON.stringify(especificacao),
			success:function(msg){
				$("#frmEsp").trigger("reset");
//				var b = msg.replace(/['"]+/g, '');
//				Swal.fire(b);
				console.log(msg)
				CARTACEP.producao.buscarEsp();
			},
			error:function(info){
				var erro = "Erro ao cadastrar uma nova maquina: "+ info.status + " - "+ info.statusText;
				var b = erro.replace(/['"]+/g, '');
				Swal.fire(b);	
			}
		});	

	}
	CARTACEP.producao.buscarEsp = function(){
		var valorBusca = document.frmEspecificacoes.codeProd.value;
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "especificacao/buscar",
			data: "valorBusca="+valorBusca,
			success: function(dados){

				dados = JSON.parse(dados);

				$("#listaEspecificacoes").html(CARTACEP.producao.exibirEsp(dados));


			},
			error: function(info){
				CARTACEP.exibirAviso("Erro ao consultar os cadastros de operação: "+info.status+" - "+info.statusText);
			}
		});

		CARTACEP.producao.exibirEsp = function(listaDeEspecificacoes){
			var tabela = 
				"<table class='table align-items-center table-flush'>"+
				"<thead class='thead-light'>"+
				"<tr>"+
				"<th>#</th>"+ 
				"<th>Descrição</th>" +
				"<th>Espec. Mínima</th>"+
				"<th>Espec. Máxima</th>"+        
				"<th>Apagar</th>"+
				"</tr>"+
				"</thead>";

			if(listaDeEspecificacoes != undefined && listaDeEspecificacoes.length >0){


				for(var i=0; i<listaDeEspecificacoes.length; i++){
					tabela+=
						"<tbody>"+
						"<tr>"+
						"<td>"+(i+1)+"</td>"+
						"<td>"+listaDeEspecificacoes[i].descricao+"</td>"+
						"<td>"+listaDeEspecificacoes[i].espMin+"</td>"+
						"<td>"+listaDeEspecificacoes[i].espMax+"</td>"+
						"<td><a onclick=\"CARTACEP.producao.excluirEsp('"+listaDeEspecificacoes[i].id+"')\" class='btn btn-sm'>"+
						"<i class='fas fa-trash'></i>"+ 
						"</a></td>" +
						"</tr>"+
						"</tbody>";

				}

			}else if (listaDeEspecificacoes == ""){

				tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
			}
			tabela +="</table>";
			return tabela;
		}
	}
	CARTACEP.producao.buscarEsp();
	CARTACEP.producao.buscarEspValidar = function(){
		var valorBusca = document.frmEspecificacoes.codeProd.value;
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "especificacao/buscar",
			data: "valorBusca="+valorBusca,
			success: function(dados){

				dados = JSON.parse(dados);
				if(dados==""){
					Swal.fire({
						icon: 'error',
						title: 'Atenção',
						text: 'Precisa de preencher o campo das especificações.'
					})
				}else{
					CARTACEP.producao.cadastrarOrdem()
				}

			},
			error: function(info){
				CARTACEP.exibirAviso("Erro ao consultar os cadastros de operação: "+info.status+" - "+info.statusText);
			}
		});
	}
	CARTACEP.producao.buttonEnterProd = function(){
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("loginBtn").click();
		}
	}
	CARTACEP.producao.buttonEnter = function(){
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("loginBtnEnd").click();
		}
	}
	CARTACEP.producao.excluirEsp = function(id){
		$.ajax({
			type:"DELETE",
			url: CARTACEP.PATH +"especificacao/excluir/"+id,
			success: function(msg){
				b = msg.replace(/['"]+/g, '');
				Swal.fire(b);
				CARTACEP.producao.buscarEsp();
			},
			error: function(info){
				Swal.fire("Erro ao excluir operação: " + info.status + " - " + info.statusText);
			}
		});
	}
	CARTACEP.producao.cadastrarOrdem = function(data){

		cliente = document.frmOrdemProd.cliente.value;
		dataInicio = document.frmOrdemProd.dataI.value;
		dataFinal = document.frmOrdemProd.dataF.value;
		descricao = document.frmOrdemProd.descricao.value;
		numAmostras = document.frmOrdemProd.qtdAmostras.value;
		operacaoId = document.frmOrdemProd.operacaoId.value;
		maquinaId = document.frmOrdemProd.maquinaId.value;


		if(cliente==""||dataInicio==""||dataFinal==""||descricao==""||numAmostras==""||operacaoId==""||maquinaId==""){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Preencha todos os campos.'
			})
		}else{

			var producao = new Object();
			producao.codigo = document.frmOrdemProd.ordemP.value;
			producao.cliente = document.frmOrdemProd.cliente.value;
			producao.dataInicio = document.frmOrdemProd.dataI.value;
			producao.dataFinal = document.frmOrdemProd.dataF.value;
			producao.descricao = document.frmOrdemProd.descricao.value;
			producao.numAmostras = document.frmOrdemProd.qtdAmostras.value;
			producao.operacaoId = document.frmOrdemProd.operacaoId.value;
			producao.maquinaId = document.frmOrdemProd.maquinaId.value;
			producao.codeRefEsp =  document.frmEspecificacoes.codeProd.value;
			producao.totalEsp = data.totalEsp
			$.ajax({
				type: "POST",
				url: CARTACEP.PATH + "producao/inserir",
				data:JSON.stringify(producao),
				success:function(msg){
					CARTACEP.producao.cadastrarSub();
					$("#addProducao").trigger("reset");
					var b = msg.replace(/['"]+/g, '');
					Swal.fire(b);
					CARTACEP.producao.oP();
					CARTACEP.producao.buscarEsp();
				},
				error:function(info){
					var erro = "Erro ao cadastrar uma nova maquina: "+ info.status + " - "+ info.statusText;
					var b = erro.replace(/['"]+/g, '');
					Swal.fire(b);	
				}
			});	
		}
	}
	CARTACEP.producao.cadastrarSub = function(){
		var producao = new Object();
		producao.codeRefEsp =  document.frmEspecificacoes.codeProd.value;
		producao.subgrupo = document.frmOrdemProd.subgrupo.value;
		$.ajax({
			type: "POST",
			url: CARTACEP.PATH + "producao/inserirSub",
			data:JSON.stringify(producao),
			success:function(msg){
				console.log(msg)		
				CARTACEP.producao.buscar();
			},
			error:function(info){
				var erro = "Erro ao cadastrar uma nova maquina: "+ info.status + " - "+ info.statusText;
				var b = erro.replace(/['"]+/g, '');
				Swal.fire(b);	
			}
		});		
	}



	CARTACEP.producao.buscar = function(){

		var valorBusca = ""
			$.ajax({
				type: "GET",
				url: CARTACEP.PATH + "producao/buscar",
				data: "valorBusca="+valorBusca,
				success: function(dados){
					dados = JSON.parse(dados);

					$("#listaOrdens").html(CARTACEP.producao.exibir(dados));


				},
				error: function(info){
					var a="Erro ao consultar os cadastros de producao: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');
					Swal.fire(b);
				}
			});
		CARTACEP.producao.exibir = function(listaDeProducoes){
			var tabela = 
				"<table class='table align-items-center table-flush table-hover'>"+
				"<thead class='thead-light'>"+
				"<tr>"+
				"<th>#</th>"+
				"<th>Cliente</th>"+
				"<th>Data Inicio</th>"+
				"<th>Data Fim</th>"+
				"<th>Descrição</th>"+
				"<th>Espec. Min</th>"+
				"<th>Espec. Máx</th>"+
				"<th>Amostras (Grupo)</th>"+
				"<th>Máquina</th>"+
				"<th>Operação</th>"+
				"<th></th>"+

				"</tr>"+
				"</thead>"+
				"<tbody>";

			if(listaDeProducoes != undefined && listaDeProducoes.length >0){


				for(var i=0; i<listaDeProducoes.length; i++){

					tabela+=
						"<tr>"+
						"<td><a href='#' class='badge badge-success p-2'>"+listaDeProducoes[i].codigo+"</a></td>"+
						"<td>"+listaDeProducoes[i].cliente+"</td>"+
						"<td>"+CARTACEP.producao.formatDate(listaDeProducoes[i].dataInicio)+"</td>"+
						"<td>"+CARTACEP.producao.formatDate(listaDeProducoes[i].dataFinal)+"</td>"+
						"<td>"+listaDeProducoes[i].descricao+"</td>"+
						"<td>"+listaDeProducoes[i].espMin+"</td>"+
						"<td>"+listaDeProducoes[i].espMax+"</td>"+
						"<td>"+listaDeProducoes[i].numAmostras+"("+listaDeProducoes[i].subgrupo+")"+"</td>"+
						"<td>"+listaDeProducoes[i].maquinaId+"</td>"+
						"<td>"+listaDeProducoes[i].operacao+"</td>"+

						"<td><a onclick='CARTACEP.producao.getMeasureId("+listaDeProducoes[i].codeRefEsp+")' class='btn btn-danger btn-sm'> <i class='fas fa-trash' id='loginBtn'></i></a></td>"+
						"</tr>";


				}

			}else if (listaDeProducoes == ""){

				tabela += "<tr><td colspan='11'>Nenhum registro encontrado</td></tr>";
			}
			tabela +="</tbody></table>";

			return tabela;

		}
	}
	CARTACEP.producao.buscar();
	CARTACEP.producao.getMeasureId = function(code){
		var idMed = 0
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "medicao/getMeasureId",
			data: "code="+code,
			success: function(dados){
				dados = JSON.parse(dados);
				console.log(dados)
				for(var i=0; i<dados.length; i++){
					idMed=dados[i].idEsp
				}
				
				if(idMed==""){
					CARTACEP.producao.deleteProducao(code)
				}else{
					CARTACEP.amostra.deleteMed(idMed)
					CARTACEP.producao.deleteProducao(code)
				}
			},
			error: function(info){
				var a="Erro ao consultar os cadastros de producao: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');
				Swal.fire(b);
			}
		});

	}
	CARTACEP.producao.deleteProducao = function(code){
		CARTACEP.producao.deleteEspTotal(code)
		CARTACEP.producao.deleteSub(code)

		$.ajax({
			type:"DELETE",
			url: CARTACEP.PATH +"producao/excluir/"+code,
			success: function(msg){

				var b = msg.replace(/['"]+/g, '');
				Swal.fire(b);
				CARTACEP.producao.buscar();
			},
			error: function(info){
				var erro="Erro ao excluir producao: " + info.status + " - " + info.statusText;
				var b = erro.replace(/['"]+/g, '');
				Swal.fire(b);
			}
		})
	}
	CARTACEP.producao.deleteSub = function(code){

		$.ajax({
			type:"DELETE",
			url: CARTACEP.PATH +"producao/excluirSub/"+code,
			success: function(msg){

				var b = msg.replace(/['"]+/g, '');
				console.log(b);
			},
			error: function(info){
				console.log("Erro ao excluir producao: " + info.status + " - " + info.statusText)
//				var b = erro.replace(/['"]+/g, '');
//				Swal.fire(b);
			}
		})
	}
	CARTACEP.producao.deleteEspTotal = function(code){

		$.ajax({
			type:"DELETE",
			url: CARTACEP.PATH +"producao/excluirEspTotal/"+code,
			success: function(msg){

				var b = msg.replace(/['"]+/g, '');
				console.log(b);
			},
			error: function(info){
				console.log("Erro ao excluir producao: " + info.status + " - " + info.statusText)
//				var b = erro.replace(/['"]+/g, '');
//				Swal.fire(b);
			}
		})
	}
	//Declara o objeto que vai receber o arquivo
	var newUploadRename = null;

	//****************************************************************************************

	//Inicia função que faz o nome do arquivo escolhido ser exibido após a seleção para upload
	bsCustomFileInput.init();

	//****************************************************************************************

	//Função para permitir renomear o arquivo
	CARTACEP.amostra.uploadRename = function() {

		var fieldFoto = document.getElementById("video").value
		if(fieldFoto==""){
			console.log("Vazio")
			var selectFileName = null
			CARTACEP.producao.adicionar(selectFileName)
		}
		else{

			//Verifica se algum arquivo foi selecionado
			var selectFileRename = $('#video').val();

			if (selectFileRename == "") {

				//	$("#alertaErro").html("Você não selecionou um arquivo!");

				//$("#modalErro").modal('show');

			} else {

//				//Cria o objeto para enviar o video e o nome do arquivo
				//newUploadRename = new FormData();

//				//Adiciona o arquivo ao objeto
				//newUploadRename.append('file', $('#video')[0].files[0]);

//				//Captura o nome do arquivo
				//var fileName = $('#video')[0].files[0].name;

//				//Adiciona o nome atual ao input para o usuario editar
				//document.getElementById("renameUpload").value = fileName;

				//Exibe a modal para o usuario colocar o novo nome
//				$("#modalRename").modal('show');
//				alert("show")
				//Ativa o focus no input para renomear
//				$('#modalRename').on('shown.bs.modal', function() {
				$('#renameUpload').focus();
//				})
			}
		}
	};

	//Captura o novo nome e adiciona no objeto e chama função para enviar ao back end
	$("#loginBtn").click(function() {
		var fieldFoto = document.getElementById("video").value
		if(fieldFoto==""){
			console.log("Vazio")
		}
		else{
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
			descricao = document.frmEspecificacoes.descricaoEsp.value;
			espMin = document.frmEspecificacoes.espMin.value;
			espMax = document.frmEspecificacoes.espMax.value;
			if(descricao==""||espMin==""||espMin==""){
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Preencha todos os campos.'
				})
			}else{
				$.ajax({

					url:  CARTACEP.PATH +"amostra/uploadVideo",
					type: "POST",
					data: newUpload,
					contentType: false,
					processData: false,
					success: function(sucesso) {

						CARTACEP.producao.adicionar(selectFileName)
						//	$("#alertaSucesso").html(sucesso);
						//	$("#modalSucesso").modal('show');

						//Limpa o form após o upload
						//document.getElementById("addProducao").reset();

					},

					error: function(error) {

						//Limpa o form após o upload
						//document.getElementById("addProducao").reset();

						//	$("#alertaErro").html(Object.values(error));
						//	$("#modalErro").modal('show');

					},
				});
			}

		}
	}

	//****************************************************************************************

	//Limpa o form se a modal for fechada antes de fazer upload
//	$('#modalUploadVideo').on('hidden.bs.modal', function() {

//	document.getElementById("addProducao").reset();

//	});

	//****************************************************************************************

	CARTACEP.amostra.deleteMed = function(idMed){

		$.ajax({
			type:"DELETE",
			url: CARTACEP.PATH +"medicao/excluirMedEsp/"+idMed,
			success: function(msg){
				b = msg.replace(/['"]+/g, '');
				console.log(b);
				CARTACEP.amostra.deleteSub(idMed)
			},
			error: function(info){
				console.log("Erro ao excluir operação: " + info.status + " - " + info.statusText);
			}
		});
	}
	CARTACEP.amostra.deleteSub = function(idMed){
		$.ajax({
			type:"DELETE",
			url: CARTACEP.PATH +"subgrupo/excluirSubEsp/"+idMed,
			success: function(msg){
				b = msg.replace(/['"]+/g, '');
				console.log(b);
			},
			error: function(info){
				console.log("Erro ao excluir operação: " + info.status + " - " + info.statusText);
			}
		});
	}
})