<?php
/*
Вспомогательный файл для отрисовки панельки сессии и логина
Вставлять во все странички в нужном месте
*/
require_once('php/recaptchalib.php');
$publickey = "6LddJ8cSAAAAAGouA61CjoxU2Ixyps_EJush8vAd";
if($fs_global_logged){
  require('php/database.php');
  $result = mysql_query("SELECT username,displayname,email FROM fs_users WHERE id=".$fs_global_userid."", $db);
  while ($row = mysql_fetch_assoc($result)) {
     if(!$username) $username = $row['username'];
     if(!$displayname) $displayname = $row['displayname'];
     if(!$email) $email = $row['email'];
  }
}
?>
<script type="text/javascript">
 var RecaptchaOptions = {
    theme : 'custom',
    custom_theme_widget: 'recaptcha_widget'
 };
</script>

<div id=logininfo class="ui-widget-header ui-corner-all" style="width:200px;height:100%">
<table>
<?php
if($fs_global_logged){
   echo '<tr><td colspan=2 style="width:200px;text-align:right;">You are logged as<br>'.$fs_global_displayname.'</td></tr>';
   echo '<tr><td style="width:100px;text-align:right;"><A href="logout.php">Logout</A></td>';
   echo '<td style="width:100px;text-align:right;"><A href="#profile" onclick="$(\'#profiledialog\').css(\'display\',\'block\');">Profile</A></td></tr>';
//   echo '<td style="width:100px;text-align:right;"><A href="profilepage.php">Profile</A></td></tr>';
}else{
   echo '<tr><td colspan=2 style="width:200px;text-align:right;">You are not logged in.</td></tr>';
   echo '<tr><td style="width:100px;text-align:right;"><A href="#login" onclick="$(\'#logindialog\').css(\'display\',\'block\');$(\'#registerdialog\').css(\'display\',\'none\');">Login</A></td>';
   echo '<td style="width:100px;text-align:right;"><A href="#register" onclick="$(\'#registerdialog\').css(\'display\',\'block\');$(\'#logindialog\').css(\'display\',\'none\');">Register</A></td></tr>';
   //echo '<td style="width:100px;text-align:right;"><A href="registerpage.php">Register</A></td></tr>';
}
?>
</tr>
</table>

<div id=logindialog class="ui-widget-header ui-corner-all" style="display:none; width:210px; height:80px; position:relative; top: 22px; left: -30px; font-size:12px; z-index:100;">
  <form action="login.php" method="POST">
    <table>
      <tr>
        <td style="width:90px;">Username</td>
        <td><input name="logonusername" type="text" style="width:100px; height: 15px;"/ ></td>
      </tr>
      <tr>
        <td>Password</td>
        <td><input name="logonpassword" type="password" style="width:100px; height: 15px;"/></td>
      </tr>
      <tr>
        <td><input name="logonnextpage" type="hidden" value="<?php if(basename($_SERVER['PHP_SELF'])=='logout.php'||basename($_SERVER['PHP_SELF'])=='login.php') echo 'index.php'; else echo basename($_SERVER['PHP_SELF']); ?>"/><input type="submit" class="ui-state-default" value="Login"></input></td>
        <td><input type="button" class="ui-state-default" value="Cancel" onclick="$('#logindialog').css('display','none');"></input></td>
      </tr>
    </table>
  </form>
</div>

