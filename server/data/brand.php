<?php
    include '../config/connection_db.php';

    $sql = "SELECT * FROM marca_del_equipo ORDER BY Id_Marca ASC";
    $stmt = $conn->query($sql);
    $data = [];

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $data[] = [$row['Id_Marca'], $row['Nom_marca']];
    }

    $stmt = null;
    $conn = null;

    header('Content-Type: application/json');
    echo json_encode($data);
?>

