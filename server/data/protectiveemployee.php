<?php
// Configuración para mostrar errores
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir el archivo de configuración de la base de datos
include '../config/connection_db.php';

// Recibir JSON y decodificarlo
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Obtener los valores de empresa_id, obra_id y frente_id del JSON decodificado
$empresa_id = isset($data['empresa_id']) ? $data['empresa_id'] : null;
$obra_id = isset($data['obra_id']) ? $data['obra_id'] : null;
$frente_id = isset($data['frente_id']) ? $data['frente_id'] : null;

// Función para obtener las obras de una empresa específica

function getObras($empresa_id) {
    global $conn;
    $sql = "SELECT DISTINCT obras.Obra_id, obras.Nombre_obra FROM obras 
            JOIN obra_empresa ON obras.Obra_id = obra_empresa.Obra_id 
            WHERE obra_empresa.Empresa_id = :empresa_id";
    $stmt = $conn->prepare($sql);
    if ($stmt->execute([':empresa_id' => $empresa_id])) {
        $obras = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($obras);
    } else {
        print_r($stmt->errorInfo());
        exit();
    }
}


// Función para obtener los frentes de una obra específica
function getFrentes($obra_id) {
    global $conn;
    $sql = "SELECT DISTINCT frente.Frente_id, frente.Nom_frente FROM frente 
            JOIN obra_frente ON frente.Frente_id = obra_frente.Frente_id 
            WHERE obra_frente.Obra_id = :obra_id";
    $stmt = $conn->prepare($sql);
    if ($stmt->execute([':obra_id' => $obra_id])) {
        $frentes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($frentes);
    } else {
        print_r($stmt->errorInfo());
        exit();
    }
}


// Función para obtener los empleados de un frente específico
function getEmpleados($frente_id) {
    global $conn;
    $sql = "SELECT * FROM empleados_resguardantes WHERE id_frente = :frente_id";
    $stmt = $conn->prepare($sql);
    if ($stmt->execute([':frente_id' => $frente_id])) {
        $empleados = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($empleados);
    } else {
        print_r($stmt->errorInfo());
        exit();
    }
}

// Inicializar la respuesta JSON
$json_response = '';

// Dependiendo de los valores proporcionados, llamar a la función correspondiente y establecer la respuesta JSON
if ($empresa_id !== null) {
    $obras_json = getObras($empresa_id);
    $json_response = $obras_json;
} elseif ($obra_id !== null) {
    $frentes_json = getFrentes($obra_id);
    $json_response = $frentes_json;
} elseif ($frente_id !== null) {
    $empleados_json = getEmpleados($frente_id);
    $json_response = $empleados_json;
}

// Establecer el tipo de contenido de la respuesta a JSON
header('Content-Type: application/json');
// Imprimir la respuesta JSON
print $json_response;
?>