<!-- (C) Kazuo Misue (2022) -->
<!DOCTYPE html>

<?php
session_start();
$_SESSION['filename'];
$f = fopen("data/".$_SESSION['filename'], "a");
fwrite($f, "agreed\n");
fclose($f);
?>

<html>
<head>
  <meta charset="UTF-8" />
  <title>簡素化実験</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
  <font size=5>
  ご協力ありがとうございました。<br>
  ブラウザを閉じて終了してください。
  </font>
</body>
</html>