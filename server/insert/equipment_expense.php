<?php
include '../config/connection_db.php';

try {
    if (!isset($_POST['Equipo_id'])) {
        throw new Exception("Equipo_id no puede ser nulo");
    }

    if (!isset($_FILES['Recibo_pdf'])) {
        throw new Exception("Recibo_pdf no puede ser nulo");
    }
    
    $reciboContent = file_get_contents($_FILES['Recibo_pdf']['tmp_name']);

    
    $stmt = $conn->prepare("INSERT INTO gastos_de_los_equipos (Equipo_id, orden_compra, Piezas, Importe, Fecha, Recibo_pdf) VALUES (:Equipo_id, :orden_compra, :Piezas, :Importe, :Fecha, :Recibo_pdf)");
    
    $stmt->bindParam(':Equipo_id', $_POST['Equipo_id']);
    $stmt->bindParam(':orden_compra', $_POST['orden_compra']);
    $stmt->bindParam(':Piezas', $_POST['Piezas']);
    $stmt->bindParam(':Importe', $_POST['Importe']);
    $stmt->bindParam(':Fecha', $_POST['Fecha']);
    $stmt->bindParam(':Recibo_pdf', $reciboContent, PDO::PARAM_LOB);

    $stmt->execute();

    echo "Los gastos fueron subidos con éxito";
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
} catch(Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>

