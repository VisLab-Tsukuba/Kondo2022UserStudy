<!-- (C) Kazuo Misue (2022) -->
<!DOCTYPE html>

<?php
function getId(){
  $file_p = file_get_contents("user_id.txt");
  $user_id = (int) $file_p;
  $new_id = $user_id + 1;
  $p = fopen("user_id.txt", "w");
  fwrite($p, $new_id);
  fclose($p);
  return $user_id;
}

$flag = session_start();
$_SESSION['user_id'] = getId();
?>

<html>
<head>
  <meta charset="UTF-8" />
  <title>簡素化実験</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
  <p>
  <font size=7>実験全体の概要説明</font><br>
  <font size=5>この実験は以下の流れで進みます。<br>
  1. 実験への参加の同意の確認<br>
  2. Task1 (説明、作業)<br>
  3. Task2 (説明、作業)<br>
  4. Task3 (説明、作業)<br>
  5. 参加の同意の再確認<br><br>

  <form>
  <input type="button" value="PDFを開く" onClick="window.open('実験概要説明.pdf')"/>
  </form>

  <a href="実験概要説明.pdf" target="_blank">実験概要説明(PDF)</a><br>
  ※この実験は18歳以上の方を対象にしています。<br>
  &nbsp;&nbsp;&nbsp;18歳未満の方はブラウザを閉じてください。<br><br>

  <input type="button" onclick="location.href='./index1-1.php'" value="次のページへ" />
  </font>
  </p>
</body>
</html>