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