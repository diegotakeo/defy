<?php


		// DATABASE -----> GET PERFIL DO USUÁRIO
		include 'config.php';
		$query = $database->prepare('SELECT * FROM comments WHERE id_posts='.$GET['posts']);
		$query->execute();

		while ($stuff = $query->fetch()) {
			echo '{	"id": ' 		. $stuff['id'] .', 
					"nickname": ' 	. $stuff['nickname'] .', 
					"name": ' 		. $stuff['name'] .', 
					"descricao": ' 	. $stuff['descricao'] .', 
					"title_u": ' 	. $stuff['title_u'] .', 
					"badge_u": ' 	. $stuff['badge_u'] .', 
					"img": ' 		. $stuff['img'] .', 
					"lv": ' 		. $stuff['lv'] .', 
					"xp": ' 		. $stuff['xp'] .', 
					"followings": ' . $stuff['followings'] .', 
					"followers": ' 	. $stuff['followers'] .', 
					"visualisacoes": ' . $stuff['visualisasoes'] .', 
					"privado": ' 	. $stuff['privado'] .', 
				}';
		}
		
		// EXEMPLO JSON { "name":"John", "age":31, "city":"New York" };
		
?>