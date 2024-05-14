<?php
include '../config/connection_db.php';

try {
    $sql = "UPDATE equipos_informaticos SET Status_id = 1";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    echo "El estado de todos los equipos ha sido cambiado a 'Disponible'.";
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>