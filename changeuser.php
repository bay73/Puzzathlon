<?php
require_once('php/profile.php');
if(!$fs_global_userid){
   die("You have no access to this page!");
}

$b_Save=true;
$username = stripslashes($_REQUEST["username"]);
$username = htmlspecialchars($username);
$username = trim($username);
if(strlen($username) == 0) {$username_error = 'Username cannot be empty'; $b_Save = false;}

$passwordone = stripslashes($_REQUEST["passwordone"]);
$passwordone = htmlspecialchars($passwordone);
$passwordone = trim($passwordone);

$confirmpassword = stripslashes($_REQUEST["confirmpassword"]);
$confirmpassword = htmlspecialchars($confirmpassword);
$confirmpassword = trim($confirmpassword);
if($passwordone != $confirmpassword) {$confirmpassword_error = 'Password confirmation does not match'; $b_Save = false;}

$displayname = stripslashes($_REQUEST["displayname"]);
if(empty($displayname)) {$displayname = $username;}

$email = stripslashes($_REQUEST["email"]);

$oldpassword = stripslashes($_REQUEST["oldpassword"]);
$oldpassword = htmlspecialchars($oldpassword);
$oldpassword = trim($oldpassword);

require('php/database.php');
$result = mysql_query("SELECT username, password FROM fs_users WHERE id=".$fs_global_userid."", $db);
$myrow = mysql_fetch_array($result);
$storepass = getStorePassword($myrow['username'], $oldpassword);
if($storepass!=$myrow['password']){$oldpassword_error='Wrong password'; $b_Save=false;}

if($b_Save){
  $result = mysql_query("SELECT id FROM fs_users WHERE username='".mysql_real_escape_string($username)."' AND id!=".$fs_global_userid."", $db);
  $myrow = mysql_fetch_array($result);
  if (!empty($myrow['id'])) {$username_error='Username already exists'; $b_Save=false;}
}

if($b_Save){
   if(strlen($passwordone) == 0) {$newpassword = $oldpassword;} else {$newpassword = $passwordone;}
   $storepass = getStorePassword($username, $newpassword);
/*
   $result2 = mysql_query ("UPDATE fs_users SET username = '".mysql_real_escape_string($username)."', password = '$storepass', "+
*/
   $result2 = mysql_query ("UPDATE fs_users SET username = '".mysql_real_escape_string($username)."', password = '".$storepass."', ".
                                                "displayname = '".mysql_real_escape_string($displayname)."', email = '".mysql_real_escape_string($email)."' ".
                             "WHERE id=".$fs_global_userid."", $db);
   if ($result2 != 'TRUE') {$username_error = 'Error during registration. Try again.'.mysql_error($db); $b_Save = false;}
}

if($b_Save){
   $_SESSION['login'] = $username;
   $_SESSION['password'] = $newpassword;
   checkLogin();
}
require_once('index.php');
?>
