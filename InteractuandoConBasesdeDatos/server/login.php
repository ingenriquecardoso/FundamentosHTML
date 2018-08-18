<?php
include('./conector.php');
$conector = new ConectorBD("localhost","leca","Angela1");
$response['conexion'] = $conector->initConexion('agenda_db');

if ($response['conexion'] == 'OK') {

$resultado_consulta = $conector->consultar(['usuarios'],['email', 'psw'], 'WHERE email="'.$_POST['username'].'" AND psw="'.$_POST['passw'].'"');

 if ($resultado_consulta->num_rows > 0) {
 $response['acceso'] = 'concedido';
 $response['usuario'] = $_POST["username"];
 $response['clave'] = $_POST["passw"];

 }else{
 $response['acceso'] = 'rechazado';
 }
}else{
  $response['conexion'] ='fallida';
}
echo json_encode($response);

?>
