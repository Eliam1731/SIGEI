<?php
include '../config/connection_db.php';

$messages = [
    "emailExisting" => 'El correo electrónico ya está en uso. Intenta con otro correo electrónico.',
    "succesful" => '¡Felicidades! Tu registro se ha realizado correctamente.',
    "failed" => 'Ha ocurrido un error al registrar el empleado. Por favor, inténtalo más tarde.'
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $formData = $_POST;
    $data = [
        "nameEmployee" => ucfirst(strtolower($formData['name'])),
        "firstSurname" => ucfirst(strtolower($formData['first_surname'])),
        "secondSurname" => ucfirst(strtolower($formData['second_surname'])),
        "companyBelongs" => $formData['company_belongs'],
        "workBelongs" => $formData['work_belongs'],
        "forehead_belongs" => $formData['forehead_belongs'],
        "email" => $formData['email'],
    ];

    $stmt = $conn->prepare("SELECT * FROM empleados_resguardantes WHERE Correo_electronico = ?");
    $stmt->execute([$data["email"]]);
    if ($stmt->fetch()) {
        header('Content-Type: application/json');
        echo json_encode(["error" => "emailExisting", "message" => $messages["emailExisting"]], JSON_UNESCAPED_UNICODE);
        exit;
    }

    try {
        // Crear usuario
        $password = password_hash("opcic", PASSWORD_DEFAULT);
        $insertUser = $conn->prepare("INSERT INTO usuarios (Nombre, Primer_apellido, Segundo_apellido, Contraseña, Rol_id, correo_electronico, departamento_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $insertUser->execute([
            $data["nameEmployee"],
            $data["firstSurname"],
            $data["secondSurname"],
            $password,
            3, // Rol_id para empleados
            $data["email"],
            4 // Departamento_id por defecto
        ]);

        $userId = $conn->lastInsertId();

        // Crear empleado
        $insertData = $conn->prepare("INSERT INTO empleados_resguardantes (Nombre, Primer_apellido, Segundo_apellido, Empresa_id, Obra_id, id_frente, Correo_electronico, User_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $insertData->execute([
            $data["nameEmployee"],
            $data["firstSurname"],
            $data["secondSurname"],
            $data["companyBelongs"],
            $data["workBelongs"],
            $data["forehead_belongs"],
            $data["email"],
            $userId
        ]);

        $empleadoId = $conn->lastInsertId();

        $insertObraEmpresa = $conn->prepare("INSERT INTO obra_empresa (Obra_id, Empresa_id, Empleado_id) VALUES (?, ?, ?)");
        $insertObraEmpresa->execute([$data["workBelongs"], $data["companyBelongs"], $empleadoId]);

        $insertObraFrente = $conn->prepare("INSERT INTO obra_frente (Obra_id, Frente_id, Empleado_id) VALUES (?, ?, ?)");
        $insertObraFrente->execute([$data["workBelongs"], $data["forehead_belongs"], $empleadoId]);

        print json_encode(["message" => $messages["succesful"]], JSON_UNESCAPED_UNICODE);
    } catch (Exception $error) {
        header('Content-Type: application/json');
        print json_encode(["error" => $messages['failed'], "message" => $error->getMessage()], JSON_UNESCAPED_UNICODE);
    }
}
?>