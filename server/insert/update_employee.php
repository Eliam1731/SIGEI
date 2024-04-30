<?php
include '../config/connection_db.php';

$data = $_POST;


foreach ($data as $key => $value) {
    $data[$key] = trim($value);
}


$stmt = $conn->prepare("SELECT * FROM empleados_resguardantes WHERE Num_seguro_social = ? AND Empleado_id != ?");
$stmt->execute([$data['Num_seguro_social'], $data['Empleado_id']]);
if($stmt->fetch()) {
    echo json_encode(["message" => "El número de seguro social ya está en uso. Intenta con otro número."]);
    exit;
}


$stmt = $conn->prepare("SELECT * FROM empleados_resguardantes WHERE Correo_electronico = ? AND Empleado_id != ?");
$stmt->execute([$data['Correo_electronico'], $data['Empleado_id']]);
if($stmt->fetch()) {
    echo json_encode(["message" => "El correo electrónico ya está en uso. Intenta con otro correo electrónico."]);
    exit;
}


if(strpos($data['Correo_electronico'], '@grupoopc.com') === false) {
    echo json_encode(["message" => "Solo se pueden meter correos con el dominio @grupoopc.com"]);
    exit;
}

$sql = "UPDATE empleados_resguardantes SET 
    Nombre = :nombre, 
    Primer_apellido = :primer_apellido, 
    Segundo_apellido = :segundo_apellido, 
    Num_seguro_social = :num_seguro_social, 
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
        'num_seguro_social' => $data['Num_seguro_social'], 
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