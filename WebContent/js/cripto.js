function validaCampos(){

var pass = document.loginFrm.exampleInputPassword.value;
var dados = document.getElementById("exampleInputEmail").value;
sessionStorage.setItem('email', dados );
// Convertendo para Base64
	
var emBase64 = btoa(pass);
document.loginFrm.exampleInputPassword.value=emBase64

}
