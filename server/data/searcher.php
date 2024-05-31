<?php
include '../config/connection_db.php';

$data = json_decode(file_get_contents('php://input'), true);
$search = $data['search'];

$searchWords = explode(' ', $search);

$searchConditions = [];
foreach ($searchWords as $index => $word) {
    $word = strtr($word, 'ÁÉÍÓÚáéíóú', 'AEIOUaeiou');
    if ($index == 0) {
        $searchConditions[] = "CONVERT(e.Nombre USING utf8) COLLATE utf8_general_ci LIKE :word$index";
    } elseif ($index == 1) {
        $searchConditions[] = "CONVERT(e.Primer_apellido USING utf8) COLLATE utf8_general_ci LIKE :word$index";
    } elseif ($index == 2) {
        $searchConditions[] = "CONVERT(e.Segundo_apellido USING utf8) COLLATE utf8_general_ci LIKE :word$index";
    }
}

$sql_search = "SELECT e.Empleado_id, e.Nombre, e.Primer_apellido, e.Segundo_apellido, e.Num_seguro_social, emp.Nom_empresa as Empresa, emp.Nom_corto as Nom_corto_empresa, ob.Nombre_obra as Obra, ob.Num_obra, fr.Nom_frente as Frente, e.Correo_electronico, r.Resguardo_id, eq.*, r.Fecha_autorizacion, st.Nom_Status, sc.Nom_subcategoria, m.Nom_marca, eq.num_telefono
    FROM empleados_resguardantes e 
    LEFT JOIN resguardos_de_equipos r ON e.Empleado_id = r.Empleado_id AND r.status = 'resguardado'
    LEFT JOIN equipos_informaticos eq ON r.Equipo_id = eq.Equipo_id
    LEFT JOIN empresas emp ON e.Empresa_id = emp.Empresa_id
    LEFT JOIN obras ob ON e.Obra_id = ob.Obra_id
    LEFT JOIN frente fr ON e.id_frente = fr.Frente_id
    LEFT JOIN status st ON eq.Status_id = st.Status_id
    LEFT JOIN subcategoria sc ON eq.Id_subcategoria = sc.Subcategoria_id
    LEFT JOIN marca_del_equipo m ON eq.Id_marca = m.Id_Marca
    WHERE " . implode(' AND ', $searchConditions) . "
    ORDER BY r.Fecha_autorizacion DESC";

$stmt_search = $conn->prepare($sql_search);

$searchParams = [];
foreach ($searchWords as $index => $word) {
    $searchParams["word$index"] = "%$word%";
}

try {
    $stmt_search->execute($searchParams);
    $results = $stmt_search->fetchAll(PDO::FETCH_ASSOC);
    $finalResults = [];
    foreach ($results as $row) {
        $Empleado_id = $row['Empleado_id'];
        $Equipo_id = $row['Equipo_id'];
        if (!isset($finalResults[$Empleado_id])) {
            $finalResults[$Empleado_id] = [
                'Empleado_id' => $Empleado_id,
                'Nombre' => $row['Nombre'],
                'Primer_apellido' => $row['Primer_apellido'],
                'Segundo_apellido' => $row['Segundo_apellido'],
                'Num_seguro_social' => $row['Num_seguro_social'],
                'Empresa' => $row['Empresa'],
                'Nom_corto_empresa' => $row['Nom_corto_empresa'],
                'Obra' => $row['Obra'],
                'Num_obra' => $row['Num_obra'],
                'Frente' => $row['Frente'],
                'Correo_electronico' => $row['Correo_electronico'],
                'Equipos' => []
            ];
        }

        if ($row['Resguardo_id'] !== null && !isset($finalResults[$Empleado_id]['Equipos'][$Equipo_id])) {
            $finalResults[$Empleado_id]['Equipos'][$Equipo_id] = [
                'Equipo_id' => $Equipo_id,
                'Subcategoria' => $row['Nom_subcategoria'],
                'Marca' => $row['Nom_marca'],
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
                'Status' => $row['Nom_Status'],
                'miId' => $row['miId'],
                'num_telefono' => $row['num_telefono'],
            ];
        }
    }

    foreach ($finalResults as $Empleado_id => $data) {
        if (empty($data['Equipos'])) {
            $finalResults[$Empleado_id]['Mensaje'] = 'Este empleado no tiene a resguardo ningún equipo';
        } else {
            $finalResults[$Empleado_id]['Equipos'] = array_values($finalResults[$Empleado_id]['Equipos']);
        }
    }

    echo json_encode(array_values($finalResults));
} catch (PDOException $e) {
    echo json_encode([
        "message" => "Hubo un error en la búsqueda de empleados", 
        "error" => $e->getMessage()
    ]);
}
?>