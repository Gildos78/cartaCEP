CARTACEP = new Object;
CARTACEP.usuario = new Object;
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
	
	 date = function(dateToday){
			var day
			var month
			var date = new Date(new Date().setDate(new Date().getDate() - 30));
			if(date.getDate()>1&&date.getDate()<9){
				day = "0"+date.getDate()
			}else{
				day = date.getDate()
			}
			if(date.getMonth()>1&&date.getMonth()<9){

				month = "0"+(date.getMonth()+1)
			}else{
				month = date.getMonth()+1
			}
			return dateToday = date.getFullYear()+"-"+month+"-"+day
		}

	CARTACEP.usuario.getMonthlyDate = function(){
		var date30DaysPrior = date(date30DaysPrior)
		
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "producao/getListProduction",
			data: "date="+date30DaysPrior,
			success: function(data){
				data = JSON.parse(data)
				CARTACEP.usuario.getData(data)
			},
			error: function(info){
				var a="Erro ao consultar os cadastros de usuário: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');
				Swal.fire(b);
			}
		})



	};
	

	CARTACEP.usuario.getMonthlyDate()
	CARTACEP.usuario.getData = function(listaDeProducoes){
		var trueCount = 0
		var incomplete = 0
		var unstarted = 0
		var arrayCount = []
		for(var i=0;i<listaDeProducoes.length;i++){
			if(listaDeProducoes[i].status==true){
				trueCount+=1
			}
			if(listaDeProducoes[i].contagem>0&&listaDeProducoes[i].status==false){
				incomplete+=1
			}
			if(listaDeProducoes[i].contagem==0&&listaDeProducoes[i].status==false){
				unstarted+=1
			}
		}
		arrayCount.push(trueCount)
		arrayCount.push(incomplete)
		arrayCount.push(unstarted)
		var totalProd = arrayCount[0]+arrayCount[1]+arrayCount[2]
		var percInc =(arrayCount[1]*100)/ totalProd
		var percCom =(arrayCount[0]*100)/ totalProd
		var percEmpty =(arrayCount[2]*100)/ totalProd

		/*Mostra dos dados coletados*/
		$('#totalInc').html("<b>"+arrayCount[1]+" of "+totalProd+" Produções</b>");
		$('#progIncom').html("<div class='progress-bar bg-warning' role='progressbar'	style='width: "+percInc+"%'  aria-valuenow='"+arrayCount[1]+"' aria-valuemin='0'aria-valuemax='"+totalProd+"'></div>");
		$('#totalCom').html("<b>"+arrayCount[0]+" of "+totalProd+" Produções</b>");
		$('#progCom').html("<div class='progress-bar bg-success' role='progressbar'	style='width: "+percCom+"%'  aria-valuenow='"+arrayCount[0]+"' aria-valuemin='0'aria-valuemax='"+totalProd+"'></div>");
		$('#totalEmpty').html("<b>"+arrayCount[2]+" of "+totalProd+" Produções</b>");
		$('#progEmpty').html("<div class='progress-bar bg-danger' role='progressbar'	style='width: "+percEmpty+"%'  aria-valuenow='50' aria-valuemin='0'aria-valuemax='"+totalProd+"'></div>");
		var date = new Date(new Date().setDate(new Date().getDate() - 30));
		var today = new Date(new Date().setDate(new Date().getDate()));
		document.getElementById("titleSamplesTrio").textContent = "Amostras de "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" a "+today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear()	
		var arraymonthYear = []
		var dadosMes
		/**** Grafico *****/

		var monthYear = new Date().getFullYear()

		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "producao/getProductionCountYear",
			data: "date="+monthYear,
			success: function(data){
				data = JSON.parse(data)

				CARTACEP.usuario.monthlyChart(data)
				CARTACEP.usuario.incompletedCount(data)
			},
			error: function(info){
				var a="Erro ao consultar os cadastros de usuário: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');
				Swal.fire(b);
			}
		})		

	};	
	
	calcularPer = function(countThisMonth, countLastMonth){
		
		var comp = countThisMonth-countLastMonth
		
		if(countLastMonth==0){				
			resultThisMonth = countThisMonth*100
		}else if(countThisMonth==0){
			
			resultThisMonth = comp*100
		}else
		{
			resultThisMonth = ((countThisMonth*100)/countLastMonth)
		}
		return resultThisMonth
	}
	CARTACEP.usuario.monthlyChart = function(fullYearList){
		
		var countJan = 0;
		var countFev = 0;
		var countMar = 0;
		var countAbr = 0;
		var countMai = 0;
		var countJun = 0;
		var countJul = 0;
		var countAgo = 0;
		var countSet = 0;
		var countOut = 0;
		var countNov = 0;
		var countDez = 0;

		var fullYear = [];

		for(var i=0;i<fullYearList.length;i++){
			
			
			if(fullYearList[i].dataInicio.match(/.*-01-.*/)&&fullYearList[i].status==true){
				countJan+=1
			}
			if(fullYearList[i].dataInicio.match(/.*-02-.*/)&&fullYearList[i].status==true){
				countFev+=1
			}
			if(fullYearList[i].dataInicio.match(/.*-03-.*/)&&fullYearList[i].status==true){
				countMar+=1
			}
			if(fullYearList[i].dataInicio.match(/.*-04-.*/)&&fullYearList[i].status==true){
				countAbr+=1
			}
			if(fullYearList[i].dataInicio.match(/.*-05-.*/)&&fullYearList[i].status==true){
				countMai+=1
			}
			if(fullYearList[i].dataInicio.match(/.*-06-.*/)&&fullYearList[i].status==true){
				countJun+=1
			}
			if(fullYearList[i].dataInicio.match(/.*-07-.*/)&&fullYearList[i].status==true){
				countJul+=1
			}
			if(fullYearList[i].dataInicio.match(/.*-08-.*/)&&fullYearList[i].status==true){
				countAgo+=1
			}
			if(fullYearList[i].dataInicio.match(/.*-09-.*/)&&fullYearList[i].status==true){
				countSet+=1
			}
			if(fullYearList[i].dataInicio.match(/.*-10-.*/)&&fullYearList[i].status==true){
				countOut+=1
			}
			if(fullYearList[i].dataInicio.match(/.*-11-.*/)&&fullYearList[i].status==true){
				countNov+=1
			}
			if(fullYearList[i].dataInicio.match(/.*-12-.*/)&&fullYearList[i].status==true){
				countDez+=1
			}
			
		}
		fullYear.push(countJan)
		fullYear.push(countFev)
		fullYear.push(countMar)
		fullYear.push(countAbr)
		fullYear.push(countMai)
		fullYear.push(countJun)
		fullYear.push(countJul)
		fullYear.push(countAgo)
		fullYear.push(countSet)
		fullYear.push(countOut)
		fullYear.push(countNov)
		fullYear.push(countDez)

		var ctx = document.getElementById("myAreaChart");
		var myLineChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
				datasets: [{
					label: "Produção",
					lineTension: 0.3,
					backgroundColor: "rgba(78, 115, 223, 0.5)",
					borderColor: "rgba(78, 115, 223, 1)",
					pointRadius: 3,
					pointBackgroundColor: "rgba(78, 115, 223, 1)",
					pointBorderColor: "rgba(78, 115, 223, 1)",
					pointHoverRadius: 3,
					pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
					pointHoverBorderColor: "rgba(78, 115, 223, 1)",
					pointHitRadius: 10,
					pointBorderWidth: 2,
					data: fullYear,
				}],
			},
			options: {
				maintainAspectRatio: false,
				layout: {
					padding: {
						left: 10,
						right: 25,
						top: 25,
						bottom: 0
					}
				},
				scales: {
					xAxes: [{
						time: {
							unit: 'date'
						},
						gridLines: {
							display: false,
							drawBorder: false
						},
						ticks: {
							maxTicksLimit: 7
						}
					}],
					yAxes: [{
						ticks: {
							maxTicksLimit: 2,
							padding: 10,
							// Include a dollar sign in the ticks
							callback: function(value, index, values) {
								return '' + number_format(value,0);
							}
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
					backgroundColor: "rgb(255,255,255)",
					bodyFontColor: "#858796",
					titleMarginBottom: 10,
					titleFontColor: '#6e707e',
					titleFontSize: 14,
					borderColor: '#dddfeb',
					borderWidth: 1,
					xPadding: 15,
					yPadding: 15,
					displayColors: false,
					intersect: false,
					mode: 'index',
					caretPadding: 10,
					callbacks: {
						label: function(tooltipItem, chart) {
							var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
							return datasetLabel + ': ' + number_format(tooltipItem.yLabel,0);
						}
					}
				}
			}
		});
		
		/** Widget**/
		
		var thisMonth = 0
		var lastMonth = 0
		var comp = 0
		var arrow = ""
			
		for(var i=0;i<fullYear.length;i++){
			
			if((new Date().getMonth()+1)==(i+1)&&i>0){
				thisMonth = fullYear[i]
				lastMonth = fullYear[i-1]
				comp = thisMonth - lastMonth
			}else if(i==0){
				thisMonth = fullYear[i]
			}
		}
		var resultThisMonth = calcularPer(thisMonth,lastMonth)

		if(resultThisMonth<-99){
			arrow = "<span class='text-danger mr-2'><i class='fa fa-arrow-down'></i>"
				resultThisMonth=(Math.abs(resultThisMonth))
		}else if(resultThisMonth<0&&resultThisMonth>-99){
			arrow = "<span class='text-warning mr-2'><i class='fa fa-arrow-down'></i>"
				resultThisMonth=(Math.abs(resultThisMonth))
		}else if(resultThisMonth==0){
			arrow = "<span class='text-primary mr-2'><i class='fa fa-equals'></i>"
		}else{
			arrow = "<span class='text-success mr-2'><i class='fa fa-arrow-up'></i>"
		}
		
		$('#widgetProd').html("<div class='text-xs font-weight-bold text-uppercase mb-1'>Produção</div>"+
											"<div class='h5 mb-0 font-weight-bold text-gray-800'>"+thisMonth+"</div>"+
											"<div class='mt-2 mb-0 text-muted text-xs'>"+
											""+arrow+" "+resultThisMonth+"%</span>"+													
											"</div>");
		CARTACEP.usuario.widgetReading()
	}
	
	CARTACEP.usuario.incompletedCount  = function(fullYearList){
		date = new Date
		var lastMonth;
		var thisMonth;
		var countLastMonth = 0;
		var countThisMonth = 0;
		month = date.getMonth()
		year = date.getFullYear()
		if(month>0&&month<10){
			lastMonth = "0"+month
		}else{
			lastMonth = month
		}
		lastMonth = year="-"+lastMonth
		if((month+1)>0&&(month+1)<10){
			thisMonth = "0"+(month+1)
		}else{
			thisMonth = (month+1)
		}
		thisMonth = year="-"+thisMonth
		for(var i=0;i<fullYearList.length;i++){
			if(fullYearList[i].dataFinal.match(lastMonth)&&fullYearList[i].status==false){
				countLastMonth+=1
			}
			if(fullYearList[i].dataFinal.match(thisMonth)&&fullYearList[i].status==false){
				countThisMonth+=1
			}
		}
		var arrow = ""
			
			var resultThisMonth = calcularPer(countThisMonth,countLastMonth)

			if(resultThisMonth<-99){
				arrow = "<span class='text-success mr-2'><i class='fa fa-arrow-down'></i>"
					resultThisMonth=(Math.abs(resultThisMonth))
			}else if(resultThisMonth<0&&resultThisMonth>-99){
				arrow = "<span class='text-warning mr-2'><i class='fa fa-arrow-down'></i>"
					resultThisMonth=(Math.abs(resultThisMonth))
			}else if(resultThisMonth==0){
				arrow = "<span class='text-primary mr-2'><i class='fa fa-equals'></i>"
			}else{
				arrow = "<span class='text-danger mr-2'><i class='fa fa-arrow-up'></i>"
			}  
			
			
			$('#widgetIncom').html("<div class='text-xs font-weight-bold text-uppercase mb-1'>Amostras Incompletas</div>"+
												"<div class='h5 mb-0 font-weight-bold text-gray-800'>"+countThisMonth+"</div>"+
												"<div class='mt-2 mb-0 text-muted text-xs'>"+
												""+arrow+" "+resultThisMonth+"%</span>"+													
												"</div>");
	}
	CARTACEP.usuario.widgetReading = function(){
		var month
		var dateToday = new Date().getFullYear()
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "producao/getMonthlyReadingCount",
			data: "dateToday="+dateToday,
			
			success: function(data){
				data = JSON.parse(data)

				CARTACEP.usuario.showWidgetReading(data)

			},
			error: function(info){
				var a="Erro ao consultar os cadastros de usuário: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');
				Swal.fire(b);
			}
		})
		
		CARTACEP.usuario.showWidgetReading = function(listaMedicoes){
			var month = 0
			var lastMonth = 0
			var date = new Date()
			var countThisMonth = 0
			var countLastMonth = 0
			var countEspecialThisMonth = 0
			var countEspecialLastMonth = 0
			
			if(date.getMonth()>1&&date.getMonth()<9){
				lastMonth = "0"+(date.getMonth())
				month = "0"+(date.getMonth()+1)
			}else{
				lastMonth = date.getMonth()
				month = date.getMonth()+1
			}
			for(var i=0;i<listaMedicoes.length;i++){
				if(listaMedicoes[i].dataHora.match(lastMonth)){
					countLastMonth+=1
					if(listaMedicoes[i].valor<listaMedicoes[i].minimo||listaMedicoes[i].valor>listaMedicoes[i].maximo){
						countEspecialLastMonth+=1
					}	
				}
				if(listaMedicoes[i].dataHora.match(month)){
					countThisMonth+=1
					if(listaMedicoes[i].valor<listaMedicoes[i].minimo||listaMedicoes[i].valor>listaMedicoes[i].maximo){
						countEspecialThisMonth+=1
					}	
				}
							
			}
			
			/** Widget**/

			
			/**Contagem das leituras **/	
			
			var arrow = ""
			
			var resultThisMonth = calcularPer(countThisMonth,countLastMonth)

			if(resultThisMonth<-99){
				arrow = "<span class='text-danger mr-2'><i class='fa fa-arrow-down'></i>"
					resultThisMonth=(Math.abs(resultThisMonth))
			}else if(resultThisMonth<0&&resultThisMonth>-99){
				arrow = "<span class='text-warning mr-2'><i class='fa fa-arrow-down'></i>"
					resultThisMonth=(Math.abs(resultThisMonth))
			}else if(resultThisMonth==0){
				arrow = "<span class='text-primary mr-2'><i class='fa fa-equals'></i>"
			}else{
				arrow = "<span class='text-success mr-2'><i class='fa fa-arrow-up'></i>"
			}
			
			$('#widgetLeit').html("<div class='text-xs font-weight-bold text-uppercase mb-1'>Leituras</div>"+
												"<div class='h5 mb-0 font-weight-bold text-gray-800'>"+countThisMonth+"</div>"+
												"<div class='mt-2 mb-0 text-muted text-xs'>"+
												""+arrow+" "+resultThisMonth+"%</span>"+													
												"</div>");
		/**Contagem dos Especiais**/
			
			var resultThisMonthEsp = calcularPer(countEspecialThisMonth,countEspecialLastMonth)

			if(resultThisMonthEsp<-99){
				arrow = "<span class='text-success mr-2'><i class='fa fa-arrow-down'></i>"
					resultThisMonthEsp=(Math.abs(resultThisMonthEsp))
			}else if(resultThisMonthEsp<0&&resultThisMonthEsp>-99){
				arrow = "<span class='text-primary mr-2'><i class='fa fa-arrow-down'></i>"
					resultThisMonthEsp=(Math.abs(resultThisMonthEsp))
			}else if(resultThisMonthEsp==0){
				arrow = "<span class='text-warning mr-2'><i class='fa fa-equals'></i>"
			}else{
				arrow = "<span class='text-danger mr-2'><i class='fa fa-arrow-up'></i>"
			}
			$('#widgetEspec').html("<div class='text-xs font-weight-bold text-uppercase mb-1'>Especiais</div>"+
					"<div class='h5 mb-0 font-weight-bold text-gray-800'>"+countEspecialThisMonth+"</div>"+
					"<div class='mt-2 mb-0 text-muted text-xs'>"+
					""+arrow+" "+resultThisMonthEsp+"%</span>"+													
					"</div>");
		}
	}
	
	
});