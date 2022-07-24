<?php
include 'db.php';

$name = $_POST['name'];
$long = $_POST['long'];
$lat = $_POST['lat'];

$add_query = "INSERT INTO cities(city_name, geom) VALUES ('$name', ST_Transform(ST_SetSrid(ST_MakePoint($long, $lat), 3857), 4326))";

$query = pg_query($dbconnection, $add_query);

if ($query) {
  echo json_encode(array("statusCode" => 200));
} else {
  echo json_encode(array("statusCode" => 201));
}


?>