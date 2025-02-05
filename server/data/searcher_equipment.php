<?php
include '../config/connection_db.php';

$data = json_decode(file_get_contents('php://input'), true);
$opcicCode = $data['opcicCode'];

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
        equipos_informaticos.num_telefono AS telefono,
        status.Nom_Status AS status,
        equipos_informaticos.miId AS codeOpc,
        empleados_resguardantes.Nombre AS nombreEmpleado,
        empleados_resguardantes.Primer_apellido AS primerApellidoEmpleado,
        empleados_resguardantes.Segundo_apellido AS segundoApellidoEmpleado,
        /*empleados_resguardantes.Num_seguro_social AS numSeguroSocialEmpleado,*/
        empleados_resguardantes.Correo_electronico AS correoElectronicoEmpleado,
        empresas.Nom_empresa AS nombreEmpresa,
        obras.Nombre_obra AS nombreObra,
        frente.Nom_frente AS nombreFrente
    FROM 
        equipos_informaticos
    LEFT JOIN subcategoria ON equipos_informaticos.Id_subcategoria = subcategoria.Subcategoria_id
    LEFT JOIN marca_del_equipo ON equipos_informaticos.Id_marca = marca_del_equipo.Id_Marca
    LEFT JOIN status ON equipos_informaticos.Status_id = status.Status_id
    LEFT JOIN resguardos_de_equipos ON equipos_informaticos.Equipo_id = resguardos_de_equipos.Equipo_id
    LEFT JOIN empleados_resguardantes ON resguardos_de_equipos.Empleado_id = empleados_resguardantes.Empleado_id
    LEFT JOIN empresas ON empleados_resguardantes.Empresa_id = empresas.Empresa_id
    LEFT JOIN obras ON empleados_resguardantes.Obra_id = obras.Obra_id
    LEFT JOIN frente ON empleados_resguardantes.id_frente = frente.Frente_id
    WHERE equipos_informaticos.miId = ?");
$sql->execute([$opcicCode]);

$rows = $sql->fetchAll();

$equipment_data = [];

foreach ($rows as $row) {
    $especificacion = str_replace(["\r\n", "\r", "\n"], ' ', $row['especificacion']);

    $equipment = [
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
        'telefono' => $row['telefono'],
        'status' => $row['status'],
        'codeOpc' => $row['codeOpc'],
        'nombreEmpleado' => $row['nombreEmpleado'],
        'primerApellidoEmpleado' => $row['primerApellidoEmpleado'],
        'segundoApellidoEmpleado' => $row['segundoApellidoEmpleado'],
        //*'numSeguroSocialEmpleado' => $row['numSeguroSocialEmpleado'],
        'correoElectronicoEmpleado' => $row['correoElectronicoEmpleado'],
        'nombreEmpresa' => $row['nombreEmpresa'],
        'nombreObra' => $row['nombreObra'],
        'nombreFrente' => $row['nombreFrente']
    ];

    $sql_images = $conn->prepare("SELECT Imagen_id, Nombre, Tipo_mime, Datos_imagen FROM imagenes WHERE Equipo_id = ?");
    $sql_images->execute([$row['idEquipo']]);
    $images = $sql_images->fetchAll(PDO::FETCH_ASSOC);

    foreach ($images as $key => $image) {
        $images[$key]['Datos_imagen'] = base64_encode($image['Datos_imagen']);
    }

    $equipment['images'] = $images;

    $sql_invoices = $conn->prepare("SELECT Factura_file FROM facturas WHERE Equipo_id = ?");
    $sql_invoices->execute([$row['idEquipo']]);
    $invoices = $sql_invoices->fetchAll(PDO::FETCH_ASSOC);

    foreach ($invoices as $key => $invoice) {
        $invoices[$key]['Factura_file'] = base64_encode($invoice['Factura_file']);
    }

    $equipment['invoices'] = $invoices;

    $sql_expenses = $conn->prepare("SELECT orden_compra, Piezas, Importe, Fecha, Recibo_pdf FROM gastos_de_los_equipos WHERE Equipo_id = ?");
    $sql_expenses->execute([$row['idEquipo']]);
    $expenses = $sql_expenses->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($expenses)) {
        $expenses = ['message' => 'Este equipo aún no tiene gastos extra'];
    } else {
        foreach ($expenses as $key => $expense) {
            $expenses[$key]['Recibo_pdf'] = base64_encode($expense['Recibo_pdf']);
        }
    }
    
    $equipment['expenses'] = $expenses;

    $equipment_data[] = $equipment;
}

$json_response = json_encode($equipment_data, JSON_PRETTY_PRINT);
header('Content-Type: application/json');
print $json_response;
exit();
?>