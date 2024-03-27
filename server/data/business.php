<?php
    // Incluye el archivo de configuración de la base de datos xd
    include '../config/connection_db.php';

    // Inicializa un array asociativo con tres claves: 'work', 'forehead' y 'company', cada una con un array vacío como valor xddd
    $data = [
        'work' => [],
        'forehead' => [],
        'company' => []
    ];

    // Define una consulta SQL para seleccionar los campos 'Obra_id' y 'Nombre_obra' de la tabla 'obras', ordenados por 'Obra_id' en orden ascendente xddd
    $sql = "SELECT Obra_id, Nombre_obra FROM obras ORDER BY Obra_id ASC";
    // Ejecuta la consulta SQL y almacena el resultado en la variable $stmtxdddddd
    $stmt = $conn->query($sql);
    // Recorre cada fila del resultado de la consulta SQLxddddd
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // Añade un array con los valores de 'Obra_id' y 'Nombre_obra' de la fila actual al array asociado con la clave 'work' en el array $data xddd
        $data['work'][] = [$row['Obra_id'], $row['Nombre_obra']];
    }

    // El mismo proceso se repite para las tablas 'frente' y 'empresas', almacenando los resultados en las claves 'forehead' y 'company' del array $data, respectivamente xd 
    $sql = "SELECT Frente_id, Nom_frente FROM frente ORDER BY Frente_id ASC";
    $stmt = $conn->query($sql);
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $data['forehead'][] = [$row['Frente_id'], $row['Nom_frente']];
    }

    $sql = "SELECT Empresa_id, Nom_empresa FROM empresas ORDER BY Empresa_id ASC";
    $stmt = $conn->query($sql);
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $data['company'][] = [$row['Empresa_id'], $row['Nom_empresa']];
    }

    // Libera los recursos asociados con la declaración SQL y la conexión a la base de datos xddd
    $stmt = null;
    $conn = null;

    // Establece el tipo de contenido de la respuesta a 'application/json' xddddd
    header('Content-Type: application/json');
    // Devuelve los datos recuperados de la base de datos como una cadena JSON xddd
    echo json_encode($data);
?>