<?php
include '../config/connection_db.php';

$data = json_decode(file_get_contents('php://input'), true);

try {
    $conn->beginTransaction();

    $resguardante = 'Desconocido';
    if (isset($data['num_seguro_social']) && $data['num_seguro_social'] != null) {
        $sql = "SELECT * FROM empleados_resguardantes WHERE Num_seguro_social = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data['num_seguro_social']]);
        if ($stmt->rowCount() > 0) {
            $resguardanteData = $stmt->fetch(PDO::FETCH_ASSOC);
            $resguardante = $resguardanteData['Nombre'] . ' ' . $resguardanteData['Primer_apellido'] . ' ' . $resguardanteData['Segundo_apellido'];
        }
    } else {
        $resguardante = 'Edgar Bladimir Gutiérrez Campos';
    }

    $sql = "SELECT * FROM usuarios WHERE correo_electronico = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$data['usuario']]);
    if ($stmt->rowCount() == 0) {
        throw new Exception('El usuario no existe');
    }

    $sql = "SELECT * FROM equipos_informaticos WHERE Equipo_id = ? AND Status_id = 3";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$data['equipo']]);
    if ($stmt->rowCount() > 0) {
        throw new Exception('El equipo ya está en mantenimiento');
    }

    $sql = "INSERT INTO mantenimiento (Equipo_id, User_email, inicio_mante, horaInicio, resguardante, herramientas, otros) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$data['equipo'], $data['usuario'], $data['fechaInicio'], $data['horaInicio'], $resguardante, json_encode($data['materialRequerido']['herramientas']), $data['materialRequerido']['otros']]);

    $sql = "UPDATE equipos_informaticos SET Status_id = 3 WHERE Equipo_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$data['equipo']]);

    $conn->commit();

    header('Content-Type: application/json');
    echo json_encode(['message' => 'El equipo se trasladó a mantenimiento']);
} catch (Exception $e) {
    $conn->rollBack();
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
}
?>