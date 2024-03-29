<?php
    include '../config/connection_db.php';

    $messages = [
        "employeeExisting" => 'No es posible registrar este empleado porque ya está en uso. Intenta con otro nombre.',
        "emailExisting" => 'El correo electrónico ya está en uso. Intenta con otro correo electrónico.',
        "succesful" => '¡Felicidades! Tu registro se ha realizado correctamente.',
        "failed" => 'Ha ocurrido un error al registrar el empleado. Por favor, inténtalo más tarde.'
    ];

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $formData = $_POST;
        $data = [
            "nameEmployee" => $formData['nameEmployee'],
            "firstSurname" => $formData['firstSurname'],
            "secondSurname" => $formData['secondSurname'],
            "numberSocial" => $formData['numberSocial'],
            "companyBelongs" => $formData['companyBelongs'],
            "workBelongs" => $formData['workBelongs'],
            "forehead_belongs" => $formData['forehead_belongs'],
            "email" => $formData['email'],
        ];

        // Verificar si el número de seguro social ya existe xd
        $stmt = $conn->prepare("SELECT * FROM empleados_resguardantes WHERE Num_seguro_social = ?");
        $stmt->execute([$data["numberSocial"]]);
        if($stmt->fetch()) {
            header('Content-Type: application/json');
            echo json_encode(["error" => "employeeExisting", "message" => $messages["employeeExisting"]]);
            exit;
        }

        // Verificar si el correo electrónico ya existe xd
        $stmt = $conn->prepare("SELECT * FROM empleados_resguardantes WHERE Correo_electronico = ?");
        $stmt->execute([$data["email"]]);
        if($stmt->fetch()) {
            header('Content-Type: application/json');
            echo json_encode(["error" => "emailExisting", "message" => $messages["emailExisting"]]);
            exit;
        }

        try {
            $insertData = $conn->prepare("INSERT INTO empleados_resguardantes (Nombre, Primer_apellido, Segundo_apellido, Num_seguro_social, Empresa_id, Obra_id, id_frente, Correo_electronico) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $insertData->execute([
                $data["nameEmployee"],
                $data["firstSurname"],
                $data["secondSurname"],
                $data["numberSocial"],
                $data["companyBelongs"],
                $data["workBelongs"],
                $data["forehead_belongs"],
                $data["email"],
            ]);

            header('Content-Type: application/json');
            print json_encode($messages["succesful"]);
        } catch(Exception $error) {
            header('Content-Type: application/json');
            print json_encode($messages['failed'], $error->getMessage());
        }
    }
?>