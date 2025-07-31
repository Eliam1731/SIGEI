<?php
include '../config/connection_db.php';
header('Content-Type: application/json');

// 1) Leemos JSON entrante
$json = file_get_contents('php://input');
$data = json_decode($json, true);
$numTel = $data['num_telefono'];

// 2) Validamos que el equipo exista y esté en status 1
$sql_check = $conn->prepare("
    SELECT 1 
    FROM equipos_informaticos 
    WHERE num_telefono = ? 
      AND Status_id = 1
");
$sql_check->execute([$numTel]);
if (!$sql_check->fetchColumn()) {
    echo json_encode(['error' => 'El equipo no está disponible para su resguardo.']);
    exit;
}

// 3) Traemos datos del equipo
$sql = $conn->prepare("
    SELECT 
      e.Equipo_id           AS idEquipo,
      sc.Nom_subcategoria   AS subcategoria,
      me.Nom_marca          AS marca,
      e.Modelo              AS modelo,
      e.Num_serie           AS numSerie,
      e.Especificacion      AS especificacion,
      e.Fecha_compra        AS fechaCompra,
      e.Fecha_garantia      AS fechaGarantia,
      e.Importe             AS importe,
      e.Direccion_mac_wifi     AS direccionMacWifi,
      e.Direccion_mac_ethernet AS direccionMacEthernet,
      e.Num_ref_compaq      AS referenciaCompaq,
      e.Service_tag         AS serviceTag,
      e.Comentarios         AS comentarios,
      e.num_telefono        AS telefono,
      s.Nom_Status          AS status,
      e.miId                AS codeOpc
    FROM 
      equipos_informaticos e
    JOIN subcategoria sc 
      ON e.Id_subcategoria = sc.Subcategoria_id
    JOIN marca_del_equipo me 
      ON e.Id_marca = me.Id_Marca
    JOIN status s 
      ON e.Status_id = s.Status_id
    WHERE 
      e.num_telefono = ? 
      AND e.Status_id = 1
    LIMIT 1
");
$sql->execute([$numTel]);
$equipment = $sql->fetch(PDO::FETCH_ASSOC);

if (!$equipment) {
    echo json_encode(['error' => 'No se encontró ningún dispositivo.']);
    exit;
}

// 4) Imágenes asociadas
$sql_images = $conn->prepare("
    SELECT Nombre, Tipo_mime, Datos_imagen 
    FROM imagenes 
    WHERE Equipo_id = ?
");
$sql_images->execute([$equipment['idEquipo']]);
$images = $sql_images->fetchAll(PDO::FETCH_ASSOC);
foreach ($images as &$img) {
    $img['Datos_imagen'] = base64_encode($img['Datos_imagen']);
}
$equipment['images'] = $images;

// 5) (Opcional) facturas — está comentado para evitar el error de columna
// $sql_invoices = $conn->prepare("SELECT Factura_file FROM facturas WHERE Equipo_id = ?");
// $sql_invoices->execute([$equipment['idEquipo']]);
// $invoices = $sql_invoices->fetchAll(PDO::FETCH_ASSOC);
// foreach ($invoices as &$inv) {
//     $inv['Factura_file'] = base64_encode($inv['Factura_file']);
// }
// $equipment['invoices'] = $invoices;

// 6) Devolvemos JSON limpio
echo json_encode($equipment);
