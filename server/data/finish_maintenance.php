<?php
include '../config/connection_db.php';

$data = json_decode(file_get_contents('php://input'), true);

try {
    
    $conn->beginTransaction();

    
    $sql = "UPDATE mantenimiento SET termino_mante = ? WHERE Equipo_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$data['termino_mante'], $data['Equipo_id']]);

    
    $sql = "UPDATE equipos_informaticos SET Status_id = 1 WHERE Equipo_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$data['Equipo_id']]);

    
    $conn->commit();

    
    header('Content-Type: application/json');
    echo json_encode(['message' => 'El equipo está disponible']);
} catch (PDOException $e) {
    
    $conn->rollBack();
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
}
?>