<?php

include '../../config/connection_db.php';

$sql = $conn->prepare("
    SELECT m.Nom_marca, COUNT(*) AS total 
    FROM equipos_informaticos e 
    INNER JOIN marca_del_equipo m ON e.Id_marca = m.Id_Marca 
    WHERE e.Status_id != 4 
    GROUP BY m.Nom_marca
");
$sql->execute();

$result = $sql->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);

?>