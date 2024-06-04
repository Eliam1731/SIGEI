<?php

include '../config/connection_db.php';

try {
    $sql = "SELECT de.*, de.Comentario AS ComentariosDevolucion, er.Nombre, er.Primer_apellido, er.Segundo_apellido, er.Num_seguro_social, er.Correo_electronico, 
    er.Empresa_id, er.Obra_id, er.id_frente, ei.Modelo, ei.Num_serie, ei.Especificacion, ei.Fecha_compra, ei.Fecha_garantia, 
    ei.Importe, ei.Direccion_mac_wifi, ei.Direccion_mac_ethernet, ei.Num_ref_compaq, ei.Service_tag, ei.Comentarios AS ComentariosEquipo, 
    st.Nom_Status AS Status, ei.miId, ei.num_telefono, re.Fecha_autorizacion AS Fecha_inicio, re.User_id AS UsuarioResguardo, 
    de.Fecha_autorizacion AS Fecha_terminacion, de.User_id AS UsuarioDevolucion, 
    ur.Nombre AS NombreUsuarioResguardo, ur.Primer_apellido AS ApellidoUsuarioResguardo, 
    ur.Segundo_apellido AS SegundoApellidoUsuarioResguardo, ud.Nombre AS NombreUsuarioDevolucion, 
    ud.Primer_apellido AS ApellidoUsuarioDevolucion, ud.Segundo_apellido AS SegundoApellidoUsuarioDevolucion,
    ob.Nombre_obra, ob.Num_obra, em.Nom_empresa, em.Nom_corto, fr.Nom_frente, fr.numero_frente,
    sc.Nom_subcategoria, ce.Nom_categoria, me.Nom_marca
    FROM devolucion_de_equipos de
    LEFT JOIN empleados_resguardantes er ON de.Empleado_id = er.Empleado_id
    LEFT JOIN equipos_informaticos ei ON de.Equipo_id = ei.Equipo_id
    LEFT JOIN resguardos_de_equipos re ON de.Equipo_id = re.Equipo_id
    LEFT JOIN usuarios ur ON re.User_id = ur.User_id
    LEFT JOIN usuarios ud ON de.User_id = ud.User_id
    LEFT JOIN obras ob ON er.Obra_id = ob.Obra_id
    LEFT JOIN empresas em ON er.Empresa_id = em.Empresa_id
    LEFT JOIN frente fr ON er.id_frente = fr.Frente_id
    LEFT JOIN subcategoria sc ON ei.Id_subcategoria = sc.Subcategoria_id
    LEFT JOIN categorias_equipo_informatico ce ON sc.id_categoria = ce.Categoria_id
    LEFT JOIN marca_del_equipo me ON ei.Id_marca = me.Id_Marca
    LEFT JOIN status st ON ei.Status_id = st.Status_id
    GROUP BY de.Devolucion_id";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $datosFinales = [];
    foreach ($resultados as $resultado) {
        $idEmpleado = $resultado['Empleado_id'];
        unset($resultado['Empleado_id']);

        if (!isset($datosFinales[$idEmpleado])) {
            $datosFinales[$idEmpleado] = [
                'DatosEmpleado' => [
                    'Nombre' => $resultado['Nombre'],
                    'Primer_apellido' => $resultado['Primer_apellido'],
                    'Segundo_apellido' => $resultado['Segundo_apellido'],
                    'Num_seguro_social' => $resultado['Num_seguro_social'],
                    'Correo_electronico' => $resultado['Correo_electronico'],
                    'Empresa_id' => $resultado['Empresa_id'],
                    'Obra_id' => $resultado['Obra_id'],
                    'id_frente' => $resultado['id_frente'],
                ],
                'Equipos' => []
            ];
        }

        $idEquipo = $resultado['Equipo_id'];

        // Consulta para obtener las imágenes
        $sql_images = $conn->prepare("SELECT Imagen_id, Nombre, Tipo_mime, Datos_imagen FROM imagenes WHERE Equipo_id = ?");
        $sql_images->execute([$idEquipo]);
        $images = $sql_images->fetchAll(PDO::FETCH_ASSOC);

        foreach ($images as $key => $image) {
            $images[$key]['Datos_imagen'] = base64_encode($image['Datos_imagen']);
        }

        $resultado['images'] = $images;

        // Consulta para obtener las facturas
        $sql_invoices = $conn->prepare("SELECT Factura_file FROM facturas WHERE Equipo_id = ?");
        $sql_invoices->execute([$idEquipo]);
        $invoices = $sql_invoices->fetchAll(PDO::FETCH_ASSOC);

        foreach ($invoices as $key => $invoice) {
            $invoices[$key]['Factura_file'] = base64_encode($invoice['Factura_file']);
        }

        $resultado['invoices'] = $invoices;

        $comentariosEquipo = $resultado['ComentariosEquipo'];
        unset($resultado['ComentariosEquipo']);

        $comentariosDevolucion = $resultado['ComentariosDevolucion'];
        unset($resultado['ComentariosDevolucion']);

        $datosFinales[$idEmpleado]['Equipos'][] = array_merge($resultado, ['ComentariosEquipo' => $comentariosEquipo]);
    }

    header('Content-Type: application/json');
    echo json_encode($datosFinales);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

?>