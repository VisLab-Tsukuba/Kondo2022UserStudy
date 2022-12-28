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
  <link rel="stylesheet" type="text/css" href="style.css">
  <script defer src="task2.js"></script>
</head>

<body>
  <p>
    </br><br>
    <font size=5><br>
    <div align="center">
      <?php
        $input_data = (int)$_POST['ans'];
        $count_point = $_POST['number'];

        $url = "data/".$_SESSION['filename'];
        $csv_file = file_get_contents($url);
        $aryHoge = explode("\n", $csv_file);
        $aryCsv = [];
        foreach($aryHoge as $key => $value){
          $aryCsv[] = explode(",", $value);
        }
  
        $nQuestions = count($aryCsv[11]);

        if($_SESSION['count_answer2'] < $nQuestions){
          if($count_point == ""){
            if($input_data + 1 == $aryCsv[15][$_SESSION['count_answer2']]){
              $aryCsv[7][0] = $_SESSION['count_answer2'] + 1;
              $aryCsv[16][$_SESSION['count_answer2']] = 1;
  
              $f = fopen($url, "w");
              if($f){
                foreach($aryCsv as $line){
                  fputcsv($f, $line);
                }
              }
              fclose($f);

              $_SESSION['count_answer2']++;
            }else{
              $csv_file = file_get_contents($url);
              $aryHoge = explode("\n", $csv_file);
              $aryCsv = [];
              foreach($aryHoge as $key => $value){
                $aryCsv[] = explode(",", $value);
              }

              $aryCsv[7][0] = $_SESSION['count_answer2'] + 1;
              $aryCsv[16][$_SESSION['count_answer2']] = 0;

              $f = fopen($url, "w");
              if($f){
                foreach($aryCsv as $line){
                  fputcsv($f, $line);
                }
              }
              fclose($f);

              $_SESSION['count_answer2']++;
            }
          }else{            
            $aryCsv = [];
            foreach($aryHoge as $key => $value){
              $aryCsv[] = explode(",", $value);
            }
            $aryCsv[17][$_SESSION['count_answer2']] = $count_point;

            $f = fopen($url, "w");
            if($f){
              foreach($aryCsv as $line){
                fputcsv($f, $line);
              }
            }
            fclose($f);
          }
        }

        if($_SESSION['count_answer2'] >= $nQuestions){
          $aryCsv[5][0] = 3;
          header("Location:./index2-end.php");
        }else{
          header("Location:./task2.php");
        }
      ?>
    </div>
    </font>
  </p>
</body>
</html>