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
        departamento.nombre_departamento AS departamento_nombre,
        roles.nombre_rol AS rol_nombre,
        usuarios.contraseña
    FROM
        usuarios
    INNER JOIN
        departamento ON usuarios.departamento_id = departamento.id_departamento
    INNER JOIN
        roles ON usuarios.rol_id = roles.rol_id
    WHERE
        usuarios.correo_electronico = ?
    ");
$stmt->bindParam(1, $email);

$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    if (password_verify($password, $user['contraseña'])) {
        $_SESSION['usuario_autenticado'] = true;
        $_SESSION['nombre'] = $user['nombre'];
        $_SESSION['primer_apellido'] = $user['primer_apellido'];
        $_SESSION['segundo_apellido'] = $user['segundo_apellido'];
        $_SESSION['correo_electronico'] = $user['correo_electronico'];
        $_SESSION['departamento_nombre'] = $user['departamento_nombre'];
        $_SESSION['rol_nombre'] = $user['rol_nombre'];
        echo json_encode(["success" => true]);
        exit;
    } else {
        echo json_encode(["error" => "Contraseña incorrecta."]);
    }
} else {
    echo json_encode(["error" => "El correo electrónico no existe."]);
}

$stmt = null;
$conn = null;
