<?php
include '../config/connection_db.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$sql_equipos = "UPDATE equipos_informaticos SET 
    Id_subcategoria = :subcategoria, 
    Id_marca = :marca, 
    Modelo = :modelo, 
    Num_serie = :n_serie, 
    Especificacion = :especificacion, 
    Fecha_compra = :fecha_compra, 
    Fecha_garantia = :fecha_garantia, 
    Importe = :importe, 
    Direccion_mac_wifi = :mac_wifi, 
    Direccion_mac_ethernet = :mac_ethernet, 
    Num_ref_compaq = :n_ref_compaq, 
    Service_tag = :service_tag, 
    Comentarios = :comentarios 
    WHERE Equipo_id = :equipo_id";

$sql_imagenes = "UPDATE imagenes SET 
    Nombre = :nombre, 
    Tipo_mime = :tipo_mime, 
    Datos_imagen = :datos_imagen 
    WHERE Equipo_id = :equipo_id";

$sql_facturas = "UPDATE facturas SET 
    Factura_file = :factura_file 
    WHERE Equipo_id = :equipo_id";

$stmt_equipos = $conn->prepare($sql_equipos);
$stmt_imagenes = $conn->prepare($sql_imagenes);
$stmt_facturas = $conn->prepare($sql_facturas);

try {
    $conn->beginTransaction();

    $stmt_equipos->execute([
        'subcategoria' => $data['Subcategoria'], 
        'marca' => $data['Marca'], 
        'modelo' => $data['Modelo'], 
        'n_serie' => $data['N_serie'], 
        'especificacion' => $data['Especificación'], 
        'fecha_compra' => $data['Fecha_compra'], 
        'fecha_garantia' => $data['Fecha_garantía'], 
        'importe' => $data['Importe'], 
        'mac_wifi' => $data['MAC_WIFI'], 
        'mac_ethernet' => $data['MAC_Ethernet'], 
        'n_ref_compaq' => $data['N_referencia_Compras'], 
        'service_tag' => $data['Service_tag'], 
        'comentarios' => $data['Comentarios'], 
        'equipo_id' => $data['Equipo_id']
    ]);

    $imageData = base64_decode($data['Imagenes']);
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime_type = $finfo->buffer($imageData);

    $stmt_imagenes->execute([
        'nombre' => $data['Modelo'], 
        'tipo_mime' => $mime_type, 
        'datos_imagen' => $imageData, 
        'equipo_id' => $data['Equipo_id']
    ]);

    $stmt_facturas->execute([
        'factura_file' => base64_decode($data['Factura']), 
        'equipo_id' => $data['Equipo_id']
    ]);

    $conn->commit();
    echo json_encode(["message" => "Su actualización fue exitosa"]);
} catch (PDOException $e) {
    $conn->rollBack();
    echo json_encode([
        "message" => "Hubo un error en la actualización", 
        "error" => [
            "code" => $e->getCode(),
            "message" => $e->getMessage(),
            "file" => $e->getFile(),
            "line" => $e->getLine()
        ]
    ]);
}
?>