<?php
// server/data/returnEquipmentSection.php

// 1) Forzar JSON y silenciar warnings que rompan la salida
header('Content-Type: application/json; charset=utf-8');
error_reporting(0);

// 2) Conexión
include __DIR__ . '/../config/connection_db.php';
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// 3) Leer payload
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
$id   = isset($data['id']) ? trim($data['id']) : '';

if (empty($id)) {
    echo json_encode([
        'status'  => 'error',
        'message' => 'No se envió ningún código de equipo'
    ]);
    exit();
}

// 4) Ejecutar consulta
try {
    $sql = "
      SELECT
        r.Equipo_id                  AS equipo_id,
        eq.miId                      AS codigo,
        sub.Nom_subcategoria         AS subcategoria,
        m.Nom_marca                  AS marca,
        eq.Modelo                    AS modelo,
        eq.Num_serie                 AS serie,
        r.Fecha_autorizacion         AS Fecha_autorizacion,
        er.Empleado_id,
        er.Nombre,
        er.Primer_apellido,
        er.Segundo_apellido
      FROM resguardos_de_equipos r
      JOIN equipos_informaticos eq   ON r.Equipo_id = eq.Equipo_id
      JOIN subcategoria sub          ON eq.Id_subcategoria = sub.Subcategoria_id
      JOIN marca_del_equipo m        ON eq.Id_marca = m.Id_Marca
      JOIN empleados_resguardantes er ON r.Empleado_id = er.Empleado_id
      WHERE eq.miId = :miId
        AND r.status <> 'disponible'
      ORDER BY r.Fecha_autorizacion DESC
      LIMIT 1
    ";
    $stmt = $conn->prepare($sql);
    $stmt->execute([':miId' => $id]);
} catch (Exception $e) {
    echo json_encode([
        'status'  => 'error',
        'message' => 'Error en consulta: ' . $e->getMessage()
    ]);
    exit();
}

// 5) Verificar resultado
$row = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$row) {
    echo json_encode([
        'status'  => 'error',
        'message' => 'No se encontró un resguardo activo para ese equipo'
    ]);
    exit();
}

// 6) Formar respuesta limpia
$response = [
    'status'              => 'ok',
    'empleado'            => [
        'empleado_id'                    => (int)$row['Empleado_id'],
        'nombreResguardante_completo'   => trim("{$row['Nombre']} {$row['Primer_apellido']} {$row['Segundo_apellido']}")
    ],
    'equipo'              => [
        'equipo_id'   => (int)$row['equipo_id'],
        'codigo'      => $row['codigo'],
        'subcategoria'=> $row['subcategoria'],
        'marca'       => $row['marca'],
        'modelo'      => $row['modelo'],
        'serie'       => $row['serie'],
    ],
    'fechaAutorizacion'   => $row['Fecha_autorizacion'],
];

// 7) Enviar JSON (sin nada más)
echo json_encode($response, JSON_UNESCAPED_UNICODE);
exit();
