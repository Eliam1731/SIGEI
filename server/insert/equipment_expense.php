<?php
include '../config/connection_db.php';

try {

    $stmt = $conn->prepare("INSERT INTO gastos_de_los_equipos (Equipo_id, Cantidad, Piezas, Importe, Fecha, Recibo_pdf) VALUES (:Equipo_id, :Cantidad, :Piezas, :Importe, :Fecha, :Recibo_pdf)");

    $stmt->bindParam(':Equipo_id', $_POST['Equipo_id']);
    $stmt->bindParam(':Cantidad', $_POST['Cantidad']);
    $stmt->bindParam(':Piezas', $_POST['Piezas']);
    $stmt->bindParam(':Importe', $_POST['Importe']);
    $stmt->bindParam(':Fecha', $_POST['Fecha']);
    $stmt->bindParam(':Recibo_pdf', $_POST['Recibo_pdf']);

    $stmt->execute();

    echo "Los gastos fueron subidos con éxito";
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>