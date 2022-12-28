<!-- (C) Kazuo Misue (2022) -->
<!DOCTYPE html>

<?php
session_start();
$_SESSION['count_answer1'];
$_SESSION['count_point'];
$_SESSION['filename'];
?>

<html>
<head>
  <meta charset="UTF-8" />
  <title>簡素化実験</title>
  <link rel="stylesheet" type="text/css" href="style.css">
  <script defer src="task1.js"></script>
</head>

<body>
  <p>
    </br><br>
    <font size=5><br>
    <div align="center">
      <?php
        $input_data = (int)$_POST['ans'];
        $url = "data/".$_SESSION['filename'];
        $csv_file = file_get_contents($url);
        $aryHoge = explode("\n", $csv_file);
        $aryCsv = [];
        foreach($aryHoge as $key => $value){
          $aryCsv[] = explode(",", $value);
        }

        $nQuestions = count($aryCsv[0]);

        if($input_data + 1 == $aryCsv[3][$_SESSION['count_answer1']]){
          $csv_file = file_get_contents($url);
          $aryHoge = explode("\n", $csv_file);
          $aryCsv = [];
          foreach($aryHoge as $key => $value){
            $aryCsv[] = explode(",", $value);
          }

          $aryCsv[6][0] = $_SESSION['count_answer1'] + 1;
          $aryCsv[9][0] = $_SESSION['count_success1'] + 1;
          $aryCsv[12][$_SESSION['count_success1']] = $aryCsv[4][$_SESSION['count_answer1']];
          $aryCsv[14][$_SESSION['count_success1']] = $aryCsv[3][$_SESSION['count_answer1']];

          $f = fopen($url, "w");
          if($f){
            foreach($aryCsv as $line){
              fputcsv($f, $line);
            }
          }
          fclose($f);

          $_SESSION['count_answer1']++;
          $_SESSION['count_success1']++;
        }else if($input_data == 21){
          $csv_file = file_get_contents($url);
          $aryHoge = explode("\n", $csv_file);
          $aryCsv = [];
          foreach ($aryHoge as $key => $value) {
            $aryCsv[] = explode(",", $value);
          }

          $aryCsv[6][0] = $_SESSION['count_answer1'] + 1;

          $f = fopen($url, "w");
          if($f){
            foreach($aryCsv as $line){
              fputcsv($f, $line);
            }
          }
          fclose($f);

          $_SESSION['count_answer1']++;
        }else{
          $csv_file = file_get_contents($url);
          $aryHoge = explode("\n", $csv_file);
          $aryCsv = [];
          foreach($aryHoge as $key => $value){
            $aryCsv[] = explode(",", $value);
          }

          $aryCsv[6][0] = $_SESSION['count_answer1'] + 1;

          $f = fopen($url, "w");
          if($f){
            foreach($aryCsv as $line){
              fputcsv($f, $line);
            }
          }
          fclose($f);

          $_SESSION['count_answer1']++;
        }

        if($_SESSION['count_answer1'] >= $nQuestions){
          $csv_file = file_get_contents($url);
          $aryHoge = explode("\n", $csv_file);
          $aryCsv = [];
          foreach($aryHoge as $key => $value){
            $aryCsv[] = explode(",", $value);
          }

          $aryCsv[5][0] = 2;
          $rands = [];
          $max = count($aryCsv[12]);
          for($i = 0; $i < $max; $i++){
            while(1){
              $tmp = mt_rand(0, $max - 1);
              if(!in_array($tmp, $rands)){
                array_push($rands, $tmp);
                break;
              } 
            }
          }
          for($i = 0; $i < $max; $i++){
            $aryCsv[11][$i] = $rands[$i];
            $aryCsv[13][$i] = $aryCsv[12][$rands[$i]];
            $aryCsv[15][$i] = $aryCsv[14][$rands[$i]];
          }

          $f = fopen($url, "w");
          if($f){
            foreach($aryCsv as $line){
              fputcsv($f, $line);
            }
          }
          fclose($f);
          echo "これでTask1は終了です。<br>";
          echo "<input type=\"button\" onclick=\"location.href='./index2-1.php'\" value=\"次のページへ\">";
        }else{
          header("Location:./task1.php");
        }
      ?>
    </div>
    </font>
  </p>
</body>
</html>