<?php
include '../config/connection_db.php';

try {
    $sql = "SELECT e.Empleado_id, e.Nombre, e.Primer_apellido, e.Segundo_apellido, e.Num_seguro_social, emp.Nom_empresa, ob.Nombre_obra, fr.Nom_frente, e.Correo_electronico, r.Resguardo_id, eq.*, r.Fecha_autorizacion, st.Nom_Status, sc.Nom_subcategoria, m.Nom_marca
            FROM empleados_resguardantes e 
            LEFT JOIN resguardos_de_equipos r ON e.Empleado_id = r.Empleado_id 
            LEFT JOIN equipos_informaticos eq ON r.Equipo_id = eq.Equipo_id
            LEFT JOIN empresas emp ON e.Empresa_id = emp.Empresa_id
            LEFT JOIN obras ob ON e.Obra_id = ob.Obra_id
            LEFT JOIN frente fr ON e.id_frente = fr.Frente_id
            LEFT JOIN status st ON eq.Status_id = st.Status_id
            LEFT JOIN subcategoria sc ON eq.Id_subcategoria = sc.Subcategoria_id
            LEFT JOIN marca_del_equipo m ON eq.Id_marca = m.Id_Marca
            ORDER BY r.Fecha_autorizacion DESC";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $Empleado_id = $row['Empleado_id'];
        $Equipo_id = $row['Equipo_id'];
        if (!isset($result[$Empleado_id])) {
            $result[$Empleado_id] = [
                'Empleado_id' => $Empleado_id,
                'Nombre' => $row['Nombre'],
                'Primer_apellido' => $row['Primer_apellido'],
                'Segundo_apellido' => $row['Segundo_apellido'],
                'Num_seguro_social' => $row['Num_seguro_social'],
                'Empresa' => $row['Nom_empresa'],
                'Obra' => $row['Nombre_obra'],
                'Frente' => $row['Nom_frente'],
                'Correo_electronico' => $row['Correo_electronico'],
                'Equipos' => []
            ];
        }

        if ($row['Resguardo_id'] !== null && !isset($result[$Empleado_id]['Equipos'][$Equipo_id])) {
            $result[$Empleado_id]['Equipos'][$Equipo_id] = [
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
            ];
        }
    }

    foreach ($result as $Empleado_id => $data) {
        if (empty($data['Equipos'])) {
            $result[$Empleado_id]['Mensaje'] = 'Este empleado no tiene a resguardo ningún equipo';
        } else {
            $result[$Empleado_id]['Equipos'] = array_values($result[$Empleado_id]['Equipos']);
        }
    }

    header('Content-Type: application/json');
    echo json_encode(array_values($result));
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>