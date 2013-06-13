		<div id="circles">
			<a href="race.php?id=1" class="circle" style="float:left; margin-right:40px;">Test race</a>
			<a href="race.php?id=0" class="circle" style="float:left; margin-right:40px;">Mock race</a>
			<a href="#openModal3" class="circle" style="float:left; margin-right:40px;"></a>
				<div id="openModal3" class="modalDialog">
					<div>
						<a href="#close" title="close" class="close">X</a>
						<h2 class="p0m0">Sorry but this function is not working yet!</h2>
						<p align=left>We are working on extending functionality of our site and soon you could find here some new stuff.</p>
						<p align=left>Wait please.</p>
					</div>
				</div>
			<a href="index.php" class="circle" style="float:left; margin-right:40px;">Start page</a>
			<a href="#reportProblem" class="circle" style="float:left; margin-right:40px;">Report a problem</a>
				<div id="reportProblem" class="modalDialog">
					<div>
						<script>
							function postProblem(){
								$.post('php/postproblem.php', {message: $('#probelmText').val()}, function(){alert('Report is posted. Thank you!');} );
							}
						</script>
						<a href="#close" title="close" class="close">X</a>
						<h2 class="p0m0">Report a problem</h2>
						<p align=left><b>Write your message here and press Submit.</b></p>
						<br>
						<textarea id="probelmText"></textarea>
						<br>
						<button onclick="postProblem(); location.href='#close';">Submit</button>
					</div>
				</div>
		</div>
