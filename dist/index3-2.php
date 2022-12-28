<!-- (C) Kazuo Misue (2022) -->
<!DOCTYPE html>

<?php
session_start();
?>

<html>
<head>
  <meta charset="UTF-8" />
  <title>簡素化実験</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
  <p>
  <font size = 7>Task3の説明</font></br><br>
  <font size = 5><br>
  Task3では、まず下の図のような画面が表示されます。これは、つくば市の形状を50個の頂点数で表したものです。
  </p>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="./img/3-1.png" width="500pt" height="auto">
  <br>
  <input type="button" onclick="location.href='./index3-3.php'" value="次のページへ">
  </font>
</body>

<?php
  $_SESSION['count_answer3'] = 0;
  $_SESSION['count_point'] = 25;
?>
</html>