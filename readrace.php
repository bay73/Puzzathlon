<?php
require_once('php/profile.php');
header('Content-type: application/json; charset=utf-8');
$id = $_REQUEST["id"];
?>
<?php
   require('php/database.php');
   $result_race = mysql_query("SELECT race_name, race_rules FROM pztl_races WHERE race_id=".mysql_real_escape_string($id)."", $db);
  if ($race_row = mysql_fetch_assoc($result_race)) {
     echo  '{"racename":"'.$race_row['race_name'].'","rules":"'.$race_row['race_rules'].'","stages":[';
      $puzzle_count=0;
      $result = mysql_query("SELECT p.id, s.stage_name, s.is_show, s.is_shooting, t.type_name, t.type_rules, p.desc ".
                            " FROM pztl_puzzles p, pztl_puzzletype t, pztl_stagetype s ".
                            " WHERE p.race_id=".mysql_real_escape_string($id).
                            " AND p.puzzle_type = t.puzzle_type AND p.stage_type = s.stage_type".
                            " ORDER BY p.stage_num", $db);
      while($row = mysql_fetch_assoc($result)) {
         if ($puzzle_count > 0) echo ',';
         echo '{"name":"'.$row['stage_name'].'","type":"'.$row['type_name'].'","desc":"'.$row['desc'].'","shootong":'.$row['is_shooting'].',"show":'.$row['is_show'].',"status":0,"puzzleId":'.$row['id'].',"rules":"'.$row['type_rules'].'"}';
         $puzzle_count++;
      }
      echo '],"stageCount": '.$puzzle_count.'}';
  }else{
     echo mysql_error();
  }
?>