<?php
   session_start();
   $_SESSION['login'] = $_REQUEST["logonusername"];
   $_SESSION['password'] = $_REQUEST["logonpassword"];
   setcookie('login', $_REQUEST["logonusername"], time()+9999999);
   setcookie('password', $_REQUEST["logonpassword"], time()+9999999);
   $next = $_REQUEST["logonnextpage"];
   if($next) {
      require_once( $next);
   }
?>
