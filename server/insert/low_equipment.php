<?php
include '../config/connection_db.php';

try {
    
    $data = json_decode(file_get_contents('php://input'), true);

    $equipo_id = $data['equipo_id'];
    $user_id = $data['user_id'];
    $motivo_baja = $data['motivo_baja'];

    $conn->beginTransaction();


    $sql = "INSERT INTO baja_de_equipos (Equipo_id, User_id, Fecha_baja, Motivo_baja) VALUES (?, ?, UNIX_TIMESTAMP(), ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$equipo_id, $user_id, $motivo_baja]);

    $sql = "UPDATE equipos_informaticos SET Status_id = 4 WHERE Equipo_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$equipo_id]);

    $conn->commit();

    echo "El equipo ha sido dado de baja exitosamente.";
} catch (PDOException $e) {
    $conn->rollback();
    echo "Error: " . $e->getMessage();
}
?>