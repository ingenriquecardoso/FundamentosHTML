$(function(){
console.log("probando");
  $('#login-form').submit(function login(event){
    var username = $('#login-form').find('#username').val();
    var passw = $('#login-form').find('#passw').val();
    event.preventDefault();

    $.ajax({
      url: 'server/login.php',
      type: 'POST',
      dataType: "json",
      cache: false,
      data: {username: username, passw: passw},
      
      success: function(php_response){
        if (php_response.conexion=="OK") {
            if (php_response.acceso == 'concedido') {
            window.location.href = './server/index.php?usuario=' + php_response.usuario;
			 
			
            //alert(php_response.usuario);
            //alert(php_response.clave);
          }else {
            alert('Usuario y contraseña incorrectos, inténtelo de nuevo');
          }
        }else{
			console.log("Entra 5");  
          alert(php_response.conexion);
        }
      },
      error: function(){
		  console.log("prueba123");
        alert("error en la comunicación con el servidor");

      }
    });

  });

})
