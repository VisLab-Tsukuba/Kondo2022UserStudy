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
  <font size=7>最終確認</font><br>
  <font size=5>このボタンのクリックが実験参加への意思表示になります。</font>
  </p>
  <input type="button" onclick="location.href='./end2.php'" value="実験の参加に同意します。">
</body>
</html>