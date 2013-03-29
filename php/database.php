<?php
/*
Описание соединения с СУБД
Использовать всегда при обращении к базе
*/
$db = mysql_connect ("localhost", "forsmart_user", "q1w2e3r4");
mysql_select_db ("forsmart_puzzathlon", $db);
mysql_query("SET CHARACTER SET utf8", $db);
?>
