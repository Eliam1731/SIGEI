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

    $result = $conn->query($sql);

    $data = [];
    while($row = $result->fetch_assoc()) {
        $data[$row['Nom_categoria']][] = $row['Nom_subcategoria'];
    }

    $result->close();
    $conn->close();

    header('Content-Type: application/json');
    echo json_encode($data);
?>