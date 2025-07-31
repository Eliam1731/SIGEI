<?php
header('Content-Type: application/json');
include '../config/connection_db.php';

$data = json_decode(file_get_contents('php://input'), true);
$opcicCode = $data['opcicCode'];

$sql = $conn->prepare("
    SELECT 
        ei.Equipo_id                        AS idEquipo,
        sc.Nom_subcategoria                 AS subcategoria,
        mc.Nom_marca                        AS marca,
        ei.Modelo                           AS modelo,
        ei.Num_serie                        AS numSerie,
        ei.Especificacion                   AS especificacion,
        ei.Fecha_compra                     AS fechaCompra,
        ei.Fecha_garantia                   AS fechaGarantia,
        ei.Importe                          AS importe,
        ei.Direccion_mac_wifi               AS direccionMacWifi,
        ei.Direccion_mac_ethernet           AS direccionMacEthernet,
        ei.Num_ref_compaq                   AS referenciaCompaq,
        ei.Service_tag                      AS serviceTag,
        ei.Comentarios                      AS comentarios,
        ei.num_telefono                     AS telefono,
        st.Nom_Status                       AS status,
        ei.miId                             AS codeOpc,
        er.Nombre                           AS nombreEmpleado,
        er.Primer_apellido                  AS primerApellidoEmpleado,
        er.Segundo_apellido                 AS segundoApellidoEmpleado,
        er.Correo_electronico               AS correoElectronicoEmpleado,
        e.Nom_empresa                       AS nombreEmpresa,
        o.Nombre_obra                       AS nombreObra,
        f.Nom_frente                        AS nombreFrente
    FROM equipos_informaticos ei
    LEFT JOIN subcategoria sc     ON ei.Id_subcategoria    = sc.Subcategoria_id
    LEFT JOIN marca_del_equipo mc ON ei.Id_marca           = mc.Id_Marca
    LEFT JOIN status st           ON ei.Status_id          = st.Status_id
    LEFT JOIN resguardos_de_equipos r   ON ei.Equipo_id    = r.Equipo_id
    LEFT JOIN empleados_resguardantes er ON r.Empleado_id    = er.Empleado_id
    LEFT JOIN empresas e          ON er.Empresa_id        = e.Empresa_id
    LEFT JOIN obras o             ON er.Obra_id           = o.Obra_id
    LEFT JOIN frente f            ON er.id_frente         = f.Frente_id
    WHERE ei.miId = ?
");
$sql->execute([$opcicCode]);

$rows = $sql->fetchAll(PDO::FETCH_ASSOC);
$equipment_data = [];

foreach ($rows as $row) {
    // limpiar saltos de línea en la especificación
    $especificacion = str_replace(["\r\n","\r","\n"], ' ', $row['especificacion']);

    $equipment = [
        'idEquipo'                  => $row['idEquipo'],
        'subcategoria'              => $row['subcategoria'],
        'marca'                     => $row['marca'],
        'modelo'                    => $row['modelo'],
        'numSerie'                  => $row['numSerie'],
        'especificacion'            => $especificacion,
        'fechaCompra'               => $row['fechaCompra'],
        'fechaGarantia'             => $row['fechaGarantia'],
        'importe'                   => $row['importe'],
        'direccionMacWifi'          => $row['direccionMacWifi'],
        'direccionMacEthernet'      => $row['direccionMacEthernet'],
        'referenciaCompaq'          => $row['referenciaCompaq'],
        'serviceTag'                => $row['serviceTag'],
        'comentarios'               => $row['comentarios'],
        'telefono'                  => $row['telefono'],
        'status'                    => $row['status'],
        'codeOpc'                   => $row['codeOpc'],
        'nombreEmpleado'            => $row['nombreEmpleado'],
        'primerApellidoEmpleado'    => $row['primerApellidoEmpleado'],
        'segundoApellidoEmpleado'   => $row['segundoApellidoEmpleado'],
        'correoElectronicoEmpleado' => $row['correoElectronicoEmpleado'],
        'nombreEmpresa'             => $row['nombreEmpresa'],
        'nombreObra'                => $row['nombreObra'],
        'nombreFrente'              => $row['nombreFrente'],
    ];

    // imágenes
    $sql_images = $conn->prepare("
        SELECT Imagen_id, Nombre, Tipo_mime, Datos_imagen 
        FROM imagenes 
        WHERE Equipo_id = ?
    ");
    $sql_images->execute([$row['idEquipo']]);
    $images = $sql_images->fetchAll(PDO::FETCH_ASSOC);
    foreach ($images as $k => $img) {
        $images[$k]['Datos_imagen'] = base64_encode($img['Datos_imagen']);
    }
    $equipment['images'] = $images;

    // facturas (usar la columna Factura_path, alias Factura_file)
    $sql_invoices = $conn->prepare("
        SELECT Factura_path AS Factura_file 
        FROM facturas 
        WHERE Equipo_id = ?
    ");
    $sql_invoices->execute([$row['idEquipo']]);
    $invoices = $sql_invoices->fetchAll(PDO::FETCH_ASSOC);
    // no convertir a base64, es una ruta
    $equipment['invoices'] = $invoices;

    // gastos
    $sql_expenses = $conn->prepare("
        SELECT orden_compra, Piezas, Importe, Fecha, Recibo_pdf 
        FROM gastos_de_los_equipos 
        WHERE Equipo_id = ?
    ");
    $sql_expenses->execute([$row['idEquipo']]);
    $expenses = $sql_expenses->fetchAll(PDO::FETCH_ASSOC);
    if (empty($expenses)) {
        $equipment['expenses'] = ['message' => 'Este equipo aún no tiene gastos extra'];
    } else {
        foreach ($expenses as $k => $exp) {
            $expenses[$k]['Recibo_pdf'] = base64_encode($exp['Recibo_pdf']);
        }
        $equipment['expenses'] = $expenses;
    }

    $equipment_data[] = $equipment;
}

echo json_encode($equipment_data, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
exit();
