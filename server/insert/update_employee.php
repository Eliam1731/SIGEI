<?php
header('Content-Type: application/json');
include '../config/connection_db.php';

$data = $_POST;

// Limpiar espacios
foreach ($data as $key => $value) {
    $data[$key] = trim($value);
}

// Validar correo único
$stmt = $conn->prepare("SELECT * FROM empleados_resguardantes WHERE Correo_electronico = ? AND Empleado_id != ?");
$stmt->execute([$data['Correo_electronico'], $data['Empleado_id']]);
if ($stmt->fetch()) {
    echo json_encode(["message" => "El correo electrónico ya está en uso. Intenta con otro correo electrónico."]);
    exit;
}

// Actualizar datos del empleado (sin número de seguro social)
$sql = "UPDATE empleados_resguardantes SET 
    Nombre = :nombre, 
    Primer_apellido = :primer_apellido, 
    Segundo_apellido = :segundo_apellido, 
    Empresa_id = :empresa_id, 
    Obra_id = :obra_id, 
    Correo_electronico = :correo_electronico, 
    id_frente = :id_frente
    WHERE Empleado_id = :empleado_id";

$stmt = $conn->prepare($sql);

try {
    $conn->beginTransaction();

    $stmt->execute([
        'nombre' => $data['Nombre'], 
        'primer_apellido' => $data['Primer_apellido'], 
        'segundo_apellido' => $data['Segundo_apellido'], 
        'empresa_id' => $data['Empresa_id'], 
        'obra_id' => $data['Obra_id'], 
        'correo_electronico' => $data['Correo_electronico'], 
        'id_frente' => $data['id_frente'], 
        'empleado_id' => $data['Empleado_id']
    ]);

    $conn->commit();
    echo json_encode(["message" => "Su actualización fue exitosa"]);
} catch (PDOException $e) {
    $conn->rollBack();
    echo json_encode([
        "message" => "Hubo un error en la actualización", 
        "error" => [
            "code" => $e->getCode(),
            "message" => $e->getMessage(),
            "file" => $e->getFile(),
            "line" => $e->getLine()
        ]
    ]);
}
?>
