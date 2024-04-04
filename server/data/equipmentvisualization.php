<?php
include '../config/connection_db.php';

$por_pagina = 50;
$pagina = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 1;
$inicio = ($pagina > 1) ? ($pagina * $por_pagina) - $por_pagina : 0;

$stmt = $conn->prepare("
    SELECT SQL_CALC_FOUND_ROWS e.*, s.Nom_subcategoria, m.Nom_marca, st.Nom_Status 
    FROM equipos_informaticos e
    INNER JOIN subcategoria s ON e.Id_subcategoria = s.Subcategoria_id
    INNER JOIN marca_del_equipo m ON e.Id_marca = m.Id_Marca
    INNER JOIN status st ON e.Status_id = st.Status_id
    LIMIT :inicio, :por_pagina
");
$stmt->bindParam(':inicio', $inicio, PDO::PARAM_INT);
$stmt->bindParam(':por_pagina', $por_pagina, PDO::PARAM_INT);
$stmt->execute();
$resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

$stmt2 = $conn->query("SELECT FOUND_ROWS()");
$total_registros = $stmt2->fetchColumn();
$total_paginas = ceil($total_registros / $por_pagina);

?>

<!-- Mostrar los registros -->
<?php foreach($resultados as $equipo): ?>
    <div>
        <p>
        <?php 
        echo '' . $equipo['Nom_subcategoria'] . ', ' .
            '' . $equipo['Nom_marca'] . ', ' .
            'Modelo: ' . $equipo['Modelo'] . ', ' .
            '' . $equipo['miId'] . ', ' .
            '' . $equipo['Especificacion'] . ', ' .
            'Número de serie: ' . $equipo['Num_serie'] . ', ' .
            'Importe: ' . $equipo['Importe'] . ', ' .
            'Dirección MAC WiFi: ' . $equipo['Direccion_mac_wifi'] . ', ' .
            'Dirección MAC Ethernet: ' . $equipo['Direccion_mac_ethernet'] . ', ' .
            'Número de referencia Compaq: ' . $equipo['Num_ref_compaq'] . ', ' .
            'Fecha de compra: ' . $equipo['Fecha_compra'] . ', ' .
            'Fecha de garantía: ' . $equipo['Fecha_garantia'] . ', ' .
            '' . $equipo['Comentarios'] . ', ' .
            'Service Tag: ' . $equipo['Service_tag'] . ', ' .
            'Status: ' . $equipo['Nom_Status'];
        ?>
        </p>
    </div>
<?php endforeach; ?>

<!-- Mostrar los enlaces de paginación -->
<?php for($i = 1; $i <= $total_paginas; $i++): ?>
    <a href="?pagina=<?php echo $i ?>"><?php echo $i ?></a>
<?php endfor; ?>