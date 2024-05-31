<?php

include '../../config/connection_db.php';

$sql = $conn->prepare("
    SELECT s.Nom_subcategoria, COUNT(*) AS total 
    FROM equipos_informaticos e 
    INNER JOIN subcategoria s ON e.Id_subcategoria = s.Subcategoria_id 
    WHERE e.Status_id != 4 
    GROUP BY s.Nom_subcategoria
");
$sql->execute();

$result = $sql->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);

?> 