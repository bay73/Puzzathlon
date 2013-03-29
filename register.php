<?php
require_once('php/profile.php');
require_once('php/recaptchalib.php');

$b_Register=true;
$username = stripslashes($_REQUEST["username"]);
$username = htmlspecialchars($username);
$username = trim($username);
$passwordone = stripslashes($_REQUEST["passwordone"]);
$passwordone = htmlspecialchars($passwordone);
$passwordone = trim($passwordone);
$confirmpassword = stripslashes($_REQUEST["confirmpassword"]);
$confirmpassword = htmlspecialchars($confirmpassword);
$confirmpassword = trim($confirmpassword);
if(strlen($username) == 0) {$username_error = 'Username cannot be empty'; $b_Register = false;}
$displayname = stripslashes($_REQUEST["displayname"]);
if(empty($displayname)) {$displayname = $username;}
if(strlen($passwordone) == 0) {$password_error = 'Password cannot be empty'; $b_Register = false;}
if($passwordone != $confirmpassword) {$confirmpassword_error = 'Password confirmation does not match'; $b_Register = false;}
$email = stripslashes($_REQUEST["email"]);

$privatekey = "6LddJ8cSAAAAABNT7Isp8I5ArwPkGFlGeM9hCq4l";
$resp = recaptcha_check_answer ($privatekey,
                                $_SERVER["REMOTE_ADDR"],
                                $_REQUEST["recaptcha_challenge_field"],
                                $_REQUEST["recaptcha_response_field"]);

if (!$resp->is_valid) {$captcha_error = 'Words entered incorrectly'; $b_Register = false;}

if($b_Register){
  require('php/database.php');
  $result = mysql_query("SELECT id FROM fs_users WHERE username='".mysql_real_escape_string($username)."'", $db);
  $myrow = mysql_fetch_array($result);
  if (!empty($myrow['id'])) {$username_error='Username already exists'; $b_Register=false;}
}
if($b_Register){
   $storepass = getStorePassword($username, $passwordone);
   $result2 = mysql_query ("INSERT INTO fs_users (username,password,displayname,email) VALUES('".mysql_real_escape_string($username)."','$storepass','".mysql_real_escape_string($displayname)."','".mysql_real_escape_string($email)."')", $db);
   if ($result2 != 'TRUE') {$username_error = 'Error during registration. Try again.'; $b_Register = false;}
}

if(!$b_Register)
   require_once('registerpage.php');
else {
   $_SESSION['login'] = $username;
   $_SESSION['password'] = $passwordone;
   checkLogin();
   require_once('index.php');
}
?>
