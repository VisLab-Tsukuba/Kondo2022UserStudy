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
  <font size = 7>Task2の説明</font></br><br>
  <font size = 5>
  Task2では、まず下の図のような画面が表示されます。これは、つくば市の形状の頂点数を20まで減らしたものです。
  </p>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="./img/2-1.png" width="500pt" height="auto">
  <br>
  <input type="button" onclick="location.href='./index2-3.php'" value="次のページへ">
  </font>
</body>

<?php
  $_SESSION['count_answer2'] = 0;
  $_SESSION['count_point'] = 25;
?>
</html>