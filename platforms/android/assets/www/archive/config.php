<?php
	$host 	= 'localhost';
	$dbname = 'defy';
	$user 	= 'root';
	$pass 	= '';
	

	$database = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
	$query = $database->prepare("SET NAMES utf8;");
	$query->execute();


?>