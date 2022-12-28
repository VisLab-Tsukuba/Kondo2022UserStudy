<!-- (C) Rikiya Shinkai, Kazuo Misue (2020-2021) -->
<!DOCTYPE html>

<?php
session_start();
$_SESSION['count_answer1'];
$_SESSION['count_success1'];
$_SESSION['count_point'];
$_SESSION['filename'];
?>

<html>
<head>
  <meta charset="UTF-8" />
  <title>簡素化実験</title>
  <link rel="stylesheet" type="text/css" href="style2.css">
  <script defer src="main.js"></script>
</head>

<body>
  <p>
  <font size = 5>
    下のボタンを押してTask1を開始してください。<br><br>
    このボタンのクリックが実験参加の意思表示になります。<br>
    <input type="button" onclick="location.href='./task1.php'" value="実験の参加に同意して作業1を開始する">
  </font>
  </p>
</body>

<?php
  $_SESSION['count_answer1'] = 0;
  $_SESSION['count_success1'] = 0;
  $_SESSION['count_point'] = 3;

  $date = date("_Ymd_His");
  // var_dump($date);
  $_SESSION['filename'] = $_SESSION['user_id'].$date.'.csv';
  // var_dump($_SESSION['filename']);

  $csv_file1 = file_get_contents('data.csv');
  $aryHoge1 = explode("\n", $csv_file1);
  $aryCsv1 = [];
  foreach($aryHoge1 as $key1 => $value1){
    $aryCsv1[] = explode(",", $value1);
  }

  //chmod($_SESSION['filename'], 0777);
    
  $f1 = fopen($_SESSION['filename'], "a+");
    if ( $f1 ) {
      foreach($aryCsv1 as $line1){
        fputcsv($f1, $line1);
        //fputs($f1, implode(',', $line1)."\n");
        // var_dump($line1);
      } 
    }else{
      echo 'Sorry, could not change modification time of '.$_SESSION['filename'];
    }
  fclose($f1);

      /** 乱数用配列 */
  $rands = [];
  $min = 1; 
  // $max = 47;
  $max = count($aryCsv1[0]);
 
for($i = $min; $i <= $max; $i++){
  while(true){
    /** 一時的な乱数を作成 */
    $tmp = mt_rand($min, $max);
 
    /*
     * 乱数配列に含まれているならwhile続行、 
     * 含まれてないなら配列に代入してbreak 
     */
    if( ! in_array( $tmp, $rands ) ){
      array_push( $rands, $tmp );
      break;
    } 
  }
}

$csv_file = file_get_contents($_SESSION['filename']);
    $aryHoge = explode("\n", $csv_file);
    $aryCsv = [];
    foreach($aryHoge as $key => $value){
      $aryCsv[] = explode(",", $value);
    } 

    // for($i = 0; $i <= 46; $i++){
    for($i = 0; $i < $max; $i++){
      $aryCsv[3][$i] = $rands[$i];
      $aryCsv[4][$i] = $aryCsv[1][$rands[$i]-1];  
    }

    $f = fopen($_SESSION['filename'], "w");
    if ( $f ) {
      foreach($aryCsv as $line){
        fputcsv($f, $line);
      } 
    }
    fclose($f);
?>
</html>