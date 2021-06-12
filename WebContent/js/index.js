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
			
			month = "0"+date.getMonth()
		}else{
			month = date.getMonth()
		}
		var date30DaysPrior = date.getFullYear()+"-"+month+"-"+day
		alert(date30DaysPrior)
		$.ajax({
			type: "GET",
			url: CARTACEP.PATH + "producao/getListProduction",
			data: "date="+date30DaysPrior,
			success: function(usuario){

			},
			error: function(info){
				var a="Erro ao consultar os cadastros de usuário: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');
				Swal.fire(b);
			}
		})
		
		
		
	};
	
	CARTACEP.usuario.getMonthlyDate()
	CARTACEP.usuario.getData = function(){
		
	};
	
});