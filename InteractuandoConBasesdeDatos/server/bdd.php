<?php
try
{
	$bdd = new PDO('mysql:host=localhost;dbname=agenda_db;charset=utf8', 'leca', 'Angela1');
}
catch(Exception $e)
{
        die('Erreur : '.$e->getMessage());
}
