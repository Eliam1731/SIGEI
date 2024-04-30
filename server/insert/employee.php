<?php
    include '../config/connection_db.php';

    $messages = [
        "numberSocialExisting" => 'El número de seguro social ya está en uso. Intenta con otro número.',
        "emailExisting" => 'El correo electrónico ya está en uso. Intenta con otro correo electrónico.',
        "succesful" => '¡Felicidades! Tu registro se ha realizado correctamente.',
        "failed" => 'Ha ocurrido un error al registrar el empleado. Por favor, inténtalo más tarde.'
    ];

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $formData = $_POST;
        $data = [
            "nameEmployee" => $formData['name'],
            "firstSurname" => $formData['first_surname'],
            "secondSurname" => $formData['second_surname'],
            "numberSocial" => $formData['number_social'],
            "companyBelongs" => $formData['company_belongs'],
            "workBelongs" => $formData['work_belongs'],
            "forehead_belongs" => $formData['forehead_belongs'],
            "email" => $formData['email'],
        ];

        $stmt = $conn->prepare("SELECT * FROM empleados_resguardantes WHERE Num_seguro_social = ?");
        $stmt->execute([$data["numberSocial"]]);
        if($stmt->fetch()) {
            header('Content-Type: application/json');
            echo json_encode(["error" => "numberSocialExisting", "message" => $messages["numberSocialExisting"]], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $stmt = $conn->prepare("SELECT * FROM empleados_resguardantes WHERE Correo_electronico = ?");
        $stmt->execute([$data["email"]]);
        if($stmt->fetch()) {
            header('Content-Type: application/json');
            echo json_encode(["error" => "emailExisting", "message" => $messages["emailExisting"]], JSON_UNESCAPED_UNICODE);
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

            $empleadoId = $conn->lastInsertId();

            $insertObraEmpresa = $conn->prepare("INSERT INTO obra_empresa (Obra_id, Empresa_id, Empleado_id) VALUES (?, ?, ?)");
            $insertObraEmpresa->execute([$data["workBelongs"], $data["companyBelongs"], $empleadoId]);
            
            $insertObraFrente = $conn->prepare("INSERT INTO obra_frente (Obra_id, Frente_id, Empleado_id) VALUES (?, ?, ?)");
            $insertObraFrente->execute([$data["workBelongs"], $data["forehead_belongs"], $empleadoId]);
            
            
            print json_encode(["message" => $messages["succesful"]], JSON_UNESCAPED_UNICODE);
        } catch(Exception $error) {
            header('Content-Type: application/json');
            print json_encode(["error" => $messages['failed'], "message" => $error->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }
?>