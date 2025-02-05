<?php
include '../config/connection_db.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = [
        'select_category' => $_POST['select__category'],
        'brandDevices' => $_POST['brandDevices'],
        'modelDevices' => $_POST['modelDevices'],
        'serialNumber' => $_POST['serialNumber'],
        'dateBuy' => $_POST['dateBuy'] === '' ? null : $_POST['dateBuy'],
        'dateExpiresWarranty' => $_POST['dateExpiresWarranty'] === '' ? null : $_POST['dateExpiresWarranty'],
        'amountDevices' => $_POST['amountDevices'],
        'addressMacWifi' => $_POST['addressMacWifi'],
        'specificationDevices' => $_POST['specificationDevices'],
        'detailsExtraDevices' => $_POST['detailsExtraDevices'],
        'serviceTag' => $_POST['serviceTag'],
        'referenceCompaq' => $_POST['referenceCompaq'],
        'addressEthernet' => $_POST['addressEthernet'],
        'status' => '1',
        'codigo' => $_POST['codeEquipment'],
        'num_telefono' => $_POST['num_telefono'],
    ];

    // Verificar si 'amountDevices' es numérico
    if (!is_numeric($data['amountDevices'])) {
        $response['status'] = 'error';
        $response['message'] = 'El importe debe ser un número.';
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }

    // Si el código es una cadena vacía, establecerlo en null
    if ($data['codigo'] === '') {
        $data['codigo'] = null;
    }

    // Obtener el subcategoryId
    $stmt = $conn->prepare("SELECT Subcategoria_id FROM subcategoria WHERE Nom_subcategoria = :select_category");
    $stmt->bindParam(':select_category', $data['select_category']);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $data['subcategoryId'] = $row['Subcategoria_id'];

    // Verificar si el número de serie ya existe
    $stmt = $conn->prepare("SELECT Num_serie FROM equipos_informaticos WHERE Num_serie = :serialNumber");
    $stmt->bindParam(':serialNumber', $data['serialNumber']);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        $response['status'] = 'error';
        $response['message'] = 'El número de serie ya está en uso. Intenta con otro número de serie.';
    } else {
        // Verificar si la dirección MAC ya existe, pero solo si no es nula
        if ($data['addressMacWifi'] !== null) {
            $stmt = $conn->prepare("SELECT Direccion_mac_wifi FROM equipos_informaticos WHERE Direccion_mac_wifi = :addressMacWifi");
            $stmt->bindParam(':addressMacWifi', $data['addressMacWifi']);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row) {
                $response['status'] = 'error';
                $response['message'] = 'La dirección MAC WIFI ya está en uso. Intenta con otra dirección MAC WIFI.';
            }
            // Verificar si la dirección MAC Ethernet ya existe, pero solo si no es nula
            if ($data['addressEthernet'] !== null) {
                $stmt = $conn->prepare("SELECT Direccion_mac_ethernet FROM equipos_informaticos WHERE Direccion_mac_ethernet = :addressEthernet");
                $stmt->bindParam(':addressEthernet', $data['addressEthernet']);
                $stmt->execute();
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($row) {
                    $response['status'] = 'error';
                    $response['message'] = 'La dirección MAC Ethernet ya está en uso. Intenta con otra dirección MAC Ethernet.';
                }

                // Verificar si el número de referencia de Compaq ya existe, pero solo si no es nulo o una cadena vacía
                if ($data['referenceCompaq'] !== null && $data['referenceCompaq'] !== '') {
                    $stmt = $conn->prepare("SELECT Num_ref_compaq FROM equipos_informaticos WHERE Num_ref_compaq = :referenceCompaq");
                    $stmt->bindParam(':referenceCompaq', $data['referenceCompaq']);
                    $stmt->execute();
                    $row = $stmt->fetch(PDO::FETCH_ASSOC);

                    if ($row) {
                        $response['status'] = 'error';
                        $response['message'] = 'El número de referencia de Compaq ya está en uso. Intenta con otro número de referencia de Compaq.';
                    }
                }
                // Verificar si el número de telefono ya existe, pero solo si no es nulo o una cadena vacía
                if (!empty($data['num_telefono'])) {
                    $stmt = $conn->prepare("SELECT num_telefono FROM equipos_informaticos WHERE num_telefono = :num_telefono");
                    $stmt->bindParam(':num_telefono', $data['num_telefono']);
                    $stmt->execute();
                    $row = $stmt->fetch(PDO::FETCH_ASSOC);

                    if ($row) {
                        $response['status'] = 'error';
                        $response['message'] = 'El número de telefono ya está en uso. Intenta con otro número de telefono.';
                        echo json_encode($response);
                        exit();
                    }
                }
                // Verificar si el Service tag ya existe
                $stmt = $conn->prepare("SELECT Service_tag FROM equipos_informaticos WHERE Service_tag = :serviceTag");
                $stmt->bindParam(':serviceTag', $data['serviceTag']);
                $stmt->execute();
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($row) {
                    $response['status'] = 'error';
                    $response['message'] = 'El Service tag del equipo ya está en uso. Intenta con otro Service tag.';
                } else {
                    //Aqui realice la validacion del Codigo OPCIC espero este bien:(

                    $codigoCompleto = 'OPCIC-COM-' . $data['codigo'];
                    $stmt = $conn->prepare("SELECT miId FROM equipos_informaticos WHERE miId = :codigo");
                    $stmt->bindParam(':codigo', $codigoCompleto);
                    $stmt->execute();
                    $row = $stmt->fetch(PDO::FETCH_ASSOC);

                    if ($row) {
                        $response['status'] = 'error';
                        $response['message'] = 'El código ' . $codigoCompleto . ' ya está en uso. Intenta con otro código.';
                    } else {
                        // Si todas las verificaciones son exitosas, entonces insertar los datos
                        $conn->beginTransaction();
                        $equipment_id = null;

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
                                Status_id,
                                num_telefono
                                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

                            $executeResult = $stmt->execute([
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
                                $data['num_telefono']
                            ]);

                            if (!$executeResult) {
                                // La consulta falló
                                $errorInfo = $stmt->errorInfo();
                                throw new Exception('La consulta de inserción falló: ' . var_export($errorInfo, true));
                            }

                            $equipment_id = $conn->lastInsertId();

                            if ($data['codigo'] === null) {
                                $data['codigo'] = 'OPCIC-COM-' . str_pad($equipment_id, 5, '0', STR_PAD_LEFT);
                            } else {
                                $data['codigo'] = 'OPCIC-COM-' . $data['codigo'];
                            }

                            $stmt = $conn->prepare("UPDATE equipos_informaticos SET miId = ? WHERE Equipo_id = ?");
                            $stmt->execute([$data['codigo'], $equipment_id]);

                            // Crear carpetas para imágenes y facturas si no existen
                            $imageDir = '../../path/to/images/';
                            $invoiceDir = '../../path/to/invoices/';
                            if (!is_dir($imageDir)) {
                                mkdir($imageDir, 0777, true);
                            }
                            if (!is_dir($invoiceDir)) {
                                mkdir($invoiceDir, 0777, true);
                            }

                            // Insertar imágenes
                            for ($i = 0; $i < count($_FILES['images']['name']); $i++) {
                                $imageName = $_FILES['images']['name'][$i];
                                $imagePath = $imageDir . $imageName;
                                move_uploaded_file($_FILES['images']['tmp_name'][$i], $imagePath);

                                $stmt = $conn->prepare("INSERT INTO imagenes (Nombre, Tipo_mime, Datos_imagen, Equipo_id) VALUES (?, ?, ?, ?)");
                                $stmt->execute([$imageName, $_FILES['images']['type'][$i], $imagePath, $equipment_id]);
                            }

                            // Insertar facturas
                            if (isset($_FILES['invoices']) && is_array($_FILES['invoices']['name'])) {
                                for ($i = 0; $i < count($_FILES['invoices']['name']); $i++) {
                                    $invoiceName = $_FILES['invoices']['name'][$i];
                                    $invoicePath = $invoiceDir . $invoiceName;
                                    move_uploaded_file($_FILES['invoices']['tmp_name'][$i], $invoicePath);

                                    $stmt = $conn->prepare("INSERT INTO facturas (Factura_file, Equipo_id) VALUES (?, ?)");
                                    $stmt->execute([$invoicePath, $equipment_id]);
                                }
                            }

                            $conn->commit();

                            $response['status'] = 'success';
                            $response['message'] = 'El registro se realizó correctamente.';
                            $response['equipment_id'] = $equipment_id;
                            $response['formatted_equipment_id'] = $data['codigo'];
                        } catch (PDOException $e) {
                            $conn->rollBack();
                            $response['status'] = 'error';
                            $response['message'] = 'Error al registrar el equipo: ' . $e->getMessage();
                        }
                    }
                }
            }
        }
    }
}

header('Content-Type: application/json');
print json_encode($response);
?>