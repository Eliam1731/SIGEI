<?php
include '../config/connection_db.php';

try {
    $sql = "SELECT eq.*, s.Nom_Status 
            FROM equipos_informaticos eq 
            INNER JOIN status s ON eq.Status_id = s.Status_id 
            WHERE eq.Status_id = 4";

    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $result = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $result[] = [
            'Equipo_id' => $row['Equipo_id'],
            'Id_subcategoria' => $row['Id_subcategoria'],
            'Id_marca' => $row['Id_marca'],
            'Modelo' => $row['Modelo'],
            'Num_serie' => $row['Num_serie'],
            'Especificacion' => $row['Especificacion'],
            'Fecha_compra' => $row['Fecha_compra'],
            'Fecha_garantia' => $row['Fecha_garantia'],
            'Importe' => $row['Importe'],
            'Direccion_mac_wifi' => $row['Direccion_mac_wifi'],
            'Direccion_mac_ethernet' => $row['Direccion_mac_ethernet'],
            'Num_ref_compaq' => $row['Num_ref_compaq'],
            'Service_tag' => $row['Service_tag'],
            'Comentarios' => $row['Comentarios'],
            'Status' => $row['Nom_Status'],
            'miId' => $row['miId'],
        ];
    }

    header('Content-Type: application/json');
    echo json_encode($result);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>