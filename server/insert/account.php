<?php
    include '../config/connection_db.php';

    $json = file_get_contents('php://input');
    error_log("JSON received: " . $json);

    $data = json_decode($json);

    if ($data === null) {
        echo json_encode(["error" => "JSON inválido"]);
        exit;
    }

    $name = $data->firstNameUser;
    if (isset($data->secondNameUser)) {
        $name .= " " . $data->secondNameUser;
    }

    $firstSurname = $data->firstSurnameUser;
    $secondSurname = $data->secondSurnameUser;
    $rol = $data->userRol;
    $frente = $data->foreheadUser;
    $email = $data->newEmailUser;

    $password = password_hash($data->newPasswordUser, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO usuarios (nombre, primer_apellido, segundo_apellido, contraseña, frente_id, rol_id, correo_electronico)  VALUES (?, ?, ?, ?, ?, ?, ?);");
    $stmt->bindParam(1, $name);
    $stmt->bindParam(2, $firstSurname);
    $stmt->bindParam(3, $secondSurname);
    $stmt->bindParam(4, $password);
    $stmt->bindParam(5, $frente);
    $stmt->bindParam(6, $rol);
    $stmt->bindParam(7, $email);

    if ($stmt->execute()) {
      echo json_encode(["success" => true]);
    } else {
      echo json_encode(["error" => $stmt->errorInfo()[2]]);
    }

    $stmt = null;
    $conn = null;
?>