<?php
// Include the database connection file
include '../config/connection_db.php';

try {
    // Crear carpetas para imágenes y facturas si no existen
    $imageDir = '../../path/to/images/';
    $invoiceDir = '../../path/to/invoices/';
    if (!is_dir($imageDir)) {
        mkdir($imageDir, 0777, true);
    }
    if (!is_dir($invoiceDir)) {
        mkdir($invoiceDir, 0777, true);
    }

    // Migrar imágenes
    $sql = "SELECT Imagen_id, Nombre, Tipo_mime, Datos_imagen FROM imagenes";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $imagenes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($imagenes as $imagen) {
        // Guardar la imagen en la carpeta
        $imagePath = $imageDir . $imagen['Nombre'];
        file_put_contents($imagePath, $imagen['Datos_imagen']);

        // Actualizar la base de datos para que solo contenga la URL de la imagen en el campo Datos_imagen
        $sql_update = "UPDATE imagenes SET Datos_imagen = :ruta WHERE Imagen_id = :imagen_id";
        $stmt_update = $conn->prepare($sql_update);
        $stmt_update->bindParam(':imagen_id', $imagen['Imagen_id'], PDO::PARAM_INT);
        $stmt_update->bindParam(':ruta', $imagePath, PDO::PARAM_STR);
        $stmt_update->execute();
    }

    // Migrar facturas
    $sql = "SELECT Factura_id, Equipo_id, Factura_file FROM facturas";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $facturas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($facturas as $factura) {
        // Generar un nombre único para la factura
        $invoiceName = 'factura_' . $factura['Equipo_id'] . '_' . $factura['Factura_id'] . '.pdf';
        $invoicePath = $invoiceDir . $invoiceName;
        file_put_contents($invoicePath, $factura['Factura_file']);

        // Actualizar la base de datos para que solo contenga la URL de la factura en el campo Factura_file
        $sql_update = "UPDATE facturas SET Factura_file = :ruta WHERE Factura_id = :factura_id";
        $stmt_update = $conn->prepare($sql_update);
        $stmt_update->bindParam(':factura_id', $factura['Factura_id'], PDO::PARAM_INT);
        $stmt_update->bindParam(':ruta', $invoicePath, PDO::PARAM_STR);
        $stmt_update->execute();
    }

    $response = array('status' => 'success', 'message' => 'Migración completada exitosamente.');
} catch (PDOException $e) {
    $response = array('status' => 'error', 'message' => 'Error durante la migración: ' . $e->getMessage());
}

// Close the connection
$conn = null;

// Return the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>