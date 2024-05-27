<?php

include '../../config/connection_db.php';

$sql = $conn->prepare("SELECT COUNT(*) AS total FROM equipos_informaticos WHERE Status_id = 2");
$sql -> execute();

$result = $sql->fetch();
$response = array("resguardo"=> $result['total']);

echo json_encode($response);
?>