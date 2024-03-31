<?php

    include '../config/connection_db.php';

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    //ESTAS SON LAS VARIABLES QUE ENVIA EL FRONT, ESTO SI NO LOS CAMBIES
    $nameWork = $data['nameWork'];
    $shortNameWork = $data['shortNameWork'];
    $numWork = $data['numWork'];
    //ESTOS ULTIMOS DOS CONTIENEN ARRAYS DE LOS IDS DE EMPRESA Y FRENTES    
    $groupCompany = $data['groupCompany'];
    $groupForehead = $data['groupForeheads'];

    //APARTIR DE AQUI PUEDES BORRAR TODO Y EMPEZAR A HACERLO FUNCIONAL, SOLO PUSE ESTO PARA TESTEAR
    $messages = [
        "workExisting" => 'No es posible registrar esta obra porque ya está en uso. Intenta con otro nombre.',
        "shortNameWork" => 'No es posible registrar el nombre corto de la obra porque ya está en uso. Intenta con otro nombre.',
        "numWork" => 'No es posible registrar el número de obra porque ya está en uso. Intenta con otro número.',
        "succesful" => '¡Felicidades! Tu registro se ha realizado correctamente.',
        "failed" => 'Ha ocurrido un error al registrar la obra. Por favor, inténtalo más tarde.'
    ];

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        $obj = json_decode($json);
        $data = [
            "nameWork" => $obj->nameWork,
            "shortNameWork" => $obj->shortNameWork,
            "numWork" => $obj->numWork,
            "groupCompany" => $obj->groupCompany,
            "groupForeheads" => $obj->groupForeheads
        ];

        // Verificar si el nombre de la obra ya existe ya se me esta haciendo mas easy
        $stmt = $conn->prepare("SELECT * FROM obras WHERE Nombre_obra = ?");
        $stmt->execute([$data["nameWork"]]);
        if($stmt->fetch()) {
            header('Content-Type: application/json');
            echo json_encode(["error" => "workExisting", "message" => $messages["workExisting"]]);
            exit;
        }

        // Verificar si el nombre corto de la obra ya existe
        $stmt = $conn->prepare("SELECT * FROM obras WHERE Nom_corto_obra = ?");
        $stmt->execute([$data["shortNameWork"]]);
        if($stmt->fetch()) {
            header('Content-Type: application/json');
            echo json_encode(["error" => "shortNameWork", "message" => $messages["shortNameWork"]]);
            exit;
        }

        // Verificar si el número de obra ya existe
        $stmt = $conn->prepare("SELECT * FROM obras WHERE Num_obra = ?");
        $stmt->execute([$data["numWork"]]);
        if($stmt->fetch()) {
            header('Content-Type: application/json');
            echo json_encode(["error" => "numWork", "message" => $messages["numWork"]]);
            exit;
        }

        try {
            // Insertar datos en la tabla obras
            $insertData = $conn->prepare("INSERT INTO obras (Nombre_obra, Nom_corto_obra, Num_obra, Empresa_id, Frente_id) VALUES (?, ?, ?, ?, ?)");
            foreach($data["groupCompany"] as $company) {
                foreach($data["groupForeheads"] as $forehead) {
                    $insertData->execute([
                        $data["nameWork"],
                        $data["shortNameWork"],
                        $data["numWork"],
                        $company,
                        $forehead
                    ]);
                }
            }

            header('Content-Type: application/json');
            print json_encode($messages["succesful"]);
        } catch(Exception $error) {
            header('Content-Type: application/json');
            print json_encode($messages['failed'], $error->getMessage());
        }
    }
?>