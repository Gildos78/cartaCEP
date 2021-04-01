CARTACEP= new Object();
CARTACEP.leitura = new Object();
CARTACEP.usuario = new Object();

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
	CARTACEP.usuario.getProfile();
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
	

	CARTACEP.leitura.buscar = function(){

		var valorBusca = ""
			$.ajax({
				type: "GET",
				url: CARTACEP.PATH + "producao/buscarProducao",
				data: "valorBusca="+valorBusca,
				success: function(dados){
					dados = JSON.parse(dados);
					CARTACEP.leitura.getTotalSamples(dados)	
					$("#listaOrdens").html(CARTACEP.leitura.exibir(dados));
				},
				error: function(info){
					var a="Erro ao consultar os cadastros de producao: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');
					Swal.fire(b);
				}
			});
	}
	CARTACEP.leitura.getTotalSamples = function(listaDeProducoes){

		for(var i=0;i<listaDeProducoes.length;i++){
			var code = listaDeProducoes[i].codeRefEsp
			$.ajax({
				type: "GET",
				url: CARTACEP.PATH + "producao/getTotalSamples",
				data: "code="+code,
				success: function(producao){
					var totalOverall = (producao.numAmostras*producao.subgrupo)*producao.totalEsp
					var boolFull = false;
					
					if(producao.totalAmostras>=totalOverall){
						boolFull = true
						CARTACEP.leitura.changeStatusFull(producao, boolFull)
					}else{
					
						CARTACEP.leitura.changeStatusFull(producao, boolFull)
					}
					$("#listaOrdens").html(CARTACEP.leitura.exibir(listaDeProducoes));
				},
				error: function(info){
					var a="Erro ao consultar os cadastros de producao: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');
					Swal.fire(b);
				}
			});
		}
	}
	CARTACEP.leitura.changeStatusFull = function (oldProducao, boolFull){
		var producao= new Object()
		producao.statusFull = boolFull
		producao.codeRefEsp = oldProducao.codeRefEsp
		producao.contagemAtual = oldProducao.totalAmostras
		$.ajax({
			type:"PUT",
			url: CARTACEP.PATH + "producao/changeStatusFull",
			data:JSON.stringify(producao),
			success: function(msg){
				console.log(msg);
			},
			error: function(info){
				console.log("Erro ao editar cadastro: "+ info.status+" - "+info.statusText);
			}
		})
	}


	CARTACEP.leitura.exibir = function(listaDeProducoes){
		var emptyList = 0;
		console.log(listaDeProducoes)
		var tabela = 
			"<table class='table align-items-center table-flush table-hover'>"+
			"<thead class='thead-light'>"+
			"<tr>"+
			"<th>#</th>"+
			"<th>Cliente</th>"+
			"<th>Data Inicio</th>"+
			"<th>Data Fim</th>"+
			"<th>Descrição</th>"+
			"<th>Amostras (Grupo)</th>"+
			"<th>Máquina</th>"+
			"<th>Operação</th>"+
			"</tr>"+
			"</thead>"+
			"<tbody>";
		
		

		if(listaDeProducoes != undefined && listaDeProducoes.length >0){
			for(var i=0; i<listaDeProducoes.length; i++){
		
				if(listaDeProducoes[i].statusFull==true){
					emptyList += 1
					console.log(emptyList)
					console.log(listaDeProducoes.length)
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