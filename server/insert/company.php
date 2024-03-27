<?php
    include '../config/connection_db.php';

    $messages = [
        "companyExisting" => 'No es posible registrar este nombre de empresa porque ya está en uso. Intenta con otro nombre.',
        "shortNameCompany" => 'No es posible registrar el nombre corto de la empresa porque ya está en uso. Intenta con otro nombre.',
        "succesful" => '¡Felicidades! Tu registro se ha realizado correctamente.',
        "failed" => 'Ha ocurrido un error al registrar la empresa. Por favor, inténtalo más tarde.'
    ];

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        $obj = json_decode($json);
        $data = [
            "nameCompany" => $obj->nameCompany,
            "shortName" => $obj->shortName
        ];

        // Verificar si el nombre de la empresa ya existe xd 
        $stmt = $conn->prepare("SELECT * FROM empresas WHERE Nom_empresa = ?");
        $stmt->execute([$data["nameCompany"]]);
        if($stmt->fetch()) {
            header('Content-Type: application/json');
            echo json_encode(["error" => "companyExisting", "message" => $messages["companyExisting"]]);
            exit;
        }

        // Verificar si el nombre corto de la empresa ya existe xd
        $stmt = $conn->prepare("SELECT * FROM empresas WHERE Nom_corto = ?");
        $stmt->execute([$data["shortName"]]);
        if($stmt->fetch()) {
            header('Content-Type: application/json');
            echo json_encode(["error" => "shortNameCompany", "message" => $messages["shortNameCompany"]]);
            exit;
        }

        try {
            $insertData = $conn->prepare("INSERT INTO empresas (Nom_empresa, Nom_corto) VALUES (?, ?)");
            $insertData->execute([
                $data["nameCompany"],
                $data["shortName"],
            ]);

            header('Content-Type: application/json');
            print json_encode($messages["succesful"]);
        } catch(Exception $error) {
            header('Content-Type: application/json');
            print json_encode($messages['failed'], $error->getMessage());
        }
    }
?>