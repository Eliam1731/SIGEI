<?php
include '../config/connection_db.php';

// Recibe el JSON del front-end
$data = json_decode(file_get_contents('php://input'), true);

try {
    // Inicia una transacción
    $conn->beginTransaction();

    // Prepara la consulta SQL para actualizar la tabla mantenimiento
    $sql = "UPDATE mantenimiento SET termino_mante = ? WHERE Equipo_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$data['termino_mante'], $data['Equipo_id']]);

    // Prepara la consulta SQL para actualizar el status en la tabla equipos_informaticos
    $sql = "UPDATE equipos_informaticos SET Status_id = 1 WHERE Equipo_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$data['Equipo_id']]);

    // Confirma las operaciones
    $conn->commit();

    // Devuelve un JSON con el mensaje de éxito
    header('Content-Type: application/json');
    echo json_encode(['message' => 'El equipo está disponible']);
} catch (PDOException $e) {
    // Si algo sale mal, revierte las operaciones
    $conn->rollBack();
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
}
?>