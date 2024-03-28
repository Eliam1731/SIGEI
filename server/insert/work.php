<?php
    include '../config/connection_db.php';

    $json = file_get_contents('php://input');
    $data = json_decode($json);

    if ($data === null) {
        echo json_encode(["error" => "JSON inválido"]);
        exit;
    }

    $nombreObra = $data->Nombre_obra;
    $nomCortoObra = $data->Nom_corto_obra;
    $numObra = $data->Num_obra;
    $empresaId = $data->Empresa_id;
    $frenteId = $data->Frente_id;

    $stmt = $conn->prepare("SELECT * FROM obras WHERE Nombre_obra = ? OR Nom_corto_obra = ? OR Num_obra = ?");
    $stmt->bindParam(1, $nombreObra);
    $stmt->bindParam(2, $nomCortoObra);
    $stmt->bindParam(3, $numObra);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode(["error" => "Los valores proporcionados ya existen en la base de datos"]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO obras (Nombre_obra, Nom_corto_obra, Num_obra, Empresa_id, Frente_id) VALUES (?, ?, ?, ?, ?)");
    $stmt->bindParam(1, $nombreObra);
    $stmt->bindParam(2, $nomCortoObra);
    $stmt->bindParam(3, $numObra);
    $stmt->bindParam(4, $empresaId);
    $stmt->bindParam(5, $frenteId);

    if ($stmt->execute()) {
    echo json_encode(["success" => true]);
    } else {
    echo json_encode(["error" => $stmt->errorInfo()[2]]);
    }

    $stmt = null;
    $conn = null;
?>