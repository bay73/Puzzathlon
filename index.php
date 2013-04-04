<?php
require_once('php/profile.php');
header('Content-type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html style="height:100%;">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>Puzzathlon</title>
  <link rel="stylesheet" type="text/css" href="css/jquery-ui.css" />
   <script src="js/jquery-1.9.1.min.js"></script>
   <script src="js/jquery-ui.min.js"></script>
</head>
<body class="ui-widget-content" style="height:95%;border: 0px; background-size:100% 100%; background-image:url('images/snowflakes.jpg');">
  <table style="width:100%;height:100%;">
  <tr>
    <td colspan=3>
      <table style="width:100%">
        <tr>
          <td style="width:50%;"><a class="menubutton" style="width:100%; height:45px" href="race.php?id=0">Mock Race</a></td>
          <td style="width:50%;"><a class="<?php if ($fs_global_logged) echo 'menubutton'; else echo 'menubuttondisabled'; ?>" style="width:100%; height:45px" href="race.php?id=1">Test Race</a></td>
        </tr>
      </table>
      <script type="text/javascript">
      $(".menubutton").button();
      $(".menubuttondisabled").button({disabled: true});
      </script>
    </td>
  </tr>
  <tr>
    <td style="width:250px; height:88%; vertical-align:top;">
      <div class="ui-widget-header ui-corner-all" style="width:100%;height:100%;">
        Some text is supposed to be here
      </div>
    </td>
    <td style="vertical-align:top;">
      <div>
        Welcome to Puzzathlon!<br>
      </div>
    </td>
    <td style="width:200px; height:88%; vertical-align:top;">
      <?php
      require_once('php/loginpanel.php');
      ?>
    </td>
  </tr>
  </table>
</body>
</html>