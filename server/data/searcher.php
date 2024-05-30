<?php
include '../config/connection_db.php';

$data = json_decode(file_get_contents('php://input'), true);
$search = $data['search'];

$searchWords = explode(' ', $search);

$searchConditions = [];
foreach ($searchWords as $word) {
    $searchConditions[] = "CONCAT(Nombre, ' ', Primer_apellido, ' ', Segundo_apellido) LIKE :$word";
}


$sql_search = "SELECT * FROM empleados_resguardantes WHERE " . implode(' OR ', $searchConditions);
$stmt_search = $conn->prepare($sql_search);


$searchParams = [];
foreach ($searchWords as $word) {
    $searchParams[$word] = "%$word%";
}

try {
    $stmt_search->execute($searchParams);
    $results = $stmt_search->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode([
        "message" => "Hubo un error en la búsqueda de empleados", 
        "error" => $e->getMessage()
    ]);
}
?>