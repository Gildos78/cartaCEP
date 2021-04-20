

CARTACEP= new Object();
CARTACEP.leitura = new Object();
CARTACEP.usuario = new Object();

$(document).ready(function(){

	CARTACEP.PATH = "/CartaCEP/rest/"
//Busca os dados com base no email e mostra o avatar
		CARTACEP.usuario.getProfile = function(){
		var email = sessionStorage.getItem('email');
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "usuario/checkEmail",
			data: "email="+email,
			success: function(usuario){
				$("#idProfile").html(usuario.nome);
				var nome = usuario.nome
				//Se não tiver imagem cadastrada, ou seja null, mostra a inicial dos nomes cadastrados
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
	CARTACEP.usuario.getProfile();
	//Formatação das datas
	CARTACEP.leitura.formatDate = function(input) {
		var datePart = input.match(/\d+/g),
		ano = datePart[0].substring(0), //0 = 4 digitos e 2 = 2 digitos
		mes = datePart[1], 
		dia = datePart[2], 
		hora = datePart[3], 
		minuto = datePart[4]
		segundo = datePart[5];

		return dia+'/'+mes+'/'+ano+' '+hora+':'+minuto+':'+segundo;
	}
	
//Busca os dados das ordens de produção cadastradas
	CARTACEP.leitura.buscar = function(){

		var valorBusca = ""
			$.ajax({
				type: "GET",
				url: CARTACEP.PATH + "producao/buscarProducao",
				data: "valorBusca="+valorBusca,
				success: function(dados){
					dados = JSON.parse(dados);
					if(dados.length==0){
						CARTACEP.leitura.buscarProducao()
					}else{
						//Passa os dados para a função getProductSamples
						CARTACEP.leitura.getProductSamples(dados)
					}
					
					
				},
				error: function(info){
					var a="Erro ao consultar os cadastros de producao: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');
					Swal.fire(b);
				}
			});
	}
	
	CARTACEP.leitura.buscar()
//Faz uma nova busca 
	CARTACEP.leitura.getProductSamples = function(listaDeProducoes){

		for(var i=0;i<listaDeProducoes.length;i++){
			var code = listaDeProducoes[i].codeRefEsp
			//Busca pelo code em cada loop pois para cada code, tem os dados necessários para estabelecer se atingiu o limite
			$.ajax({
				type: "GET",
				url: CARTACEP.PATH + "producao/getTotalTeste",
				data: "code="+code,
				success: function(dados){
					dados = JSON.parse(dados);
				
					//Passa os dados coletados, assim como a listaDeProducoes capturado antes no CARTACEP.leitura.buscar e code.
					//Os coletados passam a ser listaAmostrasProd para poder estabelecer um var boolean,
					//sendo falso se a contagem for 0 ou dentro do limite, e true se for igual ao limite;
					//A listaAmostrasProd também é usado para fazer a contagem de acordo com o length da lista;
					//A listaDeProducoes será usada na função CARTACEP.leitura.exibir;
					//O code é passado na função changeStatusFull, junto com a contagem e o boolean
					CARTACEP.leitura.getTotalSampless(dados, code)

				},
				error: function(info){
					var a="Erro ao consultar os cadastros de producao: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');
					Swal.fire(b);
				}
			});
		}
	}
	CARTACEP.leitura.getTotalSampless = function(listaAmostrasProd, code){
		
		var totalAmostras = 0
	
		//Estabelece a contagem com base no length.
		var contAtual = listaAmostrasProd.length
		for(var i=0;i<listaAmostrasProd.length;i++){
			//Define o total de amostras com os dados passados na função getProductSamples dentro de um 'for';
			totalAmostras = (listaAmostrasProd[i].Amostras*listaAmostrasProd[i].Especificacoes)*listaAmostrasProd[i].Subgrupo
			
		}
		var boolFull = false;
		if(listaAmostrasProd.length==0){
			//se a lista estiver vazia ele redefine o boolean como falso e contagem como zero
			boolFull = false;
			contAtual=0
		}
		
		
		if(contAtual>=totalAmostras&&!contAtual==0){
			//Se a contagem não estiver vazia ou maior/igual ao total de amostras, 
			//define o boolean como true e passa a contagem, boolean, code e listaDeProducoes
			boolFull = true
			CARTACEP.leitura.changeStatusFull(contAtual, boolFull, code)
		}else{
			//Senão redefine como false passa a contagem, boolean, code e listaDeProducoes
			boolFull = false
			CARTACEP.leitura.changeStatusFull(contAtual, boolFull, code)
		}
		
	}
	

	
	//Função que atualiza a tabela produção nas colunas contagemAtual e boolStatus, onde o codigo seja = a code
	CARTACEP.leitura.changeStatusFull = function (contAtual, boolFull, code){
	//	console.log(contAtual+"/"+boolFull+"/"+code)

		var producao= new Object()
		producao.statusFull = boolFull
		producao.codeRefEsp = code
		producao.contagemAtual = contAtual
		$.ajax({
			type:"PUT",
			url: CARTACEP.PATH + "producao/changeStatusFull",
			data:JSON.stringify(producao),
			success: function(msg){
				console.log(msg);
				CARTACEP.leitura.buscarProducao()

			},
			error: function(info){
				console.log("Erro ao editar cadastro: "+ info.status+" - "+info.statusText);
			}
		})
	}
	CARTACEP.leitura.buscarProducao = function(){
		var valorBusca = ""
			$.ajax({
				type: "GET",
				url: CARTACEP.PATH + "producao/buscarProducao",
				data: "valorBusca="+valorBusca,
				success: function(dados){
					dados = JSON.parse(dados);
					$("#listaOrdens").html(CARTACEP.leitura.exibir(dados));
				},
				error: function(info){
					var a="Erro ao consultar os cadastros de producao: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');
					Swal.fire(b);
				}
			});
	}
	CARTACEP.leitura.exibir = function(listaDeProducoes){
		var emptyList = 0;
		var tabela = 
			"<table class='table align-items-center table-flush table-hover'>"+
			"<thead class='thead-light'>"+
			"<tr>"+
			"<th>#</th>"+
			"<th>Cliente</th>"+
			"<th>Data Inicio</th>"+
			"<th>Data Fim</th>"+
			"<th>Descrição</th>"+
			"<th>Amostras (Subgrupo)</th>"+
			"<th>Máquina</th>"+
			"<th>Operação</th>"+
			"</tr>"+
			"</thead>"+
			"<tbody>";
		
		

		if(listaDeProducoes != undefined && listaDeProducoes.length >0){
			for(var i=0; i<listaDeProducoes.length; i++){
			
				if(listaDeProducoes[i].statusFull==true){
					emptyList += 1
					
				}
				
				if(listaDeProducoes[i].statusFull==false){
					var colorBox = "success"
			
					var totalOverall =  (listaDeProducoes[i].numAmostras*listaDeProducoes[i].subgrupo)*listaDeProducoes[i].totalEsp
					if(listaDeProducoes[i].contagemAtual==0){
						colorBox = "danger"
							
					}
					if(listaDeProducoes[i].contagemAtual>0&&listaDeProducoes[i].contagemAtual<(totalOverall*0.6)){
						colorBox = "warning"
							
					}
			
					tabela+=
						"<tr >"+
						"<td><a onclick='CARTACEP.leitura.keepIdProd("+listaDeProducoes[i].codeRefEsp+")' class='badge badge-"+colorBox+" p-2' id='loginBtn'>"+listaDeProducoes[i].codigo+"</a></td>"+
						"<td>"+listaDeProducoes[i].cliente+"</td>"+
						"<td>"+CARTACEP.leitura.formatDate(listaDeProducoes[i].dataInicio)+"</td>"+
						"<td>"+CARTACEP.leitura.formatDate(listaDeProducoes[i].dataFinal)+"</td>"+
						"<td>"+listaDeProducoes[i].descricao+"</td>"+
						"<td>"+listaDeProducoes[i].numAmostras+"("+listaDeProducoes[i].subgrupo+")"+"</td>"+
						"<td>"+listaDeProducoes[i].maquinaId+"</td>"+
						"<td>"+listaDeProducoes[i].operacao+"</td>"+
						"</tr>";
	
				}
			}

		}else if (listaDeProducoes == ""){

			tabela += "<tr><td colspan='11'>Nenhum registro encontrado</td></tr>";
		}
		if(emptyList==listaDeProducoes.length&&!emptyList==0){
			
			tabela += "<tr><td colspan='11'>Todas as medições estão completas</td></tr>";
		}
		tabela +="</tbody></table>";
	
		return tabela;

	}


	CARTACEP.leitura.buscar();
	CARTACEP.leitura.keepIdProd = function(code){
		var idProd = code
		sessionStorage.setItem('code', idProd);
		window.location.href = "amostras.html";
	}
})