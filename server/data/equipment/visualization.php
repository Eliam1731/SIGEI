<?php
// Include the database connection file
include '../../config/connection_db.php';

// Get the JSON input
$data = json_decode(file_get_contents('php://input'), true);
$index = $data['Index'];
$amountDevices = $data['amountDevices'];

// Calculate the offset for the SQL query
$offset = ($index - 1) * $amountDevices;

// Prepare the SQL query with JOINs to get the names of subcategory and brand
$sql = "
    SELECT 
        ei.miId, 
        sc.Nom_subcategoria, 
        me.Nom_marca, 
        ei.Modelo, 
        ei.Status_id 
    FROM 
        equipos_informaticos ei
    JOIN 
        subcategoria sc ON ei.Id_subcategoria = sc.Subcategoria_id
    JOIN 
        marca_del_equipo me ON ei.Id_marca = me.Id_Marca
    LIMIT :offset, :amountDevices";

$stmt = $conn->prepare($sql);
$stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
$stmt->bindParam(':amountDevices', $amountDevices, PDO::PARAM_INT);
$stmt->execute();

// Initialize the response array
$response = array();

// Fetch the results
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $status = ($row['Status_id'] == 2) ? true : false;
    $response[] = array(
        'Miid' => $row['miId'],
        'Subcategoria' => $row['Nom_subcategoria'],
        'Marca' => $row['Nom_marca'],
        'Modelo' => $row['Modelo'],
        'Status' => $status
    );
}

// Close the connection
$conn = null;

// Return the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>