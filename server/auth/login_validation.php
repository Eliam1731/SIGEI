<?php
    include '../config/connection_db.php';

    session_start();    

    $json = file_get_contents('php://input');
    $data = json_decode($json);

    if ($data === null) {
        echo json_encode(["error" => "JSON inválido"]);
        exit;
    }

    $email = $data->email;
    $password = $data->password;

    $stmt = $conn->prepare("
        SELECT 
            usuarios.nombre, 
            usuarios.primer_apellido, 
            usuarios.segundo_apellido, 
            usuarios.correo_electronico, 
            frente.nom_frente AS frente_nombre, 
            roles.nombre_rol AS rol_nombre,
            usuarios.contraseña
        FROM 
            usuarios
        INNER JOIN 
            frente ON usuarios.frente_id = frente.frente_id
        INNER JOIN 
            roles ON usuarios.rol_id = roles.rol_id
        WHERE 
            usuarios.correo_electronico = ?
    ");
    $stmt->bind_param("s", $email);

    $stmt->execute();

    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        if (password_verify($password, $user['contraseña'])) {
            $_SESSION['usuario_autenticado'] = true;
            $_SESSION['nombre'] = $user['nombre'];
            $_SESSION['primer_apellido'] = $user['primer_apellido'];
            $_SESSION['segundo_apellido'] = $user['segundo_apellido'];
            $_SESSION['correo_electronico'] = $user['correo_electronico'];
            $_SESSION['frente_nombre'] = $user['frente_nombre'];
            $_SESSION['rol_nombre'] = $user['rol_nombre'];
            echo json_encode(["success" => true]);
            exit;
        } else {
            echo json_encode(["error" => "Contraseña incorrecta."]);
        }
    } else {
        echo json_encode(["error" => "El correo electrónico no existe."]);
    }

    $stmt->close();
    $conn->close();
?>