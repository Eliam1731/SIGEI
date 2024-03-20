<?php
    session_start();

    if (!isset($_SESSION['usuario_autenticado']) || !$_SESSION['usuario_autenticado']) {
        echo json_encode(["error" => "Usuario no autenticado"]);
        exit;
    }

    $user = [
        'nombre' => $_SESSION['nombre'],
        'primer_apellido' => $_SESSION['primer_apellido'],
        'segundo_apellido' => $_SESSION['segundo_apellido'],
        'correo_electronico' => $_SESSION['correo_electronico'],
        'frente_nombre' => $_SESSION['frente_nombre'],
        'rol_nombre' => $_SESSION['rol_nombre'],
    ];

    $user_json = json_encode($user);

    header('Content-Type: application/json');

    echo $user_json;
?>