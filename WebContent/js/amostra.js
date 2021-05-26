CARTACEP= new Object();
CARTACEP.amostra = new Object();
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
	CARTACEP.amostra.formatDate = function(input) {
		var datePart = input.match(/\d+/g),
		ano = datePart[0].substring(0), //0 = 4 digitos e 2 = 2 digitos
		mes = datePart[1], 
		dia = datePart[2], 
		hora = datePart[3], 
		minuto = datePart[4]
		segundo = datePart[5];

		return dia+'/'+mes+'/'+ano+' '+hora+':'+minuto+':'+segundo;
	}
	CARTACEP.amostra.getProdInd = function(){
		var code = sessionStorage.getItem('code');
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "producao/getProdInd",
			data: "code="+code,
			success: function(producao){
				$("#listaOrdemP").html(CARTACEP.amostra.exibir(producao));
			},
			error: function(info){
				var a="Erro ao consultar os cadastros de usuário: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');
				Swal.fire(b);
			}
		})
		CARTACEP.amostra.exibir = function(producao){

			document.getElementById("qtdAmostras").value = producao.numAmostras
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
				"<tbody>"+	
				"<tr >"+
				"<td><a >"+producao.codigo+"</a></td>"+
				"<td>"+producao.cliente+"</td>"+
				"<td>"+CARTACEP.amostra.formatDate(producao.dataInicio)+"</td>"+
				"<td>"+CARTACEP.amostra.formatDate(producao.dataFinal)+"</td>"+
				"<td>"+producao.descricao+"</td>"+
				"<td>"+producao.numAmostras+"("+producao.subgrupo+")"+"</td>"+
				"<td>"+producao.maquina+"</td>"+
				"<td>"+producao.operacao+"</td>"+
				"</tr>"+	
				"</tbody></table>";

			return tabela;

		}
	}
	CARTACEP.amostra.getProdInd();
	CARTACEP.amostra.getSample = function(){
		var code = sessionStorage.getItem('code');
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "especificacao/getSample",
			data: "code="+code,
			success: function(dados){
				dados = JSON.parse(dados);

				$("#listaAmostras").html(CARTACEP.amostra.exibirAmostras(dados));
			},
			error: function(info){
				var a="Erro ao consultar os cadastros de usuário: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');
				console.log(b);
			}
		})

	}

	CARTACEP.amostra.exibirAmostras = function(listaDeAmostras){

		if(listaDeAmostras != undefined && listaDeAmostras.length >0){
			var tabela = "<tr >";
			for(var i=0; i<listaDeAmostras.length; i++){

				tabela+=
					//	" <div class='col-xl-4 col-md-6 mb-4'>"+
					"<div>"+

					"<td class='cardShift'><a onclick=\"CARTACEP.amostra.getSub('"+listaDeAmostras[i].id+"'), openButton(event, 'openPage')\"  id='cardLines'>  "+
					" <div class='card h-100'>"+  
					" <div class='card-body'>"+
					" <div class='row align-items-center'>"+
					" <div class='col mr-2'>"+
					"  <div class='text-lg font-weight-bold text-uppercase mb-1'>"+listaDeAmostras[i].descricao+"</div>"+
					" <div class='mt-2 mb-0 text-muted text-xs'>"+
					" <span class='text-danger mr-2'><i class='fa fa-arrow-up'></i> "+listaDeAmostras[i].espMax+" - Limite Superior</span>"+
					"</div>"+
					"<div class='mt-2 mb-0 text-muted text-xs'>"+
					" <span class='text-danger mr-2'><i class='fa fa-arrow-down'></i> "+listaDeAmostras[i].espMin+" - Limite Inferior</span>"+
					" </div> </div>  "+
					"   <div class='col-auto'>";

				if(listaDeAmostras[i].imagem==undefined){
					tabela+="<i class='fas fa-box fa-2x text-info'></i>";
				}else{
					tabela+="<img src='../imgs/"+listaDeAmostras[i].imagem+".png' alt='Avatar' class='avatarImage'>";
				}				
				tabela+=	" </div> </div></div> </a></td></div>";

			}
			tabela +=//"</div>";
				"</tr>";

			return tabela;
		}
	}
	CARTACEP.amostra.getSample()

	CARTACEP.amostra.limitMeasure = function(id){
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "producao/limitMeasure",
			data: "id="+id,
			success: function(limite){
				var totalFilled = limite.subgrupo*limite.numAmostras
				if(totalFilled==limite.totalEsp){
					Swal.fire({
						text: 'Atingiu o limite de medições.',
						icon: 'error',
						confirmButtonColor: '#3085d6',
						confirmButtonText: 'OK'
					}).then((result) => {
						if (result.isConfirmed) {
							window.location.href = "amostras.html";
						}
					})	
				}else{
					CARTACEP.amostra.getSub(id)
				}
			},
			error: function(info){
				var a="Erro ao consultar os cadastros de usuário: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');
				console.log(b);
			}
		})
	}


	CARTACEP.amostra.getSub = function(id){
		document.getElementById("idEsp").value = id
		CARTACEP.amostra.getCountEsp(id)
		CARTACEP.amostra.buscarMed(id)
		var code = sessionStorage.getItem('code');
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "producao/getSubNumber",
			data: "code="+code,
			success: function(subgrupo, code){
				document.getElementById("idSub").value = subgrupo.idSub
				$("#itemSample").html(CARTACEP.amostra.itensSub(subgrupo));
			},
			error: function(info){
				var a="Erro ao consultar os cadastros de usuário: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');
				console.log(b);
			}
		})
	}

	CARTACEP.amostra.itensSub = function(subgrupo){

		document.getElementById("quantidadeSub").value = subgrupo.subgrupo
		var tabela=""
			for(var i=0; i<subgrupo.subgrupo; i++){


				tabela +="<div class='form-group'>"+
				"<label for='exampleInputEmail1'>Valor - Item "+(i+1)+"</label>" +
				"<input  type='number' class='form-control form-control-sm' id='testeValue"+i+"' name='testeValue' onkeyup='CARTACEP.amostra.buttonEnter()' aria-describedby='emailHelp' placeholder='Valor Item "+(i+1)+"'>"+												
				"</div>";
				q=i+1
			}


		return tabela;
	}


	CARTACEP.amostra.getCountEsp = function(id){

		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "medicao/getCountEsp",
			data: "id="+id,
			success: function(medicao){
				document.getElementById("numberItem").innerHTML = (medicao.countMed+1)

			},
			error: function(info){
				var a="Erro ao consultar os cadastros de usuário: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');
				console.log(b);
			}
		})

	}
	dateDefinition = function(){
		var now = new Date();

		now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
		document.getElementById('dataLocal').value = now.toISOString().slice(0,16);
	}
	CARTACEP.amostra.carregaOperador = function(id){
		dateDefinition()


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
	CARTACEP.amostra.carregaOperador();

	geradorIdMedicao = function(){
		var numAl = Math.floor(Math.random() * 1000000);
		document.getElementById("idMedicao").value = numAl
	}

	geradorIdMedicao()

	CARTACEP.amostra.limitMeasureReg = function(){
		var boolItem = false;
		if(document.getElementById("selOperador").value==""){
			boolItem=true;
		}
		var subgrupo=document.getElementById("quantidadeSub").value
		for(var i=0; i<subgrupo; i++){
			if(document.getElementById('testeValue'+i+'').value==""){
				boolItem=true;
			}
		}
		if(boolItem==true){

			Swal.fire({
				icon: 'error',
				title: 'Atenção',
				text: 'Cadastro incompleto.'
			})	
		}else{
			var id = document.getElementById("idEsp").value
			$.ajax({
				type: "GET",
				url: CARTACEP.PATH + "producao/limitMeasure",
				data: "id="+id,
				success: function(dados){
					dados = JSON.parse(dados)
					CARTACEP.amostra.getLimitList(dados)


				},
				error: function(info){
					var a="Erro ao consultar os cadastros de usuário: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');
					console.log(b);
				}
			})			
		}


	}
	CARTACEP.amostra.getLimitList = function(listaLimites){
		var limit = 0
		var subgroup = 0
		for(var i=0;i<listaLimites.length;i++){
			limit = listaLimites[i].quantidade*listaLimites[i].numAmostras
			subgroup = listaLimites[i].quantidade
		}
		var totalMeasure = listaLimites.length*subgroup

		if(totalMeasure==limit&&!totalMeasure==0){

			Swal.fire({
				text: 'Atingiu o limite de medições.',
				icon: 'error',
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'OK'
			}).then((result) => {
				if (result.isConfirmed) {
					window.location.href = "amostras.html";
				}
			})	
		}else{

			CARTACEP.amostra.cadastrarMedicao()
		}
	}
	CARTACEP.amostra.cadastrarMedicao = function(){

		var medicao = new Object()
		medicao.dataHora = document.frmItemsSub.dataLocal.value
		medicao.idOperador = document.frmItemsSub.selOperador.value
		medicao.obs = document.frmItemsSub.obs.value
		medicao.codeProd = sessionStorage.getItem('code')
		medicao.idEsp = document.getElementById("idEsp").value
		medicao.idMedicao  = document.getElementById("idMedicao").value 
		$.ajax({
			type: "POST",
			url: CARTACEP.PATH + "medicao/inserir",
			data:JSON.stringify(medicao),
			success:function(msg){
				CARTACEP.amostra.cadastrarItem()
				geradorIdMedicao()
				$("#frmItemsSub").trigger("reset");
				CARTACEP.amostra.lookUpCount()
			},
			error:function(info){
			}
		});	

	}

	CARTACEP.amostra.cadastrarItem = function(){

		quantidade = document.getElementById("quantidadeSub").value 

		for(i=0;i<quantidade; i++){

			var sub= new Object()
			sub.idEsp = document.getElementById("idEsp").value
			sub.idSub = document.getElementById("idSub").value
			sub.valor = document.getElementById("testeValue"+i+"").value	
			sub.idMedicao = document.getElementById("idMedicao").value 
			$.ajax({
				type: "POST",
				url: CARTACEP.PATH + "subgrupo/inserir",
				data:JSON.stringify(sub),
				success:function(msg){
					$("#frmItemsSub").trigger("reset");
					CARTACEP.amostra.getCountEsp(document.getElementById("idEsp").value)
					CARTACEP.amostra.buscarMed(document.getElementById("idEsp").value)
					dateDefinition()
				},
				error:function(info){
				}
			});	
		}
	}
	CARTACEP.amostra.buttonEnter = function(){
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("loginBtn").click();
			window.setTimeout('CARTACEP.amostra.lookUpCount()', 600);
		}
	}
	CARTACEP.amostra.buscarMed = function(id){
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "medicao/buscarMed",
			data: "id="+id,
			success: function(dados){

				dados = JSON.parse(dados);
				 
				
				$("#listaMedCad").html(CARTACEP.amostra.exibirMed(dados));


			},
			error: function(info){
				console.log("Erro ao consultar os cadastros de operação: "+info.status+" - "+info.statusText);
			}
		});
	}
	CARTACEP.amostra.exibirMed = function(listaDeMedicoes){
		var sample = 0
		var q=0
		var codMed = 0
		if(listaDeMedicoes != undefined && listaDeMedicoes.length >0){

			var tabela = "<table class='table align-items-center table-flush small'>"+
			"<thead class='thead-light'>"+
			"<tr>"+
			"<th>Data</th>"+
			"<th>Ítem/Total</th>"+
			"<th>Operador</th>"+
			"<th>Valor</th>"+
			"<th>Observação</th>"+
			"<th></th>"+
			"</tr>"+												
			"</thead>"+											
			"<tbody>";
			for(var i=0; i<listaDeMedicoes.length; i++){
				codMed = listaDeMedicoes[i].idEsp
				q=i+1
				sample = listaDeMedicoes[i].subgrupo*listaDeMedicoes[i].quantidade
				document.getElementById("selOperador").value = listaDeMedicoes[i].idOperador

				tabela+=
					"<tr>"+
					"<td>"+CARTACEP.amostra.formatDate(listaDeMedicoes[i].dataHora)+"</td>"+
					"<td>"+(i+1)+"/"+sample+"</td>"+
					"<td>"+listaDeMedicoes[i].operador+"</td>"+
					"<td>"+listaDeMedicoes[i].valor+"</td>"+
					"<td>"+listaDeMedicoes[i].obs+"</td>"+
					"<td><a onclick='CARTACEP.amostra.deleteMed("+listaDeMedicoes[i].idMed+")' class='btn btn-sm'> <i class='fas fa-trash'></i>"+														
					"</a></td>"+
					"</tr>";

			}
		}else if (listaDeMedicoes == ""){
			tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
			
		}
		tabela +="</tbody>"+
		"</table>";

		var code = sessionStorage.getItem('code');
		
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "medicao/lookUpCountSub",
			data: "code="+code,
			success: function(sub){

				var medicao= new Object()
				if(sample==q){
				medicao.full = true
				}else{
				medicao.full = false	
				}
				medicao.idEsp = codMed
				medicao.countMed = q
				medicao.totalGer = sample
				medicao.totalSub = sub.idEsp
				$.ajax({
					type:"PUT",
					url: CARTACEP.PATH + "medicao/addCount",
					data:JSON.stringify(medicao),
					success: function(msg){
		 				console.log(msg)
		 				CARTACEP.amostra.lookUpCount()
					},
					error: function(info){
						console.log(info)
					}
				})

			},
			error: function(info){
				console.log("Erro ao consultar os cadastros de operação: "+info.status+" - "+info.statusText);
			}
		});
		

		
		return tabela;
	}

	CARTACEP.amostra.lookUpCount = function(){
		var code = sessionStorage.getItem('code');
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "medicao/lookUpCount",
			data: "code="+code,
			success: function(dados){

				dados = JSON.parse(dados);			
				 CARTACEP.amostra.getTotalMed(dados)

			},
			error: function(info){
				console.log("Erro ao consultar os cadastros de operação: "+info.status+" - "+info.statusText);
			}
		});
	}

	CARTACEP.amostra.getTotalMed = function(totalTotal){
		var code = sessionStorage.getItem('code');
		console.log(code)
		//select count(*) from medicoes where codeProd *(vezes) subgrupo
		for(var i=0; i<totalTotal.length; i++){
			var totalOverall = totalTotal[i].totalMC * totalTotal[i].totalGer;
			var totalSoFar = totalTotal[i].totalSoFar * totalTotal[i].quantity;
			var producao= new Object()
			producao.codeRefEsp = code
			producao.contagemAtual = totalSoFar
console.log(totalOverall+"/"+totalSoFar)
			if(totalSoFar == totalOverall && totalSoFar!=0){
				producao.statusFull = true
			}else{
				producao.statusFull = false
			}
			$.ajax({
				type:"PUT",
				url: CARTACEP.PATH + "producao/changeStatusFull",
				data:JSON.stringify(producao),
				success: function(msg){
console.log(msg)
				},
				error: function(info){
				}
			})
		}
	}
	

	CARTACEP.amostra.deleteMed = function(idMed){

		$.ajax({
			type:"DELETE",
			url: CARTACEP.PATH +"medicao/excluirMed/"+idMed,
			success: function(msg){
				b = msg.replace(/['"]+/g, '');
				console.log(b);
				CARTACEP.amostra.deleteSub(idMed)
				CARTACEP.amostra.buscarMed(document.getElementById("idEsp").value)
			},
			error: function(info){
				console.log("Erro ao excluir operação: " + info.status + " - " + info.statusText);
			}
		});
	}
	CARTACEP.amostra.deleteSub = function(idMed){
		$.ajax({
			type:"DELETE",
			url: CARTACEP.PATH +"subgrupo/excluirSub/"+idMed,
			success: function(msg){
				b = msg.replace(/['"]+/g, '');
				console.log(b);
				CARTACEP.amostra.lookUpCount();
			},
			error: function(info){
				console.log("Erro ao excluir operação: " + info.status + " - " + info.statusText);
			}
		});
	}
})