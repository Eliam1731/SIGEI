<?php
include '../config/connection_db.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $select_category = $_POST['select__category'];
    $brandDevices = $_POST['brandDevices'];
    $modelDevices = $_POST['modelDevices'];
    $serialNumber = $_POST['serialNumber'];
    $dateBuy = $_POST['dateBuy'];
    $dateExpiresWarranty = $_POST['dateExpiresWarranty'];
    $amountDevices = $_POST['amountDevices'];
    $addressMacWifi = $_POST['addressMacWifi'];
    $specificationDevices = $_POST['specificationDevices'];
    $detailsExtraDevices = $_POST['detailsExtraDevices'];
    $serviceTag = $_POST['serviceTag'];
    $referenceCompaq = $_POST['referenceCompaq'];
    $addressEthernet = $_POST['addressEthernet'];
    $status = '1';

    $gettingSubcategoryID = "SELECT Subcategoria_id FROM subcategoria WHERE Nom_subcategoria = '".$select_category."'";
    $result = mysqli_query($conn, $gettingSubcategoryID);
    $row = mysqli_fetch_assoc($result);
    $subcategoryId = $row['Subcategoria_id'];

    $conn->begin_transaction();

    try {
        $stmt = $conn->prepare("INSERT INTO equipos_informaticos (
            Id_subcategoria,
            Id_marca,
            Modelo,
            Num_serie,
            Especificacion,
            Fecha_compra,
            Fecha_garantia,
            Importe,
            Direccion_mac_wifi,
            Direccion_mac_ethernet,
            Num_ref_compaq,
            Service_tag,
            Comentarios,
            Status_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        $stmt->bind_param("iisssssdsssssi", $subcategoryId, $brandDevices, $modelDevices, $serialNumber, $specificationDevices, $dateBuy, $dateExpiresWarranty, 
        $amountDevices, $addressMacWifi, $addressEthernet, $referenceCompaq, $serviceTag, $detailsExtraDevices, $status);

        $stmt->execute();

        $equipment_id = $conn->insert_id;

        for ($i = 0; $i < count($_FILES['images']['name']); $i++) {
            $imageName = $_FILES['images']['name'][$i];
            $imageType = $_FILES['images']['type'][$i];
            $imageData = file_get_contents($_FILES['images']['tmp_name'][$i]);
        
            $stmt = $conn->prepare("INSERT INTO imagenes (Nombre, Tipo_mime, Datos_imagen, Equipo_id) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssbi", $imageName, $imageType, $null, $equipment_id);
            $stmt->send_long_data(2, $imageData);
            $stmt->execute();
        }

    if (isset($_FILES['invoices'])) {
    for ($i = 0; $i < count($_FILES['invoices']['name']); $i++) {
        $invoiceContent = file_get_contents($_FILES['invoices']['tmp_name'][$i]);

        $stmt = $conn->prepare("INSERT INTO facturas (Factura_file, Equipo_id) VALUES (?, ?)");
        $stmt->bind_param("bi", $null, $equipment_id);
        $stmt->send_long_data(0, $invoiceContent);
        $stmt->execute();
    }
}

        $conn->commit();

        $response['status'] = 'success';
        $response['message'] = 'El registro se realizó correctamente.';
    } catch (Exception $e) {
        $conn->rollback();

        $response['status'] = 'error';
        $response['message'] = 'Hubo un error al realizar el registro.';
    }
}

header('Content-Type: application/json');
print json_encode($response);
?>