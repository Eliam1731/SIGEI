<?php
include '../config/connection_db.php';

try {
    $sql = "SELECT eq.*, s.Nom_Status, b.Fecha_baja, b.Motivo_baja, u.Nombre as Nombre_usuario, cat.Nom_categoria, subcat.Nom_subcategoria, m.Nom_marca
            FROM equipos_informaticos eq 
            INNER JOIN status s ON eq.Status_id = s.Status_id 
            INNER JOIN baja_de_equipos b ON eq.Equipo_id = b.Equipo_id
            INNER JOIN usuarios u ON b.User_id = u.User_id
            INNER JOIN subcategoria subcat ON eq.Id_subcategoria = subcat.Subcategoria_id
            INNER JOIN marca_del_equipo m ON eq.Id_marca = m.Id_Marca
            INNER JOIN categorias_equipo_informatico cat ON subcat.id_categoria = cat.Categoria_id
            WHERE eq.Status_id = 4";

    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $result = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $especificacion = str_replace(["\r\n", "\r", "\n"], ' ', $row['Especificacion']);

        $equipment = [
            'idEquipo' => $row['Equipo_id'],
            'subcategoria' => $row['Nom_subcategoria'],
            'marca' => $row['Nom_marca'],
            'modelo' => $row['Modelo'],
            'numSerie' => $row['Num_serie'],
            'especificacion' => $especificacion,
            'fechaCompra' => $row['Fecha_compra'],
            'fechaGarantia' => $row['Fecha_garantia'],
            'importe' => $row['Importe'],
            'direccionMacWifi' => $row['Direccion_mac_wifi'],
            'direccionMacEthernet' => $row['Direccion_mac_ethernet'],
            'referenciaCompaq' => $row['Num_ref_compaq'],
            'serviceTag' => $row['Service_tag'],
            'comentarios' => $row['Comentarios'],
            'status' => $row['Nom_Status'],
            'codeOpc' => $row['miId'],
            'fechaBaja' => $row['Fecha_baja'],
            'motivoBaja' => $row['Motivo_baja'],
            'usuarioBaja' => $row['Nombre_usuario'],
            'categoria' => $row['Nom_categoria']
        ];

        $result[] = $equipment;
    }

    echo json_encode($result);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>