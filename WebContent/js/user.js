CARTACEP = new Object();
CARTACEP.usuario = new Object();

$(document).ready (function(){

	CARTACEP.PATH = "/CartaCEP/rest/";
	
	CARTACEP.usuario.verifyEmail = function(){
		event.preventDefault();
		var errorMessage = "";
		var email = true
		var checkEmail = true;
		var valorBusca = $("#exampleInputEmail").val();
		var nome =  document.frmSignIn.exampleInputFirstName.value;
		var expRegNome = new RegExp(/[A-zÀ-ü]{3,}([ ]{1}[A-zÀ-ü]{2,})|([A-zÀ-ü]{3,})+$/);
			if (!expRegNome.test(nome)){
				 errorMessage = "<br />Preencha o campo Nome corretamente.";
				document.frmSignIn.exampleInputFirstName.focus();
				$("#errorName").html(errorMessage);
				return false;
			}else{
				errorMessage = ""
					$("#errorName").html(errorMessage);
			}
			var sen = document.frmSignIn.exampleInputPassword.value;
			var expRegMat = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);
			
			if (!expRegMat.test(sen)){
				errorMessage = "<br/>Preencha o campo Senha com o mínimo de 6 caracteres com números e letras.";
				document.frmSignIn.exampleInputPassword.focus();
				$("#errorPass1").html(errorMessage);
				return false;
			}else{
				errorMessage = ""
					$("#errorPass1").html(errorMessage);
			}
			if(document.frmSignIn.exampleInputEmail.value==""){
				errorMessage = "<br/>Por favor, informe um E-MAIL válido!";
				document.frmSignIn.exampleInputEmail.focus();
				$("#errorEmail").html(errorMessage);
			}else
			if(!document.frmSignIn.exampleInputEmail.value==""){
				if(   document.frmSignIn.exampleInputEmail.value=="" 
					   || document.forms[0].exampleInputEmail.value.indexOf('@')==-1 
					     || document.forms[0].exampleInputEmail.value.indexOf('.')==-1 )
						{
					errorMessage = "<br/>Por favor, informe um E-MAIL válido!";
					
					$("#errorEmail").html(errorMessage);
					email=false;
						  return false;
						}
				}
		if( document.frmSignIn.exampleInputPasswordRepeat.value!==sen){
			errorMessage = "<br/>As senhas têm que ser iguais.";
			$("#errorPass1").html(errorMessage);
		}else{
			errorMessage = ""
				$("#errorPass1").html(errorMessage);
		}	
		if (!document.frmSignIn.exampleInputEmail.value ==""){
			$.ajax({
				type: "GET",
				url: CARTACEP.PATH + "usuario/verificarEmail",
				data: "valorBusca="+valorBusca,
				success: function(listaDeEmails){
					listaDeEmails = JSON.parse(listaDeEmails);
					for(var i=0; i<listaDeEmails.length; i++){
						
						if(listaDeEmails[i].email!=valorBusca){
						}else{								
							checkEmail = false;
						}

					}
					if(checkEmail==true){
						CARTACEP.usuario.cadastrar();
					}else{
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: "Email já cadastrado",
						})
					}

				},
				error: function(info){
					Swal.fire("Erro ao consultar o usuário: "+info.status+" - "+info.statusText);
				}
			});
		}	
	}
	
	
	
	
	CARTACEP.usuario.cadastrar = function(){

		var passCad = document.frmSignIn.exampleInputPassword.value;
		var emBase64Cad = btoa(passCad);
		var usuario = new Object();
		usuario.nome = document.frmSignIn.exampleInputFirstName.value;
		usuario.senha = emBase64Cad;
		usuario.email = document.frmSignIn.exampleInputEmail.value;
				
				$.ajax({
					type: "POST",
					url: CARTACEP.PATH + "usuario/inserir",
					data:JSON.stringify(usuario),
					success:function(msg){
						  $('#frmSignIn').trigger("reset")
						var b = msg.replace(/['"]+/g, '');
						Swal.fire({
							  text: b,
							  icon: 'success',
							  confirmButtonColor: '#3085d6',
							  confirmButtonText: 'OK'
							}).then((result) => {
							  if (result.isConfirmed) {
								
							  window.location.href = "index.html";
							  }
							})
					},
					error:function(info){
						Swal.fire(info);
						}
				});	
	};
})
	
	