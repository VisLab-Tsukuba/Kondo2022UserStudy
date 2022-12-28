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
  「頂点数を減らす」ボタンを押すと、頂点数が一つ減ります。これを繰り返して、形状がイメージと合わなくなった段階で「イメージと合わなくなった」ボタンを押してください。
  頂点数を減らしすぎた場合は、隣の「頂点数を増やす」ボタンを押すと、頂点数が一つ増えるので、これを使って操作してください。
  なお、離島を含む都道府県について、このタスクでも最も大きな面積の固まりのみ描画され、それ以外の要素は省略されます。
  </p>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="./img/3-3.png" width="500pt" height="auto">
  <br>
  <input type="button" onclick="location.href='./index3-5.php'" value="次のページへ">
  </font>
</body>

<?php
  $_SESSION['count_answer3'] = 0;
  $_SESSION['count_point'] = 25;
?>
</html>