<?php

include '../../config/connection_db.php';

$sql = $conn->prepare("SELECT COUNT(*) AS total FROM equipos_informaticos WHERE Status_id = 3");

$sql->execute();

$result = $sql->fetch();
$response = array("mantenimiento" => $result['total']);

echo json_encode($response);
?>