<?php
require_once 'db_connection.php';
require_once 'functions.php';
session_start();
header("Content-Type:application/json");
$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');

if ( isset( $_SESSION['userEmail']) || isset($_SESSION['id']) ){
  $email = $_SESSION['userEmail'];
  $tuuristId = $_SESSION['id'];
}

if ( $method === "POST"){
  $output = json_decode( $item , true );
  // check if item exists in db
  $doesItemExistInItineraryQuery = "SELECT dates FROM `booking` WHERE tuuristEmail = '$email' AND packageId = $output[packageId]";
  $result = mysqli_query( $conn, $doesItemExistInItineraryQuery );
  $doesItemExist = mysqli_num_rows( $result);
  if ( $doesItemExist ) {
    // parse dates from booking to correct format
    $date = mysqli_fetch_assoc( $result );
    $date = str_replace('[', '', $date['dates'] );
    $date = str_replace(']', '', $date );
    $date = explode(',',$date);
    foreach ( $output['dates'] as $eachDate ) {
      $date[] = "\"$eachDate\"";
    };
    // update booking date format
    $date = join( ',', $date );
    $updateQuery = "UPDATE `booking`
    SET `dates`= '[" . $date . "]'
    WHERE `packageId` = {$output['packageId']}";
    $updateResult = mysqli_query( $conn , $updateQuery );
    
    // select all date from package date
    $getQuery = "SELECT `dates` from `package` WHERE `id` = {$output['packageId']}";
    $getResult = mysqli_query( $conn, $getQuery );
    $date = mysqli_fetch_assoc( $getResult );

    // parse dates from packages to correct format
    $string = str_replace( "[", "", $date['dates'] );
    $string = str_replace( "]", "", $string );
    $packageDates = explode( "," , $string );
    $packageDateArray = [];
    foreach( $packageDates as $value ){
      $value = trim( $value );
      $packageDateArray[] = $value;
    }

    
    $string = str_replace( "[", "", json_encode($output['dates']) );
    $string = str_replace( "]", "", $string );
    $pickedDates = explode( "," , $string );
    foreach( $pickedDates as $value ){
      $pickedDateArray[] = trim( $value );
    }

    for ( $pickCount = 0; $pickCount < count( $pickedDateArray ); $pickCount++ ){
      for ( $packCount = 0; $packCount < count( $packageDateArray ); $packCount++ ){
        if ( $pickedDateArray[ $pickCount ] === $packageDateArray[$packCount] ){
          unset( $packageDates[$packCount]);
        }
      }
    }

    $packageDates = join( ',', $packageDates );
    $updateQuery = "UPDATE `package`
    SET `dates`= '[" . $packageDates . "]'
    WHERE `id` = {$output['packageId']}";
    $updateResult = mysqli_query( $conn , $updateQuery );
    print_r ( json_encode( ['auth' => $result ]));
    exit(); 
  } 

    // if item doesnt exist
    exit();
    $pickedDates = json_encode( $output['dates']);
    $query = "INSERT INTO  `booking` (`id`, `tuuristId`, `packageId`, `bookedAt`, `dates`, `tuuristEmail`) 
              VALUES (NULL, '{$tuuristId}', '{$output['packageId']}', CURRENT_TIMESTAMP, '{$pickedDates}', '{$email}')";
    $result = mysqli_query( $conn, $query );
    if ( !$result ){
      exit();
    }

    $string = str_replace( "[", "", $pickedDates );
    $string = str_replace( "]", "", $string );
    $pickedDates = explode( "," , $string );
    foreach( $pickedDates as $value ){
      $pickedDateArray[] = trim( $value );
    }
    
    $getQuery = "SELECT `dates` from `package` WHERE `id` = {$output['packageId']}";
    $getResult = mysqli_query( $conn, $getQuery );
    $date = mysqli_fetch_assoc( $getResult );

    $string = str_replace( "[", "", $date['dates'] );
    $string = str_replace( "]", "", $string );
    $packageDates = explode( "," , $string );
    foreach( $packageDates as $value ){
      $packageDateArray[] = trim( $value );
    }
    for ( $pickCount = 0; $pickCount < count( $pickedDateArray ); $pickCount++ ){
      for ( $packCount = 0; $packCount < count( $packageDateArray ); $packCount++ ){
        if ( $pickedDateArray[ $pickCount ] === $packageDateArray[$packCount] ){
          unset( $packageDates[$packCount]);
        }
      }
    }

    $packageDates = join( ',', $packageDates );
    $updateQuery = "UPDATE `package`
    SET `dates`= '[" . $packageDates . "]'
    WHERE `id` = {$output['packageId']}";
    $updateResult = mysqli_query( $conn , $updateQuery );
    print_r ( json_encode( ['auth' => $result ]));
}



// GET
if ( $method === "GET"){
  if ( isset( $_GET['id'] ) ){
    $bookedPackageQuery = "SELECT `book`.packageId, `pack`.title, `pack`.description, `pack`.tags, `pack`.location, `pack`.timeRange ,
    GROUP_CONCAT( `book`.dates ORDER BY `book`.dates DESC SEPARATOR ', ' ) AS dates, `pack`.mainImage, `pack`.images, `pack`.profileEmail 
    FROM `booking` AS book 
    JOIN `package` AS pack ON `book`.packageId = `pack`.id 
    GROUP BY `book`.packageId
    WHERE `book`.tuuristEmail = $email
    ";
    $result = mysqli_query( $conn , $bookedPackageQuery );
    if ( !$result ){
      mysqli_error( $conn );
    }
    while ( $row = mysqli_fetch_assoc( $result )){
      $bookedPackages[] = $row;
    }
    print_r( json_encode($bookedPackages) );
  } 
  else {
    $query = "SELECT `book`.id, `pack`.id AS packageId, `pack`.title, `pack`.description, `pack`.tags, 
    `pack`.location, `pack`.timeRange, `pack`.mainImage, `pack`.images, `pack`.profileEmail AS guideEmail,
    `book`.tuuristEmail, `book`.dates, 
    `pro`.image AS guideImage
    FROM `package` AS pack
    JOIN booking AS book on `book`.packageId = `pack`.id 
    JOIN profile AS pro on `pack`.profileEmail = `pro`.email 
    WHERE `book`.tuuristEmail = '{$email}'";
    $result = mysqli_query( $conn , $query );
    $output = [];

  if ( !$result ){
    mysqli_error( $conn );
    throw new Exception('Error ', $result );
  }
  
  while ( $row = mysqli_fetch_assoc( $result) ){
    $output[] = $row;
  }

  print_r( json_encode( $output ));
  }
}

?>
