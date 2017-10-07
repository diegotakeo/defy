

	CREATE TABLE badge (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		url VARCHAR(20),
		name VARCHAR(20)
	);


	CREATE TABLE title (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(50),
		description VARCHAR(140)
	);

	CREATE TABLE usuario (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		nickname VARCHAR(20),
		name VARCHAR(50),
		descricao VARCHAR(140),
		user_title INT,
		user_badge INT,
		img VARCHAR(20),
		lv TINYINT,
		xp TINYINT,
		followings CHAR(4),
		followers CHAR(4),
		visualisacoes CHAR(4),
		privado BIT,
		CONSTRAINT fk_user_title FOREIGN KEY (user_title) REFERENCES title(id),
		CONSTRAINT fk_user_badge FOREIGN KEY (user_badge) REFERENCES badge(id)
	);

	CREATE TABLE title_user (
		id INT NOT NULL PRIMARY KEY,
		id_user INT NOT NULL,
		id_title INT NOT NULL,
		CONSTRAINT fk_title_user_id_user FOREIGN KEY (id_user) REFERENCES usuario(id),
		CONSTRAINT fk_title_user_id_title FOREIGN KEY (id_title) REFERENCES title(id)
	);

	CREATE TABLE badge_user (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		id_badge INT NOT NULL,
		id_user INT NOT NULL,
		CONSTRAINT fk_badge_user_id_badge FOREIGN KEY (id_badge) REFERENCES badge(id),
		CONSTRAINT fk_bagde_user_id_user FOREIGN KEY (id_user) REFERENCES usuario(id)
	);

	CREATE TABLE follows (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		id_follower INT NOT NULL,
		id_followering INT NOT NULL,
		CONSTRAINT fk_follows_id_follower FOREIGN KEY (id_follower) REFERENCES usuario(id),
		CONSTRAINT fk_follows_id_followering FOREIGN KEY (id_followering) REFERENCES usuario(id)
	);


	CREATE TABLE categoria(
		id INT NOT NULL PRIMARY KEY,
		name VARCHAR(20) NOT NULL,
		img VARCHAR(20) NOT NULL
	);


	CREATE TABLE challenge (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		id_categoria INT NOT NULL,
		name VARCHAR(40) NOT NULL,
		difficulty TINYINT,
		description VARCHAR(255),
		img VARCHAR(20),
		category VARCHAR(20),
		autor_nickname VARCHAR(20) NULL,
		post_date DATETIME,
		CONSTRAINT fk_challenge_id_categoria FOREIGN KEY (id_categoria) REFERENCES categoria(id)
	);

	CREATE TABLE post (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		id_user INT NOT NULL,
		id_challenge INT NOT NULL,
		content VARCHAR(140) NOT NULL,
		category VARCHAR(20),
		view_count INT,
		like_count INT,
		dislike_count INT,
		post_date DATETIME,
		approved BIT,
		localization VARCHAR(80),
		CONSTRAINT fk_post_id_user FOREIGN KEY (id_user) REFERENCES usuario(id),
		CONSTRAINT fk_post_id_challenge FOREIGN KEY (id_challenge) REFERENCES challenge(id)
	);

	CREATE TABLE liked_post (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		id_post INT NOT NULL,
		id_user INT NOT NULL,
		status TINYINT NULL,
		CONSTRAINT fk_liked_post_id_post FOREIGN KEY (id_post) REFERENCES post(id),
		CONSTRAINT fk_liked_post_id_user FOREIGN KEY (id_user) REFERENCES usuario(id)
	);

	CREATE TABLE comments (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		id_post INT NOT NULL,
		id_author INT NOT NULL,
		content VARCHAR(140) NOT NULL,
		CONSTRAINT fk_comments_id_post FOREIGN KEY (id_post) REFERENCES post(id),
		CONSTRAINT fk_comments_id_author FOREIGN KEY (id_author) REFERENCES usuario(id)
	);


	CREATE TABLE contadores (
		id INT NOT NULL PRIMARY KEY,
		id_user INT NOT NULL,
		qtd_posts INT,
		qtd_posts_easy INT,
		qtd_posts_medium INT,
		qtd_posts_hard INT,
		qtd_comments INT,
		qtd_likes_given INT,
		qtd_likes_received INT,
		playtime TIME,
		CONSTRAINT fk_contadores_id_user FOREIGN KEY (id_user) REFERENCES usuario(id)
	);
	CREATE TABLE contador_categoria (
		id_user INT NOT NULL,
		categoria INT NOT NULL,
		count INT,
		PRIMARY KEY(id_user, categoria),
		CONSTRAINT fk_contador_categoria_id_user FOREIGN KEY (id_user) REFERENCES usuario(id),
		CONSTRAINT fk_contador_categoria_categoria FOREIGN KEY (categoria) REFERENCES categoria(id)
	);
