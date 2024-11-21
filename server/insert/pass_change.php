<?php
    include '../config/connection_db.php';

    $messages = [
        "successful" => '¡La contraseña se ha actualizado correctamente!',
        "failed" => 'Ha ocurrido un error al actualizar la contraseña. Por favor, inténtalo más tarde.',
        "userNotFound" => 'El usuario no existe.'
    ];

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        $obj = json_decode($json);
        $email = $obj->email;
        $newPassword = password_hash($obj->newwpass, PASSWORD_DEFAULT);

        // Verificar si el usuario existe
        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE correo_electronico = ?");
        $stmt->execute([$email]);
        if(!$stmt->fetch()) {
            header('Content-Type: application/json');
            echo json_encode(["error" => "userNotFound", "message" => $messages["userNotFound"]]);
            exit;
        }

        try {
            $updatePassword = $conn->prepare("UPDATE usuarios SET Contraseña = ? WHERE correo_electronico = ?");
            $updatePassword->execute([$newPassword, $email]);

            header('Content-Type: application/json');
            echo json_encode(["message" => $messages["successful"]]);
        } catch(Exception $error) {
            header('Content-Type: application/json');
            echo json_encode(["error" => "failed", "message" => $messages['failed'], "details" => $error->getMessage()]);
        }
    }
?>