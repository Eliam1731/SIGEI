<?php
include '../config/connection_db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Decodifica el JSON recibido
    $data = json_decode(file_get_contents('php://input'), true);
    $nombre_frente = $data['nombre_frente'];
    $numero_frente = $data['numero_frente'];

    $stmt = $conn->prepare("SELECT * FROM frente WHERE Nom_frente = :nombre_frente");
    $stmt->execute(['nombre_frente' => $nombre_frente]);
    $row = $stmt->fetch();

    if ($row) {
        echo json_encode(['error' => 'El nombre de frente ' . $nombre_frente . ' ya existe.']);
    } else {
        $stmt = $conn->prepare("SELECT * FROM frente WHERE numero_frente = :numero_frente");
        $stmt->execute(['numero_frente' => $numero_frente]);
        $row = $stmt->fetch();

        if ($row) {
            echo json_encode(['error' => 'El número de frente ' . $numero_frente . ' ya existe.']);
        } else {
            $stmt = $conn->prepare("INSERT INTO frente (Nom_frente, numero_frente) VALUES (:nombre_frente, :numero_frente)");
            $stmt->execute(['nombre_frente' => $nombre_frente, 'numero_frente' => $numero_frente]);

            if ($stmt->rowCount() > 0) {
                echo json_encode(['message' => 'Frente creado exitosamente.']);
            } else {
                echo json_encode(['error' => 'No se pudo crear el frente.']);
            }
        }
    }
}
?>