<?php
require_once('profile.php');
header('Content-type: application/json; charset=utf-8');
$id = $_REQUEST["id"];
?>
<?php
  require('database.php');
  $id = mysql_real_escape_string($id);
  $result_race = mysql_query("SELECT race_name, race_rules FROM pztl_races WHERE race_id=".$id."", $db);
  if ($race_row = mysql_fetch_assoc($result_race)) {
    echo  '{"racename":"'.$race_row['race_name'].'","rules":"'.$race_row['race_rules'].'","stages":[';
    $puzzle_count = 0;
    $result = mysql_query("SELECT p.id, s.stage_name, s.is_show, s.is_shooting, t.type_name, t.type_rules, p.desc, p.stage_num ".
                          " FROM pztl_puzzles p, pztl_puzzletype t, pztl_stagetype s ".
                          " WHERE p.race_id=".$id.
                          " AND p.puzzle_type = t.puzzle_type AND p.stage_type = s.stage_type".
                          " ORDER BY p.stage_num", $db);
    while($row = mysql_fetch_assoc($result)) {
      if ($puzzle_count > 0) echo ',';
      $status = 0;
      $log_data = "[";
      if ($fs_global_userid){
        $log_result = mysql_query("SELECT action, data from pztl_log where race_id = ".$id." AND user_id = ".$fs_global_userid." AND stage=".$row['stage_num']." order by actiondate", $db);
        $log_count = 0;
        while($log_row = mysql_fetch_assoc($log_result)) {
          if ($log_row['action'] == "start" && $status == 0) $status = 1;
          if ($log_row['action'] == "finish") $status = 2;
          if ($log_count > 0) $log_data = $log_data.",";
          if ($log_row['data']) $log_data = $log_data.'{ "action": "'.$log_row['action'].'", "data": '.$log_row['data'].'}';
          else $log_data = $log_data.'{ "action": "'.$log_row['action'].'"}';
          $log_count++;
        }
      }
      $log_data = $log_data."]";
      $is_show = $row['is_show'];
      if ($row['is_finished'] > 0) $status = 2;
      if ($status != 0) $is_show = 1;
      echo '{"name":"'.$row['stage_name'].'",'.
             '"type":"'.$row['type_name'].'",'.
             '"desc":"'.$row['desc'].'",'.
             '"shootong":'.$row['is_shooting'].','.
             '"show":'.$is_show.','.
             '"status":'.$status.','.
             '"puzzleId":'.$row['id'].','.
             '"rules":"'.str_replace(array("\r\n", "\n", "\r"),'<br/>',$row['type_rules']).'",'.
             '"log": '.$log_data.'}';
      $puzzle_count++;
    }
    echo '],"stageCount": '.$puzzle_count.'}';
  }else{
    echo mysql_error();
  }
?>