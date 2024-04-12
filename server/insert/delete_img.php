<?php
include '../config/connection_db.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$equipo_id = $data['Equipo_id'];
$imagen_id = $data['Imagen_id'];


$sql_count = "SELECT COUNT(*) as count FROM imagenes WHERE Equipo_id = :equipo_id";
$stmt_count = $conn->prepare($sql_count);
$stmt_count->bindParam(':equipo_id', $equipo_id, PDO::PARAM_INT);
$stmt_count->execute();
$count = $stmt_count->fetch(PDO::FETCH_ASSOC)['count'];

if ($count <= 1) {
    echo json_encode(["message" => "No puede dejar sin imágenes el equipo"]);
} else {
    $sql_delete = "DELETE FROM imagenes WHERE Imagen_id = :imagen_id AND Equipo_id = :equipo_id";
    $stmt_delete = $conn->prepare($sql_delete);

    try {
        $stmt_delete->bindParam(':imagen_id', $imagen_id, PDO::PARAM_INT);
        $stmt_delete->bindParam(':equipo_id', $equipo_id, PDO::PARAM_INT);
        $stmt_delete->execute();

        echo json_encode(["message" => "La imagen fue eliminada exitosamente"]);
    } catch (PDOException $e) {
        echo json_encode([
            "message" => "Hubo un error al eliminar la imagen", 
            "error" => [
                "code" => $e->getCode(),
                "message" => $e->getMessage(),
                "file" => $e->getFile(),
                "line" => $e->getLine()
            ]
        ]);
    }
}
?>