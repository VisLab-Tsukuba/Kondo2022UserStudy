<!-- (C) Kazuo Misue (2022) -->
<!DOCTYPE html>

<?php
session_start();
$_SESSION['count_answer2'];
$_SESSION['count_point'];
$_SESSION['filename'];
?>

<html>
<head>
  <meta charset="UTF-8" />
  <title>簡素化実験</title>
  <link rel="stylesheet" type="text/css" href="style1.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
  <script type="text/javascript" defer src="task2.js"></script>
</head>

<body>
<?php
echo '<div id="filename" value="'.$_SESSION['filename'].'"></div>';
echo '<div id="count_answer" value="'.$_SESSION['count_answer2'].'"></div>';
echo '<div style="text-align:center">現在'.($_SESSION['count_answer2']+1).'問目<br>';
?>

<canvas id="canvas" width="630" height="630"></canvas>

<div class="pre">
<button type="button" id="make_faithful" value="Make Faithful">頂点数を増やす</button><br><br>
<form method="post" action="answer2.php">
<label><input type="radio" name="ans" value=47 checked>分からない</label>
<label><input type="radio" name="ans" value=0>北海道</label>
<label><input type="radio" name="ans" value=1>青森県</label>
<label><input type="radio" name="ans" value=47>岩手県</label>
<label><input type="radio" name="ans" value=37>宮城県</label>
<label><input type="radio" name="ans" value=2>秋田県</label>
<label><input type="radio" name="ans" value=3>山形県</label>
<label><input type="radio" name="ans" value=47>福島県</label>
<label><input type="radio" name="ans" value=4>茨城県</label>
<label><input type="radio" name="ans" value=5>栃木県</label>
<label><input type="radio" name="ans" value=47>群馬県</label>
<label><input type="radio" name="ans" value=47>埼玉県</label>
<label><input type="radio" name="ans" value=6>千葉県</label>
<label><input type="radio" name="ans" value=47>東京都</label>
<label><input type="radio" name="ans" value=47>神奈川県</label>
<label><input type="radio" name="ans" value=7>新潟県</label>
<label><input type="radio" name="ans" value=8>富山県</label>
<label><input type="radio" name="ans" value=9>石川県</label>
<label><input type="radio" name="ans" value=47>福井県</label>
<label><input type="radio" name="ans" value=10>山梨県</label>
<label><input type="radio" name="ans" value=11>長野県</label>
<label><input type="radio" name="ans" value=47>岐阜県</label>
<label><input type="radio" name="ans" value=12>静岡県</label>
<label><input type="radio" name="ans" value=13>愛知県</label>
<label><input type="radio" name="ans" value=47>三重県</label>
<label><input type="radio" name="ans" value=47>滋賀県</label>
<label><input type="radio" name="ans" value=47>京都府</label>
<label><input type="radio" name="ans" value=14>大阪府</label>
<label><input type="radio" name="ans" value=15>兵庫県</label>
<label><input type="radio" name="ans" value=47>奈良県</label>
<label><input type="radio" name="ans" value=47>和歌山県</label>
<label><input type="radio" name="ans" value=16>鳥取県</label>
<label><input type="radio" name="ans" value=47>島根県</label>
<label><input type="radio" name="ans" value=47>岡山県</label>
<label><input type="radio" name="ans" value=17>広島県</label>
<label><input type="radio" name="ans" value=47>山口県</label>
<label><input type="radio" name="ans" value=18>徳島県</label>
<label><input type="radio" name="ans" value=47>香川県</label>
<label><input type="radio" name="ans" value=47>愛媛県</label>
<label><input type="radio" name="ans" value=19>高知県</label>
<label><input type="radio" name="ans" value=47>福岡県</label>
<label><input type="radio" name="ans" value=20>佐賀県</label>
<label><input type="radio" name="ans" value=47>長崎県</label>
<label><input type="radio" name="ans" value=47>熊本県</label>
<label><input type="radio" name="ans" value=21>大分県</label>
<label><input type="radio" name="ans" value=47>宮崎県</label>
<label><input type="radio" name="ans" value=47>鹿児島県</label>
<label><input type="radio" name="ans" value=47>沖縄県</label>
<br><br>
<input type="submit" id="submit"　value="回答する">
</form>
</div>
</body>
</html>