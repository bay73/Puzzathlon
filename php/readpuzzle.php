<?php
  require_once('profile.php');
  header('Content-type: application/json; charset=utf-8');
  $id = $_REQUEST["id"];

  require('database.php');
  $result = mysql_query("SELECT puzzle_data, race_id, stage_num  FROM pztl_puzzles WHERE id=".mysql_real_escape_string($id)."", $db);
  if ($row = mysql_fetch_assoc($result)) {
    $race = $row['race_id'];
    if ($race == 0 || $fs_global_userid > 0){
      $puzzle_data = $row['puzzle_data'];
      if ($fs_global_userid > 0){
        $result_log = mysql_query ("INSERT INTO pztl_log (user_id,race_id,stage,action,data,actiondate) ".
                                  "VALUES(".$fs_global_userid.",".$race.",".$row['stage_num'].",'read','',NOW())", $db);
      }
    }
  }else{
    echo mysql_error();
  }
  echo $puzzle_data;
?>
