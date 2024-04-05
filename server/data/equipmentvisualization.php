<?php
include '../config/connection_db.php';

// Recibir el JSON del front-end
$data = json_decode(file_get_contents('php://input'), true);

// Verificar si el filtro es 'disponible'
if ($data['filterTable'] == 'disponible') {
    try {
        // Preparar la consulta SQL
        $stmt = $conn->prepare("
            SELECT e.*, f.Factura_file, i.Nombre, i.Tipo_mime, i.Datos_imagen
            FROM equipos_informaticos e
            LEFT JOIN facturas f ON e.Equipo_id = f.Equipo_id
            LEFT JOIN imagenes i ON e.Equipo_id = i.Equipo_id
            WHERE e.Status_id = 1
        ");

        // Ejecutar la consulta
        $stmt->execute();

        // Obtener los resultados
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Devolver los resultados en formato JSON
        echo json_encode($result);
    } catch (PDOException $e) {
        // Devolver el error en formato JSON
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>