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
  <font size = 5>
    実験を途中でやめたくなった場合には、いつでもブラウザを閉じて中止できます。</br>
    最後に再び参加の同意の確認が行われなければ、中止したものとみなされます。</br>
    ブラウザの「戻る」や「再読み込み」を押した場合も、同様に中止したものとみなされます。<br><br>
    それでは、次のページからTask1の説明を始めます。<br><br>
  </font>
  </p>

  <input type="button" onclick="location.href='./index1-2.php'" value="次のページへ" />
</body>
</html>