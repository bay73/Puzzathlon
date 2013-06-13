<?php
require_once('php/profile.php');
header('Content-type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Welcome to Puzzathlon!</title>
<meta name="description" content="Puzzathlon" />
<meta name="keywords" content="Puzzathlon" />
<link rel="stylesheet" href="css/style.css" />
</head>
<body>
	<div id="wrapper">
		<div id="wrap">

		<header>
			<nav>
				<ul>
					<li>
                  <?php
                  if($fs_global_logged){
                     echo '<p>Welcome, '.$fs_global_displayname.'</p>';
                     echo '<p><a href="logout.php">Log out</a></p>';
                  }else{
                     echo '<script src="//ulogin.ru/js/ulogin.js"></script>';
                     echo '<div id="uLogin" data-ulogin="display=small;fields=first_name,last_name;providers=facebook,twitter,google,livejournal;hidden=other;redirect_uri=http%3A%2F%2Fforsmarts.com%2Fpuzzathlonbeta%2Flogin.php"></div>';
                  }
                  ?>


               </li>
				</ul>
			</nav>
		</header>

		<section>
			<div id="zagol"><h1>Puzzathlon</h1></div>
			<article>
				<h2 class="p0m0">Puzzathlon</h2>
				<p>Do you know what biathlon is? Spectacular winter sport which combines two disciplines, skiing and shooting. </p>
				<p>Puzzathlon is biathlon for the brains, challenging innovative game for curious and smart minds.</p>
				<p>Join the game and ready set go!</p>
				<ul>
				<li> solve the puzzles of different kinds and origin
				<li> make brilliant logical shooting
				<li> participate in tournament
				<li> win!
				</ul>
			</article>
		</section>

		</div>

	</div>

	<div class="clearfix"></div>

	<footer>
<?php
require_once('php/menu.php');
?>
	</footer>
</body>
</html>
