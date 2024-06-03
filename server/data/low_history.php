<?php
include '../config/connection_db.php';

try {
    $sql = "SELECT eq.*, s.Nom_Status, b.Fecha_baja, b.Motivo_baja 
            FROM equipos_informaticos eq 
            INNER JOIN status s ON eq.Status_id = s.Status_id 
            INNER JOIN baja_de_equipos b ON eq.Equipo_id = b.Equipo_id
            WHERE eq.Status_id = 4";

    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $result = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $especificacion = str_replace(["\r\n", "\r", "\n"], ' ', $row['Especificacion']);

        $equipment = [
            'idEquipo' => $row['Equipo_id'],
            'subcategoria' => $row['Id_subcategoria'],
            'marca' => $row['Id_marca'],
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
        ];

        $sql_images = $conn->prepare("SELECT Imagen_id, Nombre, Tipo_mime, Datos_imagen FROM imagenes WHERE Equipo_id = ?");
        $sql_images->execute([$row['Equipo_id']]);
        $images = $sql_images->fetchAll(PDO::FETCH_ASSOC);

        foreach ($images as $key => $image) {
            $images[$key]['Datos_imagen'] = base64_encode($image['Datos_imagen']);
        }

        $equipment['images'] = $images;

        $sql_invoices = $conn->prepare("SELECT Factura_file FROM facturas WHERE Equipo_id = ?");
        $sql_invoices->execute([$row['Equipo_id']]);
        $invoices = $sql_invoices->fetchAll(PDO::FETCH_ASSOC);

        foreach ($invoices as $key => $invoice) {
            $invoices[$key]['Factura_file'] = base64_encode($invoice['Factura_file']);
        }

        $equipment['invoices'] = $invoices;

        $sql_expenses = $conn->prepare("SELECT orden_compra, Piezas, Importe, Fecha, Recibo_pdf FROM gastos_de_los_equipos WHERE Equipo_id = ?");
        $sql_expenses->execute([$row['Equipo_id']]);
        $expenses = $sql_expenses->fetchAll(PDO::FETCH_ASSOC);
        
        if (empty($expenses)) {
            $expenses = ['message' => 'Este equipo aún no tiene gastos extra'];
        } else {
            foreach ($expenses as $key => $expense) {
                $expenses[$key]['Recibo_pdf'] = base64_encode($expense['Recibo_pdf']);
            }
        }
        
        $equipment['expenses'] = $expenses;

        $statusKey = lcfirst(str_replace(' ', '', $row['Nom_Status']));
        $result[$statusKey][] = $equipment;
    }

    header('Content-Type: application/json');
    echo json_encode($result, JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>