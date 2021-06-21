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

	CARTACEP.usuario.getMonthlyDate = function(){
		var day
		var month
		var date = new Date(new Date().setDate(new Date().getDate() - 30));
		if(date.getDate()>1&&date.getDate()<9){
			alert(date.getDate())
			day = "0"+date.getDate()
		}else{
			day = date.getDate()
		}
		if(date.getMonth()>1&&date.getMonth()<9){

			month = "0"+(date.getMonth()+1)
		}else{
			month = date.getMonth()+1
		}
		var date30DaysPrior = date.getFullYear()+"-"+month+"-"+day
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
					
					CARTACEP.usuario.monthlyChart()
					console.log(data)
				},
				error: function(info){
					var a="Erro ao consultar os cadastros de usuário: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');
					Swal.fire(b);
				}
			})		
		
	};	
	CARTACEP.usuario.monthlyChart = function(){
var dataa = [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0]
		
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
					data: [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
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
							maxTicksLimit: 5,
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
	}
});