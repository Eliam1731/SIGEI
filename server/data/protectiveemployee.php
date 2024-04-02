<?php
include '../config/connection_db.php';

// Recibir JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$empresa_id = isset($data['empresa_id']) ? $data['empresa_id'] : null;
$obra_id = isset($data['obra_id']) ? $data['obra_id'] : null;
$frente_id = isset($data['frente_id']) ? $data['frente_id'] : null;

function getObras($empresa_id) {
    global $conn;
    $sql = "SELECT * FROM obras WHERE Empresa_id = $empresa_id";
    $result = $conn->query($sql);

    $obras = array();
    while($row = $result->fetch_assoc()) {
        $obras[] = $row;
    }

    return json_encode($obras);
}

function getFrentes($obra_id) {
    global $conn;
    $sql = "SELECT * FROM frente WHERE Obra_id = $obra_id";
    $result = $conn->query($sql);

    $frentes = array();
    while($row = $result->fetch_assoc()) {
        $frentes[] = $row;
    }

    return json_encode($frentes);
}

function getEmpleados($frente_id) {
    global $conn;
    $sql = "SELECT * FROM empleados_resguardantes WHERE id_frente = $frente_id";
    $result = $conn->query($sql);

    $empleados = array();
    while($row = $result->fetch_assoc()) {
        $empleados[] = $row;
    }

    return json_encode($empleados);
}

$json_response = '';

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

header('Content-Type: application/json');
print $json_response;
?>