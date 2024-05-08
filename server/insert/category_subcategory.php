<?php
include '../config/connection_db.php';

try {

    $data = json_decode(file_get_contents('php://input'), true);

    $nom_categoria = ucfirst(strtolower($data['nom_categoria']));
    $subcategorias = array_map(function($subcategoria) {
        return ucfirst(strtolower($subcategoria));
    }, $data['subcategorias']);

    $conn->beginTransaction();

    $sql = "SELECT Categoria_id FROM categorias_equipo_informatico WHERE Nom_categoria = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$nom_categoria]);
    $categoria_id = $stmt->fetchColumn();

    $isNewCategory = false;
    if(!$categoria_id){
        $sql = "INSERT INTO categorias_equipo_informatico (Nom_categoria) VALUES (?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nom_categoria]);
        $categoria_id = $conn->lastInsertId();
        $isNewCategory = true;
    }
    foreach ($subcategorias as $nom_subcategoria) {
        $sql = "SELECT Subcategoria_id FROM subcategoria WHERE Nom_subcategoria = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nom_subcategoria]);
        $subcategoria_id = $stmt->fetchColumn();

        if($subcategoria_id){
            echo json_encode(["error" => "La subcategoría '$nom_subcategoria' ya existe. Por favor, ingrese otra."]);
            return;
        }

        $sql = "INSERT INTO subcategoria (Nom_subcategoria, id_categoria) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nom_subcategoria, $categoria_id]);
    }
    $conn->commit();

    if($isNewCategory){
        echo json_encode(["message" => "La categoría y las subcategorías han sido insertadas exitosamente."]);
    } else {
        echo json_encode(["message" => "La subcategoría ha sido agregada exitosamente."]);
    }
} catch (PDOException $e) {
    $conn->rollback();
    echo json_encode(["error" => "Error: " . $e->getMessage()]);
}
?>