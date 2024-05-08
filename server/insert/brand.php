<?php
include '../config/connection_db.php';

try {
    
    $data = json_decode(file_get_contents('php://input'), true);

    $nom_marca = strtoupper($data['nom_marca']);

    $conn->beginTransaction();

    $sql = "SELECT * FROM marca_del_equipo WHERE Nom_marca = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$nom_marca]);
    $existingMarca = $stmt->fetch();

    if($existingMarca){
        echo "La marca '$nom_marca' ya existe. Por favor, ingrese otra.";
        return;
    }

    $sql = "INSERT INTO marca_del_equipo (Nom_marca) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$nom_marca]);

    $conn->commit();

    echo "La marca del equipo ha sido insertada exitosamente.";
} catch (PDOException $e) {
    $conn->rollback();
    echo "Error: " . $e->getMessage();
}
?>