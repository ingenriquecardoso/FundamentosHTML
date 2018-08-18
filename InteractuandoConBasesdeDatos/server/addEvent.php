<?php

require_once('bdd.php');
require_once('./conector.php');

//echo $_POST['title'];
if (isset($_POST['title']) && isset($_POST['start']) && isset($_POST['end']) && isset($_POST['color'])){
	
	$usuario = $_GET['usuario'];
	$conector = new ConectorBD("localhost","leca","Angela1");
	$conector->initConexion('agenda_db');
	$title = $_POST['title'];
	$start = $_POST['start'];
	$end = $_POST['end'];
	$color = $_POST['color'];

	
$resultado_consulta = $conector->consultar(['usuarios'],['id_usuario'], " WHERE email='" . $usuario . "' ");
if ($resultado_consulta->num_rows > 0) {
	echo "entró " . $resultado_consulta->num_rows;
	$fila = mysqli_fetch_array($resultado_consulta);
	
	$IdUsuario = $fila[0];
	
	$sql = "INSERT INTO events(id_usuario,title, start, end, color) values ('$IdUsuario','$title', '$start', '$end', '$color')";
	
	
	$query = $bdd->prepare( $sql );
	if ($query == false) {
	 print_r($bdd->errorInfo());
	 die ('Erreur prepare');
	}
	$sth = $query->execute();
	if ($sth == false) {
	 print_r($query->errorInfo());
	 die ('Erreur execute');
	}

}
}
echo "0";
header('Location: '.$_SERVER['HTTP_REFERER']);

	
?>
