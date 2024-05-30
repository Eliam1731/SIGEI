<?php
include '../config/connection_db.php';

$data = json_decode(file_get_contents('php://input'), true);
$search = $data['search'];

$searchWords = explode(' ', $search);

$searchConditions = [];
foreach ($searchWords as $index => $word) {
    if ($index == 0) {
        $searchConditions[] = "Nombre LIKE :$word";
    } elseif ($index == 1) {
        $searchConditions[] = "Primer_apellido LIKE :$word";
    } elseif ($index == 2) {
        $searchConditions[] = "Segundo_apellido LIKE :$word";
    }
}

$sql_search = "SELECT * FROM empleados_resguardantes WHERE " . implode(' AND ', $searchConditions);
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