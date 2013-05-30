<?php
   require_once('php/profile.php');
   session_start();
   $s = file_get_contents('http://ulogin.ru/token.php?token=' . $_POST['token'] . '&host=' . $_SERVER['HTTP_HOST']);
   $user = json_decode($s, true);
   $fs_name = stripslashes($user['first_name'].' '.$user['last_name']);
   $fs_identity = stripslashes($user['identity']);
   
   require('php/database.php');
   $query = "SELECT id,username,displayname FROM fs_users WHERE username='".mysql_real_escape_string($fs_identity)."'";
   $result = mysql_query($query, $db);
   $myrow = mysql_fetch_array($result);
   if (empty($myrow['id'])) {
      $b_Register = true;
      $username = $fs_identity;
      $displayname = $fs_name;
      if (empty($displayname)) {$displayname = 'Anonymous';}
      $email = $user['email'];
      $privatekey = "6LddJ8cSAAAAABNT7Isp8I5ArwPkGFlGeM9hCq4l";
      if (!empty($username)){
         $query = "INSERT INTO fs_users (username,password,displayname,email) VALUES('".mysql_real_escape_string($username)."','pass','".mysql_real_escape_string($displayname)."','".mysql_real_escape_string($email)."')";
         $result2 = mysql_query ($query, $db);
         if ($result2 != 'TRUE') $b_Register = false;

         if ($b_Register){
            $_SESSION['login'] = $username;
            $_SESSION['password'] = 'pass';
            checkLogin();
         }
      }
   }
   else {
      $username = $myrow['username'];
      $displayname = $myrow['displayname'];
      $_SESSION['login'] = $username;
      $_SESSION['password'] = 'pass';
      checkLogin();
   }
   require_once('index.php');

?>
