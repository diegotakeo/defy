CREATE DATABASE DEFY; 
USE DEFY;

CREATE TABLE usuario (
	id INT NOT NULL IDENTITY PRIMARY KEY,
	nickname VARCHAR(20),
	name VARCHAR(50),
	descricao VARCHAR(140),
	title_u INT FOREIGN KEY REFERENCES title(id),
	badge_u INT FOREIGN KEY REFERENCES badge(id),
	img VARCHAR(20),
	lv TINYINT,
	xp TINYINT,
	followings CHAR(4),
	followers CHAR(4),
	visualisacoes CHAR(4),
	privado BIT,
)

-----------------------------------------------------------------------------------
CREATE TABLE follows (
	id INT NOT NULL IDENTITY PRIMARY KEY,
	id_follower INT NOT NULL FOREIGN KEY REFERENCES usuario(id),
	id_followering INT NOT NULL FOREIGN KEY REFERENCES usuario(id),
)-----------------------------------------------------------------------------------

CREATE TABLE challenge (
	id INT NOT NULL IDENTITY PRIMARY KEY,
	id_categoria INT NOT NULL FOREIGN KEY REFERENCES categoria(id),
	name VARCHAR(40) NOT NULL,
	difficulty TINYINT,
	description VARCHAR(255),
	img VARCHAR(20),
	category VARCHAR(20),
	autor_nickname VARCHAR(20) NULL,
	post_date DATETIME,
)

CREATE TABLE post (
	id INT NOT NULL IDENTITY PRIMARY KEY,
	id_user INT NOT NULL FOREIGN KEY REFERENCES usuario(id),
	id_challenge INT NOT NULL FOREIGN KEY REFERENCES challenge(id),
	content VARCHAR(140) NOT NULL,
	category VARCHAR(20),
	view_count INT,
	like_count INT,
	dislike_count INT,
	post_date DATETIME,
	approved BIT,
	localization VARCHAR(80)
)

-----------------------------------------------------------------------------------
CREATE TABLE liked_post (
	id INT NOT NULL IDENTITY PRIMARY KEY,
	id_post INT NOT NULL FOREIGN KEY REFERENCES post(id),
	id_user INT NOT NULL FOREIGN KEY REFERENCES usuario(id),
	status TINYINT NULL
)
-----------------------------------------------------------------------------------

CREATE TABLE comments (
	id INT NOT NULL IDENTITY PRIMARY KEY,
	id_post INT NOT NULL FOREIGN KEY REFERENCES post(id),
	id_author INT NOT NULL FOREIGN KEY REFERENCES usuario(id),
	content VARCHAR(140) NOT NULL
)

CREATE TABLE badge (
	id INT NOT NULL IDENTITY PRIMARY KEY,
	url VARCHAR(20),
	name VARCHAR(20)
)

CREATE TABLE badge_user (
	id INT NOT NULL IDENTITY PRIMARY KEY,
	id_badge INT NOT NULL FOREIGN KEY REFERENCES badge(id),
	id_user INT NOT NULL FOREIGN KEY REFERENCES usuario(id)
)

CREATE TABLE title (
	id INT NOT NULL IDENTITY PRIMARY KEY,
	name VARCHAR(50),
	description VARCHAR(140),
)

CREATE TABLE title_user (
	id INT NOT NULL PRIMARY KEY,
	id_user INT NOT NULL FOREIGN KEY REFERENCES usuario(id),
	id_title INT NOT NULL FOREIGN KEY REFERENCES title(id)
)

CREATE TABLE contadores (
	id INT NOT NULL PRIMARY KEY,
	id_user INT NOT NULL FOREIGN KEY REFERENCES usuario(id),
	qtd_posts INT,
	qtd_posts_easy INT,
	qtd_posts_medium INT,
	qtd_posts_hard INT,
	qtd_comments INT,
	qtd_likes_given INT,
	qtd_likes_received INT,
	playtime TIME
)

CREATE TABLE categoria(
	id INT NOT NULL PRIMARY KEY,
	name VARCHAR(20) NOT NULL,
	img VARCHAR(20) NOT NULL
)

CREATE TABLE contador_categoria (
	id_user INT NOT NULL FOREIGN KEY REFERENCES usuario(id),
	categoria INT NOT NULL FOREIGN KEY REFERENCES categoria(id),
	count INT,
	PRIMARY KEY(id_user, categoria)
)
