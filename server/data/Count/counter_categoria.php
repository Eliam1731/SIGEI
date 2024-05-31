<?php

include '../../config/connection_db.php';

$sql = $conn->prepare("
    SELECT c.Nom_categoria, COUNT(*) AS total 
    FROM equipos_informaticos e 
    INNER JOIN subcategoria s ON e.Id_subcategoria = s.Subcategoria_id 
    INNER JOIN categorias_equipo_informatico c ON s.id_categoria = c.Categoria_id 
    WHERE e.Status_id != 4 
    GROUP BY c.Nom_categoria
");
$sql->execute();

$result = $sql->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);

?>