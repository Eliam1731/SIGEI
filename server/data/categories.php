<?php
    include '../config/connection_db.php';

    $sql = "
    SELECT 
        t1.Nom_categoria, 
        t2.Nom_subcategoria
    FROM subcategoria t2
    JOIN categorias_equipo_informatico t1 ON t1.Categoria_id = t2.id_categoria
    ORDER BY t1.Categoria_id
    ";

    $stmt = $conn->query($sql);

    $data = [];
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $data[$row['Nom_categoria']][] = $row['Nom_subcategoria'];
    }

    $stmt = null;
    $conn = null;

    header('Content-Type: application/json');
    echo json_encode($data);
?>