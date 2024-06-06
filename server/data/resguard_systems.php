<?php
include '../config/connection_db.php';

$sql = "SELECT * FROM equipos_informaticos WHERE Status_id = 1";
$stmt = $conn->prepare($sql);
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

$sistemas = array();

foreach ($result as $key => $equipo) {
    $equipo_id = $equipo['Equipo_id'];

    $sql_images = $conn->prepare("SELECT Imagen_id, Nombre, Tipo_mime, Datos_imagen FROM imagenes WHERE Equipo_id = ?");
    $sql_images->execute([$equipo_id]);
    $images = $sql_images->fetchAll(PDO::FETCH_ASSOC);

    foreach ($images as $key => $image) {
        $images[$key]['Datos_imagen'] = base64_encode($image['Datos_imagen']);
    }

    $equipo['images'] = $images;

    $sql_invoices = $conn->prepare("SELECT Factura_file FROM facturas WHERE Equipo_id = ?");
    $sql_invoices->execute([$equipo_id]);
    $invoices = $sql_invoices->fetchAll(PDO::FETCH_ASSOC);

    foreach ($invoices as $key => $invoice) {
        $invoices[$key]['Factura_file'] = base64_encode($invoice['Factura_file']);
    }

    $equipo['invoices'] = $invoices;

    $sql_expenses = $conn->prepare("SELECT orden_compra, Piezas, Importe, Fecha, Recibo_pdf FROM gastos_de_los_equipos WHERE Equipo_id = ?");
    $sql_expenses->execute([$equipo_id]);
    $expenses = $sql_expenses->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($expenses)) {
        $expenses = ['message' => 'Este equipo aún no tiene gastos extra'];
    } else {
        foreach ($expenses as $key => $expense) {
            $expenses[$key]['Recibo_pdf'] = base64_encode($expense['Recibo_pdf']);
        }
    }
    
    $equipo['expenses'] = $expenses;

    $sistemas[] = $equipo;
}

header('Content-Type: application/json');
echo json_encode(array("sistemas" => $sistemas));

?>