<?php

include '../../config/connection_db.php';


$data = json_decode(file_get_contents('php://input'), true);
$imageIds = $data['imageIds'];

$response = array();

if (!empty($imageIds) && is_array($imageIds)) {
    
    $sql = "
        SELECT 
            Imagen_id, 
            Nombre, 
            Datos_imagen 
        FROM 
            imagenes 
        WHERE 
            Imagen_id IN (" . implode(',', array_fill(0, count($imageIds), '?')) . ")";

    $stmt = $conn->prepare($sql);
    foreach ($imageIds as $index => $id) {
        $stmt->bindValue($index + 1, $id, PDO::PARAM_INT);
    }
    $stmt->execute();

    
    $imagenes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($imagenes as $imagen) {

        $imagePath = __DIR__ . '/../../path/to/images/' . basename($imagen['Datos_imagen']);
        if (file_exists($imagePath)) {
            $imageData = file_get_contents($imagePath);
            $base64Image = base64_encode($imageData);
            $response[] = array(
                'Imagen_id' => $imagen['Imagen_id'],
                'Nombre' => $imagen['Nombre'],
                'Ruta' => $imagePath,
                'Datos_imagen' => $base64Image
            );
        } else {
            $response[] = array(
                'Imagen_id' => $imagen['Imagen_id'],
                'Nombre' => $imagen['Nombre'],
                'Ruta' => $imagePath,
                'Datos_imagen' => null,
                'error' => 'Archivo no encontrado'
            );
        }
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'No se proporcionaron IDs de imágenes válidos.';
}


$conn = null;


header('Content-Type: application/json');
echo json_encode($response);
?>