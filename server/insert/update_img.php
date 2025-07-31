<?php
include '../config/connection_db.php';

$response = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $equipo_id = $_POST['equipo_id'];

    try {
        $conn->beginTransaction();

        // 1) Directorio donde se guardarán las imágenes
        $imageDir = __DIR__ . '/../../path/to/images/';
        if (!is_dir($imageDir)) {
            mkdir($imageDir, 0777, true);
        }

        // 2) Preparamos la inserción en la base de datos
        $sql_insert = "
            INSERT INTO imagenes (Nombre, Tipo_mime, Datos_imagen, Equipo_id)
            VALUES (:nombre, :tipo_mime, :datos_imagen, :equipo_id)
        ";
        $stmt_insert = $conn->prepare($sql_insert);

        // 3) Recorremos cada archivo subido
        if (isset($_FILES['image']['tmp_name']) && is_array($_FILES['image']['tmp_name'])) {
            foreach ($_FILES['image']['tmp_name'] as $index => $tmpName) {
                $imageName = basename($_FILES['image']['name'][$index]);
                $mime_type = (new finfo(FILEINFO_MIME_TYPE))->file($tmpName);

                // Ruta destino en disco
                $destPath = $imageDir . $imageName;
                if (!move_uploaded_file($tmpName, $destPath)) {
                    throw new Exception("No se pudo mover el archivo $imageName");
                }

                // Ruta pública que usará el navegador
                $publicImgPath = "path/to/images/" . $imageName;

                // Insertamos la fila con la ruta en lugar del BLOB
                $stmt_insert->execute([
                    ':nombre'       => $imageName,
                    ':tipo_mime'    => $mime_type,
                    ':datos_imagen' => $publicImgPath,
                    ':equipo_id'    => $equipo_id
                ]);
            }
        }

        $conn->commit();
        $response['status']  = 'success';
        $response['message'] = 'Las imágenes se insertaron exitosamente.';
    } catch (Exception $e) {
        $conn->rollBack();
        $response['status']  = 'error';
        $response['message'] = 'Error al insertar las imágenes: ' . $e->getMessage();
    }
} else {
    $response['status']  = 'error';
    $response['message'] = 'Método no permitido.';
}

header('Content-Type: application/json');
echo json_encode($response);
