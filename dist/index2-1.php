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
  <font size = 5><br>
  Task2は、都道府県を認識できる最小の頂点数を答えてもらうタスクとなります。<br>
  画面中央に都道府県の輪郭を簡素化した図形が表⽰されます。<br>
  これは、ある都道府県の頂点をある頂点数まで減らしたものです。<br> 
  「頂点数を増やす」ボタンを押すと、一つずつ頂点数が増やされます。<br> 
  分かるまで頂点数を増やし、分かった段階で下の選択肢と「送信」ボタンによって表示された都道府県を回答してください。<br> 
  「送信」ボタンが押された段階で、次の問題に進みます。
  <br><br>
  次のページから、つくば市を例に説明します。<br>
  </p>
  <input type="button" onclick="location.href='./index2-2.php'" value="次のページへ">
  </font>
</body>
</html>