<?php
include '../config/connection_db.php';

$data = json_decode(file_get_contents('php://input'), true);

try {
    
    $conn->beginTransaction();

    $sql = "UPDATE mantenimiento SET termino_mante = ?, hora_termino = ?, Motivo_mantenimiento = ? WHERE Equipo_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$data['termino_mante'], $data['hora_termino'], $data['Motivo_mantenimiento'], $data['Equipo_id']]);


    $sql = "UPDATE equipos_informaticos SET Status_id = 1 WHERE Equipo_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$data['Equipo_id']]);


    $sql = "SELECT * FROM mantenimiento WHERE Equipo_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$data['Equipo_id']]);
    $equipo = $stmt->fetch(PDO::FETCH_ASSOC);

    $equipo['horaInicio'] = date('g:i A', strtotime($equipo['horaInicio']));
    $equipo['hora_termino'] = date('g:i A', strtotime($equipo['hora_termino']));

    $conn->commit();


    header('Content-Type: application/json');
    echo json_encode(['message' => 'El equipo está disponible', 'equipo' => $equipo]);
} catch (PDOException $e) {
    
    $conn->rollBack();
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
}
?>