<div id=profiledialog class="ui-widget-header ui-corner-all" style="display:none; width:310px; height:230px; position:relative; top: 22px; left: -130px; font-size:12px; z-index:100;">
      <form action="changeuser.php" method="POST">
      <table>
        <tr>
          <td align=left style="width:100px;">Username</td>
          <td align=left><input name="username" type="text" style="width:190px; " value="<?php echo $username ?>" /></td>
          <td><div class="ui-state-error" style="border:0px;font-size:11px;"><?php echo $username_error ?></div></td>
        </tr>
        <tr>
          <td align=left>Display name</td>
          <td align=left><input name="displayname" type="text" style="width:190px;" value="<?php echo $displayname ?>" /></td>
          <td><div class="ui-state-error" style="border:0px;font-size:11px;"><?php echo $displayname_error ?></div></td>
        </tr>
        <tr>
            <td align=left>New password</td>
            <td align=left><input name="passwordone" type="password" style="width:190px;" value="<?php echo $passwordone ?>" /></td>
            <td><div class="ui-state-error" style="border:0px;font-size:11px;"><?php echo $password_error ?></div></td>
        </tr>
        <tr>
          <td align=left>Confirm password</td>
          <td align=left><input name="confirmpassword" type="password" style="width:190px; " value="<?php echo $confirmpassword ?>" /></td>
          <td><div class="ui-state-error" style="border:0px;font-size:11px;"><?php echo $confirmpassword_error ?></div></td>
        </tr>
        <tr>
          <td align=left>Email</td>
          <td align=left><input name="email" type="text" style="width:190px;" value="<?php echo $email ?>" /></td>
          <td><div class="ui-state-error" style="border:0px;font-size:11px;"><?php echo $email_error ?></div></td>
        </tr>
        <tr>
            <td align=left>Old password</td>
            <td align=left><input name="oldpassword" type="password" style="width:190px;" /></td>
            <td><div class="ui-state-error" style="border:0px;font-size:11px;"><?php echo $oldpassword_error ?></div></td>
        </tr>
        <tr>
          <td><input type="submit" class="ui-state-default" value="Save"></input></td>
          <td><input type="button" class="ui-state-default" value="Cancel" onclick="$('#profiledialog').css('display','none');"></input></td>
        </tr>
      </table>
      </form>
</div>

<div id=registerdialog class="ui-widget-header ui-corner-all" style="display:none; width:310px; height:300px; position:relative; top: 22px; left: -130px; font-size:12px; z-index:100;">
      <form action="register.php" method="POST">
      <table>
        <tr>
          <td align=left style="width:100px;">Username</td>
          <td align=left><input name="username" type="text" style="width:190px; " value="<?php echo $username ?>" /></td>
          <td><div class="ui-state-error" style="border:0px;font-size:11px;"><?php echo $username_error ?></div></td>
        </tr>
        <tr>
          <td align=left>Display name</td>
          <td align=left><input name="displayname" type="text" style="width:190px;" value="<?php echo $displayname ?>" /></td>
          <td><div class="ui-state-error" style="border:0px;font-size:11px;"><?php echo $displayname_error ?></div></td>
        </tr>
        <tr>
            <td align=left>Password</td>
            <td align=left><input name="passwordone" type="password" style="width:190px;" value="<?php echo $passwordone ?>" /></td>
            <td><div class="ui-state-error" style="border:0px;font-size:11px;"><?php echo $password_error ?></div></td>
        </tr>
        <tr>
          <td align=left>Confirm password</td>
          <td align=left><input name="confirmpassword" type="password" style="width:190px; " value="<?php echo $confirmpassword ?>" /></td>
          <td><div class="ui-state-error" style="border:0px;font-size:11px;"><?php echo $confirmpassword_error ?></div></td>
        </tr>
        <tr>
          <td align=left>Email</td>
          <td align=left><input name="email" type="text" style="width:190px;" value="<?php echo $email ?>" /></td>
          <td><div class="ui-state-error" style="border:0px;font-size:11px;"><?php echo $email_error ?></div></td>
        </tr>
        <tr>
          <td colspan="2" align=left><div id="recaptcha_image"></div></td>
        </tr>
        <tr>
          <td align=left>Enter the words above</td>
          <td align=left><input type="text" style="width:190px;" id="recaptcha_response_field" name="recaptcha_response_field" /></td>
          <td><div class="ui-state-error" style="border:0px;font-size:11px;"><?php echo $captcha_error ?></div></td>
        <tr>
          <td></td>
          <td align=left>
            <div><a href="javascript:Recaptcha.reload()">Get another CAPTCHA</a></div>
            <?php echo recaptcha_get_html($publickey); ?>
          </td>
        </tr>
        <tr>
          <td><input name="registernextpage" type="hidden" value="<?php if(basename($_SERVER['PHP_SELF'])=='register.php') echo 'index.php'; else echo basename($_SERVER['PHP_SELF']); ?>"/><input type="submit" class="ui-state-default" value="Register"></input></td>
          <td><input type="button" class="ui-state-default" value="Cancel" onclick="$('#registerdialog').css('display','none');"></input></td>
        </tr>
      </table>
      </form>
</div>
</div>