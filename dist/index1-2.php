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
  <font size = 7>Task1の説明</font></br><br>
  <font size = 5><br>
    Task1では、都道府県の白地図と、47都道府県名と「分からない」と書かれた計48個のボタン、「回答する」ボタンが表示されます。<br>
    都道府県名を選択し、「回答する」ボタンを押して、表示される白地図の都道府県名を答えてください。<br>
    この問題はたくさん正解することが目的ではありません。<br>
    自信がない時は、推測で回答せずに「分からない」を選択し、「回答する」ボタンを押してください。<br>
    白地図がすぐに表示されないことがありますが、その場合には、しばらくお待ちください。<br>
    白地図は一つずつ表示され、問題は全部で22問あります。<br>
  </p>
  <br>
  <input type="button" onclick="location.href='./index1-3.php'" value="次のページへ" />
  </font>
</body>
</html>