<?php
include '../config/connection_db.php';

$data = json_decode(file_get_contents('php://input'), true);



$equipo_id = $data['equipo_id'];

$sql = "SELECT Status_id FROM equipos_informaticos WHERE Equipo_id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$equipo_id]);


$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result['Status_id'] != 4) {
    echo json_encode(['error' => "Error al actualizar el status del equipo: El equipo no está dado de baja"]);
    exit();
}

$sql = "UPDATE equipos_informaticos SET Status_id = 1 WHERE Equipo_id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$equipo_id]);

if ($stmt->errorInfo()[2]) {
    echo json_encode(['error' => "Error al actualizar el status del equipo: " . $stmt->errorInfo()[2]]);
    exit();
}

echo json_encode(['message' => "Su devolución a disponible fue exitosa"]);
?>