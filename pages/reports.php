<?php include '../server/auth/session_auth.php'; ?>
<!DOCTYPE html>
<html lang="es-MX">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex">
    <link rel="stylesheet" href="../css/resources/resetStyle.css">
    <link rel="stylesheet" href="../css/components/navegation.css">
    <link rel="stylesheet" href="../css/components/button.css">
    <link rel="stylesheet" href="../css/pages/reports.css">
    <title>Reportes</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
    </style>
</head>

<body>
    <header>
        <img class="opc-logo" src="../images/opc-logo.png" alt="Logo de OPC Ingeniería y Costrucción">
        <nav>
            <ul>
                <li><a href="home.php">Inicio</a></li>
                <li><a href="records.php">Registros</a></li>
                <li><a href="safeguards.php">Resguardos</a></li>
                <li><a href="inventory.php">Equipos y Empleados</a></li>
                <li><a class="selected" href="reports.php">Reporte</a></li>
                <li><a href="history.php">Historial</a></li>
            </ul>
        </nav>

        <div class="notification-container icons-nav">
            <img src="../images/images-nav/notifications.svg" alt="Icono de notificación">
        </div>

        <div class="account-container icons-nav">
            <img src="../images/images-nav/account.svg" alt="Icono de cuenta de usuario">
        </div>
    </header>

    <main>
        <div class="container-filters-details">
            <div class="container-description">
                <h1>Distribución de Dispositivos</h1>

                <p>Por favor, seleccione una empresa para ver la cantidad de dispositivos que tiene asignados.</p>
            </div>
        </div>

        <section id="rootDetails">
            <div class="container-details-resguards">
                
            </div>
        </section>
    </main>

    <script type="module" src="../js/utilities/profileUser.js"></script>
    <script type="module" src="../js/reports/main.js"></script>
</body>

</html>