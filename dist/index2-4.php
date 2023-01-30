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
  「頂点数を増やす」ボタンを押すと、頂点数が一つ増えます。これを繰り返して、答えが分かった段階で下のフォームから回答してください。
  </p>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="./img/2-3.png" width="500pt" height="auto">
  <br>
  <input type="button" onclick="location.href='./index2-5.php'" value="次のページへ">
  </font>
</body>

<?php
  $_SESSION['count_answer2'] = 0;
  $_SESSION['count_point'] = 25;
?>
</html>