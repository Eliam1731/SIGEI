<?php
    include '../config/connection_db.php';

    $data = [
        'work' => [],
        'forehead' => [],
        'company' => []
    ];


    $sql = "SELECT Obra_id, Nombre_obra, Num_obra FROM obras ORDER BY Obra_id ASC";
    $stmt = $conn->query($sql);
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $data['work'][] = [$row['Obra_id'], $row['Nombre_obra'] . ' (' . $row['Num_obra'] . ')'];
    }


    $sql = "SELECT Frente_id, Nom_frente, numero_frente FROM frente ORDER BY Frente_id ASC";
    $stmt = $conn->query($sql);
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $data['forehead'][] = [$row['Frente_id'], $row['Nom_frente'] . ' (' . $row['numero_frente'] . ')'];
    }


    $sql = "SELECT Empresa_id, Nom_empresa FROM empresas ORDER BY Empresa_id ASC";
    $stmt = $conn->query($sql);
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $data['company'][] = [$row['Empresa_id'], $row['Nom_empresa']];
    }

    $stmt = null;
    $conn = null;

    header('Content-Type: application/json');
    echo json_encode($data);
?>