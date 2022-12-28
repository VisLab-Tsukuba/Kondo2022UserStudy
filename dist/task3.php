<!-- (C) Kazuo Misue (2022) -->
<!DOCTYPE html>

<?php
session_start();
$_SESSION['count_answer3'];
$_SESSION['count_point'];
$_SESSION['filename'];
?>

<html>
<head>
  <meta charset="UTF-8" />
  <title>簡素化実験</title>
  <link rel="stylesheet" type="text/css" href="style1.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
  <script type="text/javascript" defer src="task3.js"></script>
</head>

<body>
<?php
echo '<div id="filename" value="'.$_SESSION['filename'].'"></div>';
echo '<div style="text-align:center">現在'.($_SESSION['count_answer3']+1).'問目<br>';
?>

<canvas id="canvas" width="630" height="630"></canvas>

<div class="pre">
<button type="button" id="make_faithful" value="Make Faithful">頂点数を増やす</button>
<button type="button" id="make_simple" value="Make Simple">頂点数を減らす</button>
<form method="post" action="answer3.php">
<br><br>
<input type="submit" id="submit" value="イメージと合わなくなった">
</form>
</div>
</body>
</html>