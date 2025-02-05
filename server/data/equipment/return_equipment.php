<?php
// Include the database connection file
include '../../config/connection_db.php';

// Get the JSON input
$data = json_decode(file_get_contents('php://input'), true);
$miId = $data['Id'];

// Prepare the SQL query to get the equipment details
$sql = "
    SELECT 
        ei.*, 
        sc.Nom_subcategoria, 
        me.Nom_marca, 
        st.Nom_Status 
    FROM 
        equipos_informaticos ei
    JOIN 
        subcategoria sc ON ei.Id_subcategoria = sc.Subcategoria_id
    JOIN 
        marca_del_equipo me ON ei.Id_marca = me.Id_Marca
    JOIN 
        status st ON ei.Status_id = st.Status_id
    WHERE 
        ei.miId = :miId";

$stmt = $conn->prepare($sql);
$stmt->bindParam(':miId', $miId, PDO::PARAM_STR);
$stmt->execute();

// Fetch the equipment details
$equipment = $stmt->fetch(PDO::FETCH_ASSOC);

if ($equipment) {
    // Prepare the SQL query to check if the equipment is in resguardo
    $sql_resguardo = "
        SELECT 
            re.Empleado_id,
            er.Nombre,
            er.Primer_apellido,
            er.Segundo_apellido
        FROM 
            resguardos_de_equipos re
        JOIN 
            empleados_resguardantes er ON re.Empleado_id = er.Empleado_id
        WHERE 
            re.Equipo_id = :equipo_id AND re.status = 'resguardado' 
        LIMIT 1";

    $stmt_resguardo = $conn->prepare($sql_resguardo);
    $stmt_resguardo->bindParam(':equipo_id', $equipment['Equipo_id'], PDO::PARAM_INT);
    $stmt_resguardo->execute();

    // Fetch the resguardo details
    $resguardo = $stmt_resguardo->fetch(PDO::FETCH_ASSOC);

    
    $sql_imagen = "
        SELECT 
            Imagen_id,
            Nombre,
            Datos_imagen
        FROM 
            imagenes 
        WHERE 
            Equipo_id = :equipo_id";

    $stmt_imagen = $conn->prepare($sql_imagen);
    $stmt_imagen->bindParam(':equipo_id', $equipment['Equipo_id'], PDO::PARAM_INT);
    $stmt_imagen->execute();


    $imagenes = $stmt_imagen->fetchAll(PDO::FETCH_ASSOC);

   
    $sql_factura = "
        SELECT 
            Factura_id,
            Factura_file
        FROM 
            facturas 
        WHERE 
            Equipo_id = :equipo_id 
        LIMIT 1";

    $stmt_factura = $conn->prepare($sql_factura);
    $stmt_factura->bindParam(':equipo_id', $equipment['Equipo_id'], PDO::PARAM_INT);
    $stmt_factura->execute();

 
    $factura = $stmt_factura->fetch(PDO::FETCH_ASSOC);

  
    $response = array(
        'Miid' => $equipment['miId'],
        'Subcategoria' => $equipment['Nom_subcategoria'],
        'Marca' => $equipment['Nom_marca'],
        'Modelo' => $equipment['Modelo'],
        'Num_serie' => $equipment['Num_serie'],
        'Especificacion' => $equipment['Especificacion'],
        'Fecha_compra' => $equipment['Fecha_compra'],
        'Fecha_garantia' => $equipment['Fecha_garantia'],
        'Importe' => $equipment['Importe'],
        'Direccion_mac_wifi' => $equipment['Direccion_mac_wifi'],
        'Direccion_mac_ethernet' => $equipment['Direccion_mac_ethernet'],
        'Num_ref_compaq' => $equipment['Num_ref_compaq'],
        'Service_tag' => $equipment['Service_tag'],
        'Comentarios' => $equipment['Comentarios'],
        'Status' => $equipment['Nom_Status'],
        'Imagenes' => array_map(function($img) {
            return array(
                'Id_imagen' => $img['Imagen_id'],
                'Nombre_imagen' => $img['Nombre'],
                'Ruta_imagen' => $img['Datos_imagen']
            );
        }, $imagenes),
        'Id_factura' => $factura ? $factura['Factura_id'] : null,
        'Ruta_factura' => $factura ? $factura['Factura_file'] : null,
        'Resguardo' => $resguardo ? $resguardo['Empleado_id'] : null,
        'Nombre_resguardante' => $resguardo ? $resguardo['Nombre'] . ' ' . $resguardo['Primer_apellido'] . ' ' . $resguardo['Segundo_apellido'] : null
    );
} else {
   
    $response = array();
}


$conn = null;


header('Content-Type: application/json');
echo json_encode($response);
?>