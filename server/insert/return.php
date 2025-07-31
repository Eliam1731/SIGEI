<?php
// server/insert/return.php
include '../config/connection_db.php';
header('Content-Type: application/json; charset=utf-8');
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// 1) Leer payload
$data        = json_decode(file_get_contents('php://input'), true);
$equipments  = $data['devices']     ?? [];
$employee    = intval($data['employee'] ?? 0);
$rawDate     = $data['date']        ?? '';
$userEmail   = $data['user']        ?? '';
$observation = $data['observation'] ?? '';

// 2) Parseo de fecha DD/MM/YYYY
$ts = strtotime(str_replace('/', '-', $rawDate));
if ($ts === false) {
    echo json_encode([
      'status'  => 'error',
      'message' => "Formato de fecha inválido: $rawDate"
    ]);
    exit();
}
$dateReturn = date('Y-m-d H:i:s', $ts);

// 3) Obtener User_id
$stmtUser = $conn->prepare("
  SELECT User_id 
    FROM usuarios 
   WHERE correo_electronico = :email
");
$stmtUser->execute([':email' => $userEmail]);
if ($stmtUser->rowCount() === 0) {
    echo json_encode([
      'status'  => 'error',
      'message' => "Usuario no encontrado: $userEmail"
    ]);
    exit();
}
$userId = $stmtUser->fetchColumn();

// 4) Preparar INSERT y UPDATE
$stmtInsert = $conn->prepare("
  INSERT INTO devolucion_de_equipos
    (Equipo_id, Empleado_id, Fecha_autorizacion, User_id, Comentario)
  VALUES
    (:equipment, :employee, :date_return, :user, :observation)
");
$stmtUpEq   = $conn->prepare("UPDATE equipos_informaticos SET Status_id = 1 WHERE Equipo_id = :equipment");
$stmtUpRes  = $conn->prepare("UPDATE resguardos_de_equipos SET status = 'disponible' WHERE Equipo_id = :equipment");

// 5) Ejecutar en transacción
try {
    $conn->beginTransaction();
    foreach ($equipments as $eqId) {
        $stmtInsert->execute([
          ':equipment'    => intval($eqId),
          ':employee'     => $employee,
          ':date_return'  => $dateReturn,
          ':user'         => $userId,
          ':observation'  => $observation
        ]);
        $stmtUpEq->execute([':equipment'   => intval($eqId)]);
        $stmtUpRes->execute([':equipment'  => intval($eqId)]);
    }
    $conn->commit();

    echo json_encode([
      'status'  => 'ok',
      'message' => 'La devolución fue exitosa',
      'available' => 'El equipo ahora está disponible'
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode([
      'status'  => 'error',
      'message' => 'Hubo un error al procesar la devolución: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
