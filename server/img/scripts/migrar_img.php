<?php
// 1. Conexión a la base de datos
include '../../config/connection_db.php';

// 2. Seleccionar todas las imágenes
$sql = "SELECT Nombre, Tipo_mime, Datos_imagen FROM imagenes";
$stmt = $conn->prepare($sql);
$stmt->execute();

// 3. Ruta de destino
$rutaDestino = '../';
$guardadas = 0;
$omitidas = 0;

// 4. Guardar imágenes una por una
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $nombreArchivo = $row['Nombre'];
    $mime = $row['Tipo_mime'];
    $contenido = $row['Datos_imagen'];

    // Verifica que sea una imagen
    if (strpos($mime, 'image/') !== 0 || empty($contenido)) {
        continue;
    }

    $rutaCompleta = $rutaDestino . $nombreArchivo;

    if (file_exists($rutaCompleta)) {
        $omitidas++;
        continue;
    }

    // Guardar como archivo binario
    $fp = fopen($rutaCompleta, 'wb');
    if ($fp !== false) {
        fwrite($fp, $contenido);
        fclose($fp);
        $guardadas++;
    }
}

// 5. Mostrar resumen
echo "✅ Imágenes migradas exitosamente.<br>";
echo "🖼️ Guardadas nuevas: $guardadas<br>";
echo "📁 Omitidas (ya existían): $omitidas<br>";
?>
