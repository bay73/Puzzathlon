<?php
require_once('profile.php');
require_once('recaptchalib.php');

$message = stripslashes($_REQUEST["message"]);

if ($fs_global_logged){
   mail("support@forsmarts.com", "Report of puzzathlon problem from ".$fs_global_displayname, $message);
}else{
   mail("support@forsmarts.com", "Report of puzzathlon problem from unregistered user", $message);
}
?>
