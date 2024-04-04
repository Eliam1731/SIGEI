<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include '../config/connection_db.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$empresa_id = isset($data['empresa_id']) ? $data['empresa_id'] : null;
$obra_id = isset($data['obra_id']) ? $data['obra_id'] : null;
$frente_id = isset($data['frente_id']) ? $data['frente_id'] : null;

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

function getEmpleados($frente_id) {
    global $conn;
    $sql = "SELECT empleados_resguardantes.* FROM empleados_resguardantes 
            JOIN resguardos_de_equipos ON empleados_resguardantes.Empleado_id = resguardos_de_equipos.Empleado_id 
            WHERE empleados_resguardantes.id_frente = :frente_id";
    $stmt = $conn->prepare($sql);
    if ($stmt->execute([':frente_id' => $frente_id])) {
        $empleados = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($empleados);
    } else {
        print_r($stmt->errorInfo());
        exit();
    }
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