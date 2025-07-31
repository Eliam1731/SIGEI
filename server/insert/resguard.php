<?php
include '../config/connection_db.php';
header('Content-Type: application/json; charset=utf-8');
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// 1) Leer datos
$data       = json_decode(file_get_contents('php://input'), true);
$equipments = $data['equipments'];
$employee   = intval($data['employee']); 
$userEmail  = $data['user']; 
$observation= $data['observation'];
$rawDate    = $data['date_auth'];

// 2) Parseo robusto de fecha
$ts = strtotime(str_replace('/', '-', $rawDate));
if ($ts === false) {
    echo json_encode(["message" => "Formato de fecha inválido: $rawDate"]);
    exit();
}
$dateAuth = date('Y-m-d H:i:s', $ts);

// 3a) Obtener correo del empleado
$stmtEmp = $conn->prepare(
  "SELECT Correo_electronico 
     FROM empleados_resguardantes 
    WHERE Empleado_id = :employee"
);
$stmtEmp->execute([':employee' => $employee]);
if (!$stmtEmp->rowCount()) {
    echo json_encode(["message" => "Empleado no encontrado"]);
    exit;
}
$employeeEmail = $stmtEmp->fetch(PDO::FETCH_ASSOC)['Correo_electronico'];

// 3b) Obtener User_id del usuario
$stmtUser = $conn->prepare(
  "SELECT User_id 
     FROM usuarios 
    WHERE correo_electronico = :email"
);
$stmtUser->execute([':email' => $userEmail]);
if (!$stmtUser->rowCount()) {
    echo json_encode(["message" => "Usuario no encontrado"]);
    exit;
}
$userId = $stmtUser->fetch(PDO::FETCH_ASSOC)['User_id'];

// 4) Preparar INSERT y UPDATE
$sql = "INSERT INTO resguardos_de_equipos 
    (Equipo_id, Empleado_id, Fecha_autorizacion, User_id, Comentario, Identificador_resguardo) 
  VALUES 
    (:equipment, :employee, :date_auth, :user, :observation, :resguardo_id)";
$stmt       = $conn->prepare($sql);
$stmtUpdate = $conn->prepare(
  "UPDATE equipos_informaticos SET Status_id = 2 WHERE Equipo_id = :equipment"
);

// 5) Ejecutar dentro de transacción
try {
    $conn->beginTransaction();
    foreach ($equipments as $equipment) {
        $resguardoId = uniqid();
        $stmt->execute([
            ':equipment'   => intval($equipment),
            ':employee'    => $employee,
            ':date_auth'   => $dateAuth,
            ':user'        => $userId,
            ':observation' => $observation,
            ':resguardo_id'=> $resguardoId
        ]);
        $stmtUpdate->execute([
            ':equipment' => intval($equipment)
        ]);
    }
    $conn->commit();
    echo json_encode([
      "message"       => "Su resguardo fue exitoso",
      "employeeEmail" => $employeeEmail
    ]);
} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode([
      "message" => "Error al procesar resguardo: " . $e->getMessage()
    ]);
}
