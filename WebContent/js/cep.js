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
				$("#listaOrdemCEP").html(CARTACEP.amostra.exibir(producao));
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

	CARTACEP.amostra.getSub = function(id){
		document.getElementById("idEsp").value = id
		CARTACEP.amostra.buscarMed(id)
		var code = sessionStorage.getItem('code');
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "producao/getSubNumber",
			data: "code="+code,
			success: function(subgrupo){
				document.getElementById("idSub").value = subgrupo.idSub
				document.getElementById("quantidadeSub").value = subgrupo.subgrupo
			},
			error: function(info){
				var a="Erro ao consultar os cadastros de usuário: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');
				console.log(b);
			}
		})
	}


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
					"<div>"+

					"<td class='cardShift'><a onclick=\"CARTACEP.amostra.getSub('"+listaDeAmostras[i].id+"'), openButton(event, 'openPage')\"  data-toggle='collapse' id='cardLines'>  "+
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
			tabela +=
				"</tr>";

			return tabela;
		}

	}
	CARTACEP.amostra.getSample()
	
	
	CARTACEP.amostra.buscarMed = function(id){
		CARTACEP.amostra.getSamplesComplete(id)
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
		
		if(listaDeMedicoes != undefined && listaDeMedicoes.length >0){

			
			
			
			var tabela = "<table class='table align-items-center table-flush small'>"+
			"<thead class='thead-light'>"+
			"<tr>"+
			"<th>Data</th>"+
			"<th>Ítem/Total</th>"+
			"<th>Operador</th>"+
			"<th>Valor</th>"+
			"<th>Observação</th>"+
			"</tr>"+												
			"</thead>"+											
			"<tbody>";
			for(var i=0; i<listaDeMedicoes.length; i++){

				
				//Calculo do total de amostas*subgrupos
				var sample = listaDeMedicoes[i].subgrupo*listaDeMedicoes[i].quantidade
				
				tabela+=
					"<tr>"+
					"<td>"+CARTACEP.amostra.formatDate(listaDeMedicoes[i].dataHora)+"</td>"+
					"<td>"+(i+1)+"/"+sample+"</td>"+
					"<td>"+listaDeMedicoes[i].operador+"</td>"+
					"<td>"+listaDeMedicoes[i].valor+"</td>"+
					"<td></td>"+
					"</tr>";

			}
		}else if (listaDeMedicoes == ""){
			tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";

		}
		tabela +="</tbody>"+
		"</table>";

		return tabela;
	}
	CARTACEP.amostra.getSamplesComplete = function(id){

		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "medicao/getSamplesComplete",
			data: "id="+id,
			success: function(dados){

				dados = JSON.parse(dados);
				$("#sizeBodyInfo").html(CARTACEP.amostra.infoObs(dados));
				//CARTACEP.amostra.infoObs(dados)
				CARTACEP.amostra.showReadingGraph(dados)
				CARTACEP.amostra.exibirMediaX(dados)				
			},
			error: function(info){
				console.log("Erro ao consultar os cadastros de operação: "+info.status+" - "+info.statusText);
			}
		});
	}
	CARTACEP.amostra.showReadingGraph = function (listaDeAmostrasG){
		var arrayDate = [];
		var arrayS = [];
		var arrayI = [];
		var arrayLeituras = [];
		for(var i=0; i<listaDeAmostrasG.length; i++){
			var dataMod = listaDeAmostrasG[i].dataHora
			var datePart = dataMod.match(/\d+/g),
			ano = datePart[0].substring(0), //0 = 4 digitos e 2 = 2 digitos
			mes = datePart[1], 
			dia = datePart[2], 
			hora = datePart[3], 
			minuto = datePart[4]
			segundo = datePart[5];
			var modData =  dia+'/'+mes+'/'+ano+' '+hora+':'+minuto+':'+segundo;
			arrayDate.push(modData)	
			arrayS.push(listaDeAmostrasG[i].espMaximo)
			arrayI.push(listaDeAmostrasG[i].espMinimo)
			arrayLeituras.push(listaDeAmostrasG[i].valor)
		}
		var ctx4 = document.getElementById("graficoleituras");
		var myBarChart4 = new Chart(ctx4, {
			type: 'line',
			data: {
				labels: arrayDate,
				datasets: [{
					label: "Leituras",
					backgroundColor: "#4e7334",
					hoverBackgroundColor: "#2e59d9",
					borderColor: "#4e7334",
					fill: false,
					data: arrayLeituras
				}, {
					label: "Especificação Mínima",
					backgroundColor: "#D2691E",
					hoverBackgroundColor: "#8959d9",
					borderColor: "#D2691E",
					fill: false,
					data: arrayS
				}, {
					label: "Especificação Máxima",
					backgroundColor: "#D2691E",
					hoverBackgroundColor: "#8959d9",
					borderColor: "#D2691E",
					fill: false,
					data: arrayI
				}],
			},
			options: {
				elements: {
					line: {
						tension: 0
					}
				},
//				maintainAspectRatio: false,
//				layout: {
//				padding: {
//				left: 10,
//				right: 15,
//				top: 25,
//				bottom: 0
//				}
//				},
//				scales: {
//				xAxes: [{
//				time: {
//				unit: 'Leituras'
//				},
//				gridLines: {
//				display: false,
//				drawBorder: false
//				},
//				ticks: {
//				maxTicksLimit: 5
//				},
//				maxBarThickness: 30,
//				}],
//				yAxes: [{
//				ticks: {
//				min: 20,
//				max: 32,
//				maxTicksLimit: 5,
//				padding: 10,
//				// Include a dollar sign in the ticks
//				callback: function(value, index, values) {
//				return '' + number_format(value);
//				}
//				},
//				gridLines: {
//				color: "rgb(234, 236, 244)",
//				zeroLineColor: "rgb(234, 236, 244)",
//				drawBorder: false,
//				borderDash: [2],
//				zeroLineBorderDash: [2]
//				}
//				}],
//				},
//				legend: {
//				display: true
//				},
//				tooltips: {
//				titleMarginBottom: 10,
//				titleFontColor: '#6e707e',
//				titleFontSize: 14,
//				backgroundColor: "rgb(255,255,255)",
//				bodyFontColor: "#858796",
//				borderColor: '#dddfeb',
//				borderWidth: 1,
//				xPadding: 15,
//				yPadding: 15,
//				displayColors: false,
//				caretPadding: 10,
//				callbacks: {
//				label: function(tooltipItem, chart) {
//				var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
//				return datasetLabel + ':' + number_format(tooltipItem.yLabel);
//				}
//				}
//				},
			}
		});		
	}
	CARTACEP.amostra.exibirMediaX = function(listaDeAmostrasG){
		var arrayDate = [];
		var arrayDateAm = [];
		var arrayS = [];
		var arrayI = [];
		var arraySA = [];
		var arrayIA = [];
		var arrayLeituras = [];
		var arrayAmplitude = [];
		var soma = 0;
		var valLeit = 0;
		var totalAm = 0;
		for(var i=0; i<listaDeAmostrasG.length; i++){
			if(listaDeAmostrasG[i].subgrupo==1){
				soma = listaDeAmostrasG[i].valor;
				valLeit = valLeit+soma;
				totalAm = listaDeAmostrasG[i].numAmostras;
			}
		}
		var mediaX = valLeit/totalAm
		var somaAmp = 0;
		var totalAmAmpl = 0;
		var subAmpl = 0;
		var limite = 0
		var lim= 0
		var arraySub = [];
		var arraySub2 = [];
		var somaSub = 0;
		var maiorSub=0;
		var menorSub=10000;
		for(var i=0; i<listaDeAmostrasG.length; i++){
			limite = listaDeAmostrasG[i].subgrupo
			if(listaDeAmostrasG[i].subgrupo==1){
				totalAmAmpl = listaDeAmostrasG[i].numAmostras;
				var value = listaDeAmostrasG[i].valor
				value = parseFloat(value.toFixed(6))
				arrayLeituras.push(value)

				var dataMod = listaDeAmostrasG[i].dataHora
				var datePart = dataMod.match(/\d+/g),
				ano = datePart[0].substring(0), //0 = 4 digitos e 2 = 2 digitos
				mes = datePart[1], 
				dia = datePart[2], 
				hora = datePart[3], 
				minuto = datePart[4]
				segundo = datePart[5];
				var modData =  dia+'/'+mes+'/'+ano+' '+hora+':'+minuto+':'+segundo;
				arrayDate.push(modData)
			}
			if(listaDeAmostrasG[i].subgrupo==1&&i>=1){
				subAmpl = listaDeAmostrasG[i].valor-listaDeAmostrasG[i-1].valor
				var numAbs = Math.abs(subAmpl)
				numAbs = parseFloat(numAbs.toFixed(6))
				somaAmp = somaAmp + numAbs;	
				var dataMod = listaDeAmostrasG[i-1].dataHora
				var datePart = dataMod.match(/\d+/g),
				ano = datePart[0].substring(0), //0 = 4 digitos e 2 = 2 digitos
				mes = datePart[1], 
				dia = datePart[2], 
				hora = datePart[3], 
				minuto = datePart[4]
				segundo = datePart[5];
				var modData =  dia+'/'+mes+'/'+ano+' '+hora+':'+minuto+':'+segundo;
				arrayDateAm.push(modData)
				arrayAmplitude.push(numAbs)
			}
			if(listaDeAmostrasG[i].subgrupo>1&&i>=1){
				subAmpl = listaDeAmostrasG[i].valor-listaDeAmostrasG[i-1].valor
				var numAbs = Math.abs(subAmpl)
				//Formatar as datas
				var dataMod = listaDeAmostrasG[i-1].dataHora
				var datePart = dataMod.match(/\d+/g),
				ano = datePart[0].substring(0), //0 = 4 digitos e 2 = 2 digitos
				mes = datePart[1], 
				dia = datePart[2], 
				hora = datePart[3], 
				minuto = datePart[4]
				segundo = datePart[5];
				var modData =  dia+'/'+mes+'/'+ano+' '+hora+':'+minuto+':'+segundo;
				arrayDateAm.push(modData)
				numAbs = parseFloat(numAbs.toFixed(8))
				arrayAmplitude.push(numAbs)
			}
			if(listaDeAmostrasG[i].subgrupo>1&&lim<listaDeAmostrasG[i].subgrupo){
				var dataMod =listaDeAmostrasG[i].dataHora
				var datePart = dataMod.match(/\d+/g),
				ano = datePart[0].substring(0), //0 = 4 digitos e 2 = 2 digitos
				mes = datePart[1], 
				dia = datePart[2], 
				hora = datePart[3], 
				minuto = datePart[4]
				segundo = datePart[5];
				var modData =  dia+'/'+mes+'/'+ano+' '+hora+':'+minuto+':'+segundo;
				arrayDate.push(modData)	
				somaSub = somaSub+listaDeAmostrasG[i].valor		
				if(listaDeAmostrasG[i].valor>maiorSub){
					maiorSub=listaDeAmostrasG[i].valor
				}
				if(listaDeAmostrasG[i].valor<menorSub){
					menorSub=listaDeAmostrasG[i].valor
				}
				lim=lim+1

				if(lim==listaDeAmostrasG[i].subgrupo){

					var amplitudeSub = (maiorSub-menorSub)
					amplitudeSub = parseFloat(amplitudeSub.toFixed(6))				
					arraySub.push(amplitudeSub)
					somaSub=somaSub/lim
					arraySub2.push(somaSub)
					lim=0;
					somaSub=0;
					maiorSub=0;
					menorSub=10000;
				}				
			}		
		}
		var totalMediaSub = 0
		var finalMedSub = 0
		var amplSub = 0
		var finalAmplSub = 0
		if(limite>1){
			for(var i=0; i<arraySub2.length;i++) {
				totalMediaSub+=arraySub2[i]
			}
			for(var i=0; i<arraySub.length;i++) {
				amplSub+=arraySub[i]
			}
			finalMedSub = (totalMediaSub/arraySub2.length)
			finalAmplSub = (amplSub/arraySub.length)
		}
//		Tabela de valores para subgrupos
		var d4 = 0
		var d3 = 0
		var a2 = 0

		if(limite == 2) {
			d4 = 3.267;
			d3 = 0;
			a2 = 1.880;
		}else if(limite == 3) {
			d4 = 2.575;
			d3 = 0;
			a2 = 1.023;
		}else if(limite == 4) {
			d4 = 2.115;
			d3 = 0;
			a2 = 0.729;
		}else if(limite == 5) {
			d4 = 2.115;
			d3 = 0;
			a2 = 0.577;
		}else if(limite == 6) {
			d4 = 2.004;
			d3 = 0;
			a2 = 0.483;
		}else if(limite == 7) {
			d4 = 1.924;
			d3 = 0.076;
			a2 = 0.419;
		}else if(limite == 8) {
			d4 = 1.864;
			d3 = 0.136;
			a2 = 0.373;
		}else if(limite == 9) {
			d4 = 1.182;
			d3 = 0.184;
			a2 = 0.337;
		}else if(limite == 10) {
			d4 = 1.777;
			d3 = 0.223;
			a2 = 0.308;
		}


		//Individuais
		totalAmAmpl = totalAmAmpl-1
		var mediaAmplitude = somaAmp/totalAmAmpl
		var limSupControl = mediaX+(mediaAmplitude*2.66)
		limSupControl = parseFloat(limSupControl.toFixed(6))
		var limInfControl = mediaX-(mediaAmplitude*2.66)
		limInfControl = parseFloat(limInfControl.toFixed(6))

		var limSupControleAmpMovel = 3.267*mediaAmplitude;
		limSupControleAmpMovel = parseFloat(limSupControleAmpMovel.toFixed(6))
		var limInfControleAmpMovel = 0*mediaAmplitude
		limInfControleAmpMovel = parseFloat(limInfControleAmpMovel.toFixed(6))

		//Subgrupos
		var limSupControleSub = finalMedSub+(finalAmplSub*a2);
		limSupControleSub = parseFloat(limSupControleSub.toFixed(6))
		var limInfControleSub = finalMedSub-(finalAmplSub*a2);
		limInfControleSub = parseFloat(limInfControleSub.toFixed(6))

		var limSupControleAmpMovelSub = (finalAmplSub*d4);
		limSupControleAmpMovelSub = parseFloat(limSupControleAmpMovelSub.toFixed(6))
		var limInfControleAmpMovelSub = (finalAmplSub*d3);
		limInfControleAmpMovelSub = parseFloat(limInfControleAmpMovelSub.toFixed(6))
//		Criação dos arrays com valores individuais ou subgrupos
		for(var i=0; i<listaDeAmostrasG.length; i++){
			if(listaDeAmostrasG[i].subgrupo==1){
				arrayS.push(limSupControl)
				arrayI.push(limInfControl)
				arraySA.push(limSupControleAmpMovel)
				arrayIA.push(limInfControleAmpMovel)
			}
			if(listaDeAmostrasG[i].subgrupo>1){		
				arrayS.push(limSupControleSub)
				arrayI.push(limInfControleSub)
				var value = listaDeAmostrasG[i].valor
				value = parseFloat(value.toFixed(6))
				arrayLeituras.push(value)
				arraySA.push(limSupControleAmpMovelSub)
				arrayIA.push(limInfControleAmpMovelSub)			
			}
		}
		var ctx3 = document.getElementById("graficomedia");
		var myBarChart3 = new Chart(ctx3, {
			type: 'line',
			data: {
				labels: arrayDate,
				datasets: [{
					label: "Média X",
					backgroundColor: "#4e7399",
					hoverBackgroundColor: "#2e59d9",
					borderColor: "#4e7399",
					fill: false,
					data: arrayLeituras
				}, {
					label: "LIC",
					backgroundColor: "#D2691E",
					hoverBackgroundColor: "#8959d9",
					borderColor: "#D2691E",
					fill: false,
					data: arrayS
				}, {
					label: "LSC",
					backgroundColor: "#D2691E",
					hoverBackgroundColor: "#8959d9",
					borderColor: "#D2691E",
					fill: false,
					data: arrayI
				}],
			},
			options: {
				elements: {
					line: {
						tension: 0
					}
				},
//				maintainAspectRatio: false,
//				layout: {
//				padding: {
//				left: 10,
//				right: 15,
//				top: 25,
//				bottom: 0
//				}
//				},
//				scales: {
//				xAxes: [{
//				time: {
//				unit: 'Leituras'
//				},
//				gridLines: {
//				display: false,
//				drawBorder: false
//				},
//				ticks: {
//				maxTicksLimit: 5
//				},
//				maxBarThickness: 30,
//				}],
//				yAxes: [{
//				ticks: {
//				min: 1,
//				max: 2.5,
//				maxTicksLimit: 5,
//				padding: 10,
//				// Include a dollar sign in the ticks
//				callback: function(value, index, values) {
//				return '' + number_format(value,2);
//				}
//				},
//				gridLines: {
//				color: "rgb(234, 236, 244)",
//				zeroLineColor: "rgb(234, 236, 244)",
//				drawBorder: false,
//				borderDash: [2],
//				zeroLineBorderDash: [2]
//				}
//				}],
//				},
//				legend: {
//				display: true
//				},
//				tooltips: {
//				titleMarginBottom: 10,
//				titleFontColor: '#6e707e',
//				titleFontSize: 14,
//				backgroundColor: "rgb(255,255,255)",
//				bodyFontColor: "#858796",
//				borderColor: '#dddfeb',
//				borderWidth: 1,
//				xPadding: 15,
//				yPadding: 15,
//				displayColors: false,
//				caretPadding: 10,
//				callbacks: {
//				label: function(tooltipItem, chart) {
//				var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
//				return datasetLabel + ':' + number_format(tooltipItem.yLabel,2);
//				}
//				}
//				},
			}
		})

		var ctx2 = document.getElementById("graficoamplitude");
		var myBarChart2 = new Chart(ctx2, {
			type: 'line',
			data: {
				labels: arrayDateAm,
				datasets: [{
					label: "Amplitude",
					backgroundColor: "#4e9924",
					hoverBackgroundColor: "#2e59d9",
					borderColor: "#4e9924",
					fill: false,
					data:arrayAmplitude
				}, {
					label: "LIC",
					backgroundColor: "#D2691E",
					hoverBackgroundColor: "#8959d9",
					borderColor: "#D2691E",
					fill: false,
					data: arraySA
				}, {
					label: "LSC",
					backgroundColor: "#D2691E",
					hoverBackgroundColor: "#8959d9",
					borderColor: "#D2691E",
					fill: false,
					data: arrayIA
				}],
			},
			options: {
				elements: {
					line: {
						tension: 0
					}
				},
//				maintainAspectRatio: false,
//				layout: {
//				padding: {
//				left: 10,
//				right: 15,
//				top: 25,
//				bottom: 0
//				}
//				},
//				scales: {
//				xAxes: [{
//				time: {
//				unit: 'Leituras'
//				},
//				gridLines: {
//				display: false,
//				drawBorder: false
//				},
//				ticks: {
//				maxTicksLimit: 5
//				},
//				maxBarThickness: 30,
//				}],
//				yAxes: [{
//				ticks: {
//				min: 1,
//				max: 2.5,
//				maxTicksLimit: 5,
//				padding: 10,
//				// Include a dollar sign in the ticks
//				callback: function(value, index, values) {
//				return '' + number_format(value,2);
//				}
//				},
//				gridLines: {
//				color: "rgb(234, 236, 244)",
//				zeroLineColor: "rgb(234, 236, 244)",
//				drawBorder: false,
//				borderDash: [2],
//				zeroLineBorderDash: [2]
//				}
//				}],
//				},
//				legend: {
//				display: true
//				},
//				tooltips: {
//				titleMarginBottom: 10,
//				titleFontColor: '#6e707e',
//				titleFontSize: 14,
//				backgroundColor: "rgb(255,255,255)",
//				bodyFontColor: "#858796",
//				borderColor: '#dddfeb',
//				borderWidth: 1,
//				xPadding: 15,
//				yPadding: 15,
//				displayColors: false,
//				caretPadding: 10,
//				callbacks: {
//				label: function(tooltipItem, chart) {
//				var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
//				return datasetLabel + ':' + number_format(tooltipItem.yLabel,2);
//				}
//				}
//				},
			}
		});
		//Histograma

		var maiorSub = 0;
		var menorSub = 1000;
		var arrayHistogram = []
		for(var i=0; i<listaDeAmostrasG.length; i++){
			arrayHistogram.push (listaDeAmostrasG[i].valor)
		}
		var arrayHisSort = arrayHistogram.sort()
		//Amplitude (AT)

		for(var i =0; i<arrayHisSort.length;i++) {

			if(arrayHisSort[i]> maiorSub) {
				maiorSub = arrayHisSort[i];
			}
			if(arrayHisSort[i]< menorSub) {
				menorSub = arrayHisSort[i];
			}
		}

		var at = maiorSub - menorSub;
		at = parseFloat(at.toFixed(2))
		//Calculo das Classes (K)
		var numTermos = arrayHisSort.length;
		var calcClasses = 1+(3.3*Math.log10(numTermos)); 
		calcClasses = Math.ceil(calcClasses)
		//Amplitude das Classes (h) 	
		var ampClasses = at/calcClasses;
		var valHis=0

		var arrayFHis = []
		for(var i=0; i<maiorSub;) {


			if(i==0){
				valHis = menorSub
				valHis = parseFloat(valHis.toFixed(2))
				arrayFHis.push(valHis)
				i=valHis
			}		
			if(i<=maiorSub){	
				valHis = valHis+ampClasses
				valHis = parseFloat(valHis.toFixed(2))
				i=valHis
				arrayFHis.push(valHis)
			}
		}
		var count = 0
		var arrayHFinal = [];
		for(var i=0; i<arrayFHis.length;i++) {
			for(var x=0; x<arrayHisSort.length;x++) {
				var t = arrayFHis.length-1
				var tx = arrayHisSort.length-1

				if(arrayHisSort[x]>=arrayFHis[i]&&arrayHisSort[x]<arrayFHis[i+1]){
					count++

				}

			}
			if(!count==0){
				arrayHFinal.push(count)
			}		
			count=0
		}
		if(arrayHisSort[tx-1]>=parseFloat(arrayFHis[t-1].toFixed(2))&&arrayHisSort[tx]==parseFloat(arrayFHis[t].toFixed(2))){
			count++
		}
		arrayHFinal.push(count)
		var ctx = document.getElementById("graficohistograma");
		var myBarChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels:arrayFHis,
				datasets: [{
					label: 'Line Dataset',
					data: arrayHFinal,
					type: 'line',
					borderColor: "red",
					fill: false,
					// this dataset is drawn on top
					order: 1

				}, {
					barPercentage: 1,
					barThickness: 6,
					maxBarThickness: 8,
					minBarLength: 2,
					label: "Quantidade",
					backgroundColor: "#4e73df",
					hoverBackgroundColor: "#2e59d9",
					borderColor: "#4e73df",
					data: arrayHFinal,
					order: 2
				}],
			},
			options: {
				maintainAspectRatio: false,
				layout: {
					padding: {
						left: 10,
						right: 10,
						top: 25,
						bottom: 0
					}
				},

				scales: {
					xAxes: [{
						time: {
							unit: 'Histograma'
						},
						gridLines: {
							display: false,
							drawBorder: false
						},
						display: true,
						ticks: {
							autoSkip: false,
							max: 4,
							maxTicksLimit: 6
						},
//						maxBarThickness: 'flex',
						barPercentage: 1.2,
						barThickness: 'flex',
						minBarLength: 2,
					}],
					yAxes: [{
						ticks: {
							min: 0,
//							max: 10,
//							maxTicksLimit: 10,
//							padding: 10,
//							// Include a dollar sign in the ticks
//							callback: function(value, index, values) {
//							return '' + number_format(value);
//							}
						},
						gridLines: {
							color: "rgb(234, 236, 244)",
							zeroLineColor: "rgb(234, 236, 244)",
							drawBorder: false,
							borderDash: [2],
							zeroLineBorderDash: [2]
						}
					}],
				},
				legend: {
					display: false
				},
				tooltips: {
					titleMarginBottom: 10,
					titleFontColor: '#6e707e',
					titleFontSize: 14,
					backgroundColor: "rgb(255,255,255)",
					bodyFontColor: "#858796",
					borderColor: '#dddfeb',
					borderWidth: 1,
					xPadding: 15,
					yPadding: 15,
					displayColors: false,
					caretPadding: 10,
					callbacks: {
						label: function(tooltipItem, chart) {
							var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
							return datasetLabel + ':' + number_format(tooltipItem.yLabel);
						}
					}
				},
			}
		});
	}
	CARTACEP.amostra.infoObs = function(listaDeAmostras){
	
		var obsBool = false
		if(listaDeAmostras != undefined && listaDeAmostras.length >0){
			var tabela = "<table>";
			for(var i=0; i<listaDeAmostras.length; i++){
				console.log(listaDeAmostras[i].obs)
				if(listaDeAmostras[i].obs==""){
					obsBool = true
				}else{
					obsBool = false
					tabela += "<tr><td>Ref. ao valor "+listaDeAmostras[i].valor+": </td>" +
							"<td>"+listaDeAmostras[i].obs+"</td></tr>"
				}
			}
			if(obsBool == true||listaDeAmostras==undefined){
				tabela += "<tr><td>Não há observações feitas</td></tr>"
					
			}
		}
		tabela +="</table>";

		return tabela;
		
	}
})