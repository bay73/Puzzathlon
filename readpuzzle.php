<?php
require_once('php/profile.php');
header('Content-type: application/json; charset=utf-8');
$id = $_REQUEST["id"];

require('php/database.php');
$result = mysql_query("SELECT puzzle_data  FROM pztl_puzzles WHERE id=".mysql_real_escape_string($id)."", $db);
  if ($row = mysql_fetch_assoc($result)) {
     $puzzle_data = $row['puzzle_data'];
  }else{
     echo mysql_error();
  }
  echo $puzzle_data;
?>
