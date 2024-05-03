<?php
    include '../config/connection_db.php';

    $messages = [
        "emailExisting" => 'El correo electrónico ya está en uso. Intenta con otro correo electrónico.',
        "succesful" => '¡Felicidades! Tu registro se ha realizado correctamente.',
        "failed" => 'Ha ocurrido un error al registrar el usuario. Por favor, inténtalo más tarde.'
    ];

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        $obj = json_decode($json);
        $data = [
            "name" => ucfirst(strtolower($obj->firstNameUser)),
            "firstSurname" => ucfirst(strtolower($obj->firstSurnameUser)),
            "secondSurname" => ucfirst(strtolower($obj->secondSurnameUser)),
            "password" => password_hash($obj->newPasswordUser, PASSWORD_DEFAULT), // Utilizar password_hash aquí
            "roleId" => $obj->userRol,
            "email" => $obj->newEmailUser,
            "departmentId" => $obj->departmentId,
        ];

        // Verificar si el correo electrónico ya existe
        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE correo_electronico = ?");
        $stmt->execute([$data["email"]]);
        if($stmt->fetch()) {
            header('Content-Type: application/json');
            echo json_encode(["error" => "emailExisting", "message" => $messages["emailExisting"]]);
            exit;
        }

        try {
            $insertData = $conn->prepare("INSERT INTO usuarios (Nombre, Primer_apellido, Segundo_apellido, Contraseña, Rol_id, correo_electronico, departamento_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $insertData->execute([
                $data["name"],
                $data["firstSurname"],
                $data["secondSurname"],
                $data["password"],
                $data["roleId"],
                $data["email"],
                $data["departmentId"],
            ]);

            header('Content-Type: application/json');
            print json_encode(["message" => $messages["succesful"]]);
        } catch(Exception $error) {
            header('Content-Type: application/json');
            print json_encode(["error" => $messages['failed'], "message" => $error->getMessage()]);
        }
    }
?>