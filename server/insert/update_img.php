<?php
include '../config/connection_db.php';

$data = json_decode(file_get_contents('php://input'), true);

$equipo_id = $data['equipo_id'];
$new_images = $data['new_images']; //'new_images' array de archivos

$sql_delete = "DELETE FROM imagenes WHERE Equipo_id = :equipo_id";
$stmt_delete = $conn->prepare($sql_delete);

$sql_insert = "INSERT INTO imagenes (Nombre, Tipo_mime, Datos_imagen, Equipo_id) VALUES (:nombre, :tipo_mime, :datos_imagen, :equipo_id)";
$stmt_insert = $conn->prepare($sql_insert);

try {
    $conn->beginTransaction();

    // Eliminar imágenes 
    $stmt_delete->execute(['equipo_id' => $equipo_id]);

    // Insertar nuevas imágenes
    foreach ($new_images as $image) {
        $imageData = file_get_contents($image['tmp_name']);
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime_type = $finfo->file($image['tmp_name']);

        $stmt_insert->execute([
            'nombre' => $image['name'],
            'tipo_mime' => $mime_type,
            'datos_imagen' => $imageData,
            'equipo_id' => $equipo_id
        ]);
    }

    $conn->commit();
    echo json_encode(["message" => "Las imágenes se actualizaron exitosamente"]);
} catch (PDOException $e) {
    $conn->rollBack();
    echo json_encode([
        "message" => "Hubo un error en la actualización de las imágenes", 
        "error" => [
            "code" => $e->getCode(),
            "message" => $e->getMessage(),
            "file" => $e->getFile(),
            "line" => $e->getLine()
        ]
    ]);
}
?>