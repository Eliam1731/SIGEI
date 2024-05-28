<?php
include '../config/connection_db.php';

$data = json_decode(file_get_contents('php://input'), true);
$search = $data['search'];

$sql_search = "SELECT * FROM empleados_resguardantes WHERE Nombre LIKE :search OR Primer_apellido LIKE :search OR Segundo_apellido LIKE :search";
$stmt_search = $conn->prepare($sql_search);

try {
    $stmt_search->execute(['search' => "%$search%"]);
    $results = $stmt_search->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode([
        "message" => "Hubo un error en la búsqueda de empleados", 
        "error" => [
            "code" => $e->getCode(),
            "message" => $e->getMessage(),
            "file" => $e->getFile(),
            "line" => $e->getLine()
        ]
    ]);
}
?>


