<!-- (C) Kazuo Misue (2022) -->
<!DOCTYPE html>

<?php
session_start();
?>

<html>
<head>
  <meta charset="UTF-8" />
  <title>簡素化実験</title>
  <link rel="stylesheet" type="text/css" href="style2.css">
</head>

<body>
  <p>
    <font size = 5>
    Task3の説明は以上です。<br>
    作業内容が理解できた方は、「Task3を開始する」を押してTask3を開始してください。<br><br>
    もう一度最初から説明を読みたい方は「もう一度説明を読む」を押してください。<br>
    <br><br>
    </font>
  </p>
  <div align="center">
    <input type="button" onclick="location.href='./index3-1.php'" value="もう一度説明を読む">
    &nbsp;
    <input type="button" onclick="location.href='./task3.php'" value="Task3を開始する">
  </div>
</body>

<?php
  $_SESSION['count_answer3'] = 0;
  $_SESSION['count_point'] = 25;
?>
</html>