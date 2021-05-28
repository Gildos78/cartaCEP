

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
	window.setTimeout('CARTACEP.usuario.getProfile()', 300);
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
					
					CARTACEP.leitura.buscarProducao()
					
				},
				error: function(info){
					var a="Erro ao consultar os cadastros de producao: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');
					Swal.fire(b);
				}
			});
	}
	
	window.setTimeout('CARTACEP.leitura.buscar()', 200);
	
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
		var listCount = 0;
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
				if(listaDeProducoes[i].statusFull==false){
					listCount += 1
		}
			}
			
			
			
			for(var i=0; i<listaDeProducoes.length; i++){
			
				
					if(listaDeProducoes[i].statusFull==false){
					emptyList=false
					
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
	
				}//acaba o if statusFull==false
			}

		}else if (listaDeProducoes == ""){

			tabela += "<tr><td colspan='11'>Nenhum registro encontrado</td></tr>";
		}
		//console.log(listaDeProducoes.length+"/"+listCount)
		if(listCount==0){
			
			tabela += "<tr><td colspan='11'>Todas as medições estão completas</td></tr>";
		}
		tabela +="</tbody></table>";
	
		return tabela;

	}


	window.setTimeout('CARTACEP.leitura.buscar()', 200);
	CARTACEP.leitura.keepIdProd = function(code){
		var idProd = code
		sessionStorage.setItem('code', idProd);
		window.location.href = "amostras.html";
	}
})