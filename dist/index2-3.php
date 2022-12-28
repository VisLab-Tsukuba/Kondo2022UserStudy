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
  タスク画面は、頂点数、現在の問題数、「頂点を増やす」ボタン、Task1と同じような回答フォームによって構成されます。
  </p>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="./img/2-2.png" width="500pt" height="auto">
  <br>
  <input type="button" onclick="location.href='./index2-4.php'" value="次のページへ">
  </font>
</body>

<?php
  $_SESSION['count_answer2'] = 0;
  $_SESSION['count_point'] = 25;
?>
</html>