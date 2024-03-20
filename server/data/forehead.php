<?php
    include '../config/connection_db.php';

    $sql = "SELECT frente_id, nom_frente FROM frente;";
    $result = $conn->query($sql);
    $data = [];

    while($row = $result->fetch_assoc()) {
        $data[] = [$row['frente_id'], $row['nom_frente']];
    }

    header('Content-Type: application/json');
    echo json_encode($data);
?>