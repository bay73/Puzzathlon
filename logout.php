<?php
   session_start();
   $_SESSION['login'] = "";
   $_SESSION['password'] = "";
   setcookie('login', "", time()+9999999);
   setcookie('password', "", time()+9999999);
   $_COOKIE['login'] = "";
   $_COOKIE['password'] = "";
   require_once('index.php');
?>
