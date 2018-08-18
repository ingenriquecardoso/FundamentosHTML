<?php
require('conector.php');

session_start();

if(isset($_SESSION['username'])){
    $con = new conectorDB('localhost','t_usuario_crear', '12345678');
    if($con->initConexion('transporte_db')=='OK'){
        $resultado = $con->consultar(['usuario'], ['nombre', 'id'], "WHERE email='".$SESSION['username']."'");
        $fila = $resultado->fetch_assoc();
        $response['nombre']=$fila['nombre'];
        
        $resultado = $con->getViajesUsuario('id')
        $i=0;
        while ($fila = $resultado->fetch_assoc()){
            $response['infoViajes'][$i]['ciudad_origen']=$fila['ciudad_origen'];
            $response['infoViajes'][$i]['ciudad_destino']=$fila['ciudad_destino'];
            $response['infoViajes'][$i]['placa']=$fila['placa'];
            $response['infoViajes'][$i]['fabricante']=$fila['fabricante'];
            $response['infoViajes'][$i]['referencia']=$fila['referencia'];
            $response['infoViajes'][$i]['fecha_salida']=$fila['fecha_salida'];
            $response['infoViajes'][$i]['fecha_llegada']=$fila['fecha_llegada'];
            $response['infoViajes'][$i]['hora_salida']=$fila['hora_salida'];
            $response['infoViajes'][$i]['hora_llegada']=$fila['hora_llegada'];
            $i++;
        }
        $response['msg'] = 'OK';
        
    }else{
        $response['msg'] = 'NO se ha iniciado ninguna sesion';
    }
    
    echo json_enconde($response);
}



?>