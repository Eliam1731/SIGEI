<?php
include '../config/connection_db.php';

$data = json_decode(file_get_contents('php://input'), true);

$equipments = $data['equipments'];
$employee = intval($data['employee']); 
$userEmail = $data['user']; 
$observation = $data['observation'];
$date_auth = DateTime::createFromFormat('d/m/Y', $data['date_auth'])->format('Y-m-d H:i:s');

$sqlEmployee = "SELECT Correo_electronico FROM empleados_resguardantes WHERE Empleado_id = :employee_id";
$stmtEmployee = $conn->prepare($sqlEmployee);
$stmtEmployee->execute([':employee_id' => $employee]);

if ($stmtEmployee->rowCount() == 0) {
    echo json_encode(["message" => "El empleado no existe en la base de datos"]);
    exit();
}

$employeeEmail = $stmtEmployee->fetch(PDO::FETCH_ASSOC)['Correo_electronico'];

$sqlCheck = "SELECT * FROM usuarios WHERE correo_electronico = :email";
$stmtCheck = $conn->prepare($sqlCheck);
$stmtCheck->execute([':email' => $userEmail]);

if ($stmtCheck->rowCount() == 0) {
    echo json_encode(["message" => "El correo electrónico no existe en la base de datos"]);
    exit();
}

$userData = $stmtCheck->fetch(PDO::FETCH_ASSOC);
$userId = $userData['User_id'];

$sql = "INSERT INTO resguardos_de_equipos (Equipo_id, Empleado_id, Fecha_autorizacion, User_id, Comentario, Identificador_resguardo) VALUES (:equipment, :employee, :date_auth, :user, :observation, :resguardo_id)";
$stmt = $conn->prepare($sql);

$sqlUpdate = "UPDATE equipos_informaticos SET Status_id = 2 WHERE Equipo_id = :equipment";
$stmtUpdate = $conn->prepare($sqlUpdate);

$messages = [];

foreach ($equipments as $equipment) {
    $resguardo_id = uniqid();

    $stmt->execute([':equipment' => intval($equipment), ':employee' => $employee, ':date_auth' => $date_auth, ':user' => $userId, ':observation' => $observation, ':resguardo_id' => $resguardo_id]);

    $stmtUpdate->execute([':equipment' => intval($equipment)]);
}

echo json_encode(["message" => "Su resguardo fue exitoso", "employeeEmail" => $employeeEmail]);
?>