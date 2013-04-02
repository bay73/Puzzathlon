<?php
require_once('profile.php');
header('Content-type: text/html; charset=utf-8');
$race = $_REQUEST["race"];
$stage = $_REQUEST["stage"];
$action = $_REQUEST["action"];
$data = $_REQUEST["data"];

if ($fs_global_userid){
   require('database.php');
   $result = mysql_query ("INSERT INTO pztl_log (user_id,race_id,stage,action,data,actiondate) ".
                          "VALUES(".$fs_global_userid.",".mysql_real_escape_string($race).",".mysql_real_escape_string($stage).",'".mysql_real_escape_string($action)."','".mysql_real_escape_string($data)."',NOW())", $db);
};
echo 'Ok';
?>
