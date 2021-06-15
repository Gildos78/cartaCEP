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
		console.log(arrayCount)
		
		 var MeSeContext = document.getElementById("MeSeStatusCanvas").getContext("2d");
	    var MeSeData = {
	        labels: [
	            "ME",
	            "SE"
	        ],
	        datasets: [
	            {
	                label: "Test",
	                data: [100, 75],
	                backgroundColor: ["#669911", "#119966" ],
	                hoverBackgroundColor: ["#66A2EB", "#FCCE56"]
	            }]
	    };

	var MeSeChart = new Chart(MeSeContext, {
	    type: 'horizontalBar',
	    data: MeSeData,
	    options: {
	        scales: {
	            yAxes: [{
	                stacked: true
	            }]
	        }

	    }
	});
	};
	
});