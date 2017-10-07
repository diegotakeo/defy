<?php
	session_start();
	require_once 'Facebook/autoload.php';
	
	$fb = new \Facebook\Facebook([
	'app_id' => '204900356712434',
	'app_secret' => '772555a1825159db7d349f6c63ecf336',
	'default_graph_version' => 'v2.10',
	//'default_access_token' => '{access-token}', // optional
]);
?>