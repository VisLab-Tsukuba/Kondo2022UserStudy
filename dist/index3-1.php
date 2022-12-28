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
  Task3は、都道府県の形状のイメージから解離する頂点数を答えてもらうタスクとなります。<br>
  画面中央に、50個の頂点によって表した都道府県の輪郭図形が表⽰されます。<br>
  「頂点数を減らす」ボタンを押すと、一つずつ頂点数が減らされます。<br> 
  イメージと合わなくなるまで頂点数を減らし、合わなくなった段階で「イメージと合わなくなった」ボタンを押してください。<br> 
  頂点数を減らしすぎた場合は、「頂点数を増やす」ボタンを押して操作してください。<br> 
  「イメージと合わなくなった」ボタンが押された段階で、次の問題に進みます。
  <br><br>
  次のページから、つくば市を例に説明します。<br>
  </p>
  <input type="button" onclick="location.href='./index3-2.php'" value="次のページへ">
  </font>
</body>
</html>