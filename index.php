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
  <link rel="stylesheet" type="text/css" href="puzzathlon.css" />
  <script src="js/jquery-1.9.1.min.js"></script>
  <script src="js/jquery-ui.min.js"></script>
</head>
<body>
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
        <h2>The Race results</h2>
        The race has just started.
      </div>
    </td>
    <td style="vertical-align:top;">
      <div>
        <h1>Welcome to Puzzathlon!</h1>
        Lorem ipsum dolor sit amet, Nulla nec tortor. Donec id elit quis purus consectetur consequat.
        <BR>Nam congue semper tellus. Sed erat dolor, dapibus sit amet, venenatis ornare, ultrices ut, nisi. Aliquam ante. Suspendisse scelerisque dui nec velit. Duis augue augue, gravida euismod, vulputate ac, facilisis id, sem. Morbi in orci.
        <BR>Nulla purus lacus, pulvinar vel, malesuada ac, mattis nec, quam. Nam molestie scelerisque quam. Nullam feugiat cursus lacus.orem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero risus, commodo vitae, pharetra mollis, posuere eu, pede. Nulla nec tortor. Donec id elit quis purus consectetur consequat.
        <BR>Nam congue semper tellus. Sed erat dolor, dapibus sit amet, venenatis ornare, ultrices ut, nisi. Aliquam ante. Suspendisse scelerisque dui nec velit. Duis augue augue, gravida euismod, vulputate ac, facilisis id, sem. Morbi in orci. Nulla purus lacus, pulvinar vel, malesuada ac, mattis nec, quam. Nam molestie scelerisque quam.
        <BR>Nullam feugiat cursus lacus.orem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero risus, commodo vitae, pharetra mollis, posuere eu, pede. Nulla nec tortor. Donec id elit quis purus consectetur consequat. Nam congue semper tellus. Sed erat dolor, dapibus sit amet, venenatis ornare, ultrices ut, nisi. Aliquam ante.
        <BR>Suspendisse scelerisque dui nec velit. Duis augue augue, gravida euismod, vulputate ac, facilisis id, sem. Morbi in orci. Nulla purus lacus, pulvinar vel, malesuada ac, mattis nec, quam. Nam molestie scelerisque quam. Nullam feugiat cursus lacus.orem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero risus, commodo vitae, pharetra mollis, posuere eu, pede. Nulla nec tortor. Donec id elit quis purus consectetur consequat.
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