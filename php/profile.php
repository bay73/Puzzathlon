<?php
/*
Файл, обеспечивающий проверку соединения и профилирование пользователя.
Должен быть включен первой строкой во все php-файлы
*/
session_start();
// Turn off magic_quotes_runtime
set_magic_quotes_runtime(0);

// Strip slashes from GET/POST/COOKIE (if magic_quotes_gpc is enabled)
if (get_magic_quotes_gpc())
{
	function stripslashes_array($array)
	{
		return is_array($array) ? array_map('stripslashes_array', $array) : stripslashes($array);
	}

  $_REQUEST = stripslashes_array($_REQUEST);
	$_GET = stripslashes_array($_GET);
	$_POST = stripslashes_array($_POST);
	$_COOKIE = stripslashes_array($_COOKIE);
}


checkLogin();

// Функция проверки соединени
function checkLogin(){
  global $fs_global_logged, $fs_global_displayname, $fs_global_userid;
  $fs_global_logged = false;
  // берем параметры сессии
  if (empty($_SESSION['login']) or empty($_SESSION['password'])){
     if(isset($_COOKIE['login']) and isset($_COOKIE['password'])){
       $_SESSION['login'] = $_COOKIE['login'];
       $_SESSION['password'] = $_COOKIE['password'];
     }
  }

  if (!empty($_SESSION['login']) and !empty($_SESSION['password']))
  {
    $login = $_SESSION['login'];
    $pass = $_SESSION['password'];
    $login = stripslashes($login);
    $login = htmlspecialchars($login);
    $login = trim($login);
    $pass = stripslashes($pass);
    $pass = htmlspecialchars($pass);
    $pass = trim($pass);
    $storepass = getStorePassword($login, $pass);
    require('database.php');
    // проверяем наличие пользователя в базе
    $result = mysql_query("SELECT id, displayname FROM fs_users WHERE username='".mysql_real_escape_string($login)."' and password='".$storepass."'", $db);
    $myrow = mysql_fetch_array($result);
    if (!empty($myrow['id'])){
       // если найден, то выставляем глобальные переменные
       $fs_global_logged = true;
       $fs_global_displayname = $myrow['displayname'];
       $fs_global_userid = $myrow['id'];
    }
  }
}

// функция для вычисления хранимого хэша пароляы
function getStorePassword($login, $pass){
   return md5($login.$pass);
}

function checkAccess($role) {
  global $fs_global_logged, $fs_global_userid;
  if(!$fs_global_logged) return false;
  require('database.php');
  $result = mysql_query("SELECT * FROM fs_userroles WHERE user_id=".$fs_global_userid." and rolename='".mysql_real_escape_string($role)."'", $db);
  $myrow = mysql_fetch_array($result);
  if (!empty($myrow['user_id'])){
     return true;
  }
  return false;
}
?>
