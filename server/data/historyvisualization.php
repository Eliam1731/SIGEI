<?php

include '../config/connection_db.php';

try {
    $sql = "SELECT de.*, er.Nombre, er.Primer_apellido, er.Segundo_apellido, er.Num_seguro_social, er.Correo_electronico, 
    er.Empresa_id, er.Obra_id, er.id_frente, ei.Modelo, ei.Num_serie, ei.Especificacion, ei.Fecha_compra, ei.Fecha_garantia, 
    ei.Importe, ei.Direccion_mac_wifi, ei.Direccion_mac_ethernet, ei.Num_ref_compaq, ei.Service_tag, ei.Comentarios, 
    ei.Status_id, ei.miId, re.Fecha_autorizacion AS Fecha_inicio, re.User_id AS UsuarioResguardo, 
    de.Fecha_autorizacion AS Fecha_terminacion, de.User_id AS UsuarioDevolucion, 
    ur.Nombre AS NombreUsuarioResguardo, ur.Primer_apellido AS ApellidoUsuarioResguardo, 
    ur.Segundo_apellido AS SegundoApellidoUsuarioResguardo, ud.Nombre AS NombreUsuarioDevolucion, 
    ud.Primer_apellido AS ApellidoUsuarioDevolucion, ud.Segundo_apellido AS SegundoApellidoUsuarioDevolucion,
    ob.Nombre_obra, ob.Num_obra, em.Nom_empresa, em.Nom_corto, fr.Nom_frente, fr.numero_frente
    FROM devolucion_de_equipos de
    LEFT JOIN empleados_resguardantes er ON de.Empleado_id = er.Empleado_id
    LEFT JOIN equipos_informaticos ei ON de.Equipo_id = ei.Equipo_id
    LEFT JOIN resguardos_de_equipos re ON de.Equipo_id = re.Equipo_id
    LEFT JOIN usuarios ur ON re.User_id = ur.User_id
    LEFT JOIN usuarios ud ON de.User_id = ud.User_id
    LEFT JOIN obras ob ON er.Obra_id = ob.Obra_id
    LEFT JOIN empresas em ON er.Empresa_id = em.Empresa_id
    LEFT JOIN frente fr ON er.id_frente = fr.Frente_id";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $datosFinales = [];
    foreach ($resultados as $resultado) {
        unset($resultado['Fecha_autorizacion']);
        
        $datosEmpleado = [
            'Nombre' => $resultado['Nombre'],
            'Primer_apellido' => $resultado['Primer_apellido'],
            'Segundo_apellido' => $resultado['Segundo_apellido'],
            'Num_seguro_social' => $resultado['Num_seguro_social'],
            'Correo_electronico' => $resultado['Correo_electronico'],
            'Empresa_id' => $resultado['Empresa_id'],
            'Nom_empresa' => $resultado['Nom_empresa'],
            'Nom_corto' => $resultado['Nom_corto'],
            'Obra_id' => $resultado['Obra_id'],
            'Nombre_obra' => $resultado['Nombre_obra'],
            'Num_obra' => $resultado['Num_obra'],
            'id_frente' => $resultado['id_frente'],
            'Nom_frente' => $resultado['Nom_frente'],
            'numero_frente' => $resultado['numero_frente']
        ];
        $datosEquipo = [
            'Modelo' => $resultado['Modelo'],
            'Num_serie' => $resultado['Num_serie'],
            'Especificacion' => $resultado['Especificacion'],
            'Fecha_compra' => $resultado['Fecha_compra'],
            'Fecha_garantia' => $resultado['Fecha_garantia'],
            'Importe' => $resultado['Importe'],
            'Direccion_mac_wifi' => $resultado['Direccion_mac_wifi'],
            'Direccion_mac_ethernet' => $resultado['Direccion_mac_ethernet'],
            'Num_ref_compaq' => $resultado['Num_ref_compaq'],
            'Service_tag' => $resultado['Service_tag'],
            'Comentarios' => $resultado['Comentarios'],
            'Status_id' => $resultado['Status_id'],
            'miId' => $resultado['miId'],
        ];


        unset($resultado['Nombre'], $resultado['Primer_apellido'], $resultado['Segundo_apellido'], $resultado['Num_seguro_social'], $resultado['Correo_electronico'], $resultado['Empresa_id'], $resultado['Obra_id'], $resultado['id_frente'], $resultado['Modelo'], $resultado['Num_serie'], $resultado['Especificacion'], $resultado['Fecha_compra'], $resultado['Fecha_garantia'], $resultado['Importe'], $resultado['Direccion_mac_wifi'], $resultado['Direccion_mac_ethernet'], $resultado['Num_ref_compaq'], $resultado['Service_tag'], $resultado['Comentarios'], $resultado['Status_id'], $resultado['miId']);

        // Adicionalmente, eliminar los campos duplicados de obra, empresa y frente
        unset($resultado['Nombre_obra'], $resultado['Num_obra'], $resultado['Nom_empresa'], $resultado['Nom_corto'], $resultado['Nom_frente'], $resultado['numero_frente']);

        $resultado['DatosEmpleado'] = $datosEmpleado;
        $resultado['DatosEquipo'] = $datosEquipo;
        $datosFinales[] = $resultado;
    }

    header('Content-Type: application/json');
    echo json_encode($datosFinales);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}