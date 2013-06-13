<?php
require_once('profile.php');

$message = stripslashes($_REQUEST["message"]);

if ($fs_global_logged){
   mail("forsmarts@gmail.com", "Report of puzzathlon problem from ".$fs_global_displayname, $message);
}else{
   mail("forsmarts@gmail.com", "Report of puzzathlon problem from unregistered user", $message);
}
?>
