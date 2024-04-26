<?php

try {
    include '../config/connection_db.php';
} catch (Exception $e) {
    die(json_encode(['error' => 'Error al conectar a la base de datos: ' . $e->getMessage()]));
}


$data = json_decode(file_get_contents('php://input'), true);
$obra_id = $data['obra_id'];

try {
    // Consultar la base de datos para obtener el número de la obra
    $sql = "SELECT Num_obra FROM obras WHERE Obra_id = :obra_id";
    $stmt = $conn->prepare($sql);
    $stmt->execute([':obra_id' => $obra_id]);
    $obra = $stmt->fetch();

    // Devolver el número de la obra en formato JSON
    echo json_encode(['Num_obra' => $obra['Num_obra']]);
} catch (PDOException $e) {
    // Si hay un error, devolver el mensaje de error
    echo json_encode(['error' => 'Error al ejecutar la consulta SQL: ' . $e->getMessage()]);
}
?>