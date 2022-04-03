<?php



include "config.php";


// echo $current_time;

$request = 2;


// Read $_GET value
if(isset($_GET['request'])){
   $request = $_GET['request'];
   $id = $_GET['id'];

  
}

// Fetch records 
if($request == 1){
   $date = $_GET['date'];
   // Select record 
   //$sql = "SELECT * FROM cookies";
   $sql = "SELECT * FROM cookies WHERE Cookie_date='$date'";
   $employeeData = mysqli_query($con,$sql);

   $response = array();
   while($row = mysqli_fetch_assoc($employeeData)){
      $response[] = array(
         "id" => $row['ID'],
         "value" => $row['value'],
         "date" => $row['Cookie_date'],
         "time" => $row['Cookie_time'],
      );
   }

   echo json_encode($response);
   exit;
}

if($request == 3){

   // Select record 
   //$sql = "SELECT * FROM cookies";
   $sql = "SELECT * FROM cookies WHERE id = $id";
   $employeeData = mysqli_query($con,$sql);

   $response = array();
   while($row = mysqli_fetch_assoc($employeeData)){
      $response[] = array(
         "id" => $row['ID'],
         "value" => $row['value'],
         "date" => $row['Cookie_date'],
         "time" => $row['Cookie_time'],
      );
   }

   echo json_encode($response);
   exit;
}



// Insert record
if($request == 2){

 
   
//   $data = json_decode(file_get_contents("php://input"));
 $data = file_get_contents("php://input");

$current_date = date("Y-m-d");  
$current_time = date("H:i:s"); 


$sql = "insert into cookies(Cookie_date,Cookie_time,value) values('".$current_date."','".$current_time."','".$data."')";
   

   if(mysqli_query($con,$sql)){
      echo 1; 
   }else{
      echo 0;
   }

   exit;
}
// update record
if($request == 4){

 
 $data = file_get_contents("php://input");


   
$sql = "UPDATE cookies SET value='$data' WHERE id= $id";

   if(mysqli_query($con,$sql)){
      echo 1; 
   }else{
      echo 0;
   }

   exit;
}