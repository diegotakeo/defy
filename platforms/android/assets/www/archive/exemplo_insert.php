<?php


		// DATABASE -----> GET PERFIL DO USUÁRIO
		include 'config.php';
		$query = $database->prepare('INSERT INTO comments (id_post, id_autor, content) 
									 VALUES (' . $_POST['id_post'] .',' . $_POST['id_autor'] .',' . $_POST['content']);
		$query->execute();

		echo 'deu tudu certo!';
?> 