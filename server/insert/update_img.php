<?php
include '../config/connection_db.php';

$equipo_id = $_POST['equipo_id'];

$sql_insert = "INSERT INTO imagenes (Nombre, Tipo_mime, Datos_imagen, Equipo_id) VALUES (:nombre, :tipo_mime, :datos_imagen, :equipo_id)";
$stmt_insert = $conn->prepare($sql_insert);

try {
    $conn->beginTransaction();

    foreach ($_FILES['image']['tmp_name'] as $key => $tmp_name) {
        $imageData = file_get_contents($tmp_name);
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime_type = $finfo->file($tmp_name);

        $stmt_insert->execute([
            'nombre' => $_FILES['image']['name'][$key],
            'tipo_mime' => $mime_type,
            'datos_imagen' => $imageData,
            'equipo_id' => $equipo_id
        ]);
    }

    $conn->commit();
    echo json_encode(["message" => "Las imágenes se insertaron exitosamente"]);
} catch (PDOException $e) {
    $conn->rollBack();
    echo json_encode([
        "message" => "Hubo un error en la inserción de las imágenes", 
        "error" => [
            "code" => $e->getCode(),
            "message" => $e->getMessage(),
            "file" => $e->getFile(),
            "line" => $e->getLine()
        ]
    ]);
}
?>