<?php
include '../config/connection_db.php';

$sql = "
SELECT     ei.Equipo_id,
    e.Nom_empresa,
    e.Nom_corto,
    o.Nombre_obra,
    o.Num_obra,
    f.Nom_frente,
    f.numero_frente,
    ei.Modelo,
    ei.Num_serie,
    ei.Especificacion,
    ei.Fecha_compra,
    ei.Fecha_garantia,
    ei.Importe,
    ei.Direccion_mac_wifi,
    ei.Direccion_mac_ethernet,
    ei.Num_ref_compaq,
    ei.Service_tag,
    ei.Comentarios,
    ei.miId,
    ei.num_telefono,
    er.Nombre,
    er.Primer_apellido,
    er.Segundo_apellido,
    er.Correo_electronico,
    er.Empleado_id,
    sc.Nom_subcategoria,
    mc.Nom_marca,
    cc.Nom_categoria
FROM resguardos_de_equipos r
JOIN empleados_resguardantes er ON r.Empleado_id = er.Empleado_id
JOIN equipos_informaticos ei ON r.Equipo_id = ei.Equipo_id
JOIN empresas e ON er.Empresa_id = e.Empresa_id
JOIN obras o ON er.Obra_id = o.Obra_id
JOIN frente f ON er.id_frente = f.Frente_id
JOIN subcategoria sc ON ei.Id_subcategoria = sc.Subcategoria_id
JOIN marca_del_equipo mc ON ei.Id_marca = mc.Id_Marca
JOIN categorias_equipo_informatico cc ON sc.id_categoria = cc.Categoria_id
WHERE r.status = 'resguardado'
";

$stmt = $conn->prepare($sql);
$stmt->execute();

$results = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $empresa = $row['Nom_empresa'];
    $nom_corto = $row['Nom_corto'];
    $obra = $row['Nombre_obra'];
    $num_obra = $row['Num_obra'];
    $frente = $row['Nom_frente'];
    $numero_frente = $row['numero_frente'];
    $nombre_empleado = $row['Nombre'];
    $primer_apellido = $row['Primer_apellido'];
    $segundo_apellido = $row['Segundo_apellido'];
    // $num_seguro_social = $row['Num_seguro_social'];
    $correo_electronico = $row['Correo_electronico'];
    $empleado_id = $row['Empleado_id'];
    $equipo = [
        'Equipo_id' => $row['Equipo_id'],
        'Modelo' => $row['Modelo'],
        'Num_serie' => $row['Num_serie'],
        'Especificacion' => $row['Especificacion'],
        'Fecha_compra' => $row['Fecha_compra'],
        'Fecha_garantia' => $row['Fecha_garantia'],
        'Importe' => $row['Importe'],
        'Direccion_mac_wifi' => $row['Direccion_mac_wifi'],
        'Direccion_mac_ethernet' => $row['Direccion_mac_ethernet'],
        'Num_ref_compaq' => $row['Num_ref_compaq'],
        'Service_tag' => $row['Service_tag'],
        'Comentarios' => $row['Comentarios'],
        'miId' => $row['miId'],
        'num_telefono' => $row['num_telefono'],
        'Nom_subcategoria' => $row['Nom_subcategoria'],
        'Nom_marca' => $row['Nom_marca'],
        'Nom_categoria' => $row['Nom_categoria'],
    ];

    $claveEmpleado = $nombre_empleado . $primer_apellido . $segundo_apellido . $empleado_id;

    if (!isset($results[$empresa])) {
        $results[$empresa] = ['Nom_corto' => $nom_corto, 'obras' => []];
    }
    if (!isset($results[$empresa]['obras'][$obra])) {
        $results[$empresa]['obras'][$obra] = ['Num_obra' => $num_obra, 'frentes' => []];
    }
    if (!isset($results[$empresa]['obras'][$obra]['frentes'][$frente])) {
        $results[$empresa]['obras'][$obra]['frentes'][$frente] = ['numero_frente' => $numero_frente, 'empleados' => []];
    }
    if (!isset($results[$empresa]['obras'][$obra]['frentes'][$frente]['empleados'][$claveEmpleado])) {
        $results[$empresa]['obras'][$obra]['frentes'][$frente]['empleados'][$claveEmpleado] = [
            'Nombre' => $nombre_empleado,
            'Primer_apellido' => $primer_apellido,
            'Segundo_apellido' => $segundo_apellido,
            // 'Num_seguro_social' => $num_seguro_social,
            'Correo_electronico' => $correo_electronico,
            'empleado_id' => $empleado_id, 
            'equipos' => []
        ];
    }
    $results[$empresa]['obras'][$obra]['frentes'][$frente]['empleados'][$claveEmpleado]['equipos'][] = $equipo;
}

echo json_encode($results);
?>