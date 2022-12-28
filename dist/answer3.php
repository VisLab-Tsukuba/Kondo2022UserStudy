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
  <link rel="stylesheet" type="text/css" href="style.css">
  <script defer src="task3.js"></script>
</head>

<body>
  <p>
    </br><br>
    <font size=5><br>
    <div align="center">
      <?php
        $count_point = $_POST['number'];

        $url = "data/".$_SESSION['filename'];
        $csv_file = file_get_contents($url);
        $aryHoge = explode("\n", $csv_file);
        $aryCsv = [];
        foreach($aryHoge as $key => $value){
          $aryCsv[] = explode(",", $value);
        }

        $nQuestions = count($aryCsv[11]);

        if($count_point != ""){
          $aryCsv[8][0] = $_SESSION['count_answer3'] + 1;
          $aryCsv[18][$_SESSION['count_answer3']] = $count_point;
  
          $f = fopen($url, "w");
          if($f){
            foreach($aryCsv as $line){
              fputcsv($f, $line);
            }
          }
          fclose($f);

          $_SESSION['count_answer3']++;
        }

        if($_SESSION['count_answer3'] >= $nQuestions){
          header("Location:./index3-end.php");
        }else{
          header("Location:./task3.php");
        }
      ?>
    </div>
    </font>
  </p>
</body>
</html>