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

		
		

	};	
});