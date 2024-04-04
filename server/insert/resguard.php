<?php
include '../config/connection_db.php';


$data = json_decode(file_get_contents('php://input'), true);


$equipments = $data['equipments'];
$employee = intval($data['employee']); // Convierte a entero para no tener problemas
$date_auth = $data['date_auth'];
$user = intval($data['user']); // Convierte a entero para no tenr problemas igual que lo anterior
$observation = $data['observation'];

// Prepara la consulta SQL para insertar el resguardos 
$sql = "INSERT INTO resguardos_de_equipos (Equipo_id, Empleado_id, Fecha_autorizacion, User_id, Comentario, Identificador_resguardo) VALUES (:equipment, :employee, :date_auth, :user, :observation, :resguardo_id)";
$stmt = $conn->prepare($sql);

// Prepara la consulta SQL para actualizar el status
$sqlUpdate = "UPDATE equipos_informaticos SET Status_id = 2 WHERE Equipo_id = :equipment";
$stmtUpdate = $conn->prepare($sqlUpdate);

$messages = [];

// Ejecuta las consultas para cada equipo
foreach ($equipments as $equipment) {
    // Genera un identificador único de resguardo
    $resguardo_id = uniqid();

    // Vincula los parámetros y ejecuta la consulta de inserción
    $stmt->execute([':equipment' => intval($equipment), ':employee' => $employee, ':date_auth' => $date_auth, ':user' => $user, ':observation' => $observation, ':resguardo_id' => $resguardo_id]);

    // Vincula los parámetros y ejecuta la consulta de actualización
    $stmtUpdate->execute([':equipment' => intval($equipment)]);


}


echo json_encode(["message" => "Su resguardo fue exitoso"]);
?>