<?php
require_once('php/profile.php');
header('Content-type: text/html; charset=utf-8');
$id = $_REQUEST["id"];
?>
<!DOCTYPE html>
<html>
<head>
   <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
   <title>
      Puzzathlon
   </title>
   <script src="js/jquery-1.9.1.min.js"></script>
   <script src="js/jquery-ui.min.js"></script>
   <script src="js/jcanvas.min.js"></script>
   <script src="js/puzzathlon.js"></script>
   <script src="js/md5-min.js"></script>
</head>
<body style="font-family: 'Comic Sans MS', Calibri, Sans-serif;">
<script>
<?php
   if($id > 0 && !$fs_global_logged){
      echo 'alert("You should register to access this race!");';
   }else{
      echo '$().ready(function(){puzzathlon.init($("body"),{raceId:'.$id.'});});';
   }
?>
</script>
</body>
</html>