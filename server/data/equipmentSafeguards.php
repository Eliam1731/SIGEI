<?php
include '../config/connection_db.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$codeEquipment = $data['code'];
$equipment_data = [];

// Verificar si el código del equipo existe
$sql_check = $conn->prepare("SELECT 1 FROM equipos_informaticos WHERE miId = ?");
$sql_check->execute([$codeEquipment]);

if (!$sql_check->fetchColumn()) {
    // Si el código del equipo no existe, devolver un JSON con el error jejej
    $error_data = ['error' => 'El código del equipo no se encuentra en la base de datos.'];
    $json_response = json_encode($error_data);
    header('Content-Type: application/json');
    print $json_response;
    exit();
}

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
        'statusMessage' => 'El equipo se encuentra ' . $row['status'] // Aqui guardara el estado en el que se encuentra el equipo, espero te sirva
    ];
     // Obtener las imágenes
    $sql_images = $conn->prepare("SELECT Nombre, Tipo_mime, Datos_imagen FROM imagenes WHERE Equipo_id = ?");
    $sql_images->execute([$row['idEquipo']]);
    $images = $sql_images->fetchAll(PDO::FETCH_ASSOC);
    $equipment_data['images'] = $images;

     // Obtener las facturas
    $sql_invoices = $conn->prepare("SELECT Factura_file FROM facturas WHERE Equipo_id = ?");
    $sql_invoices->execute([$row['idEquipo']]);
    $invoices = $sql_invoices->fetchAll(PDO::FETCH_ASSOC);
    $equipment_data['invoices'] = $invoices;
}

$json_response = json_encode($equipment_data);

header('Content-Type: applicaction/json');
print $json_response;
