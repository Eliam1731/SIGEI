<?php

require '../vendor/autoload.php';
use Intervention\Image\ImageManagerStatic as Image;

include '../../config/connection_db.php';

$data = json_decode(file_get_contents('php://input'), true);
$imageNames = $data['imageNames'];

$response = array();

if (!empty($imageNames) && is_array($imageNames)) {
    
    $sql = "
        SELECT 
            Imagen_id AS imagenId, 
            Nombre AS nombre, 
            Datos_imagen AS datosImagen 
        FROM 
            imagenes 
        WHERE 
        
            Nombre IN (" . implode(',', array_fill(0, count($imageNames), '?')) . ")";

    $stmt = $conn->prepare($sql);
    foreach ($imageNames as $index => $name) {
        $stmt->bindValue($index + 1, $name, PDO::PARAM_STR);
    }
    $stmt->execute();
    $images = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($images as $image) {
        $relativePath = '../../path/to/images/' . $image['nombre'];
        if (file_exists($relativePath)) {
            $img = Image::make($relativePath);
            $base64 = (string) $img->encode('data-url');
            $response[] = array(
                'imagenId' => $image['imagenId'],
                'nombre' => $image['nombre'],
                'datosImagen' => $base64
            );
        } else {
            $response[] = array(
                'imagenId' => $image['imagenId'],
                'nombre' => $image['nombre'],
                'datosImagen' => null,
                'error' => 'Image not found at ' . $relativePath
            );
        }
    }
}

header('Content-Type: application/json');
echo json_encode($response);
?>