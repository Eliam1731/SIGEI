<?php
include '../config/connection_db.php';

$data = $_POST;

$fields = ['Num_serie', 'Direccion_mac_wifi', 'Direccion_mac_ethernet', 'Num_ref_compaq', 'Service_tag'];
$previous_values = []; 

foreach ($fields as $field) {
    if (isset($data[$field]) && !empty($data[$field])) {

        if (isset($previous_values[$field]) && $previous_values[$field] == $data[$field]) {
            echo json_encode(["error" => "Está ingresando el mismo valor anterior para $field"]);
            exit;
        }

        $sql_check = "SELECT * FROM equipos_informaticos WHERE $field = :value";
        $stmt_check = $conn->prepare($sql_check);
        $stmt_check->execute(['value' => $data[$field]]);
        $existing_data = $stmt_check->fetch(PDO::FETCH_ASSOC);

        if ($existing_data && $existing_data['Equipo_id'] != $data['Equipo_id']) {
            echo json_encode(["error" => "El valor de $field ya existe en otro equipo"]);
            exit;
        }

        $previous_values[$field] = $data[$field];
    }
}

$sql_subcategoria = "SELECT Subcategoria_id FROM subcategoria WHERE Nom_subcategoria = :subcategoria";
$stmt_subcategoria = $conn->prepare($sql_subcategoria);
$stmt_subcategoria->execute(['subcategoria' => $data['Subcategoria']]);
$subcategoria_id = $stmt_subcategoria->fetchColumn();

$sql_equipos = "UPDATE equipos_informaticos SET 
    Id_subcategoria = :subcategoria_id, 
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
    Comentarios = :comentarios,
    num_telefono = :num_telefono 
    WHERE Equipo_id = :equipo_id";

$sql_facturas = "UPDATE facturas SET 
    Factura_file = :factura_file 
    WHERE Equipo_id = :equipo_id";

$stmt_equipos = $conn->prepare($sql_equipos);
$stmt_facturas = $conn->prepare($sql_facturas);

try {
    $conn->beginTransaction();

    $stmt_equipos->execute([
        'subcategoria_id' => $subcategoria_id, 
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
        'num_telefono' => $data['num_telefono'],
        'equipo_id' => $data['Equipo_id']
    ]);

    if (isset($_FILES['Factura']) && file_exists($_FILES['Factura']['tmp_name'])) {
        $stmt_facturas->execute([
            'factura_file' => file_get_contents($_FILES['Factura']['tmp_name']), 
            'equipo_id' => $data['Equipo_id']
        ]);
    }

    $conn->commit();
    echo json_encode(["message" => "Su actualización fue exitosa"]);
} catch (PDOException $e) {
    $conn->rollBack();
    echo json_encode(["error" => "Hubo un error en la actualización: " . $e->getMessage()]);
}
?>