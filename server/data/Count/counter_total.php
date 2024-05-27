<?php

include '../../config/connection_db.php';

$sql = $conn->prepare("SELECT COUNT(*) AS total FROM equipos_informaticos ");
$sql->execute();

$result = $sql->fetch();
$response = array("total"=> $result['total']);

echo json_encode($response);
?>