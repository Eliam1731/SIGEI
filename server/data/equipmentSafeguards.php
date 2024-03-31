<?php
include '../config/connection_db.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$codeEquipment = $data['code'];
$equipment_data = [];

$sql = $conn->prepare("SELECT 
            equipos_informaticos.Equipo_id AS idEquipo,
            subcategoria.Nom_subcategoria AS subcategoria,
            marca_del_equipo.Nom_marca AS marca,
            equipos_informaticos.Modelo AS modelo,
            equipos_informaticos.Num_serie AS numSerie,
            equipos_informaticos.Especificacion AS especificacion,
            equipos_informaticos.Fecha_compra AS fechaCompra,
            equipos_informaticos.Fecha_garantia AS fechaGarantia,
            equipos_informaticos.Importe AS importe,
            equipos_informaticos.Direccion_mac_wifi AS direccionMacWifi,
            equipos_informaticos.Direccion_mac_ethernet AS direccionMacEthernet,
            equipos_informaticos.Num_ref_compaq AS referenciaCompaq,
            equipos_informaticos.Service_tag AS serviceTag,
            equipos_informaticos.Comentarios AS comentarios,
            status.Nom_Status AS status,
            equipos_informaticos.miId AS codeOpc
        FROM 
            equipos_informaticos
        JOIN subcategoria ON equipos_informaticos.Id_subcategoria = subcategoria.Subcategoria_id
        JOIN marca_del_equipo ON equipos_informaticos.Id_marca = marca_del_equipo.Id_Marca
        JOIN status ON equipos_informaticos.Status_id = status.Status_id
        WHERE equipos_informaticos.miId = ?;");

$sql->execute([$codeEquipment]);

$rows = $sql->fetchAll();

foreach ($rows as $row) {
    $especificacion = str_replace(["\r\n", "\r", "\n"], ' ', $row['especificacion']);

    $equipment_data = [
        'idEquipo' => $row['idEquipo'],
        'subcategoria' => $row['subcategoria'],
        'marca' => $row['marca'],
        'modelo' => $row['modelo'],
        'numSerie' => $row['numSerie'],
        'especificacion' => $especificacion,
        'fechaCompra' => $row['fechaCompra'],
        'fechaGarantia' => $row['fechaGarantia'],
        'importe' => $row['importe'],
        'direccionMacWifi' => $row['direccionMacWifi'],
        'direccionMacEthernet' => $row['direccionMacEthernet'],
        'referenciaCompaq' => $row['referenciaCompaq'],
        'serviceTag' => $row['serviceTag'],
        'comentarios' => $row['comentarios'],
        'status' => $row['status'],
        'codeOpc' => $row['codeOpc'],
    ];
}

$json_response = json_encode($equipment_data);

header('Content-Type: applicaction/json');
print $json_response;
