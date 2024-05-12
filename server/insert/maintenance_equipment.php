<?php
include '../config/connection_db.php';

$data = json_decode(file_get_contents('php://input'), true);

try {
    
    $conn->beginTransaction();

    
    $sql = "INSERT INTO mantenimiento (Equipo_id, User_id, inicio_mante, Motivo_mantenimiento) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$data['Equipo_id'], $data['User_id'], $data['inicio_mante'], $data['Motivo_mantenimiento']]);

    $sql = "UPDATE equipos_informaticos SET Status_id = 3 WHERE Equipo_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$data['Equipo_id']]);


    $conn->commit();


    header('Content-Type: application/json');
    echo json_encode(['message' => 'El equipo se trasladó a mantenimiento']);
} catch (PDOException $e) {

    $conn->rollBack();
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
}
?>