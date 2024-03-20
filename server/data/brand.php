<?php
    include '../config/connection_db.php';

    $sql = "SELECT * FROM marca_del_equipo ORDER BY Id_Marca ASC";
    $result = $conn->query($sql);
    $data = [];

    while($row = $result->fetch_assoc()) {
        $data[] = [$row['Id_Marca'], $row['Nom_marca']];
    }

    $result->close();
    $conn->close();

    header('Content-Type: application/json');
    echo json_encode($data);
?>