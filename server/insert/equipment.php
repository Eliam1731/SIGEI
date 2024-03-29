<?php
include '../config/connection_db.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = [
        'select_category' => $_POST['select__category'],
        'brandDevices' => $_POST['brandDevices'],
        'modelDevices' => $_POST['modelDevices'],
        'serialNumber' => $_POST['serialNumber'],
        'dateBuy' => $_POST['dateBuy'],
        'dateExpiresWarranty' => $_POST['dateExpiresWarranty'],
        'amountDevices' => $_POST['amountDevices'],
        'addressMacWifi' => $_POST['addressMacWifi'],
        'specificationDevices' => $_POST['specificationDevices'],
        'detailsExtraDevices' => $_POST['detailsExtraDevices'],
        'serviceTag' => $_POST['serviceTag'],
        'referenceCompaq' => $_POST['referenceCompaq'],
        'addressEthernet' => $_POST['addressEthernet'],
        'status' => '1',
        'codigo' => $_POST['codigo'] ?? null,
    ];

    // Aquí comienza la lógica de verificación y generación del código OPCIC-COM ME AVISAS SI NO JALA
    if ($data['codigo']) {
        $stmt = $conn->prepare("SELECT * FROM equipos_informaticos WHERE miId = ?");
        $stmt->execute([$data['codigo']]);
        $existing_equipment = $stmt->fetch();

        if ($existing_equipment) {
            $response['status'] = 'error';
            $response['message'] = 'El código ' . $data['codigo'] . ' ya existe en la base de datos.';
            header('Content-Type: application/json');
            print json_encode($response);
            exit;
        }
    } else {
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

        $stmt->execute([
            $data['subcategoryId'],
            $data['brandDevices'],
            $data['modelDevices'],
            $data['serialNumber'],
            $data['specificationDevices'],
            $data['dateBuy'],
            $data['dateExpiresWarranty'],
            $data['amountDevices'],
            $data['addressMacWifi'],
            $data['addressEthernet'],
            $data['referenceCompaq'],
            $data['serviceTag'],
            $data['detailsExtraDevices'],
            $data['status'],
        ]);

        $equipment_id = $conn->lastInsertId();
        $data['codigo'] = 'OPCIC-COM-' . str_pad($equipment_id, 5, '0', STR_PAD_LEFT);
        $stmt = $conn->prepare("UPDATE equipos_informaticos SET miId = ? WHERE Equipo_id = ?");
        $stmt->execute([$data['codigo'], $equipment_id]);
    }
    // Aquí termina la lógica de verificación y generación del código OPCIC-COM SEGUN YO ASI ES:(

}
?>


    $stmt = $conn->prepare("SELECT Subcategoria_id FROM subcategoria WHERE Nom_subcategoria = :select_category");
    $stmt->bindParam(':select_category', $data['select_category']);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $data['subcategoryId'] = $row['Subcategoria_id'];

    $stmt = $conn->prepare("SELECT Num_serie FROM equipos_informaticos WHERE Num_serie = :serialNumber");
    $stmt->bindParam(':serialNumber', $data['serialNumber']);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        $response['status'] = 'error';
        $response['message'] = 'El número de serie ya existe. Por favor, introduce otro.';
    } else {
        $stmt = $conn->prepare("SELECT Direccion_mac_wifi FROM equipos_informaticos WHERE Direccion_mac_wifi = :addressMacWifi");
        $stmt->bindParam(':addressMacWifi', $data['addressMacWifi']);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $response['status'] = 'error';
            $response['message'] = 'La dirección MAC ya existe. Por favor, introduce otra.';
        } else {
            $stmt = $conn->prepare("SELECT Num_ref_compaq FROM equipos_informaticos WHERE Num_ref_compaq = :referenceCompaq");
            $stmt->bindParam(':referenceCompaq', $data['referenceCompaq']);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row) {
                $response['status'] = 'error';
                $response['message'] = 'El número de referencia de Compaq ya existe. Por favor, introduce otro.';
            } else {
                $stmt = $conn->prepare("SELECT Service_tag FROM equipos_informaticos WHERE Service_tag = :serviceTag");
                $stmt->bindParam(':serviceTag', $data['serviceTag']);
                $stmt->execute();
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($row) {
                    $response['status'] = 'error';
                    $response['message'] = 'El Service tag del equipo ya existe. Por favor, introduce otro.';
                } else {
                    $conn->beginTransaction();

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
    
                    $stmt->execute([
                        $data['subcategoryId'],
                        $data['brandDevices'],
                        $data['modelDevices'],
                        $data['serialNumber'],
                        $data['specificationDevices'],
                        $data['dateBuy'],
                        $data['dateExpiresWarranty'],
                        $data['amountDevices'],
                        $data['addressMacWifi'],
                        $data['addressEthernet'],
                        $data['referenceCompaq'],
                        $data['serviceTag'],
                        $data['detailsExtraDevices'],
                        $data['status'],
                    ]);
    
                    $equipment_id = $conn->lastInsertId();
                    $formatted_equipment_id = 'OPCIC-COM-' . str_pad($equipment_id, 5, '0', STR_PAD_LEFT);
    
                    for ($i = 0; $i < count($_FILES['images']['name']); $i++) {
                        $imageName = $_FILES['images']['name'][$i];
                        $imageType = $_FILES['images']['type'][$i];
                        $imageData = file_get_contents($_FILES['images']['tmp_name'][$i]);
    
                        $stmt = $conn->prepare("INSERT INTO imagenes (Nombre, Tipo_mime, Datos_imagen, Equipo_id) VALUES (?, ?, ?, ?)");
                        $stmt->execute([$imageName, $imageType, $imageData, $equipment_id]);
                    }
    
                    if (isset($_FILES['invoices'])) {
                        for ($i = 0; $i < count($_FILES['invoices']['name']); $i++) {
                            $invoiceContent = file_get_contents($_FILES['invoices']['tmp_name'][$i]);
    
                            $stmt = $conn->prepare("INSERT INTO facturas (Factura_file, Equipo_id) VALUES (?, ?)");
                            $stmt->execute([$invoiceContent, $equipment_id]);
                        }
                    }
    
                    $conn->commit();
    
                    $response['status'] = 'success';
                    $response['message'] = 'El registro se realizó correctamente.';
                    $response['equipment_id'] = $equipment_id;
                    $response['formatted_equipment_id'] = $formatted_equipment_id;
                } catch (Exception $e) {
                    $conn->rollback();

                    $response['status'] = 'error';
                    $response['message'] = 'Hubo un error al realizar el registro.' . $e->getMessage();
                    }
                }
            }
        }
    }
}

header('Content-Type: application/json');
print json_encode($response);
?>