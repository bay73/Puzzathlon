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
		<div id="circles">
			<a href="race.php?id=1" class="circle" style="float:left; margin-right:40px;">Test race</a>
			<a href="race.php?id=0" class="circle" style="float:left; margin-right:40px;">Mock race</a>
			<a href="#openModal3" class="circle" style="float:left; margin-right:40px;">Rating</a>
				<div id="openModal3" class="modalDialog">
					<div>
						<a href="#close" title="close" class="close">X</a>
						<h2 class="p0m0">Welcome to our site 3!</h2>
						<p><b>Lorem ipsum dolor sit amet, Nulla nec tortor. Donec id elit quis purus consectetur consequat.</b></p>
						<p>Nam congue semper tellus. Sed erat dolor, dapibus sit amet, venenatis ornare, ultrices ut, nisi. Aliquam ante. Suspendisse scelerisque dui nec velit. Duis augue augue, gravida euismod, vulputate ac, facilisis id, sem. Morbi in orci.</p>
						<p>Nulla purus lacus, pulvinar vel, malesuada ac, mattis nec, quam. Nam molestie scelerisque quam. Nullam feugiat cursus lacus.orem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero risus, commodo vitae, pharetra mollis, posuere eu, pede. Nulla nec tortor. Donec id elit quis purus consectetur consequat.</p>
					</div>
				</div>
			<a href="#openModal4" class="circle" style="float:left; margin-right:40px;">Schmating</a>
				<div id="openModal4" class="modalDialog">
					<div>
						<a href="#close" title="close" class="close">X</a>
						<h2 class="p0m0">Welcome to our site 4!</h2>
						<p><b>Lorem ipsum dolor sit amet, Nulla nec tortor. Donec id elit quis purus consectetur consequat.</b></p>
						<p>Nam congue semper tellus. Sed erat dolor, dapibus sit amet, venenatis ornare, ultrices ut, nisi. Aliquam ante. Suspendisse scelerisque dui nec velit. Duis augue augue, gravida euismod, vulputate ac, facilisis id, sem. Morbi in orci.</p>
						<p>Nulla purus lacus, pulvinar vel, malesuada ac, mattis nec, quam. Nam molestie scelerisque quam. Nullam feugiat cursus lacus.orem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero risus, commodo vitae, pharetra mollis, posuere eu, pede. Nulla nec tortor. Donec id elit quis purus consectetur consequat.</p>
					</div>
				</div>
			<a href="#openModal5" class="circle" style="float:left; margin-right:40px;">блаблабла</a>
				<div id="openModal5" class="modalDialog">
					<div>
						<a href="#close" title="close" class="close">X</a>
						<h2 class="p0m0">Welcome to our site 5!</h2>
						<p><b>Lorem ipsum dolor sit amet, Nulla nec tortor. Donec id elit quis purus consectetur consequat.</b></p>
						<p>Nam congue semper tellus. Sed erat dolor, dapibus sit amet, venenatis ornare, ultrices ut, nisi. Aliquam ante. Suspendisse scelerisque dui nec velit. Duis augue augue, gravida euismod, vulputate ac, facilisis id, sem. Morbi in orci.</p>
						<p>Nulla purus lacus, pulvinar vel, malesuada ac, mattis nec, quam. Nam molestie scelerisque quam. Nullam feugiat cursus lacus.orem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero risus, commodo vitae, pharetra mollis, posuere eu, pede. Nulla nec tortor. Donec id elit quis purus consectetur consequat.</p>
					</div>
				</div>
		</div>
	</footer>
</body>
</html>
