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
	window.setTimeout('CARTACEP.usuario.getProfile()', 300);
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

	//**************//
	//Busca os dados das ordens de produção cadastradas
	CARTACEP.leitura.buscar = function(){

		var valorBusca = ""
			$.ajax({
				type: "GET",
				url: CARTACEP.PATH + "producao/buscarProducao",
				data: "valorBusca="+valorBusca,
				success: function(dados){
					dados = JSON.parse(dados);
					CARTACEP.leitura.buscarProducao();
					
					
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
					$("#listaOrdensRelatorios").html(CARTACEP.leitura.exibir(dados));
				},
				error: function(info){
					var a="Erro ao consultar os cadastros de producao: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');
					Swal.fire(b);
				}
			});
	}
	
	//*************//
	CARTACEP.leitura.exibir = function(listaDeProducoes){
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
		
				//if(listaDeProducoes[i].statusFull==false){
					var colorBox = "success"
					var totalOverall =  listaDeProducoes[i].numAmostras*listaDeProducoes[i].subgrupo*listaDeProducoes[i].totalEsp
					console.log(listaDeProducoes[i].numAmostras+"/"+listaDeProducoes[i].subgrupo+"/"+listaDeProducoes[i].totalEsp)
					console.log("Total "+totalOverall+"/"+listaDeProducoes[i].contagemAtual)
					if(listaDeProducoes[i].contagemAtual==0){
						colorBox = "danger"
					}
					if(listaDeProducoes[i].contagemAtual<totalOverall&&listaDeProducoes[i].contagemAtual>0){
						colorBox = "warning"
					}
					if(listaDeProducoes[i].contagemAtual==totalOverall){
						colorBox = "success"
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
			//}

		}else if (listaDeProducoes == ""){

			tabela += "<tr><td colspan='11'>Nenhum registro encontrado</td></tr>";
		}
		tabela +="</tbody></table>";

		return tabela;

	}
	CARTACEP.leitura.buscar()
	CARTACEP.leitura.keepIdProd = function(code){
		var idProd = code
		sessionStorage.setItem('code', idProd);
		window.location.href = "cep.html";
	}
})