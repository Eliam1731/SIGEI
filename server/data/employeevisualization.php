<?php
include '../config/connection_db.php';

try {
    $sql = "SELECT e.Empleado_id, e.Nombre, e.Primer_apellido, e.Segundo_apellido, e.Num_seguro_social, e.Empresa_id, e.Obra_id, e.Correo_electronico, e.id_frente, r.Resguardo_id, eq.* 
            FROM empleados_resguardantes e 
            LEFT JOIN resguardos_de_equipos r ON e.Empleado_id = r.Empleado_id 
            LEFT JOIN equipos_informaticos eq ON r.Equipo_id = eq.Equipo_id";

    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $result = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $Empleado_id = $row['Empleado_id'];
        if (!isset($result[$Empleado_id])) {
            $result[$Empleado_id] = [
                'Empleado_id' => $Empleado_id,
                'Nombre' => $row['Nombre'],
                'Primer_apellido' => $row['Primer_apellido'],
                'Segundo_apellido' => $row['Segundo_apellido'],
                'Num_seguro_social' => $row['Num_seguro_social'],
                'Empresa_id' => $row['Empresa_id'],
                'Obra_id' => $row['Obra_id'],
                'Correo_electronico' => $row['Correo_electronico'],
                'id_frente' => $row['id_frente'],
                'Equipos' => []
            ];
        }

        if ($row['Resguardo_id'] !== null) {
            $result[$Empleado_id]['Equipos'][] = [
                'Equipo_id' => $row['Equipo_id'],
                'Id_subcategoria' => $row['Id_subcategoria'],
                'Id_marca' => $row['Id_marca'],
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
                'Status_id' => $row['Status_id'],
                'miId' => $row['miId'],
            ];
        }
    }

    foreach ($result as $Empleado_id => $data) {
        if (empty($data['Equipos'])) {
            $result[$Empleado_id]['Mensaje'] = 'Este empleado no tiene a resguardo ningún equipo';
        }
    }

    header('Content-Type: application/json');
    echo json_encode(array_values($result));
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>