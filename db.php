<?php

  $server = 'localhost';
  $username = 'postgres';
  $password = 'password';
  $db_name = 'spatialdb';

  $dbconnection = pg_connect("host=$server port=5432 dbname=$db_name user=$username password=$password");

?>