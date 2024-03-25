<?php
    include '../config/connection_db.php';

    $sql = "SELECT frente_id, nom_frente FROM frente;";
    $stmt = $conn->query($sql);
    $data = [];

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $data[] = [$row['frente_id'], $row['nom_frente']];
    }

    $stmt = null;
    $conn = null;

    header('Content-Type: application/json');
    echo json_encode($data);
?>