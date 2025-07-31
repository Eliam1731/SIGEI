<?php
include '../config/connection_db.php';

$sql = $conn->prepare("
    SELECT 
        e.Equipo_id              AS idEquipo,
        sub.Nom_subcategoria     AS subcategoria,
        m.Nom_marca              AS marca,
        e.Modelo                 AS modelo,
        e.Num_serie              AS numSerie,
        e.Especificacion         AS especificacion,
        e.Fecha_compra           AS fechaCompra,
        e.Fecha_garantia         AS fechaGarantia,
        e.Importe                AS importe,
        e.Direccion_mac_wifi     AS direccionMacWifi,
        e.Direccion_mac_ethernet AS direccionMacEthernet,
        e.Num_ref_compaq         AS referenciaCompaq,
        e.Service_tag            AS serviceTag,
        e.Comentarios            AS comentarios,
        e.num_telefono           AS telefono,
        e.Status_id              AS Status_id,
        s.Nom_Status             AS status,
        e.miId                   AS codeOpc,
        CASE WHEN s.Nom_Status = 'Disponible' THEN NULL ELSE r.Nombre END             AS nombreEmpleado,
        CASE WHEN s.Nom_Status = 'Disponible' THEN NULL ELSE r.Primer_apellido END     AS primerApellidoEmpleado,
        CASE WHEN s.Nom_Status = 'Disponible' THEN NULL ELSE r.Segundo_apellido END    AS segundoApellidoEmpleado,
        CASE WHEN s.Nom_Status = 'Disponible' THEN NULL ELSE r.Correo_electronico END  AS correoElectronicoEmpleado,
        emp.Nom_empresa            AS nombreEmpresa,
        o.Nombre_obra              AS nombreObra,
        f.Nom_frente               AS nombreFrente
    FROM equipos_informaticos e
    LEFT JOIN subcategoria           sub ON e.Id_subcategoria = sub.Subcategoria_id
    LEFT JOIN marca_del_equipo       m   ON e.Id_marca       = m.Id_Marca
    LEFT JOIN status                 s   ON e.Status_id      = s.Status_id
    LEFT JOIN (
        SELECT re.Equipo_id, re.Empleado_id
        FROM resguardos_de_equipos re
        INNER JOIN (
            SELECT Equipo_id, MAX(Resguardo_id) AS ultimoResguardo
            FROM resguardos_de_equipos
            GROUP BY Equipo_id
        ) rm ON re.Equipo_id = rm.Equipo_id
           AND re.Resguardo_id = rm.ultimoResguardo
    ) ur ON e.Equipo_id = ur.Equipo_id
    LEFT JOIN empleados_resguardantes r ON ur.Empleado_id = r.Empleado_id
    LEFT JOIN empresas                emp ON r.Empresa_id = emp.Empresa_id
    LEFT JOIN obras                   o   ON r.Obra_id    = o.Obra_id
    LEFT JOIN frente                  f   ON r.id_frente  = f.Frente_id
    WHERE s.Nom_Status != 'Baja' AND s.Status_id != 4
    GROUP BY e.Equipo_id
    ORDER BY e.Equipo_id DESC
");
$sql->execute();
$rows = $sql->fetchAll(PDO::FETCH_ASSOC);

$equipment_data = [];
foreach ($rows as $row) {
    // limpiar saltos de línea en la descripción
    $row['especificacion'] = str_replace(["\r\n","\r","\n"], " ", $row['especificacion']);

    // armar el array de salida
    $equipment = [
        'idEquipo'                 => (int)$row['idEquipo'],
        'subcategoria'             => $row['subcategoria'],
        'marca'                    => $row['marca'],
        'modelo'                   => $row['modelo'],
        'numSerie'                 => $row['numSerie'],
        'especificacion'           => $row['especificacion'],
        'fechaCompra'              => $row['fechaCompra'],
        'fechaGarantia'            => $row['fechaGarantia'],
        'importe'                  => $row['importe'],
        'direccionMacWifi'         => $row['direccionMacWifi'],
        'direccionMacEthernet'     => $row['direccionMacEthernet'],
        'referenciaCompaq'         => $row['referenciaCompaq'],
        'serviceTag'               => $row['serviceTag'],
        'comentarios'              => $row['comentarios'],
        'telefono'                 => $row['telefono'],
        'Status_id'                => (int)$row['Status_id'],
        'status'                   => $row['status'],
        'codeOpc'                  => $row['codeOpc'],
        'nombreEmpleado'           => $row['nombreEmpleado'],
        'primerApellidoEmpleado'   => $row['primerApellidoEmpleado'],
        'segundoApellidoEmpleado'  => $row['segundoApellidoEmpleado'],
        'correoElectronicoEmpleado'=> $row['correoElectronicoEmpleado'],
        'nombreEmpresa'            => $row['nombreEmpresa'],
        'nombreObra'               => $row['nombreObra'],
        'nombreFrente'             => $row['nombreFrente'],
        'estaAResguardo'           => $row['status'] !== 'Disponible'
    ];

    // traer imágenes
    $stmImg = $conn->prepare("SELECT Nombre, Tipo_mime, Datos_imagen FROM imagenes WHERE Equipo_id = ?");
    $stmImg->execute([$row['idEquipo']]);
    $imgs = $stmImg->fetchAll(PDO::FETCH_ASSOC);
    foreach ($imgs as &$img) {
        $img['Datos_imagen'] = base64_encode($img['Datos_imagen']);
    }
    $equipment['images'] = $imgs;

    // traer facturas (ruta)
    $stmInv = $conn->prepare("SELECT Factura_path AS Factura_file FROM facturas WHERE Equipo_id = ?");
    $stmInv->execute([$row['idEquipo']]);
    $equipment['invoices'] = $stmInv->fetchAll(PDO::FETCH_ASSOC);

    // traer gastos
    $stmExp = $conn->prepare("SELECT orden_compra, Piezas, Importe, Fecha, Recibo_pdf FROM gastos_de_los_equipos WHERE Equipo_id = ?");
    $stmExp->execute([$row['idEquipo']]);
    $exps = $stmExp->fetchAll(PDO::FETCH_ASSOC);
    if (empty($exps)) {
        $equipment['expenses'] = ['message' => 'Este equipo aún no tiene gastos extra'];
    } else {
        foreach ($exps as &$exp) {
            $exp['Recibo_pdf'] = base64_encode($exp['Recibo_pdf']);
        }
        $equipment['expenses'] = $exps;
    }

    // agrupar por clave de estado
    $key = lcfirst(str_replace(' ', '', $row['status']));
    $equipment_data[$key][] = $equipment;
}

header('Content-Type: application/json');
echo json_encode($equipment_data, JSON_PRETTY_PRINT);
exit;
