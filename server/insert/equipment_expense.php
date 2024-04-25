<?php
include '../config/connection_db.php';

$data = json_decode(file_get_contents('php://input'), true);

try {

    $stmt = $pdo->prepare("INSERT INTO gastos_de_los_equipos (Equipo_id, Cantidad, Piezas, Importe, Fecha, Recibo_pdf) VALUES (:Equipo_id, :Cantidad, :Piezas, :Importe, :Fecha, :Recibo_pdf)");

    $stmt->bindParam(':Equipo_id', $data['Equipo_id']);
    $stmt->bindParam(':Cantidad', $data['Cantidad']);
    $stmt->bindParam(':Piezas', $data['Piezas']);
    $stmt->bindParam(':Importe', $data['Importe']);
    $stmt->bindParam(':Fecha', $data['Fecha']);
    $stmt->bindParam(':Recibo_pdf', $data['Recibo_pdf']);

    $stmt->execute();

    echo "Los gastos fueron subidos con éxito";
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>