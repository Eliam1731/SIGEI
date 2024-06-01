<?php
include '../config/connection_db.php';
$data = json_decode(file_get_contents("php://input"));
$num_telefono = $data->num_telefono; 

try {
    $query =  $conn->prepare("SELECT
                                Equipo_id AS id, 
                                Status_id AS status
                            FROM 
                                equipos_informaticos 
                            WHERE 
                                num_telefono = ?;"); 
    $query->bindParam(1, $num_telefono); 
    $query->execute();
    $result = $query->fetch(PDO::FETCH_ASSOC); 

    if ($result === false) {
        $result = [
            'status' => 'error',
            'message' => 'El equipo no existe'
        ];

        header('Content-Type: application/json');
        print json_encode($result);
        return;
    }

    $equipo_id = $result['id'];
    $status_id = $result['status'];

    if($status_id !== 2) {
        
        $result = [
            'status' => 'error',
            'message' => 'El equipo no está en estado de resguardo'
        ];

        header('Content-Type: application/json');
        print json_encode($result);
        return;
    }

    //Empieza la logica para obtener los datos del equipo
    $sql_guard = $conn->prepare("SELECT 
        resguardos_de_equipos.User_id AS user_id,
        resguardos_de_equipos.Comentario AS comentario, 
        resguardos_de_equipos.Fecha_autorizacion AS fechaAutorizacion,
        resguardos_de_equipos.Resguardo_id AS resguardo_id,
        equipos_informaticos.Equipo_id AS equipo_id,
        subcategoria.Nom_subcategoria AS subcategoria,
        marca_del_equipo.Nom_marca AS marca,
        equipos_informaticos.Modelo AS modelo,
        equipos_informaticos.Num_serie AS serie,
        equipos_informaticos.miId AS codigo,
        equipos_informaticos.num_telefono AS telefono,
        status.Nom_Status AS estado,
        empleados_resguardantes.Empleado_id AS empleado_id,
        CONCAT(empleados_resguardantes.Nombre, ' ', empleados_resguardantes.Primer_apellido, ' ', empleados_resguardantes.Segundo_apellido) AS nombreResguardante_completo,
        empleados_resguardantes.Empresa_id AS empresa_id,
        empleados_resguardantes.Obra_id AS obra_id,
        empleados_resguardantes.id_frente AS frente_id,
        empleados_resguardantes.Correo_electronico AS correoResguardante,
        equipos_informaticos.Fecha_compra AS fecha_compra,
        equipos_informaticos.Fecha_garantia AS fecha_garantia,
        equipos_informaticos.Importe AS importe,
        equipos_informaticos.Especificacion AS especificacion,
        equipos_informaticos.Comentarios AS comentarios,
        equipos_informaticos.Service_tag AS service_tag,
        equipos_informaticos.Num_ref_compaq AS n_referencia_compras,
        equipos_informaticos.Direccion_mac_ethernet AS mac_ethernet,
        equipos_informaticos.Direccion_mac_wifi AS mac_wifi
    FROM 
        resguardos_de_equipos
    JOIN equipos_informaticos ON resguardos_de_equipos.Equipo_id = equipos_informaticos.Equipo_id
    JOIN subcategoria ON equipos_informaticos.Id_subcategoria = subcategoria.Subcategoria_id
    JOIN marca_del_equipo ON equipos_informaticos.Id_marca = marca_del_equipo.Id_Marca
    JOIN status ON equipos_informaticos.Status_id = status.Status_id
    JOIN empleados_resguardantes ON resguardos_de_equipos.Empleado_id = empleados_resguardantes.Empleado_id
    WHERE 
        resguardos_de_equipos.Equipo_id = ? AND
        resguardos_de_equipos.status = 'resguardado'
    ORDER BY 
        resguardos_de_equipos.Fecha_autorizacion DESC
    LIMIT 1;");

    $sql_guard->bindParam(1, $equipo_id);
    $sql_guard->execute();
    $guard = $sql_guard->fetch(PDO::FETCH_ASSOC);
    
    // Consulta para obtener las imágenes
    $sql_images = $conn->prepare("SELECT Imagen_id, Nombre, Tipo_mime, Datos_imagen FROM imagenes WHERE Equipo_id = ?");
    $sql_images->execute([$equipo_id]);
    $images = $sql_images->fetchAll(PDO::FETCH_ASSOC);

    foreach ($images as $key => $image) {
        $images[$key]['Datos_imagen'] = base64_encode($image['Datos_imagen']);
    }

    // Consulta para obtener las facturas
    $sql_invoices = $conn->prepare("SELECT Factura_file FROM facturas WHERE Equipo_id = ?");
    $sql_invoices->execute([$equipo_id]);
    $invoices = $sql_invoices->fetchAll(PDO::FETCH_ASSOC);

    foreach ($invoices as $key => $invoice) {
        $invoices[$key]['Factura_file'] = base64_encode($invoice['Factura_file']);
    }

    $result_guard = [
        'estado' => $guard['estado'],
        'user_id' => $guard['user_id'],
        'comentario' => $guard['comentario'],
        'fechaAutorizacion' => $guard['fechaAutorizacion'],
        'resguardo_id' => $guard['resguardo_id'],
        'equipo' => [
            'equipo_id' => $guard['equipo_id'],
            'subcategoria' => $guard['subcategoria'],
            'marca' => $guard['marca'],
            'modelo' => $guard['modelo'],
            'serie' => $guard['serie'],
            'codigo' => $guard['codigo'],
            'fecha_compra' => $guard['fecha_compra'],
            'fecha_garantia' => $guard['fecha_garantia'],
            'importe' => $guard['importe'],
            'especificacion' => $guard['especificacion'],
            'comentarios' => $guard['comentarios'],
            'telefono' => $guard['telefono'],
            'service_tag' => $guard['service_tag'],
            'n_referencia_compras' => $guard['n_referencia_compras'],
            'mac_ethernet' => $guard['mac_ethernet'],
            'mac_wifi' => $guard['mac_wifi'],
            'images' => $images,
            'invoices' => $invoices,
        ],
        'empleado' => [
            'empleado_id' => $guard['empleado_id'],
            'nombreResguardante_completo' => $guard['nombreResguardante_completo'],
            'empresa_id' => $guard['empresa_id'],
            'obra_id' => $guard['obra_id'],
            'frente_id' => $guard['frente_id'],
            'correoResguardante' => $guard['correoResguardante'],
        ],
        
    ];

    header('Content-Type: application/json');
    print json_encode($result_guard);
} catch (PDOException $e) {
    error_log("Error en la consulta: " . $e->getMessage());
}
?>