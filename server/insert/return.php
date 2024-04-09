<?php
include '../config/connection_db.php';

$data = json_decode(file_get_contents('php://input'), true);

$equipments = $data['devices'];
$employee = intval($data['employee']); 
$date_auth = DateTime::createFromFormat('d/m/Y', $data['date'])->format('Y-m-d');
$userEmail = $data['user'];
$observation = $data['observation'];

$sqlUser = "SELECT User_id FROM usuarios WHERE correo_electronico = :email";
$stmtUser = $conn->prepare($sqlUser);
$stmtUser->execute([':email' => $userEmail]);

if ($stmtUser->rowCount() == 0) {
    echo json_encode(["message" => "El correo electrónico no existe en la base de datos"]);
    exit();
}

$userRow = $stmtUser->fetch();
$userId = $userRow['User_id'];

$sql = "INSERT INTO devolucion_de_equipos (Equipo_id, Empleado_id, Fecha_autorizacion, User_id, Comentario) VALUES (:equipment, :employee, :date_auth, :user, :observation)";
$stmt = $conn->prepare($sql);

$sqlUpdate = "UPDATE equipos_informaticos SET Status_id = 1 WHERE Equipo_id = :equipment"; 
$stmtUpdate = $conn->prepare($sqlUpdate);

$sqlUpdateResguardo = "UPDATE resguardos_de_equipos SET status = 'disponible' WHERE Equipo_id = :equipment"; 
$stmtUpdateResguardo = $conn->prepare($sqlUpdateResguardo);

try {
    $conn->beginTransaction();
    
    foreach ($equipments as $equipment) {
        $stmt->execute([':equipment' => intval($equipment), ':employee' => $employee, ':date_auth' => $date_auth, ':user' => $userId, ':observation' => $observation]);
        $stmtUpdate->execute([':equipment' => intval($equipment)]);
        $stmtUpdateResguardo->execute([':equipment' => intval($equipment)]);
    }

    $conn->commit();
    echo json_encode(["message" => "La devolución fue exitosa", "status" => "El equipo ahora está disponible"], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode(["message" => "Hubo un error al procesar la devolución: " . $e->getMessage()]);
}
?